import { createRouter, createWebHashHistory } from "vue-router";
import V2 from "@pages/LandingPage/V2.vue";

const routes = [
  {
    path: "/",
    component: V2,
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

export default router;
