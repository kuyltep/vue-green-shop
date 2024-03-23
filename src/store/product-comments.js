import errorTost from "@/toasts-plugins/error.tost";
import axios from "axios";

export default {
  state: {
    productComments: [],
  },
  getters: {
    getProductComments(state) {
      return state.productComments;
    },
  },
  mutations: {
    setProductComments(state, productComments) {
      state.productComments = productComments;
    },
  },
  actions: {
    getProductCommentsFromServer({ commit, gettters }, { id }) {
      axios
        .get("http://localhost:1337/api/product-comments")
        .then((response) => {
          console.log(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    createProductCommentToServer({ dispatch }, commentData) {
      if (!this.getters.getUser.id) {
        return errorTost("User must be autorized to create comments");
      }
      axios
        .post("http://localhost:1337/api/product-comments", {
          data: {
            comment: commentData.comment,
            raiting: commentData.raiting,
            product: {
              connect: [commentData.productId],
            },
            user: {
              connect: [commentData.userId],
            },
          },
          headers: {
            Authorization: `Bearer ${getters.getJwt}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
