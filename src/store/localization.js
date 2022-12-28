import { format } from "date-fns";
import { ar } from "date-fns/locale";
import i18n from "../i18n";

const localization = {
  namespaced: true,

  state: () => ({
    current_locale: "",
    current_locale_dir: "",
    current_locale_name: "",
    current_locale_native: "",
    supported_locales: [],
  }),

  getters: {
    getLocalizedUrl: (state, rootState) => (locale) => {
      const supported = Object.keys(state.supported_locales);

      let locale_ = !!locale ? locale : state.current_locale;
      let url_ = rootState.core.current_url;

      if (supported.indexOf(locale_) === -1) {
        return "";
      }

      for (const code of supported) {
        url_ = url_.replace(`/${code}`, `/${locale_}`);
      }

      return url_;
    },
    isValidDate: () => (value) => {
      return value instanceof Date && !isNaN(value);
    },
    formatDate:
      (state, getters) =>
      (date, dateFormat = "") => {
        if (!date) {
          return "";
        }
        if (!dateFormat) {
          dateFormat = "EEEE: dd/M h:mm aaa";
        }

        const d = new Date(date);

        if (getters["isValidDate"](d)) {
          return date;
        }

        switch (state.current_locale) {
          case "ar":
            return format(d, dateFormat, {
              locale: ar,
            });
          default:
            return format(d, dateFormat);
        }
      },
  },

  mutations: {
    setData(state, payload) {
      const keys = [
        "current_locale",
        "current_locale_dir",
        "current_locale_name",
        "current_locale_native",
        "supported_locales",
      ];

      keys.forEach((key) => {
        if (key === "current_locale") {
          i18n.global.locale = payload[key];
        }
        state[key] = payload[key];
      });
    },
    setLocale(state, payload) {
      state.current_locale = payload.code;
      i18n.global.locale = payload.code;
      state.current_locale_dir =
        payload.dir || (payload.code === "ar" ? "rtl" : "ltr");
      state.current_locale_name = payload.name;
      state.current_locale_native = payload.native;
    },
  },

  actions: {
    appChangeLocale({ state, commit, dispatch }, localeCode) {
      const obj = state.supported_locales
        ? state.supported_locales[localeCode]
        : {
            code: "ar",
            name: "Arabic",
            native: "العربية",
            dir: "rtl",
          };

      if (typeof obj !== "undefined") {
        dispatch("setHtmlTagLocale", obj);
        commit("setLocale", obj);
      }
    },
    setHtmlTagLocale(context, locale) {
      if (typeof document === "undefined") {
        return;
      }

      const $html = document.querySelector("html");
      const dir = locale.dir || (locale.code === "ar" ? "rtl" : "ltr");

      $html.dir = dir;
      $html.lang = locale.code;

      if (dir === "rtl") {
        $html.classList.add(`dir-rtl`);
      } else {
        $html.classList.remove(`dir-rtl`);
      }
    },
  },
};

export default localization;
