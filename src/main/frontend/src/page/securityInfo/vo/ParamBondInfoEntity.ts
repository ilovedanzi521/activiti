/* @ 债券信息VO
 * @Author: lixiuquan
 * @Date: 2019-06-13 14:01:33
 * @Last Modified by: lixiuquan
 * @Last Modified time: 2019-06-13 19:34:05
 */

import { OperationTypeEnum } from "../../common/enum/OperationTypeEnum";
import { BondConstant } from "../const/BondConstant";

/**
 * 债券部分数据字典项
 */
export let ParamBondDicEntity = {
    // 付息类型字典
    payInterestType: [],
    // 利率类型字典
    rateType: [],
    // 基准类型字典
    baseType: [],
    // 计息基准字典
    interestStandard: [],
    // 是否可赎回字典
    isRedeemable: [],
    // 内部评级字典
    internalRating: [],
    // 外部评级字典
    externalRating: [],
    // 报价方式字典
    priceType: [],
    // 本金偿还类型字典
    capitalPayType: [],
    // 机构托管字典
    trusteeAgency: [],
    // 是否可回售字典
    isPutBack: [],

    // 可转股债券字典
    transSecurityType: [],
    // 交易市场字典
    marketType: [],
    // 数据来源字典
    dataSource: []
};

/**
 * 分期还本数据字典项
 */
export let ParamBondSerialDicEntity = {
    // 分期偿还数据字典
    amortizeType: [],
    // 交易市场字典
    marketType: []
};

/**
 * 分期还本数据字典项
 */
export let ParamRateChangeEntity = {
    // 交易市场字典
    marketType: []
};

/**
 * 证券类别（关联外部证券类别信息）数据声明
 */
export let SecuritySelect = {
    securityTypeSelect: []
};

/**
 * 债券基本信息弹出框控制属性
 */
export class ParamBondInfoDialogControl {
    // 标题
    public myTitle: string = "";
    // 标题窗口类别  ADD-新增 UPDATE-编辑 DELETE-删除
    public myTitleType: OperationTypeEnum;
    // 窗口显示控制
    public dialogFormVisible: boolean = false;
    // 表单所有数据禁用控制
    public allDisabled: boolean = false;
    // 转股属性控制
    public isShareTransferAble: boolean = false;
    // 证券代码输入禁用控制
    public codeDisabled: boolean = false;
    // 证券类别下拉框锁定控制
    public isTypeAble: boolean = false;
    // 是否可赎回输入框控制
    public isRedeemableDisabled: boolean = false;
    // 是否可回售输入框控制
    public isPutBackDisabled: boolean = false;
    // 提交按钮
    public dialogSumbitText: string = "";
    // 提交按钮显示控制
    public isSubmitDisabled: boolean = true;

    /**
     * 新增初始化
     * @param title
     * @param able
     */
    public addInit(title: string, able: boolean) {
        // 标题
        this.myTitle = title;
        this.dialogSumbitText = BondConstant.CONFIRM_NAME;
        this.dialogFormVisible = able;
        this.allDisabled = false;
        this.codeDisabled = false;
        this.myTitleType = OperationTypeEnum.ADD;
        this.isSubmitDisabled = true;
    }

    /**
     * 修改初始化
     * @param title
     * @param able
     * @param row
     */
    public updateInit(title: string, able: boolean, row: any) {
        this.myTitle = title;
        this.dialogSumbitText = BondConstant.CONFIRM_NAME;
        this.dialogFormVisible = able;
        this.codeDisabled = true;
        this.allDisabled = false;
        this.myTitleType = OperationTypeEnum.UPDATE;
        this.isSubmitDisabled = true;

        // 是否可赎回控制框
        if (row.isRedeemable === "0") {
            this.isRedeemableDisabled = true;
        } else if (row.isRedeemable === "1") {
            this.isRedeemableDisabled = false;
        }
        // 是否可回售控制框
        if (row.isPutBack === "0") {
            this.isPutBackDisabled = true;
        } else if (row.isPutBack === "1") {
            this.isPutBackDisabled = false;
        }
        // 转股输入框控制
        if (row.securityType === BondConstant.TRANS_SECURITY_TYPE) {
            this.isShareTransferAble = true;
        } else {
            this.isShareTransferAble = false;
        }
    }

    /**
     * 删除初始化
     * @param title
     * @param able
     */
    public deleteInit(title: string, able: boolean) {
        this.myTitle = title;
        this.dialogSumbitText = BondConstant.DELETE_NAME;
        this.dialogFormVisible = able;
        this.allDisabled = true;
        this.myTitleType = OperationTypeEnum.DELETE;
        this.isSubmitDisabled = true;
    }

    /**
     * 查看初始化
     * @param title
     * @param able
     */
    public viewInit(title: string, able: boolean) {
        this.myTitle = title;
        this.dialogFormVisible = able;
        this.allDisabled = true;
        this.myTitleType = OperationTypeEnum.VIEW;
        this.isSubmitDisabled = false;
    }
}
