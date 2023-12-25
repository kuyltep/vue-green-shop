import axios from "axios";
import errorToast from "@/toasts-plugins/error.tost";
import successToast from "@/toasts-plugins/success.tost";
export default {
  state: {
    user: null,
    jwt: null,
    error: null,
  },
  getters: {
    getError(state) {
      return state.error;
    },
    getUser(state) {
      return state.user;
    },
    getJwt(state) {
      return state.user;
    },
  },
  mutations: {
    updateUser(state, user) {
      state.user = user;
    },
    updateJwt(state, jwt) {
      state.jwt = jwt;
    },
    setError(state, error) {
      state.error = error;
    },
  },
  actions: {
    registerUser({ commit }, { userUsername, userEmail, userPassword }) {
      axios
        .post("http://localhost:1337/api/auth/local/register", {
          username: userUsername,
          email: userEmail,
          password: userPassword,
        })
        .then((response) => {
          commit("changeShow");
          successToast("Success register");
        })
        .catch((error) => {
          errorToast("User already exists");
          commit("setError", error);
        });
    },
    loginUser({ commit }, { userEmail, userPassword }) {
      axios
        .post("http://localhost:1337/api/auth/local", {
          identifier: userEmail,
          password: userPassword,
        })
        .then((response) => {
          const { jwt, user } = response.data;
          window.localStorage.setItem("jwt", jwt);
          window.localStorage.setItem("userData", JSON.stringify(user));
          commit("updateUser", user);
          commit("updateJwt", jwt);
          successToast("Success login");
          commit("closeLoginMenu");
        })
        .catch((error) => {
          errorToast("Invalid user");
          commit("setError", error);
          // throw error;
        });
    },
    logoutUser({ commit }) {
      window.localStorage.removeItem("jwt");
      window.localStorage.removeItem("userData");
      commit("updateUser", null);
      commit("updateJwt", null);
    },
  },
};
