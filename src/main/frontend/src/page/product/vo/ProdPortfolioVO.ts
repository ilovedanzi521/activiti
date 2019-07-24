import { BaseReqVO, BaseRepVO } from "../../common/vo/BaseVO";

export class ProdPortfolioReqVO extends BaseReqVO {
    /**
     * 所属产品序号
     */
    public fundNo: number;

    /**
     * 资产单元编号
     */
    public assetUnitNo: number;

    /**
     * 组合编号
     */
    public no: number;
}

export class ProdPortfolioRepVO extends BaseRepVO {
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
     * 资产单元名称
     */
    public assetUnitName: string = "";

    /**
     * 资产单元编号
     */
    public assetUnitNo: number;

    /**
     * 组合编号
     */
    public no: number;

    /**
     * 组合名称
     */
    public portfolioName: string = "";

    /**
     * 资金账号
     */
    public cashAccountNumber: string = "";

    /**
     * 组合类型
     */
    public portfolioType: string = "";

    /**
     * 交易市场权限
     */
    public permitMarketCodes: string = "";

    /**
     * 交易市场权限
     */
    public permitMarketCodeArray: string[] = [];

    /**
     * 证券类别权限
     */
    public permitSecurityTypes: string = "";

    /**
     * 交易方向权限
     */
    public permitTransactionDirections: string = "";

    /**
     * 组合状态 1：正常 2：过期
     */
    public status: string = "";

    /**
     * 备注
     */
    public summary: string = "";
}
