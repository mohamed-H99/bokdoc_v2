<template>
    <default-modal :name="modalName" @params="getParams">
        <template #body>
            <!-- body -->
            <div class="report">
                <div class="report-header report-section !pt-0">
                    <h2 class="report-header__title text-lg font-bold mt-2">
                        {{ $t("What is wrong?") }}
                    </h2>
                </div>

                <div class="report-section">
                    <h3 class="report-section__title">{{ $t("Are you?") }}</h3>

                    <form class="areYou-form" @submit.prevent>
                        <div
                            class="form-group"
                            v-for="item in areYou"
                            :key="item.id"
                        >
                            <input
                                :id="`areYou_${item.id}`"
                                type="radio"
                                name="areYou"
                                class="form-control !text-primary"
                                @change="
                                    (e) =>
                                        handleAreYou({
                                            item,
                                            checked: e.target.checked,
                                        })
                                "
                            />
                            <label :for="`areYou_${item.id}`">
                                {{ item.name }}
                            </label>
                        </div>
                    </form>
                </div>

                <div class="report-section">
                    <h3 class="report-section__title">
                        {{ $t("We suggest you the type of error") }}
                    </h3>

                    <form
                        class="suggest-form sm:grid grid-cols-2"
                        @submit.prevent
                    >
                        <div
                            class="form-group"
                            v-for="item in suggest"
                            :key="item.id"
                        >
                            <input
                                :id="`suggest_${item.id}`"
                                type="checkbox"
                                name="suggest"
                                class="form-control !text-primary"
                                @change="
                                    (e) =>
                                        handleSuggest({
                                            item,
                                            checked: e.target.checked,
                                        })
                                "
                            />
                            <label :for="`suggest_${item.id}`">
                                {{ item.name }}
                            </label>
                        </div>
                    </form>
                </div>

                <form
                    method="post"
                    class="w-full report-form report-section"
                    @submit.prevent="handleSubmit"
                >
                    <h3 class="report-section__title">
                        {{ $t("Do you have other comments") }}
                    </h3>

                    <div class="form-group">
                        <input
                            type="text"
                            class="form-control"
                            :placeholder="$t('Add triple name')"
                            v-model.trim="formData.name"
                            @input="v$.formData.name.$touch"
                        />
                        <small v-if="_errors.name" class="form-feedback">
                            {{ _errors.name }}
                        </small>
                    </div>

                    <div class="form-group">
                        <phone-input
                            className="bg-light-650"
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

                    <div class="form-group">
                        <textarea
                            type="text"
                            name="details"
                            class="form-control"
                            :placeholder="$t('You can add some details')"
                            v-model="formData.details"
                            rows="4"
                            @input="v$.formData.details.$touch"
                        ></textarea>
                        <small v-if="_errors.details" class="form-feedback">
                            {{ _errors.details }}
                        </small>
                    </div>

                    <comp-btn
                        variant="secondary"
                        className="w-full rounded"
                        style="--min-h: 2.8125rem"
                        :loading="loading"
                    >
                        <strong>{{ $t("Send to us") }}</strong>
                    </comp-btn>
                </form>
            </div>
        </template>
    </default-modal>
</template>

<script>
import RequestForm from "@pages/LandingPage/Partials/RequestForm.vue";
import PhoneInput from "@components/common/PhoneInput.vue";
import DefaultModal from "@components/modal/DefaultModal.vue";

import useVuelidate from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";

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
            return "report";
        },
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
                },
                details: "",
            },
            _errors: {},
            areYou: [
                {
                    id: 1,
                    name: this.$t("Current doctor"),
                    slug: "current-doctor",
                },
                {
                    id: 2,
                    name: this.$t("Another doctor"),
                    slug: "another-doctor",
                },
                {
                    id: 3,
                    name: this.$t("Visitor"),
                    slug: "visitor",
                },
                {
                    id: 4,
                    name: this.$t("Previous patient experience"),
                    slug: "previous-patient-experience",
                },
            ],
            suggest: [
                {
                    id: 1,
                    name: this.$t("The qualification is incorrect"),
                    slug: "the-qualification-is-incorrect",
                },
                {
                    id: 2,
                    name: this.$t("Patients comments"),
                    slug: "patients-comments",
                },
                {
                    id: 3,
                    name: this.$t("Inquiries fees are high"),
                    slug: "inquiries-fees-are-high",
                },
                {
                    id: 4,
                    name: this.$t("Nursing change"),
                    slug: "nursing-change",
                },
                {
                    id: 5,
                    name: this.$t("Medical procedure is not appropriate"),
                    slug: "medical-procedure-is-not-appropriate",
                },
                {
                    id: 6,
                    name: this.$t("I'm traveling outside Egypt now"),
                    slug: "im-traveling-outside-Egypt-now",
                },
                {
                    id: 7,
                    name: this.$t("I have another phone number"),
                    slug: "i-have-another-phone-number",
                },
                {
                    id: 8,
                    name: this.$t("Registration problem"),
                    slug: "registration-problem",
                },
            ],
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
        getParams(params) {
            //
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
            this.mountUserData();
        },

        handleSubmit() {
            this.v$.$validate();
            if (!this.checkValidation()) {
                return;
            }

            const { name, phone, details } = this.formData;
            const data = {
                name,
                phone: phone.parsedPhone,
                details,
            };

            // API
            // this.loading = true;

            // setTimeout(() => {
            //     this.loading = false;

            //     this.resetForm();
            // }, 2000);
        },

        handleAreYou({ item, checked }) {
            //
        },

        handleSuggest({ item, checked }) {
            //
        },

        mountUserData() {
            const user = this.$store.state.auth.user_auth;

            if (!!user) {
                this.formData.name = user.name || "";
            } else {
                //
                this.formData.name = "";
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
