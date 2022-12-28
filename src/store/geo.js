const geo = {
    namespaced: true,

    state: () => ({
        current_country: {},
        current_country_name: "",
        current_country_code: "",
        current_country_icon: "",
        supported_countries: [],
        supported_countries_ids: [],
    }),

    getters: {
        switchCountryUrl:
            (state, getters, rootState) =>
            (country = null) => {
                const url_ = rootState.core.current_url;
                const URL_ = new URL(url_);
                URL_.searchParams.set("country", country);
                return URL_.toString();
            },
    },

    mutations: {
        setData(state, payload) {
            const keys = [
                "current_country",
                "current_country_name",
                "current_country_code",
                "current_country_icon",
                "supported_countries",
                "supported_countries_ids",
            ];

            keys.forEach((key) => {
                state[key] = payload[key];
            });
        },
    },

    actions: {},
};

export default geo;
