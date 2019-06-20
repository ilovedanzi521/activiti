import { Component } from "vue-property-decorator";
import ExchangeRateService from "../service/ExchangeRateService";
import ParamCurrencyRepVO from "../vo/ParamCurrencyRepVO";
import ParamExchangeRateReqVO from "../vo/ParamExchangeRateReqVO";
import ParamExchangeRateRepVO from "../vo/ParamExchangeRateRepVO";
import dialogUtil from "../../common/vo/DialogFormUtils";
import BaseController from "../../common/controller/BaseController";
@Component({ components: {} })
export default class ExchangeRateController extends BaseController {
    service: ExchangeRateService = new ExchangeRateService();
    /**查询表单数据 */
    reqVO: ParamExchangeRateReqVO = new ParamExchangeRateReqVO();
    /**返回的货币列表 */
    repCurrencyVOs: ParamCurrencyRepVO[] = [];
    /**汇率编辑、保存对象 */
    rateVO: ParamExchangeRateRepVO = new ParamExchangeRateRepVO();
    /**打开、编辑、删除弹出框VO */
    dialogVO = dialogUtil.getDefaultDialog();
    /**开始时间、结束时间 */
    timeArray: string[] = [];
    /**新增、修改，表单验证规则 */
    rules = {
        sourceCurrencyCode: [
            {
                required: true,
                message: "源币种不能为空",
                trigger: "blur"
            }
        ],
        targetCurrencyCode: [
            {
                required: true,
                message: "目标币种不能为空",
                trigger: "blur"
            }
        ],
        cashBuyPrice: [
            {
                validator: this.validPrice,
                message: "现钞买入价必须为数字值且最大8位小数",
                trigger: "blur"
            }
        ],
        cashSellPrice: [
            {
                validator: this.validPrice,
                message: "现钞卖出价必须为数字值且最大8位小数",
                trigger: "blur"
            }
        ],
        exchangeBuyPrice: [
            {
                validator: this.validPrice,
                message: "现汇买入价必须为数字值且最大8位小数",
                trigger: "blur"
            }
        ],
        exchangeSellPrice: [
            {
                validator: this.validPrice,
                message: "现汇卖出价必须为数字值且最大8位小数",
                trigger: "blur"
            }
        ],
        date: [
            {
                required: true,
                message: "日期不能为空",
                trigger: "blur"
            }
        ]
    };

    /**验证价格,买入价、卖出价 */
    validPrice(rule, value, callback) {
        if (value && typeof value !== "number") {
            value = value.trim();
            if (value != "") {
                let re = /^[0-9]+(.[0-9]{1,8})?$/;
                let r = !re.test(value);
                if (r) {
                    callback(new Error());
                }
            }
        }
        callback();
    }

    /**数据准备 */
    mounted() {
        /**货币列表 */
        this.service.listCurrency().then(res => {
            this.repCurrencyVOs = res.data;
        });
        /**人民币、当天汇率 */
        this.$nextTick(() => {
            this.queryExchangeRate("CNY");
        });
    }

    /**查询汇率 */
    queryExchangeRate(sourceCurrencyCode) {
        if (sourceCurrencyCode) {
            this.reqVO.sourceCurrencyCode = sourceCurrencyCode;
        }
        this.service.listExchangeRate(this.reqVO).then(res => {
            if (res.winRspType === "ERROR") {
                this.errorMessage(res.msg);
            } else {
                this.pageVO = res.data;
            }
        });
    }

    /**重置 */
    reset() {
        this.reqVO = new ParamExchangeRateReqVO();
        this.timeArray = [];
    }

    /**打开新增弹框 */
    openAddDialog(form) {
        this.dialogVO = dialogUtil.getAddDialog("新增-汇率");
        this.rateVO = new ParamExchangeRateRepVO();
        this.openDialog();
    }

    /**新增汇率 */
    addExchangeRate(form) {
        let el: any = this.$refs[form];
        el.validate(valid => {
            if (valid) {
                this.service.addExchangeRate(this.rateVO).then(res => {
                    this.closeDialog();
                    if (res.winRspType === "ERROR") {
                        this.errorMessage(res.msg);
                    } else {
                        this.queryExchangeRate(this.reqVO.sourceCurrencyCode);
                        this.successMessage(res.msg);
                    }
                });
            }
        });
    }

    /**打开修改弹框 */
    openUpdateDialog(rateVO) {
        this.dialogVO = dialogUtil.getUpdateDialog("修改-汇率");
        this.rateVO = this.copy(rateVO);
        this.openDialog();
    }

    /**修改汇率 */
    updateExchangeRate(form) {
        let el: any = this.$refs[form];
        el.validate(valid => {
            if (valid) {
                this.service.updateExchangeRate(this.rateVO).then(res => {
                    this.closeDialog();
                    if (res.winRspType === "ERROR") {
                        this.errorMessage(res.msg);
                    } else {
                        this.queryExchangeRate(this.reqVO.sourceCurrencyCode);
                    }
                });
            }
        });
    }

    /**打开删除弹出框 */
    openDeleteDialog(rateVO) {
        this.dialogVO = dialogUtil.getDeleteDialog("删除-汇率");
        this.rateVO = this.copy(rateVO);
        this.openDialog();
    }

    /**删除汇率 */
    deleteExchangeRate() {
        this.service.deleteExchangeRate(this.rateVO.id).then(res => {
            this.closeDialog();
            if (res.winRspType === "ERROR") {
                this.errorMessage(res.msg);
            } else {
                this.successMessage("删除成功");
                this.queryExchangeRate(this.reqVO.sourceCurrencyCode);
            }
        });
    }

    /**选中汇率日期 */
    setFormTime(times) {
        this.reqVO.dateStart = times[0];
        this.reqVO.dateEnd = times[1];
    }

    /**币种,表格显示 */
    currencyFormatter(row, column, cellValue, index) {
        let currencys = this.repCurrencyVOs;
        for (var i = 0; i < currencys.length; i++) {
            if (cellValue === currencys[i].currencyCode) {
                return currencys[i].currencyName;
            }
        }
        return "";
    }
}
