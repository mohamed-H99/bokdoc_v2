<template>
    <div class="help-widget">
        <!-- form -->
        <form
            class="help-widget__form w-full bg-light-100 rounded-xl transition-transform transition-opacity overflow-y-auto p-5 md:p-8 lg:p-10"
            :class="{ show: showForm }"
            @submit.prevent="submit"
        >
            <div
                class="help-widget__header flex items-center justify-end lg:!hidden"
            >
                <button
                    type="button"
                    class="close transition-colors hover:bg-light-860"
                    @click.prevent="showForm = false"
                >
                    &times;
                </button>
            </div>

            <div class="avatar">
                <img
                    v-lazy="'/images/doctor-placeholder.svg'"
                    :alt="'Dr. ahmed'"
                    :title="'Dr. ahmed'"
                    width="114"
                    height="114"
                />
            </div>

            <div
                class="message text-white font-bold max-w-full block rounded-full relative"
            >
                {{ `${$t("Welcome, This is")} ${"Dr. ahmed"}` }}
            </div>

            <strong class="title">
                {{ $t("You can get 10% off your medical procedures now") }}
            </strong>
            <p class="description">
                {{
                    $t(
                        "By registering your data with us, I will contact you from the medical support team of BokDoc, nominate the appropriate doctor for your case and give you a 10% discount for the first medical procedure with us"
                    )
                }}
            </p>

            <div class="form-group">
                <label for="help-widget-name" class="!hidden">
                    {{ $t("Type your name") }}
                </label>
                <input
                    type="text"
                    id="help-widget-name"
                    name="help-widget-name"
                    class="form-control"
                    v-model="formData.name"
                    :placeholder="$t('Type your name')"
                />
                <!-- @input="v$.formData.name.$touch" -->
                <small v-if="_errors.name" class="form-feedback">
                    {{ _errors.name }}
                </small>
            </div>
            <div class="form-group">
                <label for="help-widget-phone" class="!hidden">
                    {{ $t("Type your name") }}
                </label>
                <phone-input
                    className="bg-light-650"
                    :value="formData.phone.number"
                    @updated="handlePhoneChange"
                    id="help-widget-phone"
                />
                <small v-if="_errors.phoneIsValid" class="form-feedback">
                    {{ _errors.phoneIsValid }}
                </small>
            </div>

            <comp-btn
                variant="secondary"
                size=""
                class="rounded !py-5 w-full"
                :loading="loading"
            >
                <strong>{{ $t("Contact with me") }}</strong>
            </comp-btn>
        </form>

        <!-- toggle -->
        <comp-btn
            variant="secondary"
            as="button"
            type="button"
            size=""
            class="rounded flex items-center justify-between gap-4 help-widget__toggle !p-5 md:!p-6 max-w-full"
            @click="showForm = !showForm"
        >
            <strong>
                {{
                    `${$t(
                        "Do you want a 10% discount on your medical procedures now?"
                    )}`
                }}
            </strong>

            <span class="icon">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 10 6"
                    width="10"
                    height="6"
                >
                    <path
                        d="m7.9425 0-3.4425 3.44150876-3.4425-3.44150876-1.0575 1.05950379 4.5 4.50852676 4.5-4.50852676z"
                        fill="currentColor"
                        fill-opacity="1"
                        transform="translate(.5 .454708)"
                    />
                </svg>
            </span>
        </comp-btn>
    </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import Cookies from "js-cookie";
import PhoneInput from "@components/common/PhoneInput.vue";

// custom validation/s
const mustBeTrue = (value) => value === true;

export default {
    components: { PhoneInput },

    data() {
        return {
            v$: useVuelidate({ $scope: false }),
            loading: false,
            showForm: false,
            formData: {
                name: "",
                phone: {
                    number: "",
                    parsedPhone: "",
                    phoneIsValid: false,
                },
            },
            _errors: {},
        };
    },

    validations() {
        return {
            formData: {
                name: { required },
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

    methods: {
        handlePhoneChange({ phone, isValid, parsedPhone }) {
            this.formData.phone.number = phone;
            this.formData.phone.parsedPhone = parsedPhone;
            this.formData.phone.phoneIsValid = isValid;
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

        async submit() {
            this.v$.$validate();

            if (!this.checkValidation()) {
                return;
            }

            const { name, phone } = this.formData;

            const data = {
                name,
                phone: phone.parsedPhone,
                age: "",
                gender: "",
                user_id: "",
                speciality:
                    this.$route.params.specialty ||
                    this.$route.params.speciality ||
                    "",
                surgery: this.$route.params.surgery || "",
                description: this.$t("Need discount from floating help widget"),
                type: "contact form",
            };

            const user = this.$store.state.auth.user_auth;
            if (user) {
                data.age = user.age || "";
                data.gender = user.gender || "";
                data.user_id = user.id;
            }

            const utm = JSON.parse(Cookies.get("utm") || "null");
            if (!!utm) {
                data.utm = utm;
            }

            try {
                this.loading = true;
                let res = await axios.post("/store/contact", data);
                res = res.data;

                this.$store.dispatch("core/gtagEvent", {
                    event: "gtm.formSubmit",
                });

                this.$vfm.show("message", {
                    type: "success",
                });
            } catch (err) {
                this.$vfm.show("message", {
                    type: "error",
                });
            } finally {
                this.loading = false;
                this.showForm = false;
            }
        },

        mountUserData() {
            const user = this.$store.state.auth.user_auth;

            if (user) {
                this.formData.name = user.name || "";
            }
        },
    },

    mounted() {
        this.mountUserData();
    },
};
</script>
