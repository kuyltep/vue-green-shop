import axios from "axios";
export default {
  state: {
    allProducts: [],
    products: [],
    filteredProducts: [],
    cardIcons: [],
    pagesCounter: 0,
    pageSize: 3,
    pageNumber: 1,
  },
  getters: {
    getProductsPageSize(state) {
      return state.pageSize;
    },
    getProductsPageNumber(state) {
      return state.pageNumber;
    },
    getProducts(state) {
      return state.products;
    },
    getAllProducts(state) {
      return state.allProducts;
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
    setProductsPageNumber(state, pageNumber) {
      state.pageNumber = pageNumber;
    },
    setProducts(state, products) {
      state.products = products;
    },
    setAllProducts(state, allProducts) {
      state.allProducts = allProducts;
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
    async fetchProducts({ commit, getters }) {
      commit("clearProducts");
      const response = await axios.get(
        `http://localhost:1337/api/products?pagination[pageSize]=${
          getters.getProductsPageSize
        }${
          getters.getProductsPageNumber
            ? "&pagination[page]=" + getters.getProductsPageNumber
            : ""
        }&populate=*`
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
    async fetchAllProducts({ commit }) {
      const response = await axios.get(
        `http://localhost:1337/api/products?populate=*`
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
      commit("setAllProducts", products);
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
