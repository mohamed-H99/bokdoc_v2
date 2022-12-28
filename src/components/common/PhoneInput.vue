<script>
import { allCountries } from "country-telephone-data";
import flags from "world_countries_lists/data/flags/16x16/flags-16x16.json";
import parsePhoneNumberFromString, {
    AsYouType,
    isValidPhoneNumber,
} from "libphonenumber-js";
import Dropdown from "@jetstream/Dropdown.vue";
import DropdownLink from "@jetstream/DropdownLink.vue";

export default {
    components: {
        Dropdown,
        DropdownLink,
    },

    emits: ["updated"],

    props: {
        placeholder: {
            type: String,
            default: () => "",
        },
        className: {
            type: String,
            default: () => "",
        },
        required: {
            type: Boolean,
            default: () => true,
        },
        value: {
            type: String,
            default: () => "",
            required: true,
        },
        id: {
            type: String,
            default: () => `phone_${Date.now()}`,
        },
    },

    data() {
        return {
            open: false,
            isValid: false,
            searchValue: "",
            shownCountries: [],
            activeCountry: {
                name: "",
                dialCode: "",
            },
        };
    },

    computed: {
        countries() {
            if (!Array.isArray(this.$store.state.geo.supported_countries)) {
                return [];
            }

            let newSupportedCountries = [];
            const sortedCountries = [...allCountries];

            sortedCountries.forEach((country) => {
                this.$store.state.geo.supported_countries.forEach(
                    (supCountry) => {
                        if (country.iso2 === supCountry.code.toLowerCase()) {
                            if (
                                country.iso2 ===
                                this.$store.state.geo.current_country.code.toLowerCase()
                            ) {
                                newSupportedCountries.unshift({
                                    ...country,
                                    flag: flags[country.iso2],
                                });
                            } else if (
                                country.iso2 === supCountry.code.toLowerCase()
                            ) {
                                newSupportedCountries.push({
                                    ...country,
                                    flag: flags[country.iso2],
                                });
                            }
                        }
                    }
                );
            });

            let filteredCountriesFromSupported = [];
            newSupportedCountries.forEach((supCountry) => {
                filteredCountriesFromSupported = allCountries.filter((c) => {
                    c.flag = flags[c.iso2];
                    return c.iso2 !== supCountry.iso2;
                });
            });
            return [
                ...newSupportedCountries,
                ...filteredCountriesFromSupported,
            ];
        },
    },

    methods: {
        searchCountry(query) {
            if (!query) {
                return this.countries.slice(0, 20);
            }

            let q = query.replaceAll("+", "");

            return this.countries.filter((c) => {
                return !isNaN(q)
                    ? c.dialCode.match(q)
                    : c.name.toLowerCase().match(q.toLowerCase());
            });
        },

        getCountryByCode(short) {
            return this.countries.find(
                (c) => c.iso2.toLowerCase() === short.toLowerCase()
            );
        },

        selectCountry(country) {
            this.open = false;
            this.activeCountry = country || this.activeCountry;
            this.$emit("updated", {
                phone: `+${country.dialCode}`,
                parsedPhone: `+${country.dialCode}`,
                isValid: this.isValid,
                countryCode: `+${this.activeCountry.dialCode}`,
            });

            setTimeout(() => {
                this.searchValue = "";
            }, 1000);
        },

        handlePhoneChange(newValue) {
            const isNewCode = newValue.slice(0, 1) === "+";
            const countryCode = isNewCode
                ? ""
                : this.activeCountry.iso2.toUpperCase();
            const phone = new AsYouType(countryCode).input(newValue);

            const valid = isValidPhoneNumber(phone, countryCode);
            this.isValid = valid;

            const res = parsePhoneNumberFromString(newValue, countryCode) || {
                country: null,
                number: "",
            };

            if (res.country) {
                this.activeCountry = this.getCountryByCode(res.country);
            }

            this.$emit("updated", {
                phone,
                parsedPhone: res.number || phone.split(" ").join(""),
                isValid: this.isValid,
                countryCode: `+${this.activeCountry.dialCode}`,
            });
        },

        setDefault() {
            const user = this.$store.state.auth.user_auth;
            if (user && user.mobile_number) {
                this.handlePhoneChange(user.mobile_number);

                return;
            }

            this.activeCountry = this.countries[0] || this.activeCountry;
            this.$emit("updated", {
                phone: `+${this.activeCountry.dialCode}`,
                isValid: this.isValid,
                countryCode: `+${this.activeCountry.dialCode}`,
            });
        },
    },

    mounted() {
        this.setDefault();
        this.shownCountries = this.countries.slice(0, 20);
    },

    watch: {
        searchValue(newValue) {
            this.shownCountries = this.searchCountry(newValue);
        },
        countries(newVal) {
            console.log("countries:", newVal);
        },
    },
};
</script>

