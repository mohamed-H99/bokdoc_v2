<template>
    <form
        class="request-form bg-white sm:rounded-lg shadow-lg"
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

            <div
                class="form-group !items-center grid grid-cols-1 xs:grid-cols-2"
            >
                <div class="form-group">
                    <input
                        class="form-control"
                        type="number"
                        min="1"
                        max=""
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
                                <img
                                    width="12"
                                    height="16"
                                    src="/images/chevron-double-2.svg"
                                    class="dropdown-icon"
                                    alt="icon"
                                />
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
                className="rounded-full w-full"
                style="--fs: 1rem"
                :loading="loading"
            >
                <strong>{{ $t("Submit your request now") }}</strong>

                <span class="rtl--icon">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20"
                        viewBox="0 0 20 20"
                        width="20"
                    >
                        <path
                            d="m19.9403766 9.71247402c-.0091602-.02416026-.0191602-.04666036-.0300001-.07000031-.0375002-.07750034-.0841605-.15000066-.1433405-.21250094-.0066602-.00666018-.0108399-.01500006-.0175001-.02166025-.0550002-.05416039-.1166606-.1016606-.1866609-.14000062l-16.61341337-9.02087974c-.75166348-.40666196-1.64916745-.3058412-2.28834996.25666129-.61750273.54584226-.8241638 1.39000615-.51750229 2.17666978l3.11585362 7.31919253-3.12585367 7.34337234c-.29666146.7625034-.09000039 1.6075071.52750234 2.1525095.37834151.3333413.84750375.5041624 1.32334569.5041624.3283413 0 .65916308-.0816605.96584412-.2475011l16.61341332-9.0200399c.0700003-.0375002.1316608-.0858402.186661-.1400006.0066602-.0066602.0108399-.0150001.0175001-.0216603.0591604-.0633401.1058403-.1350006.1433405-.2125009.0108398-.02334.0208399-.0458401.0300001-.0700003.03334-.0925004.0575002-.1875008.0575002-.28834114 0-.10084029-.0241602-.19584071-.0583401-.28750127zm-18.25424087-7.66087373c-.04334003-.11334034-.01750008-.21334079.07750034-.29750131.03666032-.03250015.11584036-.08750039.22250099-.08750039.05084007 0 .10750047.01250005.16834059.04584005l13.72922085 7.45419313h-11.16754936zm.46916223 16.23591171c-.19250085.1041606-.33750149.005-.39166189-.0425002-.09500042-.0841606-.12166069-.184161-.08666053-.2733411l3.0391736-7.1383714h11.16838926z"
                            fill="currentColor"
                            transform="matrix(-1 0 0 1 19.998716 0)"
                        />
                    </svg>
                </span>
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
