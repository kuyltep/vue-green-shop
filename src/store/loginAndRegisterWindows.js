import axios from "axios";
export default {
  state() {
    return {
      isLoginShow: true,
      isRegisterShow: false,
      isLoginMenuOpen: false,
    };
  },
  getters: {
    getLoginShow(state) {
      return state.isLoginShow;
    },
    getRegisterShow(state) {
      return state.isRegisterShow;
    },
    getLoginMenuOpen(state) {
      return state.isLoginMenuOpen;
    },
  },
  mutations: {
    changeShow(state) {
      state.isLoginShow = !state.isLoginShow;
      state.isRegisterShow = !state.isRegisterShow;
    },
    closeLoginMenu(state) {
      state.isLoginMenuOpen = false;
    },
    showLoginMenu(state) {
      state.isLoginMenuOpen = true;
    },
  },
  actions: {},
};
