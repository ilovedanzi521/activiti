import { Component } from "vue-property-decorator";
import ExchangeRateService from "../service/ExchangeRateService";
import ParamCurrencyRepVO from "../vo/ParamCurrencyRepVO";
import ParamExchangeRateReqVO from "../vo/ParamExchangeRateReqVO";
import ParamExchangeRateRepVO from "../vo/ParamExchangeRateRepVO";
import DialogVO from "../../common/vo/DialogVO";
import BaseController from "../../common/controller/BaseController";
import ExchangeDialog from "../view/ExchangeRateDialog.vue";
import dateUtils from "../../common/util/DateUtils";
import numberUtils from "../../common/util/NumberUtils";
import PageVO from "../../common/vo/PageVO";
/**
 * 类描述：汇率controller
 * 创建人：@author jianshengxiong
 * 创建时间：2019/6/14
 *
 */
@Component({ components: { ExchangeDialog } })
export default class ExchangeRateController extends BaseController {
    /**汇率service */
    service: ExchangeRateService = new ExchangeRateService();
    /**查询表单数据 */
    reqVO: ParamExchangeRateReqVO = new ParamExchangeRateReqVO();
    /**返回的货币列表 */
    repCurrencyVOs: ParamCurrencyRepVO[] = [];
    /**下拉框货币列表 */
    selectCurrencys: ParamCurrencyRepVO[] = [];
    /**汇率编辑、保存对象 */
    rateVO: ParamExchangeRateRepVO = new ParamExchangeRateRepVO();
    /**汇率编辑、保存的汇率时间 */
    editDate: Date;
    /**打开、编辑、删除弹出框VO */
    dialogVO: DialogVO = new DialogVO();
    /**开始时间、结束时间 */
    timeArray: Date[] = [new Date(), new Date()];

    /**数据准备 */
    mounted() {
        /**货币列表 */
        this.service
            .listCurrency()
            .then(res => {
                this.repCurrencyVOs = res.data;
            })
            .then(res => {
                this.queryExchangeRate(this.reqVO.sourceCurrencyCode);
            });
        /**查询汇率 */
        this.$nextTick(() => {});
    }

    /**币种下拉框数据，过滤掉左侧已选中的币种 */
    setSelectCurrencys() {
        let j = 0;
        for (let i = 0; i < this.repCurrencyVOs.length; i++) {
            if (
                this.repCurrencyVOs[i].currencyCode !==
                this.reqVO.sourceCurrencyCode
            ) {
                this.selectCurrencys[j++] = this.repCurrencyVOs[i];
            }
        }
    }

    /** 汇率分页查询 */
    public pageQuery(pageVO: PageVO) {
        this.reqVO.reqPageNum = pageVO.pageNum;
        this.reqVO.reqPageSize = pageVO.pageSize;
        this.queryExchangeRate(null);
    }
    /**查询汇率 */
    queryExchangeRate(sourceCurrencyCode: string): void {
        //验证查询参数
        if (this.checkQueryForm()) {
            //设置源币种
            if (sourceCurrencyCode) {
                this.reqVO.sourceCurrencyCode = sourceCurrencyCode;
            }
            //设置查询时间
            this.reqVO.dateStart = dateUtils.dateFtt(
                "yyyy-MM-dd",
                this.timeArray[0]
            );
            this.reqVO.dateEnd = dateUtils.dateFtt(
                "yyyy-MM-dd",
                this.timeArray[1]
            );
            this.service.listExchangeRate(this.reqVO).then(res => {
                this.setSelectCurrencys();
                if (res.winRspType === "ERROR") {
                    this.errorMessage(res.msg);
                } else {
                    this.pageVO = res.data;
                }
            });
        }
    }

    /**验证查询参数 */
    checkQueryForm(): boolean {
        if (this.timeArray === null) {
            this.errorMessage("开始日期或结束日期不能为空");
            return false;
        }
        return true;
    }

    /**重置 */
    reset(): void {
        this.reqVO = new ParamExchangeRateReqVO();
        this.timeArray = [
            new Date(new Date().toLocaleDateString()),
            new Date(new Date().toLocaleDateString())
        ];
        this.queryExchangeRate(this.reqVO.sourceCurrencyCode);
    }

    /**打开新增弹框 */
    openAddDialog(): void {
        this.dialogVO = this.dialogVO.getAddDialog("新增-汇率");
        this.rateVO = ParamExchangeRateRepVO.initAddVO(
            this.reqVO.sourceCurrencyCode
        );
    }

    /**打开修改弹框 */
    openUpdateDialog(rateVO: ParamExchangeRateRepVO): void {
        this.dialogVO = this.dialogVO.getUpdateDialog("修改-汇率");
        this.rateVO = this.copy(rateVO);
        this.rateVO.editDate = new Date(this.rateVO.rateDate);
    }

    /**打开删除弹出框 */
    openDeleteDialog(rateVO: ParamExchangeRateRepVO): void {
        this.dialogVO = this.dialogVO.getDeleteDialog("删除-汇率");
        this.rateVO = this.copy(rateVO);
        this.rateVO.editDate = new Date(this.rateVO.rateDate);
    }

    /**币种,表格显示 */
    currencyFormatter({ cellValue, row, rowIndex, column, columnIndex }) {
        let currencys = this.repCurrencyVOs;
        for (var i = 0; i < currencys.length; i++) {
            if (cellValue === currencys[i].currencyCode) {
                return currencys[i].currencyName;
            }
        }
        return "";
    }

    /**金额，表格显示 */
    moneyFormatter({ cellValue, row, rowIndex, column, columnIndex }) {
        if (!cellValue) {
            return "";
        }
        return numberUtils.formatCurrency(cellValue, 4);
    }
}
