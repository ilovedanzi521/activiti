/* @BondSerialDetailController 债券分期还本详情框Controller
 * @Author: lixiuquan
 * @Date: 2019-06-13 14:01:33
 * @Last Modified by: lixiuquan
 * @Last Modified time: 2019-06-13 19:34:05
 */

import { Component } from "vue-property-decorator";
import BaseController from "../../common/controller/BaseController";
import BondSerialDialogService from "../service/BondSerialDialogService";
import {
    ParamBondBaseReqVO,
    ParamBondSerialEntity
} from "../vo/ParamBondReqVO";
import DicService from "../../dictionary/service/DicService";
import { BondConstant } from "../const/BondConstant";
import { ParamBondSerialDialogRules } from "../vo/ParamBondRulesVO";
import { WinRspType } from "../../common/enum/BaseEnum";
import numberUtils from "../../common/util/NumberUtils";
import { WinResponseData } from "../../common/vo/BaseVO";
import { OperationTypeEnum } from "../../common/enum/OperationTypeEnum";
import { ParamBondSerialDicEntity } from "../vo/ParamBondInfoEntity";

/**
 * 债券分期还本详情框控制器Controller
 */
@Component({ components: {} })
export default class BondSerialDetailController extends BaseController {
    // 债券折算率详情服务
    public service: BondSerialDialogService = new BondSerialDialogService();
    // 数据字典服务
    public dicService: DicService = new DicService();
    // $refs引用声明
    public $refs!: {};

    // 标题(区分新增、修改、删除)
    private myTitle: string = "";
    // 标题窗口类别  0-新增 1-编辑 2-删除
    private myTitleType: OperationTypeEnum;
    // 窗口显示控制
    private dialogFormVisible: boolean = false;
    // 表单所有数据禁用控制
    private allDisabled: boolean = false;
    // 证券代码下拉框禁用控制
    private isCodeDisabled: boolean = false;
    // 表单提交按钮控制
    private isSubmitDisabled: boolean = true;

    // 表单数据
    private form: ParamBondSerialEntity = new ParamBondSerialEntity();
    // 展示的偿还比例值
    private repayRate: string = "";

    // 表单提交规则设置
    private serialDetailRules: ParamBondSerialDialogRules = new ParamBondSerialDialogRules();

    /**
     * 下拉框
     */
    // 证券代码和类别
    private securitySelect: any[] = [];
    // 分期偿还数据字典
    private bondSerialDicEntity = ParamBondSerialDicEntity;

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
        this.form = new ParamBondSerialEntity();
    }

    /**
     * 新增页面时查询外部已存在证券代码和类别 公共方法
     */
    public publicOutCodeSelectFun(query: any) {
        const codeParam = new ParamBondBaseReqVO();
        codeParam.reqPageNum = 1;
        codeParam.reqPageSize = 10;
        if (query !== null && query !== "") {
            codeParam.securityCode = query;
        }
        this.service.findCodeList(codeParam).then((res: WinResponseData) => {
            if (res.winRspType === WinRspType.ERROR) {
                this.win_message_error(res.msg);
            } else {
                this.securitySelect = res.data.list;
            }
        });
    }

    /**
     * 新增页面时查询外部已存在证券代码和类别
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
        // 标题等属性
        this.myTitle = title;
        this.dialogSumbitText = BondConstant.CONFIRM_NAME;
        this.dialogFormVisible = able;
        this.allDisabled = false;
        // 编辑时代码下拉框启用
        this.isCodeDisabled = false;
        this.myTitleType = OperationTypeEnum.ADD;
        // 表单校验
        this.serialDetailRules = new ParamBondSerialDialogRules();
    }
    // 父组件编辑信息进入的初始化函数
    public editClickme(title: string, able: boolean, row: any): any {
        // 标题等属性
        this.myTitle = title;
        this.dialogSumbitText = BondConstant.CONFIRM_NAME;
        this.dialogFormVisible = able;
        this.form = this.copy(row);
        this.allDisabled = false;
        // 编辑时代码下拉框禁用
        this.isCodeDisabled = true;
        this.myTitleType = OperationTypeEnum.UPDATE;
        // 表单校验
        this.serialDetailRules = new ParamBondSerialDialogRules();
    }
    // 父组件删除信息进入的初始化函数
    public deleteClickme(title: string, able: boolean, row: any): any {
        // 标题等属性
        this.myTitle = title;
        this.dialogSumbitText = BondConstant.DELETE_NAME;
        this.dialogFormVisible = able;
        this.form = this.copy(row);
        this.allDisabled = true;
        this.myTitleType = OperationTypeEnum.DELETE;
        // 取消表单校验
        this.serialDetailRules = null;
    }
    /**
     * 父组件查看详情进入的初始化函数
     */
    public viewClickme(title: string, able: boolean, row: any): any {
        // 标题等属性
        this.myTitle = title;
        this.dialogFormVisible = able;
        this.form = this.copy(row);
        this.allDisabled = true;
        this.myTitleType = OperationTypeEnum.VIEW;
        this.isSubmitDisabled = false;
        // 取消表单校验
        this.serialDetailRules = null;
    }

    // 数据提交事件监听
    public dialogFormSubmit(formName: string) {
        this.$refs[formName].validate((valid: any) => {
            if (valid) {
                // 新增
                if (this.myTitleType === OperationTypeEnum.ADD) {
                    this.service
                        .addBondSerial(this.form)
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
                // 编辑
                if (this.myTitleType === OperationTypeEnum.UPDATE) {
                    this.service
                        .updateBondSerial(this.form)
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
                // 删除
                if (this.myTitleType === OperationTypeEnum.DELETE) {
                    this.service
                        .deleteBondSerial(this.form.id.toString())
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

    // 取消提交,关闭窗口，清空表单
    public undoForm(formName: string) {
        this.dialogFormVisible = false;
        // 清空表单数据和格式
        this.$refs[formName].clearValidate();
        this.publicClearForm();
        // 回调父组件传值
        this.$emit("getFormData", { undo: true });
    }
}
