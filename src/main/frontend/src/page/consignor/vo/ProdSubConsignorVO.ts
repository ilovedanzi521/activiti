import { BaseReqVO, BaseRepVO } from "../../common/vo/BaseVO";

export class ProdSubConsignorReqVO extends BaseReqVO {
    /**
     * 一级委托人序号
     */
    public consignorNo: number;

    /**
     * 二级委托人序号
     */
    public no: number;
}

export class ProdSubConsignorRepVO extends BaseRepVO {
    /**
     * 一级委托人序号
     */
    public consignorNo: number;

    /**
     * 一级委托人名称
     */
    public consignorName: string = "";

    /**
     * 二级委托人序号
     */
    public no: number;

    /**
     * 二级委托人编码
     */
    public code: string = "";

    /**
     * 二级委托人简称
     */
    public shortName: string = "";

    /**
     * 二级委托人名称
     */
    public name: string = "";

    /**
     * 二级委托人属性
     */
    public type: string = "";

    /**
     * 公司类型
     */
    public companyType: string = "";
    /**
     * 描述
     */
    public summary: string = "";
}
