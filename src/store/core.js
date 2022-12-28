import Cookies from "js-cookie";
import axios from "axios";

const core = {
    namespaced: true,

    state: () => ({
        site_name: "",
        base_url: "",
        current_url: "",
        logo: "",
        android_url: "",
        ios_url: "",
        android_url_patient: "",
        ios_url_patient: "",
        payments_logo: "",
        facebook_link: "",
        twitter_link: "",
        tiktok_link: "",
        youtube_link: "",
        snapchat_link: "",
        linktree_link: "",
        instagram_link: "",
        linked_in_link: "",
        contact_us_number: "",
        year: "",
        hj_initialized: false,
    }),

    getters: {
        avatarPlaceholder: (state) => (data) => {
            const type = data.type || "doctor";
            const gender = data.gender || "male";

            let result = "";
            const baseUrl = state.base_url;
            if (type === "hospital") {
                result = `${baseUrl}/images/hospital-placeholder.svg`;
            } else if (type === "doctor") {
                result =
                    gender === "male"
                        ? `${baseUrl}/images/doctor-placeholder.svg`
                        : `${baseUrl}/images/female-doctor-placeholder.svg`;
            } else if (type === "polyclinic") {
                result = `${baseUrl}/images/polyclinic-placeholder.svg`;
            } else if (type === "center") {
                result = `${baseUrl}/images/center-placeholder.svg`;
            } else if (type === "support") {
                result = `${baseUrl}/images/customer-support-placeholder.svg`;
            } else if (type === "support-lg") {
                result = `${baseUrl}/images/customer-support-placeholder@2x.svg`;
            } else if (type === "user") {
                result = `${baseUrl}/images/avatar-placeholder.svg`;
            } else {
                result = `${baseUrl}/images/doctor-placeholder.svg`;
            }

            return result;
        },
        checkMobileView: () => {
            return window && window.innerWidth < 768;
        },
        currentUrlContains: (state, getters, rootState) => (str) => {
            return rootState.core.current_url.indexOf(str) > -1;
        },
        getUrl:
            (state, getters, rootState) =>
            (url = null) =>
            (useCurrent = false) => {
                const base = useCurrent
                    ? rootState.core.current_url
                    : rootState.core.basr_url;

                if (useCurrent) {
                    return base.split("?").length > 1
                        ? `${base}&${url}`
                        : `${base}?${url}`;
                }

                return `${base}/${url}`;
            },
        getMatchedParams:
            () =>
            (params = null) =>
            (matchStr = "") => {
                if (!params) {
                    return null;
                }

                const result = {};
                Object.keys(params).forEach((key) => {
                    if (key.match(matchStr)) {
                        result[key] = params[key];
                    }
                });
                return result;
            },
        validUTM:
            () =>
            (params = null) => {
                if (!params) {
                    return false;
                }

                const requiredProps = [
                    "utm_source",
                    "utm_medium",
                    "utm_campaign",
                    // "utm_term",
                ];

                const keys = Object.keys(params);
                let counter = 0;

                requiredProps.forEach((prop) => {
                    if (keys.findIndex((key) => key === prop) !== -1) {
                        counter++;
                    }
                });

                return counter >= 3;
            },
        fixNumbers: () => (number) => {
            const persianNumbers = [
                    /۰/g,
                    /۱/g,
                    /۲/g,
                    /۳/g,
                    /۴/g,
                    /۵/g,
                    /۶/g,
                    /۷/g,
                    /۸/g,
                    /۹/g,
                ],
                arabicNumbers = [
                    /٠/g,
                    /١/g,
                    /٢/g,
                    /٣/g,
                    /٤/g,
                    /٥/g,
                    /٦/g,
                    /٧/g,
                    /٨/g,
                    /٩/g,
                ];

            if (typeof number === "string") {
                for (var i = 0; i < 10; i++) {
                    number = number
                        .replace(persianNumbers[i], i)
                        .replace(arabicNumbers[i], i);
                }
            }
            return number;
        },
        SSR: () => {
            return (
                typeof window === "undefined" && typeof document === "undefined"
            );
        },
        isBrowser: (state, getters) => {
            return getters["SSR"] === false;
        },
        freshLoad: () => {
            if (typeof sessionStorage === "undefined") {
                return true;
            }

            const res = sessionStorage.getItem("fresh_loaded");
            if (res) {
                return false;
            }

            sessionStorage.setItem("fresh_loaded", true);
            return true;
        },
    },

    mutations: {
        setData(state, payload) {
            const keys = [
                "site_name",
                "base_url",
                "current_url",
                "logo",
                "android_url",
                "ios_url",
                "android_url_patient",
                "ios_url_patient",
                "payments_logo",
                "facebook_link",
                "twitter_link",
                "tiktok_link",
                "youtube_link",
                "snapchat_link",
                "linktree_link",
                "instagram_link",
                "linked_in_link",
                "contact_us_number",
                "year",
            ];

            keys.forEach((key) => {
                if (key === "site_name") {
                    state[key] = payload[key] || "BokDoc";
                } else {
                    state[key] = payload[key];
                }
            });
        },

        setHjInitialized(state, payload) {
            state.hj_initialized = !!payload;
        },
    },

    actions: {
        gtagEvent({ rootState }, data) {
            if (typeof window.dataLayer !== "undefined") {
                dataLayer.push({
                    currency: rootState.payments.current_currency_symbol,
                    language: rootState.localization.current_locale_name,
                    country: rootState.geo.current_country,
                    ...data,
                });
            }
        },
        sendHelpRequest({ rootState, dispatch }, params = {}) {
            const data = {
                name: "",
                age: "",
                gender: "",
                user_id: "",
                phone: "",
                description: "",
                speciality: "",
                surgery: "",
                utm: null,
                type: "contact form",
                ...params,
            };

            const user = rootState.auth.user_auth;
            if (!!user) {
                data.name = user.name || "";
                data.age = user.age || "";
                data.gender = user.gender || "";
                data.user_id = user.id;
                data.phone = user.mobile_number || "";
            }

            const utm = JSON.parse(Cookies.get("utm") || "null");
            if (utm) {
                data.utm = utm;
            }

            return axios.post("/store/contact", data);
        },
        /**
         * Identify user for HotJar tracking.
         */
        $identifyUserForHotjar({ state, rootState, dispatch }) {
            if (state.hj_initialized) {
                return;
            }
            if (!rootState.auth.user_auth) {
                return;
            }

            const { id, name, email, mobile_number } = rootState.auth.user_auth;

            const user = {
                id: id || "",
                name: name || "",
                email: email || "",
                mobile_number: mobile_number || "",
            };

            if (!user.id) {
                return;
            }

            let interv = setInterval(() => {
                if (typeof window["hj"] !== "undefined") {
                    dispatch("$hj", "identify", user.id, user);
                    clearInterval(interv);
                }
            }, 500);
        },
        /**
         * Hotjar bridge global method.
         *
         * @param {*} action
         * @param {*} arg1
         * @param {*} arg2
         */
        $hj({ commit }, action, arg1 = null, arg2 = null) {
            const hj_ =
                typeof window["hj"] !== "undefined"
                    ? window["hj"]
                    : function () {
                          //   console.table(arguments);
                      };

            // console.log("VHJhY2tpbmcgdXNlcg==");
            hj_(action, arg1, arg2);
            commit("setHjInitialized", true);
        },
    },
};

export default core;
