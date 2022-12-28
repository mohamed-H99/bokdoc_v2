import { createStore } from "vuex";
import core from "./core";
import geo from "./geo";
import localization from "./localization";
import payments from "./payments";
import auth from "./auth";
// import chat from "./chat";
import search from "./search";
import i18n from "../i18n";

const store = createStore({
  state() {
    return {};
  },

  actions: {
    async updatePagePropsData({ commit, dispatch }, payload) {
      if (typeof payload !== "undefined") {
        commit("localization/setData", payload);
        dispatch(
          "localization/appChangeLocale",
          payload["current_locale"] || {}
        );
        commit("core/setData", payload);
        commit("auth/setData", payload);
        commit("geo/setData", payload);
        commit("payments/setData", payload);
      }
    },

    translate(context, key) {
      return key ? i18n.global.t(key) : "";
    },
  },

  modules: {
    core,
    geo,
    localization,
    payments,
    auth,
    // chat,
    search,
  },
});

export default store;
