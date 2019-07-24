import { Component } from "vue-property-decorator";
import BaseController from "../../common/controller/BaseController";
import ParamPublisherService from "../service/ParamPublisherService";
import ParamPublisherReqVO from "../vo/ParamPublisherReqVO";
import ParamPublisherRepVO from "../vo/ParamPublisherRepVO";
import { DicReqVO } from "../../dictionary/vo/DicVO";
import DicService from "../../dictionary/service/DicService";
import DialogVO from "../../common/vo/DialogVO";
import ExchangeRateService from "../../currency/service/ExchangeRateService";
import PublisherDialog from "../view/publisherDialog.vue";
import CompareData from "../vo/CompareData";
import PageVO from "../../common/vo/PageVO";
import numberUtils from "../../common/util/NumberUtils";
/**
 * 类描述：发行人controller
 * 创建人：@author jianshengxiong
 * 创建时间：2019/6/14
 *
 */
@Component({ components: { PublisherDialog } })
export default class PublisherController extends BaseController {
    /**字典service */
    dicService: DicService = new DicService();
    /**币种service */
    currencyService: ExchangeRateService = new ExchangeRateService();
    /**发行人service */
    service: ParamPublisherService = new ParamPublisherService();
    /**查询参数 */
    form: ParamPublisherReqVO = new ParamPublisherReqVO();
    /**新增、保存对象 */
    publisherVO: ParamPublisherRepVO = new ParamPublisherRepVO();
    /**打开、编辑、删除弹出框VO */
    dialogVO: DialogVO = new DialogVO();
    /**加载前，需准备的数据 */
    compareData: CompareData = new CompareData();
    /**数据准备 */
    mounted() {
        let companyDic = new DicReqVO();
        /**公司类别 */
        companyDic.parentDicCode = "1000101";
        this.dicService.dicAllSubList(companyDic).then(res => {
            this.compareData.companyCategorySelect = res.data;
        });
        /**企业性质 */
        let dic = new DicReqVO();
        dic.parentDicCode = "1000105";
        this.dicService.dicAllSubList(dic).then(res => {
            this.compareData.enterpriseNatureSelect = res.data;
        });
        /**外部评级 */
        let exdic = new DicReqVO();
        exdic.parentDicCode = "1000107";
        this.dicService.dicAllSubList(exdic).then(res => {
            this.compareData.externalRating = res.data;
        });
        /**内部评级 */
        let indic = new DicReqVO();
        indic.parentDicCode = "1000106";
        this.dicService.dicAllSubList(indic).then(res => {
            this.compareData.internalRating = res.data;
        });
        /**货币列表 */
        this.currencyService.listCurrency().then(res => {
            this.compareData.repCurrencyVOs = res.data;
        });
        /**查询数据 */
        this.$nextTick(() => {
            this.query();
        });
    }

    /**重置查询 */
    reset(): void {
        this.form = new ParamPublisherReqVO();
        this.query();
    }

    /**查询 */
    query(): void {
        let _this = this;
        this.service.list(this.form).then(res => {
            if (res.winRspType === "ERROR") {
                this.errorMessage(res.msg);
            } else {
                _this.pageVO = res.data;
            }
        });
    }

    /**带分页参数查询 */
    pageQuery(pageVO: PageVO): void {
        this.form.reqPageNum = pageVO.pageNum;
        this.form.reqPageSize = pageVO.pageSize;
        this.query();
    }

    /**打开新增弹框 */
    openAddDialog(form: ParamPublisherReqVO): void {
        this.dialogVO = this.dialogVO.getAddDialog("新增-发行人");
        this.publisherVO = new ParamPublisherRepVO();
    }

    /**打开修改弹框 */
    openUpdateDialog(publisherVO: ParamPublisherRepVO): void {
        this.dialogVO = this.dialogVO.getUpdateDialog("修改-发行人");
        this.publisherVO = this.copy(publisherVO);
    }

    /**打开删除弹出框 */
    openDeleteDialog(publisherVO: ParamPublisherRepVO): void {
        this.dialogVO = this.dialogVO.getDeleteDialog("删除-发行人");
        this.publisherVO = this.copy(publisherVO);
    }

    /**公司类别，表格显示 */
    companyCategoryFormatter({
        cellValue,
        row,
        rowIndex,
        column,
        columnIndex
    }): string {
        return this.dicFormatter(
            row.companyCategory,
            this.compareData.companyCategorySelect
        );
    }

    /**企业性质，表格显示 */
    enterpriseNatureFormatter({
        cellValue,
        row,
        rowIndex,
        column,
        columnIndex
    }): string {
        return this.dicFormatter(
            row.enterpriseNature,
            this.compareData.enterpriseNatureSelect
        );
    }

    /**外部评级，表格显示 */
    exFormatter({ cellValue, row, rowIndex, column, columnIndex }): string {
        return this.dicFormatter(
            row.externalRating,
            this.compareData.externalRating
        );
    }

    /**内部评级，表格显示 */
    inFormatter({ cellValue, row, rowIndex, column, columnIndex }): string {
        return this.dicFormatter(
            row.internalRating,
            this.compareData.internalRating
        );
    }

    /**金额，表格显示 */
    moneyFormatter({ cellValue, row, rowIndex, column, columnIndex }) {
        if (!cellValue) {
            return "";
        }
        return numberUtils.formatCurrency(cellValue, 2);
    }
}
