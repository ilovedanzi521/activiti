/* @ProdInfoDialogController 产品详情controller
 * @Author: lixiuquan
 * @Date: 2019-06-13 14:01:33
 * @Last Modified by: lixiuquan
 * @Last Modified time: 2019-07-02 19:34:05
 */

import { Component } from "vue-property-decorator";
import BaseController from "../../common/controller/BaseController";
import { WinResponseData } from "../../common/vo/BaseVO";
import { WinRspType } from "../../common/enum/BaseEnum";
import { OperationTypeEnum } from "../../common/enum/OperationTypeEnum";
import { ConsignorTypeEnum } from "../enum/ProdFundEnum";
import ProdInfoDialogService from "../service/ProdInfoDialogService";
import { mapState } from "vuex";
import { ProdInfoDialogRules } from "../vo/ProductInfoRulesVO";
import {
    ProdInfoVO,
    ProdSelectEntity,
    ProdDicEntity,
    ProdInfoDialogControl
} from "../vo/ProductEntityVO";

@Component({
    components: {},
    computed: {
        ...mapState({
            mandator: (state: any) => state.product.mandator
        })
    }
})
export default class ProdInfoDialogController extends BaseController {
    // $refs引用声明
    public $refs!: {};
    // 产品详情service声明
    private prodDialogService = new ProdInfoDialogService();

    // 表单数据
    private form: ProdInfoVO = new ProdInfoVO();
    // 其他控制属性
    private prodDialogControl = new ProdInfoDialogControl();
    // 表单校验规则
    private fundInfoDialogRules = new ProdInfoDialogRules(true);

    /**
     * 下拉框
     */
    // 数据字典
    private prodDicEntity = ProdDicEntity;
    // 非字典下拉框
    private prodSelectEntity = ProdSelectEntity;

    /**
     * 初始化
     */
    public mounted() {
        // 委托人下拉默认
        this.prodSelectEntity.subConsignorSelect = this.prodSelectEntity.allSubConsignorSelect;
    }

    /**
     * 父组件新增产品事件监听
     * @param title 标题名称
     * @param able 显示控制
     */
    public addClickme(title: string, able: boolean) {
        // 控制实例新增初始化函数调用
        this.prodDialogControl.addInit(title, able);
        // 委托人处理
        this.defaultConsignorList();
    }

    /**
     * 父组件编辑信息进入的初始化函数
     * @param title 标题
     * @param able 显示控制
     * @param row 行数据
     */
    public editClickme(title: string, able: boolean, row: any): any {
        this.prodDialogControl.updateInit(title, able, row);
        this.form = this.copy(row);
    }

    /**
     * 父组件删除信息进入的初始化函数
     * @param title 标题
     * @param able 显示控制
     * @param row 行数据
     */
    public deleteClickme(title: string, able: boolean, row: any): any {
        this.prodDialogControl.deleteInit(title, able);
        this.form = this.copy(row);
    }

    /**
     * 父组件查看详情进入的初始化函数
     * @param title 标题
     * @param able 显示控制
     * @param row 行数据
     */
    public viewClickme(title: string, able: boolean, row: any): any {
        this.prodDialogControl.viewInit(title, able);
        this.fundInfoDialogRules = new ProdInfoDialogRules(false);
        this.form = this.copy(row);
    }

    /**
     * 数据提交事件监听
     * @param formName 表单名称
     */
    public dialogFormSubmit(formName: string) {
        this.$refs[formName].validate((valid: any) => {
            if (valid) {
                // 当为新增产品信息提交时
                if (
                    this.prodDialogControl.myTitleType === OperationTypeEnum.ADD
                ) {
                    this.prodDialogService
                        .insertFundInfo(this.form)
                        .then((res: WinResponseData) => {
                            if (res.winRspType === WinRspType.SUCC) {
                                // 回调父组件传值
                                this.$emit("getFormData", {
                                    myTitleType: this.prodDialogControl
                                        .myTitleType,
                                    msg: res.msg
                                });
                                this.prodDialogControl.dialogFormVisible = false;
                            } else {
                                this.win_message_error(res.msg);
                            }
                        });
                }
                // 当为修改产品信息提交时
                if (
                    this.prodDialogControl.myTitleType ===
                    OperationTypeEnum.UPDATE
                ) {
                    this.prodDialogService
                        .updateFundInfo(this.form)
                        .then((res: WinResponseData) => {
                            if (res.winRspType === WinRspType.SUCC) {
                                // 回调父组件传值
                                this.$emit("getFormData", {
                                    myTitleType: this.prodDialogControl
                                        .myTitleType,
                                    msg: res.msg
                                });
                                this.prodDialogControl.dialogFormVisible = false;
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
        // 当为删除产品信息提交时
        if (this.prodDialogControl.myTitleType === OperationTypeEnum.DELETE) {
            this.prodDialogService
                .deleteFundInfo(this.form.id.toString())
                .then((res: WinResponseData) => {
                    if (res.winRspType === WinRspType.SUCC) {
                        // 回调父组件传值
                        this.$emit("getFormData", {
                            myTitleType: this.prodDialogControl.myTitleType,
                            msg: res.msg
                        });
                        this.prodDialogControl.dialogFormVisible = false;
                    } else {
                        this.win_message_error(res.msg);
                    }
                });
        }
    }

    /**
     * 委托人默认值处理
     */
    public defaultConsignorList() {
        const consignorList = this.prodSelectEntity.consignorSelect;
        // 一级委托人下拉列表不为空
        if (consignorList.length > 0) {
            // 如果没有选中目录，则默认选中第一项
            if (this.mandator.type === ConsignorTypeEnum.NONETYPE) {
                this.form.consignorNo = consignorList[0].no;
                this.subConsignorSelectFun(this.form.consignorNo);
            } else {
                // 如果选中了一级委托人或者二级委托人
                this.form.consignorNo = this.mandator.firstMandator;
                this.subConsignorSelectFun(this.form.consignorNo);
                this.form.subConsignorNo = this.mandator.secondMandator;
            }
        }
    }

    /**
     * 选中一级委托人
     * @param value
     */
    public consignorSelect(value: number) {
        this.subConsignorSelectFun(value);
    }

    /**
     * 根据一级委托人no加载二级委托人下拉框
     * @param consignorNo
     */
    public subConsignorSelectFun(consignorNo: number) {
        const subConsignorSelect = [];
        if (this.prodSelectEntity.allSubConsignorSelect.length > 0) {
            this.prodSelectEntity.allSubConsignorSelect.forEach(
                (element: any) => {
                    if (consignorNo === element.consignorNo) {
                        subConsignorSelect.push(element);
                    }
                }
            );
        }
        this.prodSelectEntity.subConsignorSelect = subConsignorSelect;
        if (subConsignorSelect.length < 1) {
            this.form.subConsignorNo = null;
        }
        // 如果没有选中,默认选中第一项
        if (this.prodSelectEntity.subConsignorSelect.length > 0) {
            this.form.subConsignorNo = this.prodSelectEntity.subConsignorSelect[0].no;
        }
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
     * @param formName 表单名称
     */
    public undoForm(formName: string) {
        this.prodDialogControl.dialogFormVisible = false;
        // 清空表单数据和格式
        this.$refs[formName].clearValidate();
        // 回调父组件传值
        this.$emit("getFormData", {
            undo: true
        });
    }
}
