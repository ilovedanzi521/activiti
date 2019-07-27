/* @BondInfoDialogController 债券基本信息详情弹出框controller
 * @Author: lixiuquan
 * @Date: 2019-06-13 14:01:33
 * @Last Modified by: lixiuquan
 * @Last Modified time: 2019-06-13 19:34:05
 */

import { Component } from "vue-property-decorator";
import BaseController from "../../common/controller/BaseController";
import BondInfoDialogService from "../service/BondInfoDialogService";
import { ParamBondInfoRepVO } from "../vo/ParamBondRepVO";
import { ParamBondBaseReqVO } from "../vo/ParamBondReqVO";
import { BondConstant } from "../const/BondConstant";
import {
    ParamBondDicEntity,
    ParamBondInfoDialogControl,
    SecuritySelect
} from "../vo/ParamBondInfoEntity";
import { ParamBondInfoDialogRules } from "../vo/ParamBondRulesVO";
import { WinResponseData } from "../../common/vo/BaseVO";
import { OperationTypeEnum } from "../../common/enum/OperationTypeEnum";
import { WinRspType } from "../../common/enum/BaseEnum";
import { RedeemableEnum, PutBackEnum } from "../enum/ParamBondEnum";

@Component({ components: {} })
export default class BondInfoDialogController extends BaseController {
    // $refs引用声明
    public $refs!: {
        ruleForm: any;
    };
    // 债券基本信息服务
    private service: BondInfoDialogService = new BondInfoDialogService();

    // 弹出框控制属性
    private BondInfoDialogControl: ParamBondInfoDialogControl = new ParamBondInfoDialogControl();

    // 表单数据
    private form: ParamBondInfoRepVO = new ParamBondInfoRepVO();
    // 票面利率和保底展示值
    private couponRate: string = "";
    private minRate: string = "";
    // 表单提交规则设置
    private infoDetailRules: ParamBondInfoDialogRules = new ParamBondInfoDialogRules(
        false
    );

    /**
     * 下拉框
     */
    // 证券代码
    private securityCodeSelect: any[] = [];
    // 证券类别
    private securitySelect: any = SecuritySelect;
    // 下拉框 数据字典
    private bondDicData = ParamBondDicEntity;

    /**
     * 初始化
     */
    public mounted() {
        // 初始化证券代码下拉框
        this.publicOutCodeSelectFun(null);
    }

    /**
     * 父组件新增信息进入时的初始化函数
     */
    public addClickme(title: string, able: boolean): any {
        // 控制实例新增初始化函数调用
        this.BondInfoDialogControl.addInit(title, able);
        // 表单校验初始化
        this.infoDetailRules = new ParamBondInfoDialogRules(true);
    }
    /**
     * 父组件编辑信息进入的初始化函数
     */
    public editClickme(title: string, able: boolean, row: any): any {
        this.BondInfoDialogControl.updateInit(title, able, row);
        this.form = this.copy(row);
        // 表单校验初始化
        this.infoDetailRules = new ParamBondInfoDialogRules(true);
        // 是否可赎回表单校验
        if (this.form.isRedeemable === RedeemableEnum.ABLE) {
            this.BondInfoDialogControl.isRedeemableDisabled = false;
            this.infoDetailRules.setRedeemRule(true);
        }
        // 是否可回售校验
        if (this.form.isPutBack === PutBackEnum.ABLE) {
            this.BondInfoDialogControl.isPutBackDisabled = false;
            this.infoDetailRules.setPutBackRule(true);
        }
        // 可转股校验
        if (this.service.judgeTransSecurityType(this.form.securityType)) {
            this.BondInfoDialogControl.isShareTransferAble = true;
            this.infoDetailRules.setTransRule(true);
        } else {
            this.infoDetailRules.setTransRule(false);
        }
    }
    /**
     * 父组件删除信息进入的初始化函数
     */
    public deleteClickme(title: string, able: boolean, row: any): any {
        this.BondInfoDialogControl.deleteInit(title, able);
        this.form = this.copy(row);
        // 表单校验初始化
        this.infoDetailRules = new ParamBondInfoDialogRules(true);
        // 可转股
        if (this.service.judgeTransSecurityType(this.form.securityType)) {
            this.BondInfoDialogControl.isShareTransferAble = true;
        }
    }
    /**
     * 父组件查看详情进入的初始化函数
     */
    public viewClickme(title: string, able: boolean, row: any): any {
        this.BondInfoDialogControl.viewInit(title, able);
        this.form = this.copy(row);
        // 表单校验初始化
        this.infoDetailRules = new ParamBondInfoDialogRules(false);
        // 可转股
        if (this.service.judgeTransSecurityType(this.form.securityType)) {
            this.BondInfoDialogControl.isShareTransferAble = true;
        }
    }

