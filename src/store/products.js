import axios from "axios";
export default {
  state: {
    products: [],
    filteredProducts: [],
    cardIcons: [],
  },
  getters: {
    getProducts(state) {
      return state.products;
    },
    getFilteredProducts(state) {
      return state.filteredProducts;
    },
    getCardIcons(state) {
      return state.cardIcons;
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
    setCardIcons(state, icons) {
      state.cardIcons = icons;
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
    async getCardIcons({ commit }) {
      await axios
        .get("http://localhost:1337/api/card-icons?populate=*")
        .then((response) => {
          const icons = response.data.data.map((item) => {
            return {
              id: item.id,
              title: item.attributes.title,
              image:
                "http://localhost:1337" +
                item.attributes.image.data[0].attributes.url,
            };
          });
          commit("setCardIcons", icons);
          console.log(icons);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
