import { authGuard } from "@auth0/auth0-vue";

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        redirect: "/movies",
      },
      {
        path: "movies",
        component: () => import("src/pages/FeedPage.vue"),
        name: "movies",
        beforeEnter: authGuard,
      },
      {
        path: "series",
        component: () => import("src/pages/FeedPage.vue"),
        name: "series",
        beforeEnter: authGuard,
      },
      {
        path: "movie/:id",
        component: () => import("pages/SingleWatchablePage.vue"),
        name: "movie",
        beforeEnter: authGuard,
      },
      {
        path: "series/:id",
        component: () => import("pages/SingleSeriesPage.vue"),
        name: "single-series",
        beforeEnter: authGuard,
      },
      {
        path: "episode/:id",
        component: () => import("pages/SingleWatchablePage.vue"),
        name: "episode",
        beforeEnter: authGuard,
      },
      {
        path: "about",
        component: () => import("pages/AboutPage.vue"),
        beforeEnter: authGuard,
      },
    ],
  },
  {
    name: "error",
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
    beforeEnter: authGuard,
  },
];

export default routes;
