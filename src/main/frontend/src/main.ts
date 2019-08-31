// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VueDND from "awe-dnd";
import ElementUI from "element-ui";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import "./assets/style/theme.scss";
import "./assets/style/reset.scss";
import "./assets/style/font.scss";
// import "./assets/style/comm.scss";
import directives from "../src/mixin/directives";
import "./layout/require.context";
import XEUtils from "xe-utils";
import VXEUtils from "vxe-utils";
import "win-plus/dist/static/index.css";

Vue.use(VueDND);
Vue.use(ElementUI);
Vue.use(directives);
Vue.use(VXEUtils, XEUtils);

Vue.config.productionTip = false;
let d = process.env.NODE_ENV;

//全局锁屏判断
router.beforeEach((to, from, next) => {
    if (localStorage.getItem("lockName")) {
        next(false);
    } else {
        next();
    }
});

/* eslint-disable no-new */
// tslint:disable-next-line: no-unused-expression
new Vue({
    el: "#app",
    router,
    store,
    components: { App },
    template: "<App/>"
});
