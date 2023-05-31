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
        component: () => import("src/pages/MoviesPage.vue"),
        props: { title: "Movies", to: "movie" },
        beforeEnter: authGuard,
      },
      {
        path: "series",
        component: () => import("src/pages/SeriesPage.vue"),
        props: { title: "Series", to: "series" },
        beforeEnter: authGuard,
      },
      {
        path: "watchable/:id",
        component: () => import("pages/SingleWatchablePage.vue"),
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
    name: 'error',
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
    beforeEnter: authGuard,
  },
];

export default routes;
