import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import Signin from "./views/Signin.vue";
import Play from "./views/Play.vue";
import Creation from "./views/Creation.vue";
import Verified from "./views/Verified.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: Home },
    { path: "/signin", name: "signin", component: Signin },
    { path: "/verified", name: "verified", component: Verified },
    { path: "/play", name: "play", component: Play },
    { path: "/creation", name: "creation", component: Creation },
  ],
});

export default router;
