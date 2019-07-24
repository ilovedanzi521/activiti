import { Component, Prop } from "vue-property-decorator";
import BaseController from "../../common/controller/BaseController";
import MarketService from "../service/MarketService";
import DicService from "../../dictionary/service/DicService";
@Component({ components: {} })
export default class TradeMarketController extends BaseController {
    service: MarketService = new MarketService();
    public dicService: DicService = new DicService();
    @Prop({ default: "SH" })
    code;
}
