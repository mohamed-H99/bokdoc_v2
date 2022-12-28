import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";

// plugins
import VueGtag from "vue-gtag";
import VueLazyLoad from "vue3-lazyload";
import i18n from "./i18n";

// components
import CompBtn from "./components/base/CompBtn.vue";
// import LottieAnimation from "lottie-web-vue";
import VueSocialSharing from "vue-social-sharing";
import { plugin as VueTippy, Tippy } from "vue-tippy";

// styles
import "tippy.js/dist/tippy.css";
import "vue3-carousel/dist/carousel.css";
import "vue-select/dist/vue-select.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

import "./assets/css/app.css";

const app = createApp(App)
  .use(store)
  .use(router)
  .use(VueGtag, {
    pageTrackerScreenviewEnabled: true,
    pageTrackerTemplate(to) {
      return {
        page_path: to.path,
      };
    },
    config: {
      id: "UA-133755090-1", // () => axios.get("")
    },
  })
  .use(VueLazyLoad)
  .use(i18n)
  // .use(LottieAnimation)
  .use(VueSocialSharing, {
    networks: {},
  })
  .use(VueTippy, {
    directive: "tippy",
    component: "tippy",
    componentSingleton: "tippy-singleton",
    defaultProps: {
      placement: "auto-end",
      allowHTML: true,
    },
  })
  .mixin({
    components: {
      CompBtn,
      Tippy,
    },
  })
  .mount("#app");
