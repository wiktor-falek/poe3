import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("../views/CharacterSelectionView.vue"),
    },
    {
      path: "/test",
      component: () => import("../views/TestView.vue")
    },
    {
      path: "/game/:characterId",
      component: () => import("../views/GameView.vue"),
    },

    {
      path: "/signin",
      name: "signin",
      component: () => import("../views/SigninView.vue"),
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("../views/SignupView.vue"),
    },
    {
      path: "/play",
      name: "landing",
      component: () => import("../views/LandingView.vue"),
    },
  ],
});

export default router;
