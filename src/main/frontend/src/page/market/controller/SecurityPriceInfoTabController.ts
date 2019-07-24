import { Component } from "vue-property-decorator";
import BaseController from "../../common/controller/BaseController";
import SecurityPriceInfo from "../view/SecurityPriceInfo.vue";
import fundValue from "../view/FundValue.vue";

@Component({ components: { SecurityPriceInfo, fundValue } })
export default class PriceInfoController extends BaseController {
    private activeName: string = "first";
}
