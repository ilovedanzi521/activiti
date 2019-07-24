import AxiosFun from "../../../api/AxiosFun";
import { TradeDayReqVO, TradeDayListReqVO } from "../vo/TradeDayVO";
export default class TradeDayService {
    /** 交易日类型查询 */
    public queryTradeDayType() {
        return AxiosFun.get(
            AxiosFun.basicParameterServiceName + "/trade/find/all"
        );
    }

    /** 交易日查询 */
    public queryTradeDay(tradeDayReqVO: TradeDayReqVO) {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/trade/find/tradeDay",
            tradeDayReqVO
        );
    }
    /** 交易日更新 */
    public updateTradeDay(tradeDayList: TradeDayListReqVO) {
        return AxiosFun.put(
            AxiosFun.basicParameterServiceName + "/trade/update/tradeDay",
            tradeDayList
        );
    }
}
