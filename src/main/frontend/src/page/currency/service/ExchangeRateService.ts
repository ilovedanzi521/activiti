import AxiosFun from "../../../api/AxiosFun";
import { WinResponseData } from "../../common/vo/BaseVO";
import ParamExchangeRateReqVO from "../vo/ParamExchangeRateReqVO";
import ParamExchangeRateRepVO from "../vo/ParamExchangeRateRepVO";

/**
 * 类描述：汇率service
 * 创建人：@author jianshengxiong
 * 创建时间：2019/6/14
 *
 */
export default class ExchangeRateService {
    /**币种列表 */
    listCurrency(): Promise<WinResponseData> {
        return AxiosFun.get(
            AxiosFun.basicParameterServiceName + "/param/currency",
            undefined
        );
    }

    /**汇率列表 */
    listExchangeRate(rateVO: ParamExchangeRateReqVO): Promise<WinResponseData> {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/param/exchangeRate/list",
            rateVO
        );
    }

    /**汇率新增 */
    addExchangeRate(rateVO: ParamExchangeRateRepVO): Promise<WinResponseData> {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/param/exchangeRate",
            rateVO
        );
    }
    /**汇率修改 */
    updateExchangeRate(
        rateVO: ParamExchangeRateRepVO
    ): Promise<WinResponseData> {
        return AxiosFun.put(
            AxiosFun.basicParameterServiceName + "/param/exchangeRate",
            rateVO
        );
    }
    /**汇率删除 */
    deleteExchangeRate(rateId: number): Promise<WinResponseData> {
        return AxiosFun.winDelete(
            AxiosFun.basicParameterServiceName +
                "/param/exchangeRate/" +
                rateId,
            undefined
        );
    }
}
