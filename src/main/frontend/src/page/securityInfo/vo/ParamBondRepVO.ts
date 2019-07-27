import { BaseRepVO } from "../../common/vo/BaseVO";

export class ParamBondInfoRepVO extends BaseRepVO {
    /**
     * 证券代码
     */
    public securityCode: string = "";

    /**
     * 证券类别
     */
    public securityType: string = "";

    /**
     * 付息类型：1-一次还本付息2-付息3-贴现
     */
    public payInterestType: string = "";

    /**
     * 起息日
     */
    public valueDate: string = "";

    /**
     * 止息日
     */
    public stopDate: string = "";

    /**
     * 到期日
     */
    public dueDate: string = "";

    /**
     * 利率类型：1-固定2-浮动
     */
    public rateType: string = "";

    /**
     * 基准类型
     */
    public baseType: string = "";

    /**
     * 计息基准
     */
    public interestStandard: string = "";

    /**
     * 票面利率
     */
    public couponRate: string = "";

    /**
     * 当前面额
     */
    public currentAmount: string = "";

    /**
     * 发行价
     */
    public issuePrice: string = "";

    /**
     * 年付息次数
     */
    public yearPaymentCount: number = null;

    /**
     * 报价方式：0-全价1-净价
     */
    public priceType: string = "";

    /**
     * 债券期次
     */
    public bondIssue: number;

    /**
     * 期限
     */
    public deadline: number;

    /**
     * 内部评级
     */
    public internalRating: string = "";

    /**
     * 外部评级
     */
    public externalRating: string = "";

    /**
     * 本金偿还类型：1-到期2-提前
     */
    public capitalPayType: string = "";

    /**
     * 保底利率
     */
    public minRate: string = "";

    /**
     * 托管机构：0-无1-中债登2-上清所
     */
    public trusteeAgency: string = "";

    /**
     * 是否可赎回：0-否1-是
     */
    public isRedeemable: string = "";

    /**
     * 赎回日期
     */
    public redeemDate: string = "";

    /**
     * 赎回价格
     */
    public redeemPrice: number = null;

    /**
     * 是否可回售：0-否1-是
     */
    public isPutBack: string = "";

    /**
     * 回售日期
     */
    public putDate: string = "";

    /**
     * 回售价格
     */
    public putPrice: number = null;

    /**
     * 回售登记开始日
     */
    public putRegisterStart: string = "";

    /**
     * 回售登记结束日
     */
    public putRegisterEnd: string = "";

    /**
     * 转股开始日
     */
    public shareTransferStart: string = "";

    /**
     * 转股结束日
     */
    public shareTransferEnd: string = "";

    /**
     * 转股价
     */
    public conversionPrice: number;
}
