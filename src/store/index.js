import { createStore } from "vuex";
import loginAndRegister from "@/store/loginAndRegisterWindows";
import user from "./user";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    loginAndRegister,
    user,
  },
});
