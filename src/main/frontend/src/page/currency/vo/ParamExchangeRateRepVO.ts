export default class ParamExchangeRateRepVO {
    /**
     * ID
     */
    id: string;
    /**
     * 日期
     */
    date: string;
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
}
