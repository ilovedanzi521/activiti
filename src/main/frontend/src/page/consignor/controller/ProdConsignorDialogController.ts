/* @ProdConsignorDialogController 委托人详情controller
 * @Author: lixiuquan
 * @Date: 2019-06-13 14:01:33
 * @Last Modified by: lixiuquan
 * @Last Modified time: 2019-06-13 19:34:05
 */

import { Component } from "vue-property-decorator";
import BaseController from "../../common/controller/BaseController";
import { WinResponseData } from "../../common/vo/BaseVO";
import { WinRspType } from "../../common/enum/BaseEnum";
import { OperationTypeEnum } from "../../common/enum/OperationTypeEnum";
import ProdConsignorDialogService from "../service/ProdConsignorDialogService";
import { ProdConsignorRules } from "../vo/ProdConsignorRulesVO";
import {
    ProdConsignorVO,
    ConsignorDicEntity,
    ConsignorDialogControl
} from "../vo/ProdConsignorEntityVO";

@Component({})
export default class ProdConsignorDialogController extends BaseController {
    // $refs引用声明
    public $refs!: {};
    // service声明
    private consignorDialogService = new ProdConsignorDialogService();

    // 表单数据
    private form: ProdConsignorVO = new ProdConsignorVO();
    // 其他控制属性
    private consignorDialogControl = new ConsignorDialogControl();
    // 表单校验规则
    private consignorDialogRules = new ProdConsignorRules(true);

    /**
     * 下拉框
     */
    // 数据字典
    private consignorDicEntity = ConsignorDicEntity;

    /**
     * 父组件新增委托人事件监听
     */
    public addClickme(title: string, able: boolean) {
        // 控制实例新增初始化函数调用
        this.consignorDialogControl.addInit(title, able);
    }

    /**
     * 父组件编辑信息进入的初始化函数
     */
    public editClickme(title: string, able: boolean, row: any): any {
        this.consignorDialogControl.updateInit(title, able, row);
        this.form = this.copy(row);
    }

    /**
     * 父组件删除信息进入的初始化函数
     */
    public deleteClickme(title: string, able: boolean, row: any): any {
        this.consignorDialogControl.deleteInit(title, able);
        this.form = this.copy(row);
    }
    /**
     * 父组件查看详情进入的初始化函数
     */
    public viewClickme(title: string, able: boolean, row: any): any {
        this.consignorDialogControl.viewInit(title, able);
        this.consignorDialogRules = new ProdConsignorRules(false);
        this.form = this.copy(row);
    }

    /**
     * 数据提交事件监听
     */
    public dialogFormSubmit(formName: string) {
        this.$refs[formName].validate((valid: any) => {
            if (valid) {
                // 当为新增委托人信息提交时
                if (
                    this.consignorDialogControl.myTitleType ===
                    OperationTypeEnum.ADD
                ) {
                    this.consignorDialogService
                        .insertConsignorInfo(this.form)
                        .then((res: WinResponseData) => {
                            if (res.winRspType === WinRspType.SUCC) {
                                // 回调父组件传值
                                this.$emit("getFormData", {
                                    myTitleType: this.consignorDialogControl
                                        .myTitleType,
                                    msg: res.msg
                                });
                                this.consignorDialogControl.dialogFormVisible = false;
                            } else {
                                this.win_message_error(res.msg);
                            }
                        });
                }
                // 当为修改委托人信息提交时
                if (
                    this.consignorDialogControl.myTitleType ===
                    OperationTypeEnum.UPDATE
                ) {
                    this.consignorDialogService
                        .updateConsignorInfo(this.form)
                        .then((res: WinResponseData) => {
                            if (res.winRspType === WinRspType.SUCC) {
                                // 回调父组件传值
                                this.$emit("getFormData", {
                                    myTitleType: this.consignorDialogControl
                                        .myTitleType,
                                    msg: res.msg
                                });
                                this.consignorDialogControl.dialogFormVisible = false;
                            } else {
                                this.win_message_error(res.msg);
                            }
                        });
                }
                // 当为删除委托人信息提交时
                if (
                    this.consignorDialogControl.myTitleType ===
                    OperationTypeEnum.DELETE
                ) {
                    this.consignorDialogService
                        .deleteConsignorInfo(this.form.id.toString())
                        .then((res: WinResponseData) => {
                            if (res.winRspType === WinRspType.SUCC) {
                                // 回调父组件传值
                                this.$emit("getFormData", {
                                    myTitleType: this.consignorDialogControl
                                        .myTitleType,
                                    msg: res.msg
                                });
                                this.consignorDialogControl.dialogFormVisible = false;
                            } else {
                                this.win_message_error(res.msg);
                            }
                        });
                }
            } else {
                this.win_message_error("表单校验失败！");
                return false;
            }
        });
    }

    /**
     * 右上角关闭点击事件监听
     */
    public handleClose(done: any) {
        done();
        this.undoForm("ruleForm");
    }

    /**
     * 取消提交,关闭窗口，清空表单
     */
    public undoForm(formName: string) {
        this.consignorDialogControl.dialogFormVisible = false;
        // 清空表单数据和格式
        this.$refs[formName].clearValidate();
        // 回调父组件传值
        this.$emit("getFormData", {
            undo: true
        });
    }
}
