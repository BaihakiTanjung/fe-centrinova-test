import { createRouter, createWebHistory } from "vue-router";
import Cookie from "js-cookie";
import axios from "axios";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Public Children

    {
      path: "/",
      name: "guest",
      component: () => import("../layouts/GuestLayout.vue"),
      children: [
        {
          path: "/",
          name: "home",
          component: () => import("../views/IndexView.vue"),
        },
        {
          path: "/detail/:slug",
          name: "detail",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("../views/DetailView.vue"),
        },
      ],
    },

    // Admin Children
    {
      path: "/admin",
      name: "admin",
      component: () => import("../layouts/AdminLayout.vue"),
      children: [
        {
          path: "",
          name: "admin-home",
          component: () => import("../views/admin/IndexView.vue"),
        },
        {
          path: "profile",
          name: "profile",
          component: () => import("../views/admin/ProfileView.vue"),
        },
      ],
    },

    // Blank
    {
      path: "/login",
      name: "login",
      component: () => import("../views/admin/LoginView.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const token = Cookie.get("auth.token");

  if (to.name === "login" && token) {
    next({ name: "admin-home" });
  } else if (
    to.name !== "login" &&
    to.name !== "home" &&
    to.name !== "detail" &&
    !token
  ) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
