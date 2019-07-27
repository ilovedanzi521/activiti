import layout from "@/layout/Layout.vue";
import Login from "@/page/login/view/index.vue";
import Home from "@/page/home/view/index.vue";
import Oplog from "@/page/oplog/view/oplog.vue";
import CurrencyRate from "@/page/currency/view/ExchangeRate.vue";
import Publisher from "@/page/publisher/view/publisher.vue";
import Market from "@/page/market/components/Market.vue";
import MarketDetail from "@/page/market/view/marketDetail.vue";
import ParamTransactionDirection from "@/page/market/view/ParamTransactionDirection.vue";
import SecurityType from "@/page/market/view/SecurityType.vue";
import TradeDayType from "@/page/tradeDay/view/TradeDayType.vue";
import TradeDay from "@/page/tradeDay/view/TradeDay.vue";
import Demo from "@/page/calendar/view/demo.vue";
import Dictionary from "@/page/dictionary/view/index.vue";
import Switch from "@/page/switch/view/index.vue";
import SecurityBasicInfo from "@/page/market/view/SecurityBasicInfo.vue";

import User from "@/page/user/view/index.vue";
import SecurityInfo from "@/page/market/view/SecurityInfo.vue";
import ParamFund from "@/page/market/view/ParamFund.vue";
import ParamRepo from "@/page/market/view/ParamRepo.vue";
import Bond from "@/page/market/view/Bond.vue";
import SecurityPriceInfo from "@/page/market/view/SecurityPriceInfoTab.vue";
import PriceInfo from "@/page/market/view/SecurityPriceInfo.vue";
import FundValue from "@/page/market/view/FundValue.vue";
import Product from "@/page/product/view/Product.vue";
import ProdEscrowAccountInfo from "@/page/product/view/ProdEscrowAccountInfo.vue";
import ProdConsignorTabs from "@/page/consignor/view/ProdConsignorTabs.vue";
import Directional from "@/page/fram/view/Directional.vue";
import ParamRival from "@/page/rival/view/ParamRival.vue";
import Flow from "@/page/flow/view/Exchange.vue";
import Task from "@/page/celltask/view/CellTask.vue";
let routers = [
    {
        path: "/flow",
        name: "Flow",
        component: Flow,
        children: [
            {
                path: "/flow",
                name: "Flow",
                component: Flow
            }
        ]
    }
];

export default routers;
