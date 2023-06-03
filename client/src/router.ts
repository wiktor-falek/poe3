import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import Signin from "./views/Signin.vue";
import Select from "./views/Select.vue";
import Creation from "./views/Creation.vue";
import Verified from "./views/Verified.vue";
import Recovery from "./views/Recovery.vue";
import Game from "./views/Game.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        skipAuth: true,
      },
    },
    {
      path: "/signin",
      name: "signin",
      component: Signin,
      meta: {
        skipAuth: true,
      },
    },
    {
      path: "/verified",
      name: "verified",
      component: Verified,
      meta: {
        skipAuth: true,
      },
    },
    {
      path: "/recovery",
      name: "recovery",
      component: Recovery,
      meta: {
        skipAuth: true,
      },
    },
    { path: "/select", name: "select", component: Select },
    { path: "/creation", name: "creation", component: Creation },
    { path: "/game", name: "game", component: Game },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.skipAuth === true) {
    return next();
  }

  if (localStorage.getItem("authenticated") === "true") {
    return next();
  }

  next({ name: "signin" });
});

export default router;