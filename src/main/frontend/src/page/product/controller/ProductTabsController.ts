/* @ProductTabsController 产品关联信息标签页controller
 * @Author: lixiuquan
 * @Date: 2019-06-13 14:01:33
 * @Last Modified by: lixiuquan
 * @Last Modified time: 2019-06-13 19:34:05
 */

import Vue from "vue";
import Component from "vue-class-component";
import ProdAssetUnit from "../view/ProdAssetUnit.vue";
import ProdPortfolio from "../view/ProdPortfolio.vue";
import ProdEscrowAccountInfo from "../view/ProdEscrowAccountInfo.vue";
import ProdStockholder from "@/page/product/view/ProdStockholder.vue";
import ProdSeat from "@/page/product/view/ProdSeat.vue";
import ProdSettlementAccount from "../view/ProdSettlementAccount.vue";
import ProdCapitalAccount from "../view/ProdCapitalAccount.vue";

@Component({
    components: {
        ProdAssetUnit,
        ProdPortfolio,
        ProdSettlementAccount,
        ProdCapitalAccount,
        ProdEscrowAccountInfo,
        ProdStockholder,
        ProdSeat
    }
})
export default class ProductTabsController extends Vue {
    private activeName: string = "first";
}
