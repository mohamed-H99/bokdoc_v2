import axios from "axios";

const search = {
    namespaced: true,

    state: () => ({
        loading: false,
        subLoading: false,
        searchFormLoading: false,
        filtersLoading: false,
        specialities: [],
        subSpecialities: [],
        articles: [],
        states: [],
        cities: [],
        spokenLanguages: [],
        providerTypes: [],
        providerRateCount: 5,
        insurances: [],
        results: {
            data: null,
        },
        subResults: {
            data: null,
        },
    }),

    mutations: {
        setData(state, { key, value }) {
            state[key] = value;
        },
    },

    actions: {
        async fetchSpecialities({ commit, rootState }, name = "") {
            let endpoint = `/${rootState.localization.current_locale}/list-specialities`;
            if (name) endpoint += `?name=${name}`;

            try {
                commit("setData", { key: "searchFormLoading", value: true });
                const res = await axios.get(endpoint);
                commit("setData", { key: "specialities", value: res.data });
            } catch (err) {
            } finally {
                commit("setData", { key: "searchFormLoading", value: false });
            }
        },

        async fetchSubSpecialities({ commit, rootState }, id) {
            try {
                commit("setData", { key: "searchFormLoading", value: true });
                const res = await axios.get(
                    `/${rootState.localization.current_locale}/supSpecialities/${id}`
                );
                commit("setData", { key: "subSpecialities", value: res.data });
            } catch (err) {
            } finally {
                commit("setData", { key: "searchFormLoading", value: false });
            }
        },

        async fetchResults({ commit, rootState }, query = {}) {
            const keys = Object.keys(query || {});
            let endpoint = `/${rootState.localization.current_locale}/search-surgery`;

            if (keys.length) {
                const URL_ = new URL(rootState.core.base_url);

                keys.forEach((key) =>
                    URL_.searchParams.append(key, query[key] || "")
                );

                URL_.searchParams.set(
                    "country",
                    rootState.geo.current_country.code || ""
                );

                endpoint = `/${
                    rootState.localization.current_locale
                }/search-surgery/${URL_.search.toString()}`;
            }

            try {
                commit("setData", { key: "loading", value: true });
                const res = await axios.get(endpoint);
                commit("setData", { key: "results", value: res.data });

                if (
                    !res.data.data.items.length &&
                    res.data.data.default_country_id !==
                        rootState.geo.current_country.id
                ) {
                    const URL_ = new URL(
                        `${rootState.core.base_url}/${endpoint}`
                    );
                    const defaultCountry =
                        rootState.geo.supported_countries.find(
                            (c) => c.id === res.data.data.default_country_id
                        );
                    URL_.searchParams.set("country", defaultCountry.code);

                    endpoint = `/search-surgery/${URL_.search.toString()}`;

                    const subRes = await axios.get(endpoint);
                    commit("setData", {
                        key: "subResults",
                        value: subRes.data,
                    });
                }
                return query;
            } catch (err) {
            } finally {
                commit("setData", { key: "loading", value: false });
            }
        },

        async fetchArticles({ commit, rootState }, id = "") {
            let endpoint = `/${rootState.localization.current_locale}/get-posts-by-category`;
            if (id) endpoint += `/${id}`;

            try {
                commit("setData", { key: "subLoading", value: true });
                const res = await axios.get(endpoint);
                commit("setData", { key: "articles", value: res.data });
            } catch (err) {
            } finally {
                commit("setData", { key: "subLoading", value: false });
            }
        },

        async searchInsurances({ commit, rootState }, name = "") {
            let endpoint = `/${rootState.localization.current_locale}/list-insurances`;
            if (name) endpoint += `?name=${name}`;

            try {
                commit("setData", { key: "searchFormLoading", value: true });
                const res = await axios.get(endpoint);
                commit("setData", { key: "insurances", value: res.data });
            } catch (err) {
            } finally {
                commit("setData", { key: "searchFormLoading", value: false });
            }
        },

        async fetchFilters({ commit, rootState }) {
            try {
                commit("setData", { key: "filtersLoading", value: true });
                const getCities = () =>
                    axios.get(
                        `/${rootState.localization.current_locale}/list-cities`
                    );
                const getStates = () =>
                    axios.get(
                        `/${rootState.localization.current_locale}/list-stats`
                    );
                const getSpokenLanguages = () =>
                    axios.get(
                        `/${rootState.localization.current_locale}/list-spokenLanguages`
                    );
                const getInsurances = () =>
                    axios.get(
                        `/${rootState.localization.current_locale}/list-insurances`
                    );

                const [cities, states, spokenLanguages, insurances] =
                    await Promise.all([
                        getCities(),
                        getStates(),
                        getSpokenLanguages(),
                        getInsurances(),
                    ]);

                commit("setData", { key: "cities", value: cities.data });
                commit("setData", { key: "states", value: states.data });
                commit("setData", {
                    key: "spokenLanguages",
                    value: spokenLanguages.data,
                });
                commit("setData", {
                    key: "insurances",
                    value: insurances.data,
                });
            } catch (err) {
            } finally {
                commit("setData", { key: "filtersLoading", value: false });
            }
        },
    },
};

export default search;
