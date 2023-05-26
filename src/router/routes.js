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
        component: () => import("pages/WatchablesFeedPage.vue"),
        props: { title: "Movies", to: "movie" },
      },
      {
        path: "series",
        component: () => import("pages/WatchablesFeedPage.vue"),
        props: { title: "Series", to: "series" },
      },
      {
        path: "watchable/:id",
        component: () => import("pages/SingleWatchablePage.vue"),
      },
      {
        path: "about",
        component: () => import("pages/AboutPage.vue"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
