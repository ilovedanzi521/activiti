import { BaseReqVO, BaseRepVO } from "../../common/vo/BaseVO";
export class ProdAssetAccountRepVO extends BaseRepVO {
    /**
     * 资金帐户序列号
     */
    private assetAccountNo: string;

    /**
     * 资金帐户
     */
    private accountCode: string;

    /**
     * 帐户名称
     */
    private accountName: string;

    /**
     * 账户类型
     */
    private accountType: string;

    /**
     * 客户号
     */
    private customerCode: string;

    /**
     * 资金密码
     */
    private assetPassword: string;

    /**
     * 交易密码
     */
    private tradePassword: string;

    /**
     * 券商序列号
     *
    private brokerNo: string ;

    /**
     * 营业部序列号
     */
    private departmentNo: string;

    /**
     * 状态
     */
    private accountStatus: string;

    /**
     * 委托方式
     */
    private operWay: string;

    /**
     * 备注
     */
    private remark: string;

    /**
     * 券商名称
     */
    private brokerName: string;

    /**
     * 营业部号
     */
    private departmentCode: string;
}

export class ProdAssetAccountReqVO extends BaseReqVO {
    /**
     * 营业部序号
     */
    public departmentNo: string;

    /**
     * 营业部号
     */
    public departmentCode: string;

    /**
     * 券商代码
     */
    public brokerCode: string;

    /**
     * 现金帐户序号
     */
    public assetAccountNo: string;

    /**
     * 产品序号
     */
    public fundNo: string;

    /**
     * 券商序列号
     */
    public brokerNo: string;

    /**
     * 客户号
     */
    public customerNumber: string;
}
