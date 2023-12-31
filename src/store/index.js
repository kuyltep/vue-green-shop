import { createStore } from "vuex";
import loginAndRegister from "@/store/loginAndRegisterWindows";
import user from "./user";
import getData from "./getData";
import addresses from "./addresses";

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
  },
});
