<template>
    <form
        class="request-form request-form-v2 bg-white"
        :id="formId"
        @submit.prevent="handleSubmit"
    >
        <div class="flex flex-col justify-center items-center gap-3 md:gap-4">
            <div class="form-group">
                <input
                    class="form-control"
                    type="text"
                    :placeholder="$t('Enter your name')"
                    v-model.trim="formData.name"
                    @input="v$.formData.name.$touch"
                />
                <small v-if="_errors.name" class="form-feedback">
                    {{ _errors.name }}
                </small>
            </div>

            <div class="form-group relative">
                <phone-input
                    placeholder="xxx xxx xxx"
                    className="bg-light-650"
                    :value="formData.phone.number"
                    @updated="handlePhoneChange"
                />
                <small v-if="_errors.phoneIsValid" class="form-feedback">
                    {{ _errors.phoneIsValid }}
                </small>
            </div>

            <div class="form-group">
                <input
                    class="form-control"
                    type="number"
                    min="1"
                    max="119"
                    maxlength="3"
                    :placeholder="$t('Enter your age')"
                    v-model="formData.age"
                    aria-required="false"
                />
            </div>

            <div class="form-group">
                <dropdown
                    align="right"
                    width="48"
                    contentClasses="shadow-xl bg-white"
                >
                    <template #trigger>
                        <button
                            class="form-control flex justify-between"
                            type="button"
                        >
                            <span>
                                {{
                                    formData.gender === null
                                        ? $t("Prefer not to say")
                                        : formData.gender
                                        ? $t(formData.gender)
                                        : $t("Choose type")
                                }}
                            </span>
                        </button>
                    </template>

                    <template #content>
                        <dropdown-link
                            as="button"
                            @click.prevent="formData.gender = 'male'"
                        >
                            {{ $t("Male") }}
                        </dropdown-link>
                        <dropdown-link
                            as="button"
                            @click.prevent="formData.gender = 'female'"
                        >
                            {{ $t("Female") }}
                        </dropdown-link>
                        <dropdown-link
                            as="button"
                            @click.prevent="formData.gender = null"
                        >
                            {{ $t("Prefer not to say") }}
                        </dropdown-link>
                    </template>
                </dropdown>
            </div>

            <div class="form-group">
                <textarea
                    class="form-control"
                    name="description"
                    rows="5"
                    :placeholder="
                        $t(
                            'Write a description of the medical condition and the required medical procedure If you know him'
                        )
                    "
                    @input="v$.formData.description.$touch"
                    v-model="formData.description"
                ></textarea>
                <small v-if="_errors.description" class="form-feedback">
                    {{ _errors.description }}
                </small>
            </div>

            <comp-btn
                variant="secondary"
                href="/specialities"
                rel="canonical"
                size="xl"
                className="rounded w-full"
                :loading="loading"
                style="--fw: 600"
            >
                <span>{{ $t("Submit your request now") }}</span>
            </comp-btn>
        </div>
    </form>
</template>

<script>
import Dropdown from "@jetstream/Dropdown.vue";
import DropdownLink from "@jetstream/DropdownLink.vue";
import PhoneInput from "@components/common/PhoneInput.vue";
import Cookies from "js-cookie";
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";

// custom validation/s
const mustBeTrue = (value) => value === true;

export default {
    components: {
        Dropdown,
        DropdownLink,
        PhoneInput,
    },

    props: {
        loading: {
            type: Boolean,
            default: () => false,
        },
        formId: {
            type: String,
            default: () => "",
        },
        loaded: {
            type: Boolean,
            default: () => false,
        },
        errors: {
            type: Object,
            default: () => ({}),
        },
    },

    emits: ["submit"],

    data() {
        return {
            v$: useVuelidate({ $scope: false }),
            formData: {
                name: "",
                age: "",
                gender: "",
                phone: {
                    number: "",
                    parsedPhone: "",
                    phoneIsValid: false,
                },
                description: "",
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
                description: { required },
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
            this.mountUserData();
        },

        handleSubmit() {
            this.v$.$validate();
            if (!this.checkValidation()) {
                return;
            }

            const data = {
                ...this.formData,
                gender: this.formData.gender || "",
                age: this.formData.age || "",
            };

            const utm = JSON.parse(Cookies.get("utm") || "null");
            if (!!utm) {
                data.utm = utm;
            }

            this.$emit("submit", data);
        },

        mountUserData() {
            const user = this.$store.state.auth.user_auth;

            if (!!user) {
                this.formData.name = user.name || "";
                this.formData.age = user.age || "";
                this.formData.gender = user.gender || "";
            } else {
                //
                this.formData.name = "";
                this.formData.age = "";
                this.formData.gender = "";
                this.formData.description = "";
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
        loaded(newVal) {
            if (newVal) this.resetForm();
        },
    },

    beforeDestroy() {
        this.resetForm();
    },
};
</script>
