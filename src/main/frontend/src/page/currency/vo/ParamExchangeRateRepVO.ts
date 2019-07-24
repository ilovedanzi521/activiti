import { BaseRepVO } from "../../common/vo/BaseVO";

/**
 * 类描述：汇率,返回参数VO
 * 创建人：@author jianshengxiong
 * 创建时间：2019/6/14
 *
 */
export default class ParamExchangeRateRepVO extends BaseRepVO {
    /**
     * 日期
     */
    rateDate: string = "";
    /**
     * 与rateDate保持一致的时间类型对象
     */
    editDate: Date = new Date();
    /**
     * 源币种
     */
    sourceCurrencyCode: string;
    /**
     * 目标币种
     */
    targetCurrencyCode: string;
    /**
     * 现钞买入价
     */
    cashBuyPrice: number;
    /**
     * 现钞卖出价
     */
    cashSellPrice: number;
    /**
     * 买入价
     */
    exchangeBuyPrice: number;
    /**
     * 卖出价
     */
    exchangeSellPrice: number;
    /**
     * 中间价
     */
    middlePrice: number;

    static initAddVO(sourceCode: string): ParamExchangeRateRepVO {
        let vo = new ParamExchangeRateRepVO();
        vo.sourceCurrencyCode = sourceCode;
        return vo;
    }
}
