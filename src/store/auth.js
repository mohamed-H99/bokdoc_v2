const auth = {
    namespaced: true,

    state: () => ({
        check_auth: false,
        user_auth: null,
        patient: null,
    }),

    mutations: {
        setData(state, payload) {
            const keys = ["check_auth", "user_auth", "patient"];

            keys.forEach((key) => {
                state[key] = payload[key];
            });
        },
    },
};

export default auth;
