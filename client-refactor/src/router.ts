import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import Signin from "./views/Signin.vue";
import Play from "./views/Play.vue";
import Creation from "./views/Creation.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: Home },
    { path: "/signin", name: "signin", component: Signin },
    { path: "/play", name: "play", component: Play },
    { path: "/creation", name: "creation", component: Creation },
  ],
});

export default router;
