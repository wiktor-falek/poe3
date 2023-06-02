import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import "./style.css";
import "./styles/form.css";
import "./styles/components.css";
import router from "./router";
import VueCookies from "vue-cookies";

const pinia = createPinia();

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(VueCookies);

app.mount("#app");
