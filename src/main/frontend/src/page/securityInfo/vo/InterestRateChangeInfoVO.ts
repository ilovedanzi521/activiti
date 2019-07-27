import { BaseReqVO, BaseRepVO } from "../../common/vo/BaseVO";

export class InterestRateChangeInfoReqVO extends BaseReqVO {
    /**
     * 证券代码 security_code
     */
    public securityCode: string;
    /**
     * 交易市场 market_code
     */
    public marketCode: string;
}

export class InterestRateChangeInfoRepVO extends BaseRepVO {
    /**
     * 证券代码 security_code
     */
    public securityCode: string = "";
    /**
     * 证券名称 security_name
     */
    public securityName: string = "";
    /**
     * 开始日期 begin_date
     */
    public beginDate: string = "";
    /**
     * 结束日期 end_date
     */
    public endDate: string = "";
    /**
     * 票面利率 coupon_rate
     */
    public couponRate: string = "";
}
