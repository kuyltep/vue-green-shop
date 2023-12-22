import axios from "axios";
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
        })
        .catch((error) => {
          commit("setError", error);
          throw error;
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
          commit("closeLoginMenu");
        })
        .catch((error) => {
          commit("setError", error);
          throw error;
        });
    },
    loginWithGoogle({ commit }) {
      document.location.href = "http://localhost:1337/api/connect/google";
    },
    loginWithFacebook({ commit }) {},
  },
};
