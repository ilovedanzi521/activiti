import { BaseReqVO, BaseRepVO } from "../../common/vo/BaseVO";
export class ProdCapitalAccountRepVO extends BaseRepVO {
    /**
     * 资金帐户序列号
     */
    public capitalAccountNo: string;

    /**
     * 资金帐户
     */
    public accountCode: string;

    /**
     * 帐户名称
     */
    public accountName: string;

    /**
     * 账户类型
     */
    public accountType: string;
    /**
     * 客户号
     */
    public customerCode: string;

    /**
     * 资金密码
     */
    public capitalPassword: string;
    /**
     * 交易密码
     */
    public tradePassword: string;

    /**
     * 券商序列号
     */
    public brokerNo: string;

    /**
     * 营业部序列号
     */
    public departmentNo: string;

    /**
     * 状态 1.正常 2.冻结 3.注销
     */
    public accountStatus: string;

    /**
     * 备注
     */
    public summary: string;

    /**
     * 券商代码
     */
    public brokerCode: string;

    /**
     * 券商名称
     */
    public brokerName: string;

    /**
     * 营业部号
     */
    public departmentCode: string;

    /**
     * 产品序号
     */
    public fundNo: number;

    /**
     * 产品名称
     */
    public fundName: string;

    /**
     * 产品代码
     */
    public fundCode: string;

    /**
     * 委托方式
     */
    public entrustWay: string;

    /**
     * 资产单元序号
     */
    public assetUnitNo: number;
}

export class ProdCapitalAccountReqVO extends BaseReqVO {
    /**
     * 产品序号
     */
    public fundNo: number;

    /**
     * 券商代码
     */
    public brokerCode: string;

    /**
     * 券商名称
     */
    public brokerName: string;

    /**
     * 营业部号
     */
    public departmentCode: string;

    /**
     * 券商序列号
     */
    public brokerNo: string;

    /**
     * 产品名称
     */
    public fundName: string;

    /**
     * 产品代码
     */
    public fundCode: string;

    /**
     * 资金帐户
     */
    public accountCode: string;

    /**
     * 资产单元序号
     */
    public assetUnitNo: number;
}
