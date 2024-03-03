import axios from "axios";
export default {
  state: {
    ordersLength: 0,
    allOrders: [],
    userOrders: [],
    paginationUserOrders: [],
    paginationPageNumber: 1,
    ordersPageSize: 5,
    ordersPagesCounter: 0,
  },
  getters: {
    getOrdersLength(state) {
      return state.ordersLength;
    },
    getAllOrders(state) {
      return state.allOrders;
    },
    getUserOrders(state) {
      return state.userOrders;
    },
    getPaginationOrdersPageNumber(state) {
      return state.paginationPageNumber;
    },
    getPaginationUserOrders(state) {
      return state.paginationUserOrders;
    },
    getOrdersPagesCounter(state) {
      return state.ordersPagesCounter;
    },
    getOrdersPageSize(state) {
      return state.ordersPageSize;
    },
  },
  mutations: {
    setOrdersLength(state, ordersLength) {
      state.ordersLength = ordersLength;
    },
    setAllOrders(state, allOrders) {
      state.allOrders = allOrders;
    },
    setUserOrders(state, userOrders) {
      state.userOrders = userOrders;
    },
    setPaginationOrdersPagNumber(state, pageNumber) {
      state.paginationPageNumber = pageNumber;
    },
    setPaginationUserOrders(state, orders) {
      let pageContent = [];
      state.ordersPagesCounter = Math.ceil(
        orders.length / state.ordersPageSize
      );
      orders.forEach((element, index) => {
        if (pageContent.length < state.ordersPageSize) {
          pageContent.push(element);
        } else {
          state.paginationUserOrders.push(pageContent);
          pageContent = [];
        }
        if (index === orders.length - 1) {
          state.paginationUserOrders.push(pageContent);
          pageContent = [];
        }
      });
    },
  },
  actions: {
    getOrders({ commit, getters }) {
      axios
        .get("http://localhost:1337/api/orders?populate=*", {
          headers: {
            Authorization: `Bearer ${getters.getJwt}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          commit("setAllOrders", response.data.data);
          commit("setOrdersLength", response.data.data.length);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getUserOrders({ commit, getters }) {
      axios
        .get("http://localhost:1337/api/orders?populate=*", {
          headers: {
            Authorization: `Bearer ${getters.getJwt}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          const userOrders = [...response.data.data].filter((item) => {
            return item.attributes.user.data.id === getters.getUser.id;
          });
          commit("setUserOrders", userOrders);
          commit("setPaginationUserOrders", userOrders);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    createOrder({ commit, getters }, orderData) {
      console.log(orderData);
      axios
        .post(
          "http://localhost:1337/api/orders",
          {
            data: {
              total: orderData.total,
              shipping: orderData.shipping,
              quantities: getters.getterUserShoppingCartProductsQuantitites,
              payMethod: orderData.payMethod,
              products: {
                connect: getters.getterUserShoppingCartProducts,
              },
              user: {
                connect: [getters.getUser.id],
              },
              address: {
                connect: [orderData.address.id],
              },
              description: orderData.orderDescription,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${getters.getJwt}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
