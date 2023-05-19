import { useUserStore } from "./stores/userStore";
import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import Signin from "./views/Signin.vue";
import Play from "./views/Play.vue";
import Creation from "./views/Creation.vue";

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
    { path: "/play", name: "play", component: Play },
    { path: "/creation", name: "creation", component: Creation },
  ],
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();

  if (to.meta.skipAuth === true) {
    return next();
  }

  if (userStore.authenticated) {
    return next();
  }

  next({ name: "signin" });
});

export default router;
