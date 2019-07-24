/* @ 产品信息VO
 * @Author: lixiuquan
 * @Date: 2019-06-23 14:01:33
 * @Last Modified by: lixiuquan
 * @Last Modified time: 2019-06-23 19:34:05
 */

import { BaseRepVO } from "../../common/vo/BaseVO";
import { OperationTypeEnum } from "../../common/enum/OperationTypeEnum";
import { ProductInfoConstant } from "../const/ProdFundInfoConst";

/**
 * 表单数据和表格的行对应
 */
export class ProdInfoVO extends BaseRepVO {
    /**
     * 所属委托人
     */
    public consignorNo: number = null;
    /**
     * 二级委托人
     */
    public subConsignorNo: number = null;
    /**
     * 产品序号
     */
    private no: number;

    /**
     * 产品代码
     */
    private code: string;

    /**
     * 产品简称
     */
    private shortName: string;

    /**
     * 产品全称
     */
    private name: string;

    /**
     * 产品类型
     */
    private type: string;

    /**
     * 所属委托人名称
     */
    private consignorName: string;

    /**
     * 二级委托人名称
     */
    private subConsignorName: string;

    /**
     * 产品份额
     */
    private prodShare: number;

    /**
     * 资产币种
     */
    private assetCury: string;

    /**
     * 募集币种
     */
    private collectCury: string;

    /**
     * 状态
     */
    private status: string;
}

/**
 * 产品数据字典项
 */
export let ProdDicEntity = {
    // 产品类型字典
    type: [],
    // 产品状态字典
    status: [],
    // 资产币种字典
    assetCury: [],
    // 募集币种字典
    collectCury: []
};

/**
 * 产品非字典项下拉框项
 */
export let ProdSelectEntity = {
    // 一级委托人下拉框
    consignorSelect: [],
    // 二级委托人下拉框
    subConsignorSelect: [],
    // 二级委托人所有数据
    allSubConsignorSelect: []
};

/**
 * 产品详情弹出框控制属性
 */
export class ProdInfoDialogControl {
    // 标题
    public myTitle: string = "";
    // 标题窗口类别  ADD-新增 UPDATE-编辑 DELETE-删除
    public myTitleType: OperationTypeEnum;
    // 窗口显示控制
    public dialogFormVisible: boolean = false;
    // 表单所有数据禁用控制
    public allDisabled: boolean = false;
    // 产品代码下拉禁用控制
    public codeDisabled: boolean = false;
    // 委托人整体下拉框锁定控制
    public consignorDisabled: boolean = false;
    // 提交按钮
    public dialogSumbitText: string = "";
    // 提交按钮显示控制
    public isSubmitShow: boolean = true;
    // 产品委托人显示控制
    public isConsignorDisabled: boolean = false;
    // 产品二级委托人显示控制
    public isSubConsignorDisabled: boolean = false;
    // 产品代码显示控制
    public isCodeDisabled: boolean = false;

    /**
     * 新增初始化
     * @param title
     * @param able
     */
    public addInit(title: string, able: boolean) {
        // 标题
        this.myTitle = title;
        this.dialogSumbitText = ProductInfoConstant.CONFIRM_NAME;
        this.dialogFormVisible = able;
        this.allDisabled = false;
        this.codeDisabled = false;
        this.myTitleType = OperationTypeEnum.ADD;
        this.isSubmitShow = true;
    }

    /**
     * 修改初始化
     * @param title
     * @param able
     * @param row
     */
    public updateInit(title: string, able: boolean, row: any) {
        this.myTitle = title;
        this.dialogSumbitText = ProductInfoConstant.CONFIRM_NAME;
        this.dialogFormVisible = able;
        this.codeDisabled = true;
        this.consignorDisabled = true;
        this.allDisabled = false;
        this.myTitleType = OperationTypeEnum.UPDATE;
        this.isSubmitShow = true;
        this.isConsignorDisabled = true;
        this.isSubConsignorDisabled = true;
        this.isCodeDisabled = true;
    }

    /**
     * 删除初始化
     * @param title
     * @param able
     */
    public deleteInit(title: string, able: boolean) {
        this.myTitle = title;
        this.dialogSumbitText = ProductInfoConstant.DELETE_NAME;
        this.dialogFormVisible = able;
        this.allDisabled = true;
        this.myTitleType = OperationTypeEnum.DELETE;
        this.isSubmitShow = true;
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
        this.isSubmitShow = false;
    }
}
