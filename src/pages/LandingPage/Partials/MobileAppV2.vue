<template>
    <div class="section-v2 mobile-app-v2">
        <div class="container">
            <div class="row">
                <!--  -->
                <div class="content">
                    <h2 class="section__title">
                        {{ $t("Thousands of doctors and surgeons in one app") }}
                    </h2>
                    <p class="section__subtitle">
                        {{
                            $t(
                                "Bokdoc is the safest, cheapest and easiest way to compare and book prices for different surgeries"
                            )
                        }}
                    </p>

                    <form class="content__form">
                        <label for="mobile-app-phone">
                            {{
                                $t(
                                    "Enter your phone number and we will send you the download link"
                                )
                            }}
                        </label>

                        <div class="form-group">
                            <phone-input
                                id="mobile-app-phone"
                                className="!bg-white dir-sensitive"
                                :value="formData.phone.number"
                                @updated="handlePhoneChange"
                            />

                            <comp-btn
                                variant="secondary"
                                size=""
                                className="w-full lg:w-auto rounded"
                                :loading="loading"
                            >
                                <strong>{{ $t("Get it now") }}</strong>
                            </comp-btn>
                        </div>
                    </form>

                    <div class="content__apps">
                        <!-- app store -->
                        <a
                            :href="$store.state.core.ios_url"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="app store"
                        >
                            <img
                                src="/images/footer-app-store.svg"
                                alt="app store"
                                width="179"
                                height="51"
                            />
                        </a>
                        <!-- google play -->
                        <a
                            :href="$store.state.core.android_url"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="google play"
                        >
                            <!--  -->
                            <img
                                src="/images/footer-google-play.svg"
                                alt="google play"
                                width="174"
                                height="52"
                            />
                        </a>
                    </div>
                </div>

                <!--  -->
                <div class="graphic">
                    <picture>
                        <source
                            media="(min-width: 56.25em)"
                            srcset="/images/mobile-app@2x.webp"
                            type="image/webp"
                        />
                        <source
                            media="(min-width: 56.25em)"
                            srcset="/images/mobile-app@2x.png"
                        />
                        <source
                            srcset="/images/mobile-app.webp"
                            type="image/webp"
                        />
                        <img
                            src="/images/mobile-app.png"
                            alt="mobile app mockup"
                            width=""
                            height=""
                        />
                    </picture>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Cookies from "js-cookie";
import PhoneInput from  "@components/common/PhoneInput.vue";
import useVuelidate from "@vuelidate/core";
import { helpers } from "@vuelidate/validators";

// custom validation/s
const mustBeTrue = (value) => value === true;

export default {
    components: { PhoneInput },

    computed: {
        formId() {
            return `form-download-app`;
        },

        currentLocale() {
            return this.$store.state.localization.current_locale;
        },
    },

    data() {
        return {
            v$: useVuelidate({ $scope: false }),
            loading: false,
            formData: {
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
        },

        handleSubmit() {
            this.v$.$validate();
            if (!this.checkValidation()) {
                return;
            }

            const data = {
                phone: this.formData.phone.parsedPhone,
            };

            const utm = JSON.parse(Cookies.get("utm") || "null");
            if (!!utm) {
                data.utm = utm;
            }

            this.$inertia.post("/send-app-link", data, {
                preserveScroll: true,
                onStart: (visit) => {
                    this.loading = true;
                },
                onSuccess: (page) => {
                    this.resetForm();

                    this.$vfm.show("message", {
                        message: {
                            title: this.$t("Thank you"),
                            description: this.$t(
                                "The application download link has been sent to your phone number now"
                            ),
                        },
                        type: "success",
                        code: 200,
                    });
                },
                onFinish: (visit) => {
                    this.loading = false;
                },
            });
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
