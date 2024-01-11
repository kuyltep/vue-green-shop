import axios from "axios";
export default {
  state: {
    products: [],
    filteredProducts: [],
    cardIcons: [],
    pagesCounter: 0,
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
    getPagesCounter(state) {
      return state.pagesCounter;
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
    setPagesCounter(state, counter) {
      state.pagesCounter = counter;
    },
  },
  actions: {
    async fetchProducts({ commit }, data) {
      commit("clearProducts");
      const response = await axios.get(
        `http://localhost:1337/api/products?pagination[pageSize]=${
          data?.pageSize
        }${data?.page ? "&pagination[page]=" + data?.page : ""}&populate=*`
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
      commit("setPagesCounter", response.data.meta.pagination.pageCount);
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
