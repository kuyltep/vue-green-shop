import axios from "axios";
export default {
  state: {
    sliderData: null,
  },
  getters: {
    getSliderData(state) {
      return state.sliderData;
    },
  },
  mutations: {
    setSliderData(state, data) {
      state.sliderData = data;
    },
  },
  actions: {
    async getDataForSlider({ commit }) {
      const response = await axios.get("http://localhost:1337/api/slides");
      const data = response.data.data;
      const slides = data.map((item) => {
        return {
          id: item.id,
          ...item.attributes.slideInfo,
        };
      });
      commit("setSliderData", slides);
    },
  },
};
