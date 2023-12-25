import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Toast from "vue-toastification";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import "vue-toastification/dist/index.css";
createApp(App)
  .use(Toast, {
    transition: "Vue-Toastification__bounce",
    maxToasts: 20,
    newestOnTop: true,
  })
  .component("pulse-loader", PulseLoader)
  .use(store)
  .use(router)
  .mount("#app");
