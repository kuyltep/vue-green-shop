import axios from "axios";
export default {
  state: {
    userWishlist: [],
    userWishlistIndexes: [],
    userWishlistProfileProducts: [],
  },
  getters: {
    getterUserWishlist(state) {
      return state.userWishlist;
    },
    getterUserWishlistIndexes(state) {
      return state.userWishlistIndexes;
    },
    getterUserWishlistProfileProducts(state) {
      return state.userWishlistProfileProducts;
    },
  },
  mutations: {
    setUserWishlist(state, wishlist) {
      state.userWishlist = wishlist;
    },
    setUserWishlistIndexes(state, indexes) {
      state.userWishlistIndexes = indexes;
    },
    setWishlistProfileProducts(state, products) {
      state.userWishlistProfileProducts = products;
    },
  },
  actions: {
    getUserWishlist({ commit, getters }, userId) {
      axios
        .get(`http://localhost:1337/api/wishlists?populate=*`, {
          headers: {
            Authorization: "Bearer " + getters.getJwt,
          },
        })
        .then((response) => {
          console.log(response.data.data);
          return response.data.data;
        })
        .then((data) => {
          const currentUserWishlist = data.filter((item) => {
            return item.attributes.users.data[0].id == userId;
          });
          const currentUserProductsInWishlist = currentUserWishlist.map(
            (item) => {
              return {
                ...item.attributes.products.data[0],
              };
            }
          );
          const wishlistIndexes = data.map((item) => item.id);
          commit("setUserWishlistIndexes", wishlistIndexes);
          commit("setUserWishlist", currentUserProductsInWishlist);
          console.log(currentUserProductsInWishlist);
          console.log(wishlistIndexes);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addItemInUserWishlist({ commit, getters }, { id }) {
      axios
        .post(
          "http://localhost:1337/api/wishlists?populate=*",
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
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    },
    deleteItemFromUserWishlist({ commit, getters }, { id }) {
      axios
        .delete(
          "http://localhost:1337/api/wishlists/" + id,

          {
            headers: {
              Authorization: `Bearer ${getters.getJwt}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    },
    loadWishlistInProfilePage({ commit, getters }) {
      const items = [];
      getters.getAllProducts.forEach((allProductsItem) => {
        getters.getterUserWishlist.forEach((userWishlistItem) => {
          if (allProductsItem.id === userWishlistItem.id) {
            items.push(allProductsItem);
          }
        });
      });
      commit("setWishlistProfileProducts", items);
    },
  },
};
