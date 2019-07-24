import { Component } from "vue-property-decorator";
import BaseController from "../../common/controller/BaseController";
import TradeDayService from "../service/TradeDayService";
import { TradeDayTypeRepVO } from "../vo/TradeDayVO";
import { WinResponseData } from "../../common/vo/BaseVO";
import { WinRspType } from "../../common/enum/BaseEnum";
import TradeDay from "@/page/tradeDay/view/TradeDay.vue";
import TradeDayController from "../controller/TradeDayController";

@Component({ components: { TradeDay } })
export default class TradeDayTypeController extends BaseController {
    public tradeDayservice: TradeDayService = new TradeDayService();
    public tradeDayTypeRepList: TradeDayTypeRepVO[] = [];
    public isDetailAble: boolean = false;

    /** $refs引用声明 */
    public $refs!: {
        tradeDay: TradeDayController;
    };
    public mounted() {
        this.queryTradeDayManager();
    }

    /**查看 */
    public onCheck(row: any) {
        this.isDetailAble = true;
        this.$refs.tradeDay.onCheck(row);
    }

    /**查看 */
    public onEdit(row: any) {
        this.isDetailAble = true;
        this.$refs.tradeDay.onEdit(row);
    }

    public queryTradeDayManager() {
        this.tradeDayservice
            .queryTradeDayType()
            .then((winResponseData: WinResponseData) => {
                if (WinRspType.SUCC == winResponseData.winRspType) {
                    this.tradeDayTypeRepList = winResponseData.data;
                }
            });
    }
}
