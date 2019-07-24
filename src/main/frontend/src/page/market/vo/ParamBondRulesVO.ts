/* @ 债券信息相关表单验证
 * @Author: lixiuquan
 * @Date: 2019-06-13 14:01:33
 * @Last Modified by: lixiuquan
 * @Last Modified time: 2019-06-13 19:34:05
 */

/**
 * 自定义规则
 */
const validateAcquaintance = (rule: any, value: any, callback: any) => {
    // 输入 8--，value 为 8
    // 内部使用了 parseInt() / parseFloat()
    if (value < 0 || value > 100) {
        callback(new Error("数字在 0 至 100 之间"));
    } else {
        callback();
    }
};

/**
 * 自定义校验规则
 */
const rateNumberRule = {
    // 自定义验证
    validator: validateAcquaintance,
    trigger: "blur"
};

/**
 * 选择框change更改校验规则
 */
const selectChangeRule = {
    required: true,
    message: "请选择",
    trigger: "change"
};
/**
 * 选择框blur更改校验规则
 */
const selectBlurRule = {
    required: true,
    message: "请选择",
    trigger: "blur"
};
/**
 * 输入框blur校验规则
 */
const inputBlurRule = {
    required: true,
    message: "请输入",
    trigger: "blur"
};
/**
 * 债券基本信息弹出框表单规则
 */
export class ParamBondInfoDialogRules {
    // 起息日的真实值
    public static valueDateValue: string = "";
    // 回售登记开始日的真实值
    public static putRegisterStartValue: string = "";
    // 转股开始日的真实值
    public static shareTransferStartValue: string = "";

    // 证券代码
    public securityCode: any[];
    public securityType: any[];
    // 付息类型
    public payInterestType: any[];
    // 起息日
    public valueDate: any[];
    public stopDate: any[];
    public dueDate: any[];
    // 字典
    public rateType: any[];
    public baseType: any[];
    public interestStandard: any[];
    // 票面利率
    public couponRate: any[];
    // 当前面额
    public currentAmount: any[];
    // 发行价
    public issuePrice: any[];
    // 年付息次数
    public yearPaymentCount: any[];
    // 报价方式
    public priceType: any[];
    // 债券期次
    public bondIssue: any[];
    // 期限
    public deadline: any[];
    // 外部评级
    public externalRating: any[];
    // 本金偿还类型
    public capitalPayType: any[];
    // 保底利率
    public minRate: any[];
    // 机构托管
    public trusteeAgency: any[];
    // 是否可赎回
    public isRedeemable: any[];
    public redeemDate: any[];
    public redeemPrice: any[];
    // 是否可回售
    public isPutBack: any[];
    public putDate: any[];
    public putPrice: any[];
    public putRegisterStart: any[];
    public putRegisterEnd: any[];
    // 转股
    public shareTransferStart: any[];
    public shareTransferEnd: any[];
    public conversionPrice: any[];

    constructor(type: boolean) {
        if (type) {
            // 静态变量初始化
            ParamBondInfoDialogRules.valueDateValue = "";
            ParamBondInfoDialogRules.putRegisterStartValue = "";
            ParamBondInfoDialogRules.shareTransferStartValue = "";
            // 规则初始化
            this.redeemDate = [];
            this.putRegisterEnd = [];
            this.shareTransferEnd = [];
            this.securityCode = [selectChangeRule];
            this.securityType = [selectChangeRule];
            this.payInterestType = [selectChangeRule];
            this.rateType = [selectChangeRule];
            this.baseType = [selectChangeRule];
            this.interestStandard = [selectChangeRule];
            this.couponRate = [inputBlurRule];
            this.issuePrice = [inputBlurRule];
            this.yearPaymentCount = [inputBlurRule];
            this.priceType = [selectChangeRule];
            this.bondIssue = [inputBlurRule];
            this.deadline = [inputBlurRule];
            this.externalRating = [selectChangeRule];
            this.capitalPayType = [selectChangeRule];
            this.trusteeAgency = [selectChangeRule];
            this.isRedeemable = [selectChangeRule];
            this.isPutBack = [selectChangeRule];
            this.dueDate = [selectBlurRule];
            this.valueDate = [
                selectBlurRule,
                {
                    validator: this.valueDateFun,
                    trigger: "change"
                }
            ];
            this.stopDate = [
                selectBlurRule,
                {
                    validator: this.stopDateFun,
                    trigger: "change"
                }
            ];
        }
    }

    /**
     * 起息日自定义校验规则
     */
    public valueDateFun(rule: any, value: string, callback: any) {
        ParamBondInfoDialogRules.valueDateValue = value;
        callback();
    }

