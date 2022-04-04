import { createApp } from "vue";
import ElementPlus from "element-plus";

import router from "./router";
import store from "./store";

import customComponents from "@/custom-components";

import "element-plus/dist/index.css";
import "@styles/reset.css";
import "@styles/style.scss";
import "@styles/animate.scss";

import App from "./App.vue";

const app = createApp(App);

app.use(ElementPlus);
app.use(router);
app.use(store);

customComponents.forEach((item) => {
    app.component(item.key, item.component);
});

app.mount("#app");
