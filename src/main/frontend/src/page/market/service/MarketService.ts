import AxiosFun from "../../../api/AxiosFun";
import {
    ExchangeMarketRepVO,
    ExchangeMarketReqVO,
    TransactionDirectionReqVO,
    SecurityTypeReqVO
} from "../vo/ParamMarketVO";
export default class MarketService {
    /** 交易市场详情查询 */
    public queryMarketDetail(marketCode: string) {
        return AxiosFun.get(
            AxiosFun.basicParameterServiceName + "/market/find/detail",
            {
                marketCode
            }
        );
    }

    /** 交易市场详情修改 */
    public update(updateVo: ExchangeMarketReqVO) {
        return AxiosFun.put(
            AxiosFun.basicParameterServiceName + "/market/update/market",
            updateVo
        );
    }
    /** 交易方向查询 */
    public queryTransactionDirection(
        directionReqVO: TransactionDirectionReqVO
    ) {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/direction/find/all",
            directionReqVO
        );
    }
    /** 交易规则查询 */
    public querySecurityType(securityTypeReqVO: SecurityTypeReqVO) {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/security/find/all",
            securityTypeReqVO
        );
    }

    /** 证券类型编码 */
    public querySecurityCode() {
        return AxiosFun.get(
            AxiosFun.basicParameterServiceName + "/security/find/code"
        );
    }

    /** 交易编码 */
    public queryDirectionCode(directionReqVO: TransactionDirectionReqVO) {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/api/direction/find/code",
            directionReqVO
        );
    }
}
