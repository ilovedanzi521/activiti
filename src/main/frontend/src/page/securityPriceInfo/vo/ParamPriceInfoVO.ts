import { BaseReqVO, BaseRepVO } from "../../common/vo/BaseVO";

export class ParamPriceInfoReqVO extends BaseReqVO {
    /**
     * 交易市场
     */
    public marketCode: string[] = [];
    /**
     * 证券代码
     */
    public securityCode: string = "";
    /**
     * 资产类别
     */
    public assetType: string[] = [];
    /**
     * 证券类别
     */
    public securityType: string[] = [];
}

export class ParamPriceInfoRepVO extends BaseRepVO {
    /**
     * 证券代码
     */
    public securityCode: string = "";

    /**
     * 行情日
     */
    public infoDate: string = "";

    /**
     * 停牌标志: 1-停牌、2-正常交易
     */
    public delistStatus: number;

    /**
     * 昨收盘
     */
    public yesterdayClosePrice: number;

    /**
     * 今开盘
     */
    public todayOpenPrice: number;

    /**
     * 最新价
     */
    public newPrice: number;

    /**
     * 最高价
     */
    public highPrice: number;

    /**
     * 最低价
     */
    public lowPrice: number;

    /**
     * 平均价
     */
    public averagePrice: number;

    /**
     * 涨停价
     */
    public limitUpPrice: number;

    /**
     * 跌停价
     */
    public limitDownPrice: number;

    /**
     * 成交量
     */
    public tradeCount: string = "";

    /**
     * 成交额
     */
    public tradePrice: string = "";

    /**
     * 昨结算
     */
    public yesterdayClearing: number;

    /**
     * 今结算
     */
    public todayClearing: number;

    /**
     * 全价昨收盘
     */
    public fullPriceClosedYesterday: number;

    /**
     * 应计利息
     */
    public accruedInterest: number;

    /**
     * 中债估值净价
     */
    public chinaBondPrice: number;

    /**
     * 中债估价修正久期
     */
    public chinaBondAmendDate: number;

    /**
     * 中债估价收益率
     */
    public chinaBondYield: number;

    /**
     * 中债估价凸性
     */
    public chinaBondConvexity: number;

    /**
     * 中证估价净价
     */
    public chinaSecurityPrice: number;

    /**
     * 中证估价收益率
     */
    public chinaSecurityYield: number;

    /**
     * 中证估价凸性
     */
    public chinaSecurityConvexity: number;

    /**
     * 中证估价修正久期
     */
    public chinaSecurityAmendDate: number;

    /**
     * 证券名称
     */
    public securityName: string = "";

    /**
     * 证券类别
     */
    public securityType: string = "";
    /**
     * 资产类别
     */
    public assetType: string = "";
}
