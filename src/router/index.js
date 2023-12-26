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
    children: [
      {
        path: "details",
        name: "details",
        component: () => import("@/views/ProfilePages/ProfileDetails"),
      },
      {
        path: "address",
        name: "address",
        component: () => import("@/views/ProfilePages/ProfileAddress"),
      },
      {
        path: "downloads",
        name: "downloads",
        component: () => import("@/views/ProfilePages/ProfileDownloads"),
      },
      {
        path: "orders",
        name: "orders",
        component: () => import("@/views/ProfilePages/ProfileOrders"),
      },
      {
        path: "reports",
        name: "reports",
        component: () => import("@/views/ProfilePages/ProfileReports"),
      },
      {
        path: "support",
        name: "support",
        component: () => import("@/views/ProfilePages/ProfileSupport"),
      },
      {
        path: "wishlist",
        name: "wishlist",
        component: () => import("@/views/ProfilePages/ProfileWishlist"),
      },
    ],
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
    component: () => import("@/views/PlantCarePage.vue"),
  },
  {
    path: "/blogs",
    name: "blogs",
    meta: { layout: "shop-layout" },
    component: () => import("@/views/BlogsPage.vue"),
  },
  {
    path: "/connect/:providerName/redirect",
    meta: { layout: "empty-layout" },
    component: () => import("@/views/ProvidersPages/RedirectingPage.vue"),
  },
  {
    path: "/forgot-user-password",
    meta: { layout: "empty-layout" },
    component: () => import("@/views/ProvidersPages/ForgotPasswordPage.vue"),
  },
  {
    path: "/reset-user-password",
    meta: { layout: "empty-layout" },
    component: () => import("@/views/ProvidersPages/ResetPasswordPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
