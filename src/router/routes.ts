import type { RouteRecordRaw } from "vue-router";

export const routes = [
  {
    path: "/",
    name: "Layout",
    component: () => import("../layouts/Layout.vue"),
    meta: { title: "Base" },
    children: [
      {
        path: "",
        name: "HomeView",
        component: () => import("../views/HomeView.vue"),
        meta: { title: "Home" },
      },
      {
        path: "list",
        name: "ListView",
        component: () => import("../views/ListView.vue"),
        meta: { title: "List" },
      },
      {
        path: "about",
        name: "AboutView",
        component: () => import("../views/AboutView.vue"),
        meta: { title: "About" },
      },
      {
        path: "setting",
        name: "SettingsView",
        component: () => import("../views/SettingsView.vue"),
        meta: { title: "Settings" },
      },
    ],
  },
] as RouteRecordRaw[];
