import axios from "axios";
import successTost from "@/toasts-plugins/success.tost";
export default {
  state: {
    userShoppingCart: [],
    userShoppingCartIndexes: [],
    userShoppingCartProducts: [],
    userShoppingCartProductsQuantities: [],
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
    getterUserShoppingCartProductsQuantitites(state) {
      return state.userShoppingCartProductsQuantities;
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
      state.userShoppingCartProducts = shoppingCartProducts;
    },
    setUserShoppingCartProductsQuantitites(
      state,
      shoppingCartProductsQuantities
    ) {
      state.userShoppingCartProductsQuantities = shoppingCartProductsQuantities;
    },
    setUserShoppingCartCurrentProductQuantity(state, { productId, quantity }) {
      console.log(quantity);
      state.userShoppingCartProductsQuantities[productId] += +quantity;
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
                quantity: item.attributes.quantity,
              };
            }
          );
          const shoppingCartIndexes = data.map((item) => item.id);
          commit("setUserShoppingCartIndexes", shoppingCartIndexes);
          commit("setUserShoppingCart", currentUserProductsInShoppingCart);
          setTimeout(() => {
            dispatch("loadUserShoppingCart");
          }, 0);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addItemInUserShoppingCart({ commit, getters, dispatch }, { id, qty }) {
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
              quantity: qty,
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
            successTost("Product has been added in shopping cart");
          }, 10);
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
            successTost("Product has been removed from shopping cart");
          }, 10);
        })
        .catch((error) => console.log(error));
    },
    updateProductQuantityInShoppingCart({ getters, dispatch }, { id, qty }) {
      const productIndex = getters.getterUserShoppingCartProducts.findIndex(
        (item) => item.id === id
      );
      const shoppingCartProductIndex =
        getters.getterUserShoppingCartIndexes[productIndex];
      axios
        .put(
          `http://localhost:1337/api/shopping-carts/${shoppingCartProductIndex}`,
          {
            data: {
              quantity: qty,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${getters.getJwt}`,
            },
          }
        )
        .then((response) => {
          dispatch("loadUserShoppingCart");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    loadUserShoppingCart({ commit, getters }) {
      console.log("loadUserShoppingCart");
      const userProductsQuantities = {};
      const items = [];
      getters.getAllProducts.forEach((allProductsItem) => {
        getters.getterUserShoppingCart.forEach((userShoppingCartItem) => {
          if (allProductsItem.id === userShoppingCartItem.id) {
            items.push(allProductsItem);
          }
          userProductsQuantities[userShoppingCartItem.id] =
            userShoppingCartItem.quantity;
        });
      });
      commit("setUserShoppingCartProducts", items);
      commit("setUserShoppingCartProductsQuantitites", userProductsQuantities);
    },
    clearUserShoppingCart({ commit, getters, dispatch }) {
      getters.getterUserShoppingCartIndexes.forEach((item) => {
        axios
          .delete("http://localhost:1337/api/shopping-carts/" + item, {
            headers: {
              Authorization: `Bearer ${getters.getJwt}`,
            },
          })
          .catch((error) => {
            console.log(error);
          });
      });
      dispatch("getUserShoppingCart", getters.getUser.id);
      setTimeout(() => {
        dispatch("loadUserShoppingCart");
      }, 1000);
    },
  },
};
