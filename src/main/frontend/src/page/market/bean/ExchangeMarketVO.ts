import { BaseReqVO, BaseRepVO } from "../../common/vo/BaseVO";
export class ExchangeMarketRepVO extends BaseRepVO {
    /**
     * 市场编码 market_code
     */
    marketCode: string = "";
    /**
     * 市场名称
     */
    marketName: string = "";
    /**
     * 市场全称
     */
    marketFullName: string = "";
    /**
     * 交易日类型
     */
    tradingDayType: string = "";
    /**
     * 时区
     */
    timeZone: string = "";
    /**
     * 国家
     */
    country: string = "";
    /**
     * 上午开市时间
     */
    morningMarketOpen: string = "";
    /**
     * 上午闭市时间
     */
    morningMarketClose: string = "";
    /**
     * 下午开市时间
     */
    afternoonMarketOpen: string = "";
    /**
     * 下午闭市时间
     */
    afternoonMarketClose: string = "";
    /**
     * 晚上开市时间
     */
    nightMarketOpen: string = "";
    /**
     * 晚上闭市时间
     */
    nightMarketClose: string = "";
    /**
     * 备注
     */
    remark: string = "";
}

export class ExchangeMarketReqVO extends BaseReqVO {
    /**
     * 上午开市时间
     */
    morningMarketOpen: string = "";
    /**
     * 上午闭市时间
     */
    morningMarketClose: string = "";
    /**
     * 下午开市时间
     */
    afternoonMarketOpen: string = "";
    /**
     * 下午闭市时间
     */
    afternoonMarketClose: string = "";
    /**
     * 晚上开市时间
     */
    nightMarketOpen: string = "";
    /**
     * 晚上闭市时间
     */
    nightMarketClose: string = "";
    /**
     * 备注
     */
    remark: string = "";
}

export class TransactionDirectionReqVO extends BaseReqVO {
    /**
     * 交易方向
     */
    transactionDirection: string;
    /**
     * 资金方向
     */
    fundsPath: number;
    /**
     * 证券方向
     */
    securitiesPath: number;
}

export class TransactionDirectionRepVO extends BaseRepVO {
    /**
     * 市场编码
     */
    marketCode: string = "";
    /**
     * 交易方向
     */
    transactionDirection: string = "";
    /**
     * 交易方向名称
     */
    transactionDirectionName: string = "";
    /**
     * 申报方向
     */
    declarePath: number;
    /**
     * 资金方向
     */
    fundsPath: number;
    /**
     * 证券方向
     */
    securitiesPath: number;
    /**
     * 影响证券
     */
    effectSecurities: number;
    /**
     * 关联变动方向
     */
    relationChangePath: number;
    /**
     * 关联影响证券
     */
    relationEffectSecurities: number;
    /**
     * 备注
     */
    remark: string = "";
}

export class SecurityTypeReqVO extends BaseReqVO {
    /**
     * 证券类别
     */
    securityType: string;
    /**
     * 资产类别
     */
    assetType: number;
    /**
     * 申报单位
     */
    declarationUnit: number;
    /**
     * 资产冻结方式
     */
    blockFundsType: number;
}

export class SecurityTypeRepVO extends BaseReqVO {
    /**
     * 交易市场编码
     */
    marketCode: string;
    /**
     * 交易平台
     */
    platformCode: string;
    /**
     * 市场类型
     */
    marketType: number;
    /**
     * 证券类别
     */
    securityType: string;
    /**
     * 证券类别名称
     */
    securityTypeName: string;
    /**
     * 资产类别
     */
    assetType: number;
    /**
     * 面值
     */
    parValue: number;
    /**
     * 证券类别单位
     */
    securityTypeUnit: number;
    /**
     * 每手数量
     */
    boardNumber: number;

    /**
     * 买入最小数量
     */
    buyMinNumber: number;
    /**
     * 买入最大数量
     */
    buyMaxNumber: number;
    /**
     * 买入变动单位数量
     */
    buyEventNumber: number;

    /**
     * 卖出最小数量
     */
    saleMinNumber: number;
    /**
     * 卖出最大数量
     */
    saleMaxNumber: number;
    /**
     * 卖出变动单位数量
     */
    saleEventNumber: number;

    /**
     * 数量最小单位
     */
    minNumberUnit: number;
    /**
     * 买入最小金额
     */
    buyMinAmount: number;
    /**
     * 买入最大金额
     */
    buyMaxAmount: number;
    /**
     * 买入变动单位金额
     */
    buyEventAmount: number;
    /**
     * 卖出最小金额
     */
    saleMinAmount: number;
    /**
     * 卖出最大金额
     */
    saleMaxAmount: number;
    /**
     * 卖出变动单余额
     */
    saleEventAmount: number;
    /**
     * 最小差价
     */
    minPriceTrade: number;
    /**
     * 申报单位
     */
    declarationUnit: number;

    /**
     * 交易方向权限
     */
    directionList: Array<string>;
    /**
     * 资产冻结方式
     */
    blockFundsType: number;
    /**
     * 买卖最小数量控制方式
     */
    minControlType: number;
}
