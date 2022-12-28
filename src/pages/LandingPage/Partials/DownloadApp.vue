<template>
    <section
        id="landing-download-app"
        class="download-app c-section xl:!py-0 tel-reversed bg-primary-150"
    >
        <div
            class="c-section__wrapper split container grid grid-cols-1 gap-y-16 md:grid-cols-2 justify-between items-center xl:items-end"
        >
            <div class="c-section__content w-full">
                <h2 class="fs-30 font-bold title">
                    {{ $t("Thousands of doctors and surgeons in one app") }}
                </h2>
                <p class="fs-21 subtitle">
                    {{
                        $t(
                            "Bokdoc is the safest, cheapest and easiest way to compare and book prices for different surgeries"
                        )
                    }}
                </p>

                <form
                    :id="formId"
                    @submit.prevent="handleSubmit"
                    class="form flex flex-col justify-center items-start gap-0"
                >
                    <label class="text-sm">
                        {{
                            $t(
                                "Enter your phone number and we will send you the download link"
                            )
                        }}
                    </label>

                    <div
                        class="!w-full sm:!w-auto flex gap-y-2 justify-center items-center md:items-start rounded attached fit-content"
                    >
                        <div
                            class="!w-full attached-input form-group !flex gap-2 rounded relative"
                        >
                            <phone-input
                                className="!bg-white dir-sensitive"
                                :value="formData.phone.number"
                                @updated="handlePhoneChange"
                            />
                        </div>

                        <comp-btn
                            variant="secondary"
                            size=""
                            className="attached-button w-full lg:w-auto h-full px-6 rounded-sm"
                            :loading="loading"
                        >
                            <strong>{{ $t("Get it now") }}</strong>
                        </comp-btn>
                    </div>
                    <small v-if="_errors.phoneIsValid" class="form-feedback">
                        {{ _errors.phoneIsValid }}
                    </small>
                </form>

                <div class="icons flex justify-start gap-4">
                    <a
                        :href="$store.state.core.android_url || '#'"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="google play"
                    >
                        <img
                            src="/images/google-play.svg"
                            alt="google play"
                            width="118"
                            height="40"
                        />
                    </a>
                    <a
                        :href="$store.state.core.ios_url || '#'"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="app store"
                    >
                        <img
                            src="/images/app-store.svg"
                            alt="app store"
                            width="118"
                            height="40"
                        />
                    </a>
                </div>
            </div>

            <div
                class="hidden md:flex justify-center items-center overflow-hidden"
            >
                <picture>
                    <source
                        :srcset="
                            currentLocale === 'ar'
                                ? '/images/mobile-app-moukup_ar@2x.webp'
                                : '/images/mobile-app-moukup@2x.webp'
                        "
                        media="(min-width: 56.25em)"
                        type="image/webp"
                    />
                    <source
                        :srcset="
                            currentLocale === 'ar'
                                ? '/images/mobile-app-moukup_ar@2x.png'
                                : '/images/mobile-app-moukup@2x.png'
                        "
                        media="(min-width: 56.25em)"
                    />
                    <source
                        :srcset="
                            currentLocale === 'ar'
                                ? '/images/mobile-app-moukup_ar.webp'
                                : '/images/mobile-app-moukup.webp'
                        "
                        type="image/webp"
                    />
                    <img
                        v-lazy="
                            currentLocale === 'ar'
                                ? '/images/mobile-app-moukup_ar.png'
                                : '/images/mobile-app-moukup.png'
                        "
                        alt="mobile app moukup"
                        height="553"
                        width="582"
                        class="block image w-full"
                    />
                </picture>
            </div>
        </div>
    </section>
</template>

<script>
import Cookies from "js-cookie";
import PhoneInput from "@components/common/PhoneInput.vue";
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
