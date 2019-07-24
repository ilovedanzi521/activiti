import { BaseReqVO, BaseRepVO } from "../../common/vo/BaseVO";

export class ProdAssetUnitReqVO extends BaseReqVO {
    /**
     * 所属产品序号
     */
    public fundNo: number;

    /**
     * 资产单元编号
     */
    public no: number;
}

export class ProdAssetUnitRepVO extends BaseRepVO {
    /**
     * 所属产品序号
     */
    public fundNo: number;

    /**
     * 产品代码
     */
    public fundCode: string = "";

    /**
     * 产品全称
     */
    public fundName: string = "";

    /**
     * 资产单元编号
     */
    public no: number;

    /**
     * 资产单元名称
     */
    public assetUnitName: string = "";

    /**
     * 资产单元状态 1-正常 2-冻结
     */
    public status: string = "";

    /**
     * 帐户名称
     */
    public accountName: string = "";

    /**
     * 帐户类别
     */
    public accountType: string = "";

    /**
     * 备注
     */
    public summary: string = "";
}
