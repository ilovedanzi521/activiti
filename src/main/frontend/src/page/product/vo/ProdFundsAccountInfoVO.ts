import { BaseReqVO, BaseRepVO } from "../../common/vo/BaseVO";
export class ProdFundsAccountInfoRepVO extends BaseRepVO {
    /**
     * 银行序列号
     */
    public bankNo: string;

    /**
     * 现金帐户序号
     */
    public cashAccountNo: string;

    /**
     * 产品序号
     */
    public fundNo: string;

    /**
     * 券商序列号
     */
    public brokerNo: string;

    /**
     * 币种代码
     */
    public currencyCode: string;

    /**
     * 银行/券商账户编码
     */
    public accountNumber: string;

    /**
     * 资金账户-资金密码
     */
    public cashPassword: string;

    /**
     * 资金账户-交易密码
     */
    public tradePassword: string;

    /**
     * 资金账户类型
     */
    public cashAccountType: string;

    /**
     * 备注
     */
    public remark: string;

    /**
     * 账户类型
     */
    public accountType: string;

    /**
     * 现金帐户名称
     */
    public cashAccountName: string;

    /**
     * 资金帐户状态
     */
    public cashAccountState: string;

    /**
     * 开户行
     */
    public openBank: string;

    /**
     * 开户行地址
     */
    public openBankAddress: string;

    /**
     * 开户日期
     */
    public openDate: string;

    /**
     * 销户日期
     */
    public cancelDate: string;

    /**
     * 账户状态
     */
    public accountStatus: string;

    /**
     * 银行名称
     */
    public bankName: string;

    /**
     * 产品代码
     */
    public fundCode: string;

    /**
     * 产品名称
     */
    public fundName: string;

    /**
     * 券商代码
     */
    public brokerCode: string;

    /**
     * 券商名称
     */
    public brokerName: string;

    /**
     * 券商类型
     */
    public brokerType: string;

    /**
     * 营业部序号
     */
    public departmentNo: string;

    /**
     * 营业部号
     */
    public departmentCode: string;

    /**
     * 营业部名称
     */
    public departmentName: string;

    /**
     * 营业部地址
     */
    public departmentAddress: string;

    /**
     * 客户号
     */
    public customerNumber: string;
}

export class ProdFundsAccountInfoReqVO extends BaseReqVO {
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
     * 银行序列号
     */
    public bankNo: string;

    /**
     * 现金帐户序号
     */
    public cashAccountNo: string;

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