    /**
     * 止息日自定义校验规则
     */
    public stopDateFun(rule: any, value: string, callback: any) {
        if (ParamBondInfoDialogRules.valueDateValue === "") {
            callback();
        }
        if (
            new Date(value).getTime() -
                new Date(ParamBondInfoDialogRules.valueDateValue).getTime() <=
            0
        ) {
            callback(new Error("止息日必须大于起息日！"));
        } else {
            callback();
        }
    }

    /**
     * 回售登记日自定义校验规则
     */
    public putRegisterStartFun(rule: any, value: string, callback: any) {
        ParamBondInfoDialogRules.putRegisterStartValue = value;
        callback();
    }

    /**
     * 回售登记结束日自定义校验规则
     */
    public putRegisterEndFun(rule: any, value: string, callback: any) {
        if (ParamBondInfoDialogRules.putRegisterStartValue === "" && !value) {
            callback();
        }
        if (
            ParamBondInfoDialogRules.putRegisterStartValue &&
            new Date(value).getTime() -
                new Date(
                    ParamBondInfoDialogRules.putRegisterStartValue
                ).getTime() <=
                0
        ) {
            callback(new Error("登记截止日必须大于登记开始日！"));
        }
        if (!ParamBondInfoDialogRules.putRegisterStartValue && value) {
            callback(new Error("请选择回售登记开始日！"));
        }
        if (ParamBondInfoDialogRules.putRegisterStartValue && !value) {
            callback(new Error("请选择回售登记截止日！"));
        }
        callback();
    }

    /**
     * 转股开始日日自定义校验规则
     */
    public shareTransferStartFun(rule: any, value: string, callback: any) {
        ParamBondInfoDialogRules.shareTransferStartValue = value;
        callback();
    }

    /**
     * 转股结束日自定义校验规则
     */
    public shareTransferEndFun(rule: any, value: string, callback: any) {
        if (ParamBondInfoDialogRules.shareTransferStartValue === "" && !value) {
            callback();
        }
        if (
            ParamBondInfoDialogRules.shareTransferStartValue &&
            new Date(value).getTime() -
                new Date(
                    ParamBondInfoDialogRules.shareTransferStartValue
                ).getTime() <=
                0
        ) {
            callback(new Error("转股结束日必须大于转股开始日！"));
        }
        if (!ParamBondInfoDialogRules.shareTransferStartValue && value) {
            callback(new Error("请选择转股开始日！"));
        }
        if (ParamBondInfoDialogRules.shareTransferStartValue && !value) {
            callback(new Error("请选择转股结束日！"));
        }
        callback();
    }

    // 空校验
    public noRulefun(rule: any, value: string, callback: any) {
        callback();
    }

    // 新增赎回校验
    public setRedeemRule(tag: boolean) {
        if (tag) {
            this.redeemDate = [selectBlurRule];
        } else {
            this.redeemDate = [{ validator: this.noRulefun }];
        }
    }
    // 新增回售校验
    public setPutBackRule(tag: boolean) {
        if (tag) {
            this.putRegisterStart = [
                {
                    validator: this.putRegisterStartFun,
                    trigger: "change"
                }
            ];
            this.putRegisterEnd = [
                {
                    validator: this.putRegisterEndFun,
                    trigger: "change"
                }
            ];
        } else {
            this.putRegisterStart = [{ validator: this.noRulefun }];
            this.putRegisterEnd = [{ validator: this.noRulefun }];
        }
    }
    // 新增转股校验
    public setTransRule(tag: boolean) {
        if (tag) {
            this.shareTransferStart = [
                {
                    validator: this.shareTransferStartFun,
                    trigger: "change"
                }
            ];
            this.shareTransferEnd = [
                {
                    validator: this.shareTransferEndFun,
                    trigger: "change"
                }
            ];
        } else {
            this.shareTransferStart = [{ validator: this.noRulefun }];
            this.shareTransferEnd = [{ validator: this.noRulefun }];
        }
    }
}

/**
 * 债券折算率弹出框表单规则
 */
export class ParamBondRateDialogRules {
    public securityCode: any[] = [selectChangeRule];
    // 折算率
    public conversionRate: any[] = [inputBlurRule, rateNumberRule];
    public conversionDate: any[] = [selectBlurRule];
}

/**
 * 债券分期还本弹出框表单规则
 */
export class ParamBondSerialDialogRules {
    public securityCode: any[] = [selectChangeRule];
    public repayDate: any[] = [selectBlurRule];
    public amortizeType: any[] = [selectChangeRule];
    public repayRate: any[] = [inputBlurRule, rateNumberRule];
}
