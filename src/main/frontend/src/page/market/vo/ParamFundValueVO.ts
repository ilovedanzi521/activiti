import { BaseReqVO, BaseRepVO } from "../../common/vo/BaseVO";

export class ParamFundValueReqVO extends BaseReqVO {
    /**
     * 证券代码
     */
    public securityCode: string = "";
}

export class ParamFundValueRepVO extends BaseRepVO {
    /**
     * 证券内码
     */
    public securityCode: string = "";
    /**
     * 净值日
     */
    public priceDate: string = "";

    /**
     * 净资产值
     */
    public cleanPrice: number;

    /**
     * 单位净值
     */
    public unitCleanPrice: number;

    /**
     * 单位累计净值
     */
    public unitSumPrice: number;

    /**
     * 每万份基金单位当日收益
     */
    public intradayEarn: number;

    /**
     * 最近7日折算年收益率
     */
    public sevenDayEarn: string = "";

    /**
     * 证券名称
     */
    public securityName: string = "";
}
