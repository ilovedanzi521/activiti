import { BaseReqVO, BaseRepVO } from "../../common/vo/BaseVO";

export class SecurityBasicInfoReqVO extends BaseReqVO {
    /**
     * 证券内码 security_code
     */

    public securityCode: string;
    /**
     * 证券类别 security_type
     */

    public securityType: string;
    /**
     * 资产类别 asset_type
     */

    public assetType: string;
    /**
     * 杂项分类 other_classification
     */

    public otherClassification: string;
    /**
     * 交易市场 market_code
     */
    public marketCode: string;
}

export class SecurityBasicInfoRepVO extends BaseRepVO {
    /**
     * 证券内码 security_code
     */
    public securityCode: string = "";

    /**
     * 证券名称 security_name
     */
    public securityName: string = "";

    /**
     * 证券全称 security_full_name
     */
    public securityFullName: string = "";

    /**
     * 交易市场 market_code
     */
    public marketCode: string = "";

    /**
     * 证券类别 security_type
     */
    public securityType: string = "";

    /**
     * 资产类别 asset_type
     */
    public assetType: string = "";

    /**
     * 申报代码 report_code
     */
    public reportCode: string = "";

    /**
     * 资产证券 asset_security
     */
    public assetSecurity: string = "";

    /**
     * 关联证券 related_security
     */
    public relatedSecurity: string = "";

    /**
     * 产品代码 product_code
     */
    public productCode: string = "";

    /**
     * 发行人 issuer
     */
    public issuer: string = "";

    /**
     * 发行日期 issue_date
     */
    public issueDate: string = "";

    /**
     * 上市日期 list_date
     */
    public listDate: string = "";

    /**
     * 发行方式 issue_type
     * 数据字典：0公开发行、1非公开发行
     */
    public issueType: string = "";

    /**
     * 总股本 shares_outstanding
     */
    public sharesOutstanding: number;

    /**
     * 流通股本 negotiable_capital
     */
    public negotiableCapital: number;

    /**
     * 发行总金额 total_issue_amount
     */
    public totalIssueAmount: number;

    /**
     * 交易币种 trans_currency
     */
    public transCurrency: string = "";

    /**
     * 面值 face_value
     */
    public faceValue: number;

    /**
     * 买入最小数量 min_buy_volume
     */
    public minBuyVolume: number;

    /**
     * 卖出最小数量 min_sell_volume
     */
    public minSellVolume: number;

    /**
     * 长期停牌 long_delist
     * 数据字典：0否、1是
     */
    public longDelist: string = "";

    /**
     * 涨停比例 up_limit_ratio
     */
    public upLimitRatio: string = "";

    /**
     * 跌停比例 down_limit_ratio
     */
    public downLimitRatio: string = "";

    /**
     * 交易日类型 trade_day_code
     */
    public tradeDayCode: string = "";

    /**
     * 杂项分类 other_classification
     */
    public otherClassification: string = "";

    /**
     * 标准券 standard_security
     */
    public standardSecurity: string = "";

    /**
     * 原始权益人 original_rights_holder
     */
    public originalRightsHolder: string = "";

    /**
     * 网上预估中签率 online_estimated_winning_rate
     */
    public onlineEstimatedWinningRate: string = "";
}
