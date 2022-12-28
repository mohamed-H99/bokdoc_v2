<template>
    <default-modal
        :name="modalName"
        @params="getParams"
        @before-close="beforeClose"
        :showHeader="false"
    >
        <template #body>
            <div class="wrapper">
                <!-- close -->
                <button
                    class="c-modal__close c-btn--icon"
                    @click.stop="$vfm.hide(modalName)"
                >
                    <svg
                        style="width: auto; height: 16px; max-width: 100%"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                    >
                        <path
                            fill="currentColor"
                            d="M 7.21875 5.78125 L 5.78125 7.21875 L 14.5625 16 L 5.78125 24.78125 L 7.21875 26.21875 L 16 17.4375 L 24.78125 26.21875 L 26.21875 24.78125 L 17.4375 16 L 26.21875 7.21875 L 24.78125 5.78125 L 16 14.5625 Z"
                        ></path>
                    </svg>
                </button>

                <div class="overlay-media">
                    <figure class="overlay-media-figure">
                        <div class="overlay-media-img">
                            <picture>
                                <source
                                    srcset="
                                        /images/request-help-modal-image@2x.webp
                                    "
                                    media="(min-width: 56.25em)"
                                    type="image/webp"
                                />
                                <source
                                    srcset="
                                        /images/request-help-modal-image.webp
                                    "
                                    type="image/webp"
                                />
                                <img
                                    src="/images/request-help-modal-image.png"
                                    alt="doctor crossing arms"
                                    width=""
                                    height=""
                                />
                            </picture>
                        </div>
                    </figure>
                </div>

                <div class="overlay-text">
                    <!-- step_1 -->
                    <div v-show="!step_2" class="step1">
                        <div
                            v-if="noTitle || !searching || page === 'surgery'"
                            class="step1__title"
                        >
                            {{
                                page === "surgery"
                                    ? `${$t(
                                          "Do you need help from"
                                      )} ${providerName}`
                                    : $t(
                                          "Do you need help from a specialist doctor?"
                                      )
                            }}
                        </div>

                        <template v-else>
                            <div class="step1__title">
                                {{
                                    `${$t("You are now browsing")} ${searching}`
                                }}
                            </div>
                            <div class="step1__subtitle">
                                {{
                                    $t(
                                        "Do you need help from a specialist doctor?"
                                    )
                                }}
                            </div>
                        </template>

                        <comp-btn
                            as="button"
                            variant="primary"
                            size="lg"
                            @click.prevent="step_2 = true"
                            className="rounded w-full"
                        >
                            <strong>{{ $t("Click here") }}</strong>
                        </comp-btn>
                    </div>

                    <!-- step_2 -->
                    <div v-show="step_2" class="step2">
                        <div class="step2__title">
                            {{
                                $t(
                                    "The most skilled and best surgeons and doctors in the Middle East at the best prices"
                                )
                            }}
                        </div>

                        <div class="step2__subtitle">
                            {{
                                $t(
                                    "You will now be referred to compare doctors, experiences and prices please enter your details"
                                )
                            }}
                        </div>

                        <form :id="formId" @submit.prevent="handleSubmit">
                            <!-- name -->
                            <div class="form-group">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    class="form-control !text-xs"
                                    v-model.trim="formData.name"
                                    @input="v$.formData.name.$touch"
                                    :placeholder="
                                        $t('Enter your full name here')
                                    "
                                    aria-required="true"
                                />
                                <small
                                    v-if="_errors.name"
                                    class="form-feedback"
                                >
                                    {{ _errors.name }}
                                </small>
                            </div>
                            <div class="form-group">
                                <phone-input
                                    className="bg-light-650 !text-sm"
                                    :value="formData.phone.number"
                                    @updated="handlePhoneChange"
                                />
                                <small
                                    v-if="_errors.phoneIsValid"
                                    class="form-feedback"
                                >
                                    {{ _errors.phoneIsValid }}
                                </small>
                            </div>

                            <comp-btn
                                variant="primary"
                                size="lg"
                                className="rounded w-full"
                                :loading="loading"
                            >
                                <strong>
                                    {{ $t("Find your best doctor") }}
                                </strong>

                                <span>
                                    <svg
                                        :style="{
                                            height: '25px',
                                            width: 'auto',
                                            maxWidth: '100%',
                                        }"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <g>
                                            <rect
                                                fill="none"
                                                height="24"
                                                width="24"
                                            ></rect>
                                        </g>
                                        <g>
                                            <g>
                                                <circle
                                                    cx="10"
                                                    cy="8"
                                                    r="4"
                                                ></circle>
                                                <path
                                                    d="M10.35,14.01C7.62,13.91,2,15.27,2,18v2h9.54C9.07,17.24,10.31,14.11,10.35,14.01z"
                                                ></path>
                                                <path
                                                    d="M19.43,18.02C19.79,17.43,20,16.74,20,16c0-2.21-1.79-4-4-4s-4,1.79-4,4c0,2.21,1.79,4,4,4c0.74,0,1.43-0.22,2.02-0.57 L20.59,22L22,20.59L19.43,18.02z M16,18c-1.1,0-2-0.9-2-2c0-1.1,0.9-2,2-2s2,0.9,2,2C18,17.1,17.1,18,16,18z"
                                                ></path>
                                            </g>
                                        </g>
                                    </svg>
                                </span>
                            </comp-btn>
                        </form>
                    </div>
                </div>
            </div>
        </template>
    </default-modal>
</template>

<script>
import PhoneInput from "@components/common/PhoneInput.vue";
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import Cookies from "js-cookie";
import axios from "axios";
import DefaultModal from "@components/modal/DefaultModal.vue";

// custom validation/s
const mustBeTrue = (value) => value === true;

const isFullName = (value) => value && value.split(" ").length >= 2;

export default {
    components: {
        PhoneInput,
        DefaultModal,
    },

    props: {
        noTitle: Boolean,
        page: String,
        providerName: String,
    },

    computed: {
        modalName() {
            return "request-help";
        },
        formId() {
            return `form-help-request-modal`;
        },
        searching() {
            const params = this.$route.params || {};
            if (params.specialty) {
                return params.specialty.split("-").join(" ");
            }
            if (params.speciality) {
                return params.speciality.split("-").join(" ");
            }
            return "";
        },
    },

    data() {
        return {
            step_2: false,
            v$: useVuelidate({ $scope: false }),
            loading: false,
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

    methods: {
        getParams(params) {
            //
            if (params.skipStep) {
                this.step_2 = true;
            }
        },

        beforeClose() {
            this.resetForm();
        },

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
            this.step_2 = false;
            this.mountUserData();
        },

        async handleSubmit() {
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
                description: this.$t("Need help from the request help modal"),
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
                this.$vfm.hide(this.modalName);
            } catch (err) {
                this.$vfm.show("message", {
                    type: "error",
                });
            } finally {
                this.loading = false;
            }
        },

        mountUserData() {
            const user = this.$store.state.auth.user_auth;

            if (!!user) {
                this.formData.name = user.name || "";
            }
        },
    },

    mounted() {
        this.mountUserData();
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
