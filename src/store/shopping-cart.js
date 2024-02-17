import axios from "axios";
export default {
  state: {
    userShoppingCart: [],
    userShoppingCartIndexes: [],
    userShoppingCartProducts: [],
  },
  getters: {
    getterUserShoppingCart(state) {
      return state.userShoppingCart;
    },
    getterUserShoppingCartIndexes(state) {
      return state.userShoppingCartIndexes;
    },
    getterUserShoppingCartProducts(state) {
      return state.userShoppingCartProducts;
    },
  },
  mutations: {
    setUserShoppingCart(state, shoppingCart) {
      state.userShoppingCart = shoppingCart;
    },
    setUserShoppingCartIndexes(state, shoppingCartIndexes) {
      state.userShoppingCartIndexes = shoppingCartIndexes;
    },
    setUserShoppingCartProducts(state, shoppingCartProducts) {
      return (state.userShoppingCartProducts = shoppingCartProducts);
    },
  },
  actions: {
    getUserShoppingCart({ getters, commit, dispatch }, userId) {
      axios
        .get("http://localhost:1337/api/shopping-carts?populate=*", {
          headers: {
            Authorization: "Bearer " + getters.getJwt,
          },
        })
        .then((response) => {
          console.log(response.data.data);
          return response.data.data;
        })
        .then((data) => {
          const currentUserShoppingCart = data.filter((item) => {
            return item.attributes.users.data[0].id == userId;
          });
          const currentUserProductsInShoppingCart = currentUserShoppingCart.map(
            (item) => {
              return {
                ...item.attributes.products.data[0],
              };
            }
          );
          const shoppingCartIndexes = data.map((item) => item.id);
          commit("setUserShoppingCartIndexes", shoppingCartIndexes);
          commit("setUserShoppingCart", currentUserProductsInShoppingCart);
          setTimeout(() => {
            dispatch("loadUserShoppingCart");
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addItemInUserShoppingCart({ commit, getters, dispatch }, { id }) {
      axios
        .post(
          "http://localhost:1337/api/shopping-carts?populate=*",
          {
            data: {
              products: {
                connect: [id],
              },
              users: {
                connect: [getters.getUser.id],
              },
            },
          },
          {
            headers: {
              Authorization: `Bearer ${getters.getJwt}`,
            },
          }
        )
        .then((response) => {
          dispatch("getUserShoppingCart", getters.getUser.id);
          setTimeout(() => {
            dispatch("loadUserShoppingCart");
          }, 1000);
        })
        .catch((error) => console.log(error));
    },
    deleteItemFromUserShoppingCart({ commit, getters, dispatch }, { id }) {
      axios
        .delete(
          "http://localhost:1337/api/shopping-carts/" + id,

          {
            headers: {
              Authorization: `Bearer ${getters.getJwt}`,
            },
          }
        )
        .then((response) => {
          dispatch("getUserShoppingCart", getters.getUser.id);
          setTimeout(() => {
            dispatch("loadUserShoppingCart");
          }, 1000);
        })
        .catch((error) => console.log(error));
    },
    loadUserShoppingCart({ commit, getters }) {
      console.log("loadUserShoppingCart");
      const items = [];
      getters.getAllProducts.forEach((allProductsItem) => {
        getters.getterUserShoppingCart.forEach((userShoppingCartItem) => {
          if (allProductsItem.id === userShoppingCartItem.id) {
            items.push(allProductsItem);
          }
        });
      });
      commit("setUserShoppingCartProducts", items);
    },
  },
};
