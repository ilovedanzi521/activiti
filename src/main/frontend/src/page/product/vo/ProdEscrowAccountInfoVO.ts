import { BaseReqVO, BaseRepVO } from "../../common/vo/BaseVO";
export class ProdEscrowAccountInfoRepVO extends BaseRepVO {
    /**
     * 现金帐户序列号
     */
    public escrowAccountNo: number;

    /**
     * 帐户名称
     */
    public accountName: string;

    /**
     * 银行账号
     */
    public accountCode: string;

    /**
     * 帐户类型
     */
    public accountType: string;

    /**
     * 币种类型
     */
    public currencyCode: string;

    /**
     * 开户行
     */
    public openBank: string;

    /**
     * 支付系统行号
     */
    public paymentSystemNumber: string;

    /**
     * 开户日期
     */
    public openDate: Date;

    /**
     * 备注
     */
    public summary: string;

    /**
     * 产品代码
     */
    public fundCode: string;

    /**
     * 产品名称
     */
    public fundName: string;

    /**
     * 产品序号
     */
    public fundNo: number;

    /**
     * 资产单元序号
     */
    public assetUnitNo: number;
}
export class ProdEscrowAccountInfoReqVO extends BaseReqVO {
    /**
     * 现金帐户序列号
     */
    public escrowAccountNo: number;

    /**
     * 帐户名称
     */
    public accountName: string;

    /**
     * 银行账号
     */
    public accountCode: string;

    /**
     * 帐户类型
     */
    public accountType: string;

    /**
     * 币种类型
     */
    public currencyCode: string;

    /**
     * 开户行
     */
    public openBank: string;

    /**
     * 支付系统行号
     */
    public paymentSystemNumber: string;

    /**
     * 开户日期
     */
    public openDate: Date;

    /**
     * 备注
     */
    public summary: string;

    /**
     * 产品代码
     */
    public fundCode: string;

    /**
     * 产品名称
     */
    public fundName: string;

    /**
     * 产品序号
     */
    public fundNo: number;

    /**
     * 资产单元序号
     */
    public assetUnitNo: number;
}
