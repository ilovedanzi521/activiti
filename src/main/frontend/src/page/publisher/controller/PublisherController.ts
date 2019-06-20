import { Component } from "vue-property-decorator";
import BaseController from "../../common/controller/BaseController";
import ParamPublisherService from "../service/ParamPublisherService";
import ParamPublisherReqVO from "../vo/ParamPublisherReqVO";
import ParamPublisherRepVO from "../vo/ParamPublisherRepVO";
import ParamCurrencyRepVO from "../vo/ParamPublisherRepVO";
import { DicReqVO, DicRepVO } from "../../dictionary/vo/DicVO";
import DicService from "../../dictionary/service/DicService";
import dialogUtil from "../../common/vo/DialogFormUtils";
import ExchangeRateService from "../../currency/service/ExchangeRateService";
@Component({ components: {} })
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
    dialogVO = dialogUtil.getDefaultDialog();
    /**公司类别, 字典数据 */
    companyCategorySelect: DicRepVO[] = [];
    /**企业性质，字典数据 */
    enterpriseNatureSelect: DicRepVO[] = [];
    /**外部评级，字典数据 */
    externalRating: DicRepVO[] = [];
    /**内部评级，字典数据 */
    internalRating: DicRepVO[] = [];
    /**币种列表 */
    repCurrencyVOs: ParamCurrencyRepVO[] = [];
    /**新增、修改，表单验证规则 */
    rules = {
        publisherCode: [
            {
                required: true,
                message: "发行人编号不能为空",
                trigger: "blur"
            }
        ],
        publisherName: [
            {
                required: true,
                message: "发行人名称不能为空",
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

    /**验证资产 */
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
        let companyDic = new DicReqVO();
        /**公司类别 */
        companyDic.parentDicCode = "1000101";
        this.dicService.dicAllSubList(companyDic).then(res => {
            this.companyCategorySelect = res.data;
        });
        /**企业性质 */
        let dic = new DicReqVO();
        dic.parentDicCode = "1000105";
        this.dicService.dicAllSubList(dic).then(res => {
            this.enterpriseNatureSelect = res.data;
        });
        /**外部评级 */
        let exdic = new DicReqVO();
        exdic.parentDicCode = "1000107";
        this.dicService.dicAllSubList(exdic).then(res => {
            this.externalRating = res.data;
        });
        /**内部评级 */
        let indic = new DicReqVO();
        indic.parentDicCode = "1000106";
        this.dicService.dicAllSubList(indic).then(res => {
            this.internalRating = res.data;
        });
        /**货币列表 */
        this.currencyService.listCurrency().then(res => {
            this.repCurrencyVOs = res.data;
        });
        /**查询数据 */
        this.$nextTick(() => {
            this.query();
        });
    }

    /**重置查询 */
    reset() {
        this.form = new ParamPublisherReqVO();
    }

    /**查询 */
    query() {
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
    pageQuery(pageVO) {
        this.form.reqPageNum = pageVO.pageNum;
        this.form.reqPageSize = pageVO.pageSize;
        this.query();
    }

    /**打开新增弹框 */
    openAddDialog() {
        this.dialogVO = dialogUtil.getAddDialog("新增-发行人");
        this.publisherVO = new ParamPublisherRepVO();
        this.openDialog();
    }

    /**发行人新增 */
    addPublisher() {
        let _this = this;
        this.service.add(this.publisherVO).then(res => {
            this.closeDialog();
            if (res.winRspType === "ERROR") {
                this.errorMessage(res.msg);
            } else {
                _this.query();
            }
        });
    }

    /**打开修改弹框 */
    openUpdateDialog(publisherVO) {
        debugger;
        this.dialogVO = dialogUtil.getUpdateDialog("修改-发行人");
        this.publisherVO = this.copy(publisherVO);
        this.openDialog();
    }
    /**发行人修改 */
    updatePublisher() {
        let _this = this;
        this.service.update(this.publisherVO).then(res => {
            this.closeDialog();
            if (res.winRspType === "ERROR") {
                this.errorMessage(res.msg);
            } else {
                _this.query();
            }
        });
    }
    /**打开删除弹出框 */
    openDeleteDialog(publisherVO) {
        this.dialogVO = dialogUtil.getDeleteDialog("删除-发行人");
        this.publisherVO = this.copy(publisherVO);
        this.openDialog();
    }
    /**发行人删除 */
    deletePublisher() {
        this.service.delete(this.publisherVO.id).then(res => {
            this.closeDialog();
            if (res.winRspType === "ERROR") {
                this.errorMessage(res.msg);
            } else {
                this.query();
            }
        });
    }

    /**公司类别，表格显示 */
    companyCategoryFormatter(row, column, cellValue, index) {
        return this.dicFormatter(cellValue, this.companyCategorySelect);
    }

    /**企业性质，表格显示 */
    enterpriseNatureFormatter(row, column, cellValue, index) {
        return this.dicFormatter(cellValue, this.enterpriseNatureSelect);
    }

    /**外部评级，表格显示 */
    exFormatter(row, column, cellValue, index) {
        return this.dicFormatter(cellValue, this.externalRating);
    }

    /**内部评级，表格显示 */
    inFormatter(row, column, cellValue, index) {
        return this.dicFormatter(cellValue, this.internalRating);
    }
}
