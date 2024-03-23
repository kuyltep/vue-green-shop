import { createStore } from "vuex";
import loginAndRegister from "@/store/loginAndRegisterWindows";
import user from "./user";
import getData from "./getData";
import addresses from "./addresses";
import products from "./products";
import wishlist from "./wishlist";
import coupones from "./coupones";
import shoppingCart from "./shopping-cart";
import orders from "./orders";
import productComments from "./product-comments";
export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    loginAndRegister,
    user,
    getData,
    addresses,
    products,
    wishlist,
    coupones,
    shoppingCart,
    orders,
    productComments,
  },
});
