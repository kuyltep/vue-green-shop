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
    name: "page",
    redirect: "/",
    component: () => import("@/layouts/ShopLayout"),
    children: [
      {
        path: "/",
        name: "home",
        component: () => import("@/views/HomePage"),
      },

      // {
      //   path:"/shop",
      //   name: "shop",
      //   component: () => import('@/views/ShopPage')
      // }
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
