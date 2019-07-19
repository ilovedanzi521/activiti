import layout from "@/layout/Layout.vue";
import Login from "@/page/login/view/index.vue";
import Home from "@/page/home/view/index.vue";
import Oplog from "@/page/oplog/view/oplog.vue";
import CurrencyRate from "@/page/currency/view/Exchange.vue";
import Publisher from "@/page/publisher/view/publisher.vue";
import Market from "@/page/market/components/Market.vue";
import MarketDetail from "@/page/market/view/MarketDetail.vue";
import ParamTransactionDirection from "@/page/market/view/ParamTransactionDirection.vue";
import SecurityType from "@/page/market/view/SecurityType.vue";
import homeRouter from "../page/home/routes";
import Dictionary from "@/page/dictionary/view/index.vue";
import Switch from "@/page/switch/view/index.vue";
import Flow from "@/page/flow/view/Exchange.vue";

console.log(homeRouter);
import User from "@/page/user/view/index.vue";

export default [
    {
        path: "/",
        name: "flow",
        component: Flow,
        children: [
            {
                path: "/flow",
                name: "flow",
                component: Flow
            }
        ]
    }
];
