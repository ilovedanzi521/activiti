import { BaseReqVO, BaseRepVO } from "../../common/vo/BaseVO";
export class ParamFundRepVO extends BaseRepVO {
    /**
     * 证券内码
     */
    public securityCode: string = "";

    /**
     * 证券名称
     */
    public securityName: string = "";

    /**
     * 基金类型
     */
    public fundType: string = "";

    /**
     * 投资分类
     */
    public investmentClassification: string = "";

    /**
     * 成立日期
     */
    public establishmentDate: string = "";

    /**
     * 收费方式
     */
    public chargingMethod: string = "";

    /**
     * 申赎状态
     */
    public foreclosureStatus: string = "";
}

export class ParamFundReqVO extends BaseReqVO {
    /**
     * 证券内码
     */
    public securityCode: string = "";

    /**
     * 证券名称
     */
    public securityName: string = "";

    /**
     * 基金类型
     */
    public fundType: string = "";

    /**
     * 投资分类
     */
    public investmentClassification: string = "";

    /**
     * 成立日期
     */
    public establishmentDate: string = "";

    /**
     * 收费方式
     */
    public chargingMethod: string = "";

    /**
     * 申赎状态
     */
    public foreclosureStatus: string = "";

    /**
     * 申赎状态数组
     */
    public foreclosureStatusList: string[] = [];

    /**
     * 基金类型数组
     */
    public fundTypeList: string[] = [];

    /**
     * 投资分类数组
     */
    public investmentClassificationList: string[] = [];
}
