import AxiosFun from "../../../api/AxiosFun";
import {
    ExchangeMarketRepVO,
    ExchangeMarketReqVO,
    TransactionDirectionReqVO,
    SecurityTypeReqVO
} from "../bean/ExchangeMarketVO";
export default class MarketService {
    /*交易市场详情查询*/
    queryMarketDetail(marketCode: string) {
        return AxiosFun.get("/param/market/find/detail", {
            marketCode: marketCode
        });
    }

    /**交易市场详情修改 */
    update(updateVo: ExchangeMarketReqVO) {
        console.log(updateVo);
        return AxiosFun.put("/param/market/update/market", updateVo);
    }
    /**交易方向查询 */
    queryTransactionDirection(directionReqVO: TransactionDirectionReqVO) {
        return AxiosFun.post("/param/direction/find/all", directionReqVO);
    }
    /**证券类型查询 */
    querySecurityType(securityTypeReqVO: SecurityTypeReqVO) {
        return AxiosFun.post("/param/securities/find/all", securityTypeReqVO);
    }
}