    /**
     * 数据提交事件监听
     */
    public dialogFormSubmit(formName: string) {
        this.$refs.ruleForm.validate((valid: any) => {
            if (valid) {
                // 当为新增债券基本信息提交时
                if (
                    this.BondInfoDialogControl.myTitleType ===
                    OperationTypeEnum.ADD
                ) {
                    this.service
                        .addBondInfo(this.form)
                        .then((res: WinResponseData) => {
                            if (res.winRspType === WinRspType.SUCC) {
                                // 回调父组件传值
                                this.$emit("getFormData", {
                                    myTitleType: this.BondInfoDialogControl
                                        .myTitleType,
                                    msg: res.msg
                                });
                                this.BondInfoDialogControl.dialogFormVisible = false;
                            } else {
                                this.win_message_error(res.msg);
                            }
                        });
                }
                // 当为修改债券基本信息提交时
                if (
                    this.BondInfoDialogControl.myTitleType ===
                    OperationTypeEnum.UPDATE
                ) {
                    this.service
                        .updateBondInfo(this.form)
                        .then((res: WinResponseData) => {
                            if (res.winRspType === WinRspType.SUCC) {
                                // 回调父组件传值
                                this.$emit("getFormData", {
                                    myTitleType: this.BondInfoDialogControl
                                        .myTitleType,
                                    msg: res.msg
                                });
                                this.BondInfoDialogControl.dialogFormVisible = false;
                            } else {
                                this.win_message_error(res.msg);
                            }
                        });
                }
                // 当为删除债券基本信息提交时
                if (
                    this.BondInfoDialogControl.myTitleType ===
                    OperationTypeEnum.DELETE
                ) {
                    this.service
                        .deleteBondInfo(this.form.id.toString())
                        .then((res: WinResponseData) => {
                            if (res.winRspType === WinRspType.SUCC) {
                                // 回调父组件传值
                                this.$emit("getFormData", {
                                    myTitleType: this.BondInfoDialogControl
                                        .myTitleType,
                                    msg: res.msg
                                });
                                this.BondInfoDialogControl.dialogFormVisible = false;
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
     * 证券代码选定后锁定证券类别以及判断转股是否弹出
     */
    public selectCodeTrigger(securityCode: any) {
        this.securityCodeSelect.forEach((element: any) => {
            if (element.securityCode === securityCode) {
                this.form.securityType = element.securityType;
            }
        });
        // 判断转股是否弹出
        if (this.service.judgeTransSecurityType(this.form.securityType)) {
            this.BondInfoDialogControl.isShareTransferAble = true;
            this.infoDetailRules.setTransRule(true);
        } else {
            this.BondInfoDialogControl.isShareTransferAble = false;
            this.infoDetailRules.setTransRule(false);
            this.$refs.ruleForm.validateField("shareTransferStart");
            this.$refs.ruleForm.validateField("shareTransferEnd");
            this.$refs.ruleForm.validateField("conversionPrice");
        }
    }

    /**
     * 证券代码下拉框下拉触发事件
     */
    public visibleChangeTrigger() {
        this.publicOutCodeSelectFun(null);
    }

    /**
     * 是否可赎回选定后锁定输入框
     */
    public selectRedeemTrigger(isRedeemable: string) {
        if (isRedeemable === RedeemableEnum.NOTABLE) {
            this.BondInfoDialogControl.isRedeemableDisabled = true;
            this.infoDetailRules.setRedeemRule(false);
            this.$refs.ruleForm.validateField("redeemDate");
            // 将赎回的数据置空
            this.form.redeemDate = "";
            this.form.redeemPrice = null;
        }
        if (isRedeemable === RedeemableEnum.ABLE) {
            this.BondInfoDialogControl.isRedeemableDisabled = false;
            this.infoDetailRules.setRedeemRule(true);
        }
    }
    /**
     * 是否可回售选定后锁定输入框
     */
    public selectPutBackTrigger(isPutBack: string) {
        if (isPutBack === PutBackEnum.NOTABLE) {
            this.BondInfoDialogControl.isPutBackDisabled = true;
            this.infoDetailRules.setPutBackRule(false);
            this.$refs.ruleForm.validateField("putDate");
            this.$refs.ruleForm.validateField("putPrice");
            this.$refs.ruleForm.validateField("putRegisterStart");
            this.$refs.ruleForm.validateField("putRegisterEnd");
            // 将回售的数据置空
            this.form.putDate = "";
            this.form.putPrice = null;
            this.form.putRegisterStart = "";
            this.form.putRegisterEnd = "";
        }
        if (isPutBack === PutBackEnum.ABLE) {
            this.BondInfoDialogControl.isPutBackDisabled = false;
            this.infoDetailRules.setPutBackRule(true);
        }
    }

    /**
     * 新增页面时查询外部已存在证券代码和类别
     */
    public outCodeSelectFun(query: any) {
        this.publicOutCodeSelectFun(query);
    }

    /**
     * 外部证券代码查询 公共方法
     */
    public publicOutCodeSelectFun(query: string) {
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
                this.securityCodeSelect = res.data.list;
            }
        });
    }

    /**
     * 表单数据重置 公共方法
     */
    public publicClearForm() {
        this.form = new ParamBondInfoRepVO();
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
        this.BondInfoDialogControl.dialogFormVisible = false;
        // 清空表单数据和格式
        this.$refs[formName].clearValidate();
        this.publicClearForm();
        // 回调父组件传值
        this.$emit("getFormData", { undo: true });
    }
}
