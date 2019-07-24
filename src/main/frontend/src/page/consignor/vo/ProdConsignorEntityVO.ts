/* @ 委托人信息VO
 * @Author: lixiuquan
 * @Date: 2019-06-23 14:01:33
 * @Last Modified by: lixiuquan
 * @Last Modified time: 2019-06-23 19:34:05
 */

import { BaseRepVO } from "../../common/vo/BaseVO";
import { OperationTypeEnum } from "../../common/enum/OperationTypeEnum";
import { ProdConsignorConst } from "../const/ProdConsignorConst";

/**
 * 表单数据和表格的行对应
 */
export class ProdConsignorVO extends BaseRepVO {
    /**
     * 委托人序号
     */
    private no: number;

    /**
     * 委托人编码
     */
    private code: string;

    /**
     * 委托人简称(预留字段)
     */
    private shortName: string;

    /**
     * 委托人名称
     */
    private name: string;

    /**
     * 委托人属性（公司类型）
     */
    private type: string;

    /**
     * 所属公司编码
     */
    private belongCompanyNo: number;

    /**
     * 所属公司名称
     */
    private belongCompanyName: string;

    /**
     * 联系人
     */
    private linkMan: string;

    /**
     * 电话号码
     */
    private telNo: string;

    /**
     * 手机号码
     */
    private mobile: string;

    /**
     * 公司地址
     */
    private address: string;

    /**
     * 邮编
     */
    private zip: string;

    /**
     * 描述
     */
    private summary: string;
}

/**
 * 委托人数据字典项
 */
export let ConsignorDicEntity = {
    // 公司类型字典
    type: []
};

/**
 * 委托人详情弹出框控制属性
 */
export class ConsignorDialogControl {
    // 标题
    public myTitle: string = "";
    // 标题窗口类别  ADD-新增 UPDATE-编辑 DELETE-删除
    public myTitleType: OperationTypeEnum;
    // 窗口显示控制
    public dialogFormVisible: boolean = false;
    // 表单所有数据禁用控制
    public allDisabled: boolean = false;
    // 委托人编码下拉禁用控制
    public codeDisabled: boolean = false;
    // 提交按钮
    public dialogSumbitText: string = "";
    // 提交按钮显示控制
    public isSubmitShow: boolean = true;

    /**
     * 新增初始化
     * @param title
     * @param able
     */
    public addInit(title: string, able: boolean) {
        // 标题
        this.myTitle = title;
        this.dialogSumbitText = ProdConsignorConst.CONFIRM_NAME;
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
        this.dialogSumbitText = ProdConsignorConst.CONFIRM_NAME;
        this.dialogFormVisible = able;
        this.codeDisabled = true;
        this.allDisabled = false;
        this.myTitleType = OperationTypeEnum.UPDATE;
        this.isSubmitShow = true;
    }

    /**
     * 删除初始化
     * @param title
     * @param able
     */
    public deleteInit(title: string, able: boolean) {
        this.myTitle = title;
        this.dialogSumbitText = ProdConsignorConst.DELETE_NAME;
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
