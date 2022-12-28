<template>
  <div>
    <header-v2
      :page="page"
      @opensidemenu="openSideMenu"
      @scroll="(selector) => scrollTo(selector)"
      @sort="(data) => $emit('sort', data)"
      @opensidebar="$emit('opensidebar')"
    />

    <slot></slot>

    <footer-v2 :page="page" :specialties="specialties" />

    <side-menu
      :page="page"
      :show="sideMenuIsActive"
      @close="sideMenuIsActive = false"
      @scroll="(selector) => scrollTo(selector)"
    />
    <scroll-to-top />
    <process-modal />
    <message-modal />
    <join-modal />
    <full-loader />

    <login-modal />

    <div class="widget-wrapper flex items-center gap-4 fixed bottom-0">
      <!-- <chat-widget v-if="!authPage" /> -->
      <!-- <help-widget v-if="!authPage" /> -->
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import Cookies from "js-cookie";
import HeaderV2 from "@components/common/HeaderV2.vue";
import FooterV2 from "@components/common/FooterV2.vue";
import SideMenu from "@components/common/SideMenu.vue";
import FullLoader from "@components/base/FullLoader.vue";

export default {
  components: {
    HeaderV2,
    FooterV2,
    SideMenu,
    FullLoader,
    ScrollToTop: defineAsyncComponent(() =>
      import("@components/common/ScrollToTop.vue")
    ),
    ProcessModal: defineAsyncComponent(() =>
      import("@components/modal/ProcessModal.vue")
    ),
    MessageModal: defineAsyncComponent(() =>
      import("@components/modal/MessageModal.vue")
    ),
    CountryModal: defineAsyncComponent(() =>
      import("@components/modal/CountryModal.vue")
    ),
    // ChatWidget: defineAsyncComponent(() =>
    //   import("@components/base/Chat/ChatWidget.vue")
    // ),
    CookiePolicy: defineAsyncComponent(() =>
      import("@components/common/CookiePolicy.vue")
    ),
    HelpWidget: defineAsyncComponent(() =>
      import("@components/common/HelpWidget.vue")
    ),
    JoinModal: defineAsyncComponent(() =>
      import("@components/modal/JoinModal.vue")
    ),
    LoginModal: defineAsyncComponent(() =>
      import("@components/modal/LoginModal.vue")
    ),
  },

  emits: ["sort", "opensidebar"],

  props: {
    page: String,
    version: Number,
    loading: Boolean,
    specialties: {
      type: Array,
      default: () => [],
    },
    message: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    authPage() {
      return false;
    },
  },

  data() {
    return {
      sideMenuIsActive: false,
    };
  },

  created() {
    // this.$store.dispatch("updatePagePropsData", {
    //   specialties: [
    //     { id: 0, name: "Dental ( Teeth )", slug: "Dental-(-Teeth-)" },
    //     { id: 1, name: "General Surgery", slug: "General-Surgery" },
    //     { id: 2, name: "Orthopedic ( Bone )", slug: "Orthopedic-(-Bone-)" },
    //     {
    //       id: 3,
    //       name: "Plastic ( Cosmetology )",
    //       slug: "Plastic-(-Cosmetology-)",
    //     },
    //     { id: 4, name: "Bariatric Surgery", slug: "Bariatric-Surgery" },
    //   ],
    //   counter: {
    //     hospitals_and_centers_count: "70",
    //     surgeon_and_doctor_count: "1300",
    //     operation_count: "3500",
    //     medical_specialty_count: "30",
    //   },
    //   reviews: [],
    // });
  },

  mounted() {
    this.setUTMLocal();

    this.$gtag.pageview({
      page_path: this.$store.state.core.current_url,
    });

    this.$store.dispatch("core/gtagEvent", {
      event: "gtm.load",
    });

    // this.$vfm.show("country");
    this.$store.dispatch("core/$identifyUserForHotjar");
  },

  methods: {
    openSideMenu() {
      this.sideMenuIsActive = true;
    },

    scrollTo(selector) {
      if (typeof document === "undefined") {
        return;
      }

      const el = document.querySelector(selector);
      if (el) {
        this.sideMenuIsActive = false;
        el.scrollIntoView({
          behavior: "smooth",
        });
      }
    },

    activateRequestHelpModal(timer = 60000) {
      if (!document) {
        return;
      }

      const requiredPages = ["surgery", "search"];

      if (requiredPages.includes(this.page)) {
        setTimeout(() => {
          this.$vfm.show("request-help");
        }, timer);
      }
    },

    setUTMLocal() {
      const utm = this.$store.getters["core/getMatchedParams"](
        this.$route.params
      )("utm_");
      const isValidUTM = this.$store.getters["core/validUTM"](utm);

      if (isValidUTM) {
        Cookies.set("utm", JSON.stringify(utm), {
          expires: 1,
        });
        return true;
      }
      return false;
    },
  },

  watch: {
    loading(newVal) {
      if (newVal === false) {
        const cookie = Cookies.get("request-help-modal-mounted-page");

        if (cookie && cookie === this.page) {
          return;
        }

        this.activateRequestHelpModal();
        Cookies.set("request-help-modal-mounted-page", this.page, {
          expires: 1,
        });
      }
    },
  },
};
</script>
