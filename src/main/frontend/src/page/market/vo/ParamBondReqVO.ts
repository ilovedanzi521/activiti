import { BaseReqVO } from "../../common/vo/BaseVO";

export class ParamBondReqVO extends BaseReqVO {
    /**
     * 证券内码
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
     * 利率类型：1-固定2-浮动
     */
    public rateType: string = "";

    /**
     * 证券类别数组
     */
    public securityTypeList: string[] = [];

    /**
     * 付息类型数组
     */
    public payInterestTypeList: string[] = [];

    /**
     * 利率类型数组
     */
    public rateTypeList: string[] = [];
}

export class ParamBondBaseReqVO extends BaseReqVO {
    /**
     * 证券内码
     */
    public securityCode: string = "";
}

export class ParamBondInfoReqVO extends BaseReqVO {
    /**
     * 证券内码
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
    public couponRate: number;

    /**
     * 当前面额
     */
    public currentAmount: number;

    /**
     * 发行价
     */
    public issuePrice: number;

    /**
     * 年付息次数
     */
    public yearPaymentCount: number;

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
    public minRate: number;

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
    public redeemPrice: number;

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
    public putPrice: string = "";

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

export class ParamBondConversionRateEntity {
    /**
     * id
     */
    public id: string;
    /**
     * 证券内码
     */
    public securityCode: string = "";

    /**
     * 折算率
     */
    public conversionRate: string;

    /**
     * 日期
     */
    public conversionDate: string = "";
}

export class ParamBondSerialEntity {
    /**
     * id
     */
    public id: string;
    /**
     * 证券内码
     */
    public securityCode: string = "";

    /**
     * 分期偿还类型: 1-减少面值、2-减少持仓
     */
    public amortizeType: string = "";

    /**
     * 偿还比例
     */
    public repayRate: string;

    /**
     * 偿还日期
     */
    public repayDate: string = "";
}
