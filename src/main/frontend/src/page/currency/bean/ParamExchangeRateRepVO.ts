export default class ParamExchangeRateRepVO {
    /**
     * ID
     */
    id: string
    /**
     * 日期
     */
    date: string
    /**
     * 源币种
     */
    sourceCurrencyCode: string
    /**
     * 目标币种
     */
    targetCurrencyCode: string
    /**
     * 买入价
     */
    buyPrice: number
    /**
     * 卖出价
     */
    sellPrice: number
    /**
     * 中间价
     */
    middlePrice: number
}