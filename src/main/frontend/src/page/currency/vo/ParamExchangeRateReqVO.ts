import { BaseReqVO } from "../../common/vo/BaseVO";
/**
 * 类描述：汇率，查询参数VO
 * 创建人：@author jianshengxiong
 * 创建时间：2019/6/14
 *
 */
export default class ParamExchangeRateReqVO extends BaseReqVO {
    /**
     * 源币种,默认为人民币
     */
    sourceCurrencyCode: string = "CNY";
    /**
     * 目标币种
     */
    targetCurrencyCode: string = "";
    /**目标币种，多选 */
    targetCurrencyCodes: string[] = [];
    /**
     * 开始日期
     */
    dateStart: String = "";
    /**
     * 结束日期
     */
    dateEnd: String = "";
}
