import axios from "axios";
import errorToast from "@/toasts-plugins/error.tost";
import successToast from "@/toasts-plugins/success.tost";
const TOKEN =
  "65fbc48f91e6fad2c6806677e026be23cdbb5eacb3753420b62e807f5ba98adc805202028152755f00a897ee50560cbd99fab50303b58cb15ddcc860190f455869137455ca265277da6755acffce976370b190ecc4a2d7f5dcae415153c3849b9cb68bb68fd4155ff67bb30efa3433aa8d04b49f40733ee0d9085fb4adc47e6c";
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
      return state.jwt;
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
    updateData({ commit }, { userId }) {
      axios
        .get("http://localhost:1337/api/users/" + userId, {
          headers: {
            Authorization: "Bearer " + TOKEN,
          },
        })
        .then((response) => {
          window.localStorage.setItem(
            "userData",
            JSON.stringify(response.data)
          );
          commit("updateUser", response.data);
        })
        .catch((error) => {
          commit("setError", error);
          // throw error;
        });
    },
  },
};
