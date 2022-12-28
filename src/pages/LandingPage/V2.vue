<template>
  <default page="home" :version="2" :specialties="[]">
    <hero-v2 :specialties="specialties" :currentUser="currentUser" />

    <surgeries-v2
      id="first"
      :title="`${'Bariatric Surgery'}, ${$t('Spend Less')}`"
      :subtitle="'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore...'"
      :items="[]"
      style="--sectionBgColor: #f6f6f6"
    />

    <surgeries-v2
      id="second"
      :title="'General Surgery'"
      :subtitle="'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore...'"
      :items="[]"
      :cardVersion="2"
    />

    <doctors-v2
      id="third"
      class="!pt-0"
      :title="'Ear, Nose and Throat'"
      :subtitle="'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore...'"
      :items="[]"
    />

    <services-v2 id="fourth" :items="[]" />

    <steps-v2 />

    <help-v2 />

    <stats-v2 :data="counter" />

    <auth-v2 v-if="!$store.state.auth.user_auth" />

    <installment-v2 />

    <chat-v2 />

    <partners-v2 />

    <join-v2 />

    <mobile-app-v2 />

    <news-letter-v2 />

    <!-- Shared::modals -->
    <services-modal :showLogo="true" />
  </default>
</template>

<script>
import { defineAsyncComponent } from "vue";
import Default from "../../layouts/Default.vue";
import HeroV2 from "./Partials/HeroV2.vue";
import SurgeriesV2 from "./Partials/SurgeriesV2.vue";
import ServicesV2 from "./Partials/ServicesV2.vue";
import StepsV2 from "./Partials/StepsV2.vue";
import HelpV2 from "./Partials/HelpV2.vue";
import StatsV2 from "./Partials/StatsV2.vue";
import AuthV2 from "./Partials/AuthV2.vue";
import DoctorsV2 from "./Partials/DoctorsV2.vue";
import InstallmentV2 from "./Partials/InstallmentV2.vue";
import ChatV2 from "./Partials/ChatV2.vue";
import PartnersV2 from "./Partials/PartnersV2.vue";
import JoinV2 from "./Partials/JoinV2.vue";
import MobileAppV2 from "./Partials/MobileAppV2.vue";
import NewsLetterV2 from "./Partials/NewsLetterV2.vue";
import Cookies from "js-cookie";

export default {
  components: {
    Default,
    HeroV2,
    SurgeriesV2,
    ServicesV2,
    StepsV2,
    HelpV2,
    StatsV2,
    DoctorsV2,
    AuthV2,
    InstallmentV2,
    ChatV2,
    PartnersV2,
    JoinV2,
    MobileAppV2,
    NewsLetterV2,
    ReportModal: defineAsyncComponent(() =>
      import("../../components/modal/ReportModal.vue")
    ),
    ServicesModal: defineAsyncComponent(() =>
      import("./Partials/ServicesModal.vue")
    ),
  },

  props: {
    errors: {
      type: Object,
      default: () => ({}),
    },
    currentUser: {
      type: Object,
      default: () => ({}),
    },
    specialties: {
      type: Array,
      default: () => [],
    },
    counter: {
      type: Object,
      default: () => ({}),
    },
    states: {
      type: Array,
      default: [],
    },
    reviews: {
      type: Array,
      default: [],
    },
  },

  data() {
    return {
      loading: false,
      counterInView: false,
      doctorsInPopularCities: [],
      allCities: [],
    };
  },

  methods: {
    mountPageData() {
      //   this.$inertia.reload({
      //     only: ["specialties", "counter", "reviews"],
      //     onStart: () => {
      //       this.loading = true;
      //       this.mainLoading = true;
      //     },
      //     onSuccess: () => {
      //       this.loading = false;
      //       this.mainLoading = false;
      //     },
      //     onError: () => {
      //       this.loading = false;
      //       this.mainLoading = false;
      //     },
      //     onCancel: () => {
      //       this.loading = false;
      //       this.mainLoading = false;
      //     },
      //   });
    },

    scrollTo(selector) {
      if (typeof document === "undefined") {
        return;
      }

      this.$vfm.hide("services");

      const el = document.querySelector(selector);
      if (el) {
        setTimeout(() => {
          // window.scrollTo(0, el.offsetHeight);
          el.scrollIntoView({
            behavior: "smooth",
          });
        }, 3000);
      }
    },

    getCities() {
      this.states.forEach((alias) => {
        const title = alias.name;
        const items = [];
        alias.cities.forEach((city) => {
          items.push({
            id: city.id,
            title: `${this.$t("Doctors in")} ${city.name}`,
            link: `/search?city=${city.name}`,
          });
        });

        this.doctorsInPopularCities.push({
          id: alias.id,
          title,
          items,
        });
      });
    },

    handleScrollToCookie() {
      const key = "scrollTo";
      const el = Cookies.get(key);
      if (el) {
        this.scrollTo(el);

        setTimeout(() => {
          Cookies.remove(key);
        }, 1000);
      }
    },
  },

  mounted() {
    this.mountPageData();
    this.getCities();

    this.handleScrollToCookie();
  },
};
</script>
