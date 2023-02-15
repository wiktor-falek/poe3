import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import vueClickOutsideElement from "vue-click-outside-element";

import "./assets/main.css";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(vueClickOutsideElement);

app.mount("#app");
