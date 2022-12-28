<template>
    <default-modal :name="modalName" @params="getParams">
        <template #body>
            <div class="c-modal__body flex flex-col items-center gap-8 p-8">
                <div
                    class="flex flex-col items-center text-center gap-4 w-11/12 md:w-3/4"
                >
                    <h3 class="text-lg font-bold mt-2">
                        {{ $t("Request to join our site") }}
                    </h3>
                    <p class="text-sm opacity-70">
                        {{
                            $t(
                                "Fill the form and one of our medical representative will contact you shortly"
                            )
                        }}
                    </p>
                </div>

                <form
                    :id="formId"
                    method="post"
                    class="w-full request-form"
                    @submit.prevent="handleSubmit"
                >
                    <div class="form-group">
                        <input
                            type="text"
                            class="form-control"
                            :placeholder="$t('Enter your name')"
                            aria-required="true"
                            v-model.trim="FormDataJoin.name"
                            @input="v$.FormDataJoin.name.$touch"
                        />
                        <small v-if="_errors.name" class="form-feedback">
                            {{ _errors.name }}
                        </small>
                    </div>

                    <div class="form-group">
                        <phone-input
                            className="bg-light-650"
                            :value="FormDataJoin.phone.number"
                            @updated="handlePhoneChange"
                        />

                        <small
                            v-if="_errors.phoneIsValid"
                            class="form-feedback"
                        >
                            {{ _errors.phoneIsValid }}
                        </small>
                    </div>

                    <div class="form-group">
                        <input
                            type="email"
                            class="form-control"
                            :placeholder="$t('Email')"
                            v-model.trim="FormDataJoin.email"
                            aria-required="false"
                            @input="v$.FormDataJoin.email.$touch"
                        />
                        <small v-if="_errors.email" class="form-feedback">
                            {{ _errors.email }}
                        </small>
                    </div>

                    <comp-btn
                        variant="secondary"
                        href="/specialities"
                        rel="canonical"
                        className="rounded w-full mt-5"
                        style="--fs: 1rem; --min-h: 2.8125rem"
                        :loading="loading"
                    >
                        <strong>{{ $t("Submit your request now") }}</strong>
                    </comp-btn>
                </form>
            </div>
        </template>
    </default-modal>
</template>

<script>
import DefaultModal from "@components/modal/DefaultModal.vue";
import RequestForm from "@pages/LandingPage/Partials/RequestForm.vue";
import PhoneInput from "@components/common/PhoneInput.vue";
import Cookies from "js-cookie";

import useVuelidate from "@vuelidate/core";
import { required, requiredIf, email, helpers } from "@vuelidate/validators";

// custom validation/s
const mustBeTrue = (value) => value === true;

export default {
    components: {
        RequestForm,
        PhoneInput,
        DefaultModal,
    },

    computed: {
        modalName() {
            return "join";
        },
        formId() {
            return `request-to-join-form`;
        },
    },

    data() {
        return {
            v$: useVuelidate({ $scope: false }),
            loading: false,
            FormDataJoin: {
                name: "",
                phone: {
                    number: "",
                    parsedPhone: "",
                    phoneIsValid: false,
                },
                email: "",
            },
            _errors: {},
        };
    },

    validations() {
        return {
            FormDataJoin: {
                name: { required },
                phone: {
                    phoneIsValid: {
                        mustBeTrue: helpers.withMessage(
                            "Phone is not valid",
                            mustBeTrue
                        ),
                    },
                },
                email: {
                    email: helpers.withMessage("Email is not valid", email),
                    requiredIfFilled: requiredIf(this.FormDataJoin.email),
                },
            },
        };
    },

    methods: {
        handlePhoneChange({ phone, isValid, parsedPhone }) {
            this.FormDataJoin.phone.number = phone;
            this.FormDataJoin.phone.parsedPhone = parsedPhone;
            this.FormDataJoin.phone.phoneIsValid = isValid;
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

        getParams() {
            this.mountUserData();
        },

        resetForm() {
            this.v$.$reset();
            this._errors = {};
            this.mountUserData();
        },

        handleSubmit() {
            this.v$.$validate();
            if (!this.checkValidation()) {
                return;
            }

            const data = {
                name: this.FormDataJoin.name,
                phone: this.FormDataJoin.phone.parsedPhone,
                email: this.FormDataJoin.email,
                type: "request_membership",
            };

            const utm = JSON.parse(Cookies.get("utm") || "null");
            if (!!utm) {
                data.utm = utm;
            }

            this.$inertia.post("store/contact", data, {
                onStart: (visit) => {
                    this.loading = true;
                },
                onSuccess: (page) => {
                    this.$store.dispatch("core/gtagEvent", {
                        event: "gtm.elementVisibility",
                    });

                    this.resetForm();

                    this.$vfm.hide(this.modalName);
                    this.$vfm.show("message", {
                        type: "success",
                    });

                    this.resetForm();
                },
                onError: (errors) => {
                    this._errors = { ...errors };
                },
                onFinish: (visit) => {
                    this.loading = false;
                },
            });
        },

        mountUserData() {
            const user = this.$store.state.auth.user_auth;

            if (!!user) {
                this.FormDataJoin.name = user.name || "";
                this.FormDataJoin.email = user.email || "";
            }
        },
    },

    watch: {
        v$() {
            this.checkValidation();
        },
    },

    beforeDestroy() {
        this.resetForm();
    },
};
</script>
