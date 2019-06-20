// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App.vue";
import VueDND from "awe-dnd";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import router from "./router/index";
import store from "./store/index";
import "./assets/style/reset.scss";
import "./assets/style/font.scss";
import "./assets/style/animate.scss";

Vue.use(ElementUI);

Vue.config.productionTip = false;
Vue.use(VueDND);

/* eslint-disable no-new */
new Vue({
    el: "#app",
    router,
    store,
    components: { App },
    template: "<App/>"
});
