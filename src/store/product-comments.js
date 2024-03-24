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
        .get("http://localhost:1337/api/product-comments?populate=*")
        .then((response) => {
          console.log(response.data.data);
          const currentProductComments = response.data.data.filter(
            (comment) => {
              return comment.attributes.product.data.id == id;
            }
          );
          commit("setProductComments", currentProductComments);
          console.log(currentProductComments);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    createProductCommentToServer({ dispatch, getters }, commentData) {
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
              connect: [getters.getUser.id],
            },
          },
          headers: {
            Authorization: `Bearer ${getters.getJwt}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response);
          dispatch("getProductCommentsFromServer", {
            id: commentData.productId,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
