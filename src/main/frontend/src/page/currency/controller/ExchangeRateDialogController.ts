import { Component, Prop, Emit } from "vue-property-decorator";
import ExchangeRateService from "../service/ExchangeRateService";
import ParamCurrencyRepVO from "../vo/ParamCurrencyRepVO";
import ParamExchangeRateRepVO from "../vo/ParamExchangeRateRepVO";
import DialogVO from "../../common/vo/DialogVO";
import BaseController from "../../common/controller/BaseController";
import dateUtils from "../../common/util/DateUtils";

/**
 * 类描述：汇率新增、修改、删除,弹框controller
 * 创建人：@author jianshengxiong
 * 创建时间：2019/6/14
 *
 */
@Component({ components: {} })
export default class ExchangeRateDialogController extends BaseController {
    public service: ExchangeRateService = new ExchangeRateService();
    /** 返回的货币列表 */
    @Prop()
    public repCurrencyVOs: ParamCurrencyRepVO[];
    /** 汇率编辑、保存对象 */
    @Prop()
    public rateVO: ParamExchangeRateRepVO;
    /** 打开、编辑、删除弹出框VO */
    @Prop()
    public dialogVO: DialogVO;
    /** 新增、修改，表单验证规则 */
    public rules = {
        sourceCurrencyCode: [
            {
                required: true,
                message: "源币种不能为空",
                trigger: "blur"
            },
            {
                validator: this.checkCurrencyCode,
                message: "目标币种与源币种，不能相同",
                trigger: "blur"
            }
        ],
        targetCurrencyCode: [
            {
                required: true,
                message: "目标币种不能为空",
                trigger: "blur"
            },
            {
                validator: this.checkCurrencyCode,
                message: "目标币种与源币种，不能相同",
                trigger: "blur"
            }
        ],
        cashBuyPrice: [
            {
                pattern: /^[0-9]{1,7}(\.[0-9]{1,4})?$/,
                message: "现钞买入价必须为数字且最多4位小数",
                trigger: "blur"
            }
        ],
        cashSellPrice: [
            {
                pattern: /^[0-9]{1,7}(\.[0-9]{1,4})?$/,
                message: "现钞卖出价必须为数字且最多4位小数",
                trigger: "blur"
            }
        ],
        exchangeBuyPrice: [
            {
                pattern: /^[0-9]{1,7}(\.[0-9]{1,4})?$/,
                message: "现汇买入价必须为数字且最多4位小数",
                trigger: "blur"
            }
        ],
        exchangeSellPrice: [
            {
                pattern: /^[0-9]{1,7}(\.[0-9]{1,4})?$/,
                message: "现汇卖出价必须为数字且最多4位小数",
                trigger: "blur"
            }
        ],
        middlePrice: [
            {
                pattern: /^[0-9]{1,7}(\.[0-9]{1,4})?$/,
                message: "中间价必须为数字且最多4位小数",
                trigger: "blur"
            }
        ],
        rateDate: [
            {
                required: true,
                message: "日期不能为空",
                trigger: "blur"
            }
        ]
    };

    /** 验证币种 */
    public checkCurrencyCode(rule, value, callback) {
        if (this.rateVO.sourceCurrencyCode === this.rateVO.targetCurrencyCode) {
            callback(new Error("目标币种与源币种，不能相同!"));
        } else {
            callback();
        }
    }

    /** 源币种下拉框,选中事件监听 */
    public handleSelectSource(e) {
        // tslint:disable-next-line: no-unused-expression
        e;
        this.validField("sourceCurrencyCode");
    }
    /** 源币种下拉框,隐藏事件监听 */
    public HandlehideSource(v) {
        if (!v) {
            this.validField("sourceCurrencyCode");
        }
    }
    /** 目标币种下拉框,选中事件监听 */
    public handleSelectTarget(e) {
        e;
        this.validField("targetCurrencyCode");
    }
    /** 目标币种下拉框,隐藏事件监听 */
    public HandlehideTarget(v) {
        if (!v) {
            this.validField("targetCurrencyCode");
        }
    }

    /** 验证单个属性 */
    public validField(field: string) {
        const form: any = this.$refs.exchangeForm;
        form.validateField(field);
    }

    /** 新增汇率 */
    public addExchangeRate(formName: string): void {
        const form: any = this.$refs[formName];
        form.validate((valid) => {
            if (valid) {
                this.setRateDate(this.rateVO);
                this.service.addExchangeRate(this.rateVO).then((res) => {
                    if (res.winRspType === "ERROR") {
                        this.errorMessage(res.msg);
                    } else {
                        this.closeFormDialog();
                        this.queryExchangeRate();
                        this.successMessage("新增成功");
                    }
                });
            }
        });
    }

    /** 修改汇率 */
    public updateExchangeRate(formName: string): void {
        const form: any = this.$refs[formName];
        form.validate((valid) => {
            if (valid) {
                this.setRateDate(this.rateVO);
                this.service.updateExchangeRate(this.rateVO).then((res) => {
                    if (res.winRspType === "ERROR") {
                        this.errorMessage(res.msg);
                    } else {
                        this.closeFormDialog();
                        this.queryExchangeRate();
                        this.successMessage("修改成功");
                    }
                });
            }
        });
    }

    public setRateDate(rateVO: ParamExchangeRateRepVO): void {
        this.rateVO.rateDate = dateUtils.dateFtt("yyyy-MM-dd", rateVO.editDate);
    }

    /** 删除汇率 */
    public deleteExchangeRate(): void {
        this.service.deleteExchangeRate(this.rateVO.id).then((res) => {
            if (res.winRspType === "ERROR") {
                this.errorMessage(res.msg);
            } else {
                this.closeFormDialog();
                this.queryExchangeRate();
                this.successMessage("删除成功");
            }
        });
    }

    /** 关闭弹框 */
    public closeFormDialog(): void {
        const form: any = this.$refs.exchangeForm;
        if (form) {
            form.resetFields();
        }
        this.dialogVO.visible = false;
    }

    @Emit("queryExchangeRate")
    // tslint:disable-next-line: no-empty
    public queryExchangeRate() {}
}
