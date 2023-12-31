import axios from "axios";
import successTost from "@/toasts-plugins/success.tost";
import errorTost from "@/toasts-plugins/error.tost";
export default {
  state: {
    addresses: [],
  },
  getters: {
    getAddresses(state) {
      return state.addresses;
    },
  },
  mutations: {
    setAddresses(state, data) {
      data.forEach((item) => {
        state.addresses.push(item);
      });
    },
    clearAddresses(state) {
      state.addresses = [];
    },
  },
  actions: {
    saveAddress(
      { commit, getters },
      {
        firstName,
        lastName,
        country,
        city,
        address,
        state,
        email,
        phone,
        appartment,
        zip,
      }
    ) {
      axios
        .post(
          "http://localhost:1337/api/adresses",
          {
            data: {
              firstName,
              lastName,
              country,
              city,
              address,
              state,
              email,
              phone,
              appartment,
              zip,
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
        .then((response) => {
          console.log(response);
          successTost("Success address add");
          const address = {
            ...response.data.data.attributes,
            id: response.data.data.id,
          };
          commit("setAddresses", address);
        })
        .catch((error) => {
          console.log(error);
          errorTost("Error address add");
        });
    },
    getAddresses({ commit, getters }) {
      axios
        .get(
          `http://localhost:1337/api/users/${getters.getUser.id}?populate[0]=addresses`,
          {
            headers: {
              Authorization: "Bearer " + getters.getJwt,
            },
          }
        )
        .then((response) => {
          commit("clearAddresses");
          console.log(response.data);
          commit("setAddresses", response.data.addresses);
        });
    },
    deleteAddress({ commit, getters, dispatch }, { id }) {
      axios
        .put(
          `http://localhost:1337/api/adresses/${id}`,
          {
            data: {
              users: {
                disconnect: [getters.getUser.id],
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
        .then((response) => {
          console.log(response);
          dispatch("getAddresses");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
