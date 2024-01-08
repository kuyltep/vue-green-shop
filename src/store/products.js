import axios from "axios";
export default {
  state: {
    products: [],
    filteredProducts: [],
  },
  getters: {
    getProducts(state) {
      return state.products;
    },
    getFilteredProducts(state) {
      return state.filteredProducts;
    },

    getNewProducts(state) {
      return [...state.products].filter((product) => product.new);
    },
    getSaleProducts(state) {
      return [...state.products].filter((product) => product.sale);
    },
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    setFilteredProducts(state, products) {
      state.filteredProducts = products;
    },
    clearProducts(state) {
      state.products = [];
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      commit("clearProducts");
      const response = await axios.get(
        "http://localhost:1337/api/products?populate=*"
      );
      const products = response.data.data.map((product) => {
        return {
          id: product.id,
          ...product.attributes,
          categories: product.attributes.categories.data.map(
            (item) => item.attributes.name
          ),
          sizes: product.attributes.sizes.data.map(
            (item) => item.attributes.size
          ),
        };
      });
      commit("setProducts", products);
      commit("setFilteredProducts", products);
    },
  },
};
