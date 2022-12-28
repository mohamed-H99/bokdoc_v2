<template>
    <form
        :id="formId"
        class="search-form p-5 lg:rounded-lg bg-white lg:border !border-light-600"
        role="search"
        @submit.prevent="handleSearch"
    >
        <header class="flex items-center justify-between gap-3 mb-5">
            <button
                type="button"
                class="sidebar-close lg:!hidden"
                @click.prevent="$emit('close')"
            >
                <span class="block w-8 h-8 text-3xl text-black">&times;</span>
            </button>
            <h3 class="fs-20 font-bold fit-content">{{ $t("Search") }}</h3>

            <!-- required for flex purposes -->
            <span></span>
        </header>

        <div class="form-group">
            <label for="" class="fs-13">{{ $t("Medical specialties") }}</label>
            <v-select
                :filterable="false"
                :placeholder="$t('Search for a speciality')"
                :options="specialities"
                label="name"
                :reduce="(item) => item.slug"
                v-model="speciality.slug"
                @search="searchSpecialities"
            />
        </div>

        <div
            v-if="subSpecialities && subSpecialities.length"
            class="form-group"
        >
            <label for="" class="fs-13">{{ $t("Subspeciality") }}</label>
            <v-select
                :placeholder="$t('Operation subspeciality')"
                :options="subSpecialities"
                label="name"
                :reduce="(item) => item.slug"
                v-model="subspeciality.slug"
            />
        </div>

        <div
            v-if="insuranceCompanies && insuranceCompanies.length"
            class="form-group"
        >
            <label for="" class="fs-13">{{ $t("Insurance companies") }}</label>
            <v-select
                :filterable="false"
                :placeholder="$t('Search for insurance company')"
                :options="insuranceCompanies"
                label="name"
                :reduce="(item) => (item.slug ? item.slug : item.name)"
                v-model="insuranceCompany['name']"
                @search="searchInsurances"
            />
        </div>

        <div class="form-group">
            <label for="surgeryName" class="fs-13">{{ $t("Surgeries") }}</label>
            <input
                id="surgeryName"
                type="text"
                v-model.trim="surgeryName"
                class="form-control !bg-white text-sm border-0 !rounded-xl"
                :placeholder="$t('Type the process name') + '...'"
            />
        </div>

        <comp-btn
            variant="white"
            :loading="$store.state.search.subLoading"
            className="w-full rounded"
        >
            <span>{{ $t("Search") }}</span>
        </comp-btn>
    </form>
</template>

<script>
import Dropdown from "@jetstream/Dropdown.vue";
import DropdownLink from "@jetstream/DropdownLink.vue";
import vSelect from "vue-select";
import Cookies from "js-cookie";

export default {
    components: {
        Dropdown,
        DropdownLink,
        vSelect,
    },

    emits: ["search", "close"],

    props: {
        resetting: Boolean,
        routeParams: { type: Object, default: () => ({}) },
        currentSpeciality: { type: Object, default: () => ({}) },
        currentSubSpeciality: { type: Object, default: () => ({}) },
    },

    computed: {
        formId() {
            let result = `form-booking-info-surgeries`;

            if (this.speciality && this.speciality.slug) {
                result += `_${this.speciality.slug}`;
            }
            if (this.speciality && this.subspeciality.slug) {
                result += `_${this.subspeciality.slug}`;
            }
            if (this.surgeryName) {
                result += `_${this.surgeryName}`;
            }

            return result;
        },

        specialities() {
            return this.$store.state.search.specialities;
        },
        subSpecialities() {
            return this.$store.state.search.subSpecialities;
        },
        insuranceCompanies() {
            return this.$store.state.search.insurances;
        },
    },

    data() {
        return {
            speciality: {
                id: null,
                name: null,
                slug: null,
            },
            subspeciality: {
                id: null,
                name: null,
                slug: null,
            },
            insuranceCompany: {
                id: null,
                name: null,
                slug: null,
            },
            surgeryName: "",
        };
    },

    mounted() {
        this.mountSearchData();
    },

    methods: {
        async searchSpecialities(value, loading) {
            loading(true);
            await this.$store.dispatch("search/fetchSpecialities", value);
            loading(false);
        },

        async searchInsurances(value, loading) {
            loading(true);
            await this.$store.dispatch("search/searchInsurances", value);
            loading(false);
        },

        handleSearch() {
            const data = {
                ...this.routeParams,
            };

            if (this.speciality.slug) data.speciality = this.speciality.slug;

            if (this.subspeciality.slug)
                data["sub-speciality"] = this.subspeciality.slug;

            if (this.insuranceCompany.slug || this.insuranceCompany.name)
                data.insuranceCompanies =
                    this.insuranceCompany.slug || this.insuranceCompany.name;

            if (this.surgeryName) data.surgery = this.surgeryName;

            const utm = JSON.parse(Cookies.get("utm") || "null");
            if (!!utm) {
                data.utm = utm;
            }

            this.$emit("search", data);
        },

        mountSearchData() {
            this.speciality = this.currentSpeciality || {
                id: null,
                name: null,
                slug: null,
            };
            if (this.routeParams.specialty) {
                this.speciality.slug = decodeURIComponent(
                    this.routeParams.specialty
                );
            }

            this.subspeciality = this.currentSubSpeciality || {
                id: null,
                name: null,
                slug: null,
            };

            const insuranceCompanyParam = this.routeParams.insuranceCompanies;
            if (insuranceCompanyParam) {
                if (this.insuranceCompanies && this.insuranceCompanies.length) {
                    const res = this.insuranceCompanies.find(
                        (item) => item["name"] === insuranceCompanyParam
                    );
                    this.insuranceCompany = res
                        ? res
                        : {
                              id: "",
                              name: insuranceCompanyParam,
                              slug: insuranceCompanyParam,
                          };
                }
            }

            this.surgeryName = this.routeParams.surgery
                ? decodeURIComponent(this.routeParams.surgery)
                : "";
        },

        async getSub(slug = "") {
            if (!this.specialities.length || !slug) {
                return;
            }

            const res = this.specialities.find((item) => item.slug === slug);

            if (res) {
                this.$store.dispatch("search/fetchSubSpecialities", res.id);
            }
        },

        resetForm() {
            this.speciality = {
                id: null,
                name: null,
                slug: null,
            };

            this.subspeciality = {
                id: null,
                name: null,
                slug: null,
            };

            this.subSpecialities = [];

            this.insuranceCompany = {
                id: null,
                name: null,
                slug: null,
            };

            this.surgeryName = "";
        },
    },

    watch: {
        speciality: {
            handler(newVal) {
                if (!newVal || typeof newVal.id === "undefined") {
                    return;
                }

                if (newVal.slug !== this.routeParams.speciality) {
                    this.surgeryName = "";
                }

                this.getSub(newVal.slug);
            },
            deep: true,
        },
        resetting(newVal) {
            if (!newVal) {
                return;
            }

            this.resetForm();
        },
    },
};
</script>
