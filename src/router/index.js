import { createRouter, createWebHistory } from "vue-router";
const routes = [
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
  {
    path: "/",
    name: "home",
    meta: { layout: "shop-layout" },
    component: () => import("@/views/HomePage"),
  },
  {
    path: "/profile",
    name: "profile",
    meta: { layout: "profile-layout" },
    component: () => import("@/views/ProfilePage"),
  },
  {
    path: "/shop",
    name: "shop",
    meta: { layout: "shop-layout" },
    component: () => import("@/views/ShopPage.vue"),
  },
  {
    path: "/plant-care",
    name: "plant-care",
    meta: { layout: "shop-layout" },
    component: () => import("@/views/ShopPage.vue"),
  },
  {
    path: "/blogs",
    name: "blogs",
    meta: { layout: "shop-layout" },
    component: () => import("@/views/ShopPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
