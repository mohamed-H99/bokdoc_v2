<template>
    <div class="chat-box-auth">
        <div class="chat-box__header">
            <button
                type="button"
                class="chat-box__close"
                @click="$store.commit('chat/setBoxView', false)"
            >
                &times;
            </button>
        </div>

        <form
            id="form-login-chat"
            class="chat-box__form"
            @submit.prevent="login"
        >
            <div class="mt-1 mb-5">
                <img
                    :src="core.logo"
                    onerror="this.src='/images/default-logo.svg'"
                    :alt="core.site_name"
                    width="158"
                    height="45"
                    class="block mx-auto"
                />
            </div>

            <div class="chat-box__title">{{ $t("Login to chat") }}</div>

            <ul
                class="form-feedback-list"
                v-if="$page.props.flash && $page.props.flash.message"
            >
                <li>{{ $t($page.props.flash.message) }}</li>
            </ul>

            <div
                class="form-feedback-list-success"
                v-if="$page.props.flash && $page.props.flash.successMessage"
            >
                {{ $t($page.props.flash.successMessage) }}
            </div>

            <div class="form-group">
                <label for="chat-name" class="hidden">
                    {{ $t("Type your name") }}
                </label>
                <input
                    type="text"
                    name="chat-name"
                    id="chat-name"
                    :placeholder="$t('Type your name')"
                    class="form-control"
                    v-model="formData.name"
                    @input="v$.formData.name.$touch"
                    aria-required="true"
                    required
                />
                <small v-if="_errors.name" class="form-feedback">
                    {{ _errors.name }}
                </small>
            </div>
            <div class="form-group">
                <label for="chat-phone" class="hidden">
                    {{ $t("Type your phone") }}
                </label>
                <phone-input
                    :value="formData.phone.number"
                    @updated="handlePhoneChange"
                    id="chat-phone"
                />
                <small v-if="_errors.phoneIsValid" class="form-feedback">
                    {{ _errors.phoneIsValid }}
                </small>
            </div>

            <comp-btn
                variant="secondary"
                size="xl"
                class="rounded w-full"
                :loading="loading"
            >
                <span>{{ $t("Talk to the doctor now") }}</span>
            </comp-btn>
        </form>
    </div>
</template>

<script>
import Cookies from "js-cookie";
import useVuelidate from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import PhoneInput from "@components/common/PhoneInput.vue";

// custom validation/s
const mustBeTrue = (value) => value === true;
const isFullName = (value) => value && value.split(" ").length >= 2;

export default {
    components: { PhoneInput },

    computed: {
        core() {
            return this.$store.state.core;
        },
    },

    validations() {
        return {
            formData: {
                name: {
                    required,
                    isFullName: helpers.withMessage(
                        "Please enter your full name",
                        isFullName
                    ),
                },
                phone: {
                    phoneIsValid: {
                        mustBeTrue: helpers.withMessage(
                            "Phone is not valid",
                            mustBeTrue
                        ),
                    },
                },
            },
        };
    },

    data() {
        return {
            v$: useVuelidate({ $scope: false }),
            loading: false,
            formData: {
                name: "",
                phone: {
                    number: "",
                    parsedPhone: "",
                    phoneIsValid: false,
                    countryCode: "",
                },
            },
            _errors: {},
        };
    },

    methods: {
        handlePhoneChange({ phone, isValid, parsedPhone, countryCode }) {
            this.formData.phone.number = phone;
            this.formData.phone.parsedPhone = parsedPhone;
            this.formData.phone.phoneIsValid = isValid;
            this.formData.phone.countryCode = countryCode;
            this.checkValidation();
        },

        checkValidation() {
            this._errors = {};
            const { $invalid, $errors } = this.v$;
            if ($errors.length) {
                $errors.forEach((err) => {
                    this._errors[err.$property] = this.$t(err.$message);
                });
            }
            return !$invalid;
        },

        resetForm() {
            this.v$.$reset();
            this._errors = {};
            this.formData.name = "";
        },

        login() {
            return;

            this.v$.$validate();
            if (!this.checkValidation()) {
                return;
            }

            $store.dispatch("core/gtagEvent", {
                event: this.surgery || this.speciality,
                surgery_name: this.surgery || "",
                speciality_name: this.speciality || "",
            });

            const data = {
                name: this.formData.name,
                phone: this.formData.phone.parsedPhone,
                formattedPhone: this.formData.phone.number,
                country_code: this.formData.phone.countryCode,
                speciality: "",
                subSpeciality: "",
                surgery: "",
            };

            const utm = JSON.parse(Cookies.get("utm") || "null");
            if (!!utm) {
                data.utm = utm;
            }

            const csrf_token = this.$page.props.csrf_token;

            this.loading = true;
            axios
                .post("/check/user", {
                    phone: data.phone,
                    country_code: data.country_code,
                    headers: {
                        "X-Inertia": true,
                        "X-CSRF-TOKEN": csrf_token,
                    },
                })
                .then((res) => {
                    console.log(res);

                    if (res.data === 1) {
                        this.loading = false;
                        this.$vfm.show("login", data);
                    } else {
                        data.speciality = this.speciality || "";
                        data.subSpeciality = this.subSpeciality || "";
                        data.surgery = this.surgery || "";

                        this.$inertia.post("/check/auth/search", data, {
                            onStart: () => {
                                this.loading = true;
                            },
                            onSuccess: () => {
                                $store.dispatch("core/gtagEvent", {
                                    event: "gtm.formSubmit",
                                });
                                this.resetForm();
                                this.loading = false;
                            },
                            onError: (errors) => {
                                console.warn(errors);
                                this._errors = { ...errors };
                                this.loading = false;
                            },
                            onCancel: () => {
                                this.loading = false;
                            },
                        });
                    }
                })
                .catch((err) => {
                    console.warn(err);
                    this.loading = false;
                });
        },
    },
};
</script>
