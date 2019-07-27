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
    /** 字典service */
    public dicService: DicService = new DicService();
    /** 币种service */
    public currencyService: ExchangeRateService = new ExchangeRateService();
    /** 发行人service */
    public service: ParamPublisherService = new ParamPublisherService();
    /** 查询参数 */
    public form: ParamPublisherReqVO = new ParamPublisherReqVO();
    /** 新增、保存对象 */
    public publisherVO: ParamPublisherRepVO = new ParamPublisherRepVO();
    /** 打开、编辑、删除弹出框VO */
    public dialogVO: DialogVO = new DialogVO();
    /** 加载前，需准备的数据 */
    public compareData: CompareData = new CompareData();
    /** 数据准备 */
    public mounted() {
        const companyDic = new DicReqVO();
        /** 公司类别 */
        companyDic.parentDicCode = "1000101";
        this.dicService.dicAllSubList(companyDic).then((res) => {
            this.compareData.companyCategorySelect = res.data;
        });
        /** 企业性质 */
        const dic = new DicReqVO();
        dic.parentDicCode = "1000105";
        this.dicService.dicAllSubList(dic).then((res) => {
            this.compareData.enterpriseNatureSelect = res.data;
        });
        /** 外部评级 */
        const exdic = new DicReqVO();
        exdic.parentDicCode = "1000107";
        this.dicService.dicAllSubList(exdic).then((res) => {
            this.compareData.externalRating = res.data;
        });
        /** 内部评级 */
        const indic = new DicReqVO();
        indic.parentDicCode = "1000106";
        this.dicService.dicAllSubList(indic).then((res) => {
            this.compareData.internalRating = res.data;
        });
        /** 货币列表 */
        this.currencyService.listCurrency().then((res) => {
            this.compareData.repCurrencyVOs = res.data;
        });
        /** 查询数据 */
        this.$nextTick(() => {
            this.query();
        });
    }

    /** 重置查询 */
    public reset(): void {
        this.form = new ParamPublisherReqVO();
        this.query();
    }

    /** 查询 */
    public query(): void {
        this.service.list(this.form).then((res) => {
            if (res.winRspType === "ERROR") {
                this.errorMessage(res.msg);
            } else {
                this.pageVO = res.data;
            }
        });
    }

    /** 带分页参数查询 */
    public pageQuery(pageVO: PageVO): void {
        this.form.reqPageNum = pageVO.pageNum;
        this.form.reqPageSize = pageVO.pageSize;
        this.query();
    }

    /** 打开新增弹框 */
    public openAddDialog(form: ParamPublisherReqVO): void {
        this.dialogVO = this.dialogVO.getAddDialog("新增-发行人");
        this.publisherVO = new ParamPublisherRepVO();
    }

    /** 打开修改弹框 */
    public openUpdateDialog(publisherVO: ParamPublisherRepVO): void {
        this.dialogVO = this.dialogVO.getUpdateDialog("修改-发行人");
        this.publisherVO = this.copy(publisherVO);
    }

    /** 打开删除弹出框 */
    public openDeleteDialog(publisherVO: ParamPublisherRepVO): void {
        this.dialogVO = this.dialogVO.getDeleteDialog("删除-发行人");
        this.publisherVO = this.copy(publisherVO);
    }

    /** 公司类别，表格显示 */
    public companyCategoryFormatter({
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

    /** 企业性质，表格显示 */
    public enterpriseNatureFormatter({
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

    /** 外部评级，表格显示 */
    public exFormatter({
        cellValue,
        row,
        rowIndex,
        column,
        columnIndex
    }): string {
        return this.dicFormatter(
            row.externalRating,
            this.compareData.externalRating
        );
    }

    /** 内部评级，表格显示 */
    public inFormatter({
        cellValue,
        row,
        rowIndex,
        column,
        columnIndex
    }): string {
        return this.dicFormatter(
            row.internalRating,
            this.compareData.internalRating
        );
    }

    /** 金额，表格显示 */
    public moneyFormatter({ cellValue, row, rowIndex, column, columnIndex }) {
        if (!cellValue) {
            return "";
        }
        return numberUtils.formatCurrency(cellValue, 2);
    }
}
