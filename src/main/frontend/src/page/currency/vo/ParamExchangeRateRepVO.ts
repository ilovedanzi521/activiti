import { BaseRepVO } from "../../common/vo/BaseVO";

/**
 * 类描述：汇率,返回参数VO
 * 创建人：@author jianshengxiong
 * 创建时间：2019/6/14
 *
 */
export default class ParamExchangeRateRepVO extends BaseRepVO {

    public static initAddVO(sourceCode: string): ParamExchangeRateRepVO {
        const vo = new ParamExchangeRateRepVO();
        vo.sourceCurrencyCode = sourceCode;
        return vo;
    }
    /**
     * 日期
     */
    public rateDate: string = "";
    /**
     * 与rateDate保持一致的时间类型对象
     */
    public editDate: Date = new Date();
    /**
     * 源币种
     */
    public sourceCurrencyCode: string;
    /**
     * 目标币种
     */
    public targetCurrencyCode: string;
    /**
     * 现钞买入价
     */
    public cashBuyPrice: number;
    /**
     * 现钞卖出价
     */
    public cashSellPrice: number;
    /**
     * 买入价
     */
    public exchangeBuyPrice: number;
    /**
     * 卖出价
     */
    public exchangeSellPrice: number;
    /**
     * 中间价
     */
    public middlePrice: number;
}