<template>
    <div
        class="phone-input ltr relative flex w-full rounded"
        :class="className"
        :data-valid="isValid"
    >
        <div class="dropdown relative">
            <button
                @click.stop="open = !open"
                class="form-control dropdown-toggle rounded flex justify-between items-center"
                type="button"
            >
                <img
                    width="16"
                    height="16"
                    class="inline-block flag"
                    v-lazy="activeCountry.flag"
                    :alt="activeCountry.name"
                />
                <!-- <img
                    width="8"
                    height="6"
                    src="/images/triangle-down.svg"
                    class="dropdown-icon"
                    alt="icon"
                /> -->
                <span class="dropdown-icon">
                    <svg
                        height="6"
                        viewBox="0 0 10 6"
                        width="10"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="m7.9425 0-3.4425 3.44150876-3.4425-3.44150876-1.0575 1.05950379 4.5 4.50852676 4.5-4.50852676z"
                            fill="#707070"
                            fill-opacity="1"
                            transform="translate(.5 .454708)"
                        />
                    </svg>
                </span>
            </button>

            <div
                v-show="open"
                class="dropdown-content min-w-full absolute rounded-lg overflow-hidden border shadow-lg bg-white"
            >
                <div
                    class="search-form px-3 gap-2 top-0 bg-white mx-auto border-b relative flex items-center"
                >
                    <span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            style="width: auto; height: 18px"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <g transform="translate(0 0)">
                                <rect
                                    height="2"
                                    opacity=".5"
                                    rx="1"
                                    transform="matrix(.70710678 .70710678 -.70710678 .70710678 15.85924 -6.861998)"
                                    width="8.15546"
                                    x="12.135054"
                                    y="14.712797"
                                />
                                <path
                                    d="m8 16c-4.44444 0-8-3.5556-8-8 0-4.44444 3.55556-8 8-8 4.4444 0 8 3.55556 8 8 0 4.4444-3.5556 8-8 8zm0-14c-3.46667 0-6 2.53333-6 6 0 3.4667 2.53333 6 6 6 3.4667 0 6-2.5333 6-6 0-3.46667-2.5333-6-6-6z"
                                />
                            </g>
                        </svg>
                    </span>

                    <input
                        role="search"
                        type="search"
                        v-model="searchValue"
                        :placeholder="$t('Search for countries')"
                        class="search px-0 py-3 border-0 w-full h-full"
                    />
                </div>
                <ul class="list relative flex flex-col p-2 overflow-y-auto">
                    <li
                        class="item flex flex-col items-center w-full"
                        v-for="(country, index) in shownCountries.length
                            ? shownCountries
                            : countries"
                        :key="country.native"
                    >
                        <button
                            type="button"
                            class="link flex items-center px-2 rounded-lg overflow-hidden hover:bg-light-800 w-full gap-2"
                            @click.stop="selectCountry(country)"
                        >
                            <img
                                width="16"
                                height="16"
                                class="inline-block flag"
                                v-lazy="country.flag"
                                :alt="country.name"
                            />
                            <div class="flex gap-1 items-center font-bold">
                                <strong class="name long--text">
                                    {{ country.name }}
                                </strong>
                                <span>{{ `+${country.dialCode}` }}</span>
                            </div>
                        </button>
                        <div
                            v-if="
                                !searchValue &&
                                index ===
                                    $store.state.geo.supported_countries
                                        .length -
                                        1
                            "
                            class="divider"
                        ></div>
                    </li>
                </ul>
                <div class="dropdown-overlay" @click="open = false"></div>
            </div>
        </div>

        <!-- :class="isValid ? '!text-green' : ''" -->
        <input
            :id="id"
            class="number form-control ltr"
            type="text"
            :value="value"
            :placeholder="placeholder"
            :required="required"
            @input.prevent="(e) => handlePhoneChange(e.target.value)"
        />
        <label :for="id" class="phone-input-label">
            {{ $t("Enter your phone number") }}
        </label>
    </div>
</template>
