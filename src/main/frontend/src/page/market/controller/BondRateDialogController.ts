/* @BondRateDetailController 债券折算率详情controller
 * @Author: lixiuquan
 * @Date: 2019-06-13 14:01:33
 * @Last Modified by: lixiuquan
 * @Last Modified time: 2019-06-13 19:34:05
 */

import { Component } from "vue-property-decorator";
import BaseController from "../../common/controller/BaseController";
import BondRateDialogService from "../service/BondRateDialogService";
import {
    ParamBondBaseReqVO,
    ParamBondConversionRateEntity
} from "../vo/ParamBondReqVO";
import { ParamBondRateDialogRules } from "../vo/ParamBondRulesVO";
import { WinRspType } from "../../common/enum/BaseEnum";
import { BondConstant } from "../const/BondConstant";
import { WinResponseData } from "../../common/vo/BaseVO";
import { OperationTypeEnum } from "../../common/enum/OperationTypeEnum";

@Component({ components: {} })
export default class BondRateDialogController extends BaseController {
    // 债券折算率详情服务
    public service: BondRateDialogService = new BondRateDialogService();
    // $refs引用声明
    public $refs!: {};

    // 标题
    private myTitle: string = "";
    // 标题窗口类别  0-新增 1-编辑 2-删除
    private myTitleType: OperationTypeEnum;
    // 窗口显示控制
    private dialogFormVisible: boolean = false;
    // 表单所有数据禁用控制
    private allDisabled: boolean = false;
    // 表单证券代码禁用控制
    private isCodeDisabled: boolean = false;
    // 表单提交按钮控制
    private isSubmitDisabled: boolean = true;

    // 表单数据
    private form: ParamBondConversionRateEntity = new ParamBondConversionRateEntity();
    // 展示的折算率
    private conversionRate: string = "";

    // 表单提交规则设置
    private rateDetailRules: ParamBondRateDialogRules = new ParamBondRateDialogRules();

    /**
     * 下拉框
     */
    // 证券代码
    private securitySelect: any[] = [];

    // 选中多选行
    private multipleSelection: any[] = [];

    // 提交按钮
    private dialogSumbitText: string = "";

    /**
     * 初始化
     */
    public mounted() {
        /**
         * 初始化证券代码下拉框
         */
        this.publicOutCodeSelectFun(null);
    }

    /**
     * 表单数据重置 公共方法
     */
    public publicClearForm() {
        this.form = new ParamBondConversionRateEntity();
    }

    /**
     * 新增页面时查询外部已存在证券代码和类别  公共方法
     */
    public publicOutCodeSelectFun(query: any) {
        const codeParam = new ParamBondBaseReqVO();
        codeParam.reqPageNum = 1;
        codeParam.reqPageSize = 10;
        if (query !== null && query !== "") {
            codeParam.securityCode = query;
        }
        this.service.findCodeList(codeParam).then((res: WinResponseData) => {
            if (res.winRspType === WinRspType.SUCC) {
                this.securitySelect = res.data.list;
            }
        });
    }
    /**
     * 新增页面根据选择框输入查询外部已存在证券代码和类别
     */
    public outCodeSelectFun(query: any) {
        this.publicOutCodeSelectFun(query);
    }

    /**
     * 证券代码下拉框下拉触发事件
     */
    public visibleChangeTrigger() {
        this.publicOutCodeSelectFun(null);
    }

    // 父组件新增信息进入时的初始化函数
    public addClickme(title: string, able: boolean): any {
        // 标题等参数
        this.myTitle = title;
        this.dialogSumbitText = BondConstant.CONFIRM_NAME;
        this.dialogFormVisible = able;
        this.allDisabled = false;
        // 证券代码下拉框放开
        this.isCodeDisabled = false;
        this.myTitleType = OperationTypeEnum.ADD;
        // 表单校验
        this.rateDetailRules = new ParamBondRateDialogRules();
    }
    // 父组件编辑信息进入的初始化函数
    public editClickme(title: string, able: boolean, row: any): any {
        // 标题等参数
        this.myTitle = title;
        this.dialogSumbitText = BondConstant.CONFIRM_NAME;
        this.dialogFormVisible = able;
        this.form = this.copy(row);
        this.allDisabled = false;
        // 证券代码下拉框锁定
        this.isCodeDisabled = true;
        this.myTitleType = OperationTypeEnum.UPDATE;
        this.isSubmitDisabled = true;
        // 表单校验
        this.rateDetailRules = new ParamBondRateDialogRules();
    }
    // 父组件删除信息进入的初始化函数
    public deleteClickme(title: string, able: boolean, row: any): any {
        // 标题等参数
        this.myTitle = title;
        this.dialogSumbitText = BondConstant.DELETE_NAME;
        this.dialogFormVisible = able;
        this.form = this.copy(row);
        this.allDisabled = true;
        this.myTitleType = OperationTypeEnum.DELETE;
        this.isSubmitDisabled = true;
        // 取消表单校验
        this.rateDetailRules = null;
    }
    /**
     * 父组件查看详情进入的初始化函数
     */
    public viewClickme(title: string, able: boolean, row: any): any {
        // 标题等参数
        this.myTitle = title;
        this.dialogFormVisible = able;
        this.form = this.copy(row);
        this.allDisabled = true;
        this.myTitleType = OperationTypeEnum.VIEW;
        this.isSubmitDisabled = false;
        // 取消表单校验
        this.rateDetailRules = null;
    }

    // 数据提交事件监听
    public dialogFormSubmit(formName: string) {
        this.$refs[formName].validate((valid: any) => {
            if (valid) {
                // 当为新增债券折算率提交时
                if (this.myTitleType === OperationTypeEnum.ADD) {
                    this.service
                        .addBondRate(this.form)
                        .then((res: WinResponseData) => {
                            if (res.winRspType === WinRspType.SUCC) {
                                // 给父组件通知
                                this.$emit("getFormData", {
                                    myTitleType: this.myTitleType,
                                    msg: res.msg
                                });
                                this.dialogFormVisible = false;
                            } else {
                                this.win_message_error(res.msg);
                            }
                        });
                }
                // 当为修改债券折算率提交时
                if (this.myTitleType === OperationTypeEnum.UPDATE) {
                    this.service
                        .updateBondRate(this.form)
                        .then((res: WinResponseData) => {
                            if (res.winRspType === WinRspType.SUCC) {
                                // 给父组件通知
                                this.$emit("getFormData", {
                                    myTitleType: this.myTitleType,
                                    msg: res.msg
                                });
                                this.dialogFormVisible = false;
                            } else {
                                this.win_message_error(res.msg);
                            }
                        });
                }
                // 当为删除债券折算率提交时
                if (this.myTitleType === OperationTypeEnum.DELETE) {
                    this.service
                        .deleteBondRate(this.form.id.toString())
                        .then((res: WinResponseData) => {
                            if (res.winRspType === WinRspType.SUCC) {
                                // 给父组件通知
                                this.$emit("getFormData", {
                                    myTitleType: this.myTitleType,
                                    msg: res.msg
                                });
                                this.dialogFormVisible = false;
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

    // 右上角关闭点击事件监听
    public handleClose(done: any) {
        done();
        this.undoForm("ruleForm");
    }

    /**
     * 取消提交,关闭窗口，清空表单
     * @param formName
     */
    public undoForm(formName: string) {
        this.dialogFormVisible = false;
        // 清空表单数据和格式
        this.$refs[formName].clearValidate();
        this.publicClearForm();
        // 回调父组件传值
        this.$emit("getFormData", { undo: true });
    }
}
