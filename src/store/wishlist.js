import axios from "axios";
export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    getUserWishlist({ commit, getters }) {
      axios
        .get(
          `http://localhost:1337/api/users/${getters.getUser.id}?populate=*`,
          {
            headers: {
              Authorization: "Bearer " + getters.getJwt,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
        });
    },
  },
};
