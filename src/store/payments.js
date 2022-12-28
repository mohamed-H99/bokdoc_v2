const payments = {
    namespaced: true,

    state: () => ({
        current_currency: "",
        current_currency_name: "",
        current_currency_symbol: "",
        current_currency_icon: "",
        supported_currencies: "",
    }),

    getters: {
        switchCurrencyUrl:
            (state, getters, rootState) =>
            (currency = null) => {
                const url_ = rootState.core.current_url;
                const URL_ = new URL(url_);

                URL_.searchParams.set("currency", currency);

                return URL_.toString();
            },
    },

    mutations: {
        setData(state, payload) {
            const keys = [
                "current_currency",
                "current_currency_name",
                "current_currency_symbol",
                "current_currency_icon",
                "supported_currencies",
            ];

            keys.forEach((key) => {
                state[key] = payload[key];
            });
        },
        setCurrency(state, payload) {
            state.current_currency = payload.code;
            state.current_currency_name = payload.name;
            state.current_currency_symbol = payload.symbol;
        },
    },

    actions: {},
};

export default payments;
