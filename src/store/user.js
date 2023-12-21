import axios from "axios";
export default {
  state: {
    userInfo: {},
    error: null,
  },
  getters: {
    getError(state) {
      return state.error;
    },
    getUserInfo(state) {
      return state.userInfo;
    },
  },
  mutations: {
    updateUserInfo(state, userInfo) {
      state.userInfo = userInfo;
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
          const userInfo = {
            ...response.data.user,
            jwt: response.data.jwt,
          };
          commit("updateUserInfo", userInfo);
          commit("closeLoginMenu");
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
          const userInfo = {
            ...response.data.user,
            jwt: response.data.jwt,
          };
          commit("updateUserInfo", userInfo);
          commit("closeLoginMenu");
        })
        .catch((error) => {
          commit("setError", error);
          throw error;
        });
    },
  },
};
