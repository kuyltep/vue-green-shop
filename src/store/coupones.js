import axios from "axios";

export default {
  state: {
    coupones: {},
  },
  getters: {
    getCoupones(state) {
      return state.coupones;
    },
  },
  mutations: {
    setCoupones(state, coupones) {
      state.coupones = coupones;
    },
  },
  actions: {
    async getCoupones({ commit }) {
      axios
        .get("http://localhost:1337/api/coupones")
        .then((response) => {
          const coupones = response.data.data[0].attributes.coupones;
          commit("setCoupones", coupones);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
