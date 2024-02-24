import axios from "axios";
export default {
  state: {
    ordersLength: 0,
    allOrders: [],
  },
  getters: {
    getOrdersLength(state) {
      return state.ordersLength;
    },
    getAllOrders(state) {
      return state.allOrders;
    },
  },
  mutations: {
    setOrdersLength(state, ordersLength) {
      state.ordersLength = ordersLength;
    },
    setAllOrders(state, allOrders) {
      state.allOrders = allOrders;
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
