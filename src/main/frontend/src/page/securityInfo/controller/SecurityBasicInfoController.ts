import { Component } from "vue-property-decorator";
import { mapState } from "vuex";
import { BaseConst } from "../../common/const/BaseConst";
import BaseController from "../../common/controller/BaseController";
import { WinRspType } from "../../common/enum/BaseEnum";
import { OperationTypeEnum } from "../../common/enum/OperationTypeEnum";
import DateUtils from "../../common/util/DateUtils";
import numberUtils from "../../common/util/NumberUtils";
import { WinResponseData } from "../../common/vo/BaseVO";
import PageVO from "../../common/vo/PageVO";
import ExchangeRateService from "../../currency/service/ExchangeRateService";
import DicService from "../../dictionary/service/DicService";
import { DicRepVO, DicReqVO } from "../../dictionary/vo/DicVO";
import ParamPublisherService from "../../publisher/service/ParamPublisherService";
import ParamPublisherReqVO from "../../publisher/vo/ParamPublisherReqVO";
import TradeDayService from "../../tradeDay/service/TradeDayService";
import MarketService from "../../market/service/MarketService";
import SecurityBasicInfoService from "../service/SecurityBasicInfoService";
import SecurityBasicInfoDialog from "../view/SecurityBasicInfoDialog.vue";
import { SecurityBasicInfoEntity } from "../vo/SecurityBasicInfoEntity";
import {
    SecurityBasicInfoRepVO,
    SecurityBasicInfoReqVO
} from "../vo/SecurityBasicInfoVO";

@Component({
    components: { SecurityBasicInfoDialog },
    computed: {
        ...mapState({
            marketCode: (state: any) => state.market.marketCode
        })
    }
})
export default class SecurityBasicInfoController extends BaseController {
    /**
     * 证券基础信息service
     */
    private service: SecurityBasicInfoService = new SecurityBasicInfoService();
    /**
     * 字典service
     */
    private dicService: DicService = new DicService();
    /**
     * 交易市场service,用来取证券类别和资产类别
     */
    private marketService: MarketService = new MarketService();
    /**
     * 发行人service,用来取发行人
     */
    private paramPublisherService: ParamPublisherService = new ParamPublisherService();
    /**
     * 货币service,用来取币种
     */
    private exchangeRateService: ExchangeRateService = new ExchangeRateService();
    /**
     * 交易日类型service,用来获取交易日类型
     */
    private tradeDayservice: TradeDayService = new TradeDayService();

    // 查询条件
    private formInline: SecurityBasicInfoReqVO = new SecurityBasicInfoReqVO();
    // 返回结果集
    private securityBasicInfo: PageVO = new PageVO();
    // 缓存字典项
    private securityBasicInfoDicData: any = SecurityBasicInfoEntity;
    private assetTypeDics: DicRepVO[] = [];

    private loading: boolean = false;
    private dialogVisible: boolean = false;

    private selected: any = [];

    // 子组件显示的信息
    private cardNumber: {
        dialogTitle: string;
        type: OperationTypeEnum;
        data: SecurityBasicInfoRepVO;
    };
    private mounted() {
        this.$nextTick(() => {
            this.list();
        });
        this.cacheDict();
    }

    // 缓存字典
    private cacheDict() {
        const dic = new DicReqVO();
        /**
         * 交易市场,资产类别,发行方式,证券状态,杂项分类
         */
        dic.parentDicCodeList = [
            "1000102",
            "1000116",
            "1000216",
            "1000217",
            "1000218"
        ];
        this.dicService
            .dicMultipleAllSubList(dic)
            .then((res: WinResponseData) => {
                this.securityBasicInfoDicData.marketCode = res.data[1000102];
                this.securityBasicInfoDicData.assetType = res.data[1000116];
                this.securityBasicInfoDicData.issueType = res.data[1000216];
                this.securityBasicInfoDicData.longDelist = res.data[1000217];
                this.securityBasicInfoDicData.otherClassification =
                    res.data[1000218];
            });
        // 获取证券类别列表
        this.getSecurityTypes();
        // 获取发行人列表
        this.getIssuers();
        // 获取币种列表
        this.getTransCurrencys();
        // 获取交易日类型列表
        this.getTradeDayCodes();
    }

    // 获取证券类别列表
    private getSecurityTypes() {
        this.marketService
            .querySecurityCode()
            .then((response: WinResponseData) => {
                if (response.winRspType === WinRspType.ERROR) {
                    this.win_message_error(response.msg);
                } else {
                    this.securityBasicInfoDicData.securityType = response.data;
                }
            });
    }
    // 获取发行人列表
    private getIssuers() {
        this.paramPublisherService
            .noPageList(new ParamPublisherReqVO())
            .then((response: WinResponseData) => {
                if (response.winRspType === WinRspType.ERROR) {
                    this.win_message_error(response.msg);
                } else {
                    this.securityBasicInfoDicData.issuer = response.data;
                }
            });
    }

    // 获取币种列表
    private getTransCurrencys() {
        this.exchangeRateService
            .listCurrency()
            .then((response: WinResponseData) => {
                if (response.winRspType === WinRspType.ERROR) {
                    this.win_message_error(response.msg);
                } else {
                    this.securityBasicInfoDicData.transCurrency = response.data;
                }
            });
    }

    // 获取交易日类型列表
    private getTradeDayCodes() {
        this.tradeDayservice
            .queryTradeDayType()
            .then((response: WinResponseData) => {
                if (response.winRspType === WinRspType.ERROR) {
                    this.win_message_error(response.msg);
                } else {
                    this.securityBasicInfoDicData.tradeDayCode = response.data;
                }
            });
    }

    // 获取资产类别列表
    // private getAssetType(list: SecurityTypeRepVO[]) {
    //     let obj = {};
    //     if (list.length > 0) {
    //         list.forEach((element: SecurityTypeRepVO) => {
    //             if (!obj[element.assetType]) {
    //                 const ob = { assetType: "", assetTypeName: "" };
    //                 ob.assetType = element.assetType;
    //                 ob.assetTypeName = this.getAssetTypeName(element.assetType);
    //                 this.assetTypes.push(ob);
    //                 obj[element.assetType] = true;
    //             }
    //         });
    //     }
    // }

    private getAssetTypeName(assetType: string) {
        for (const assetTypeDic of this.assetTypeDics) {
            if (assetTypeDic.dicCode === assetType) {
                return assetTypeDic.dicExplain;
            }
        }
    }
    // 查询单条或所有数据
    private list() {
        this.service
            .list(this.formInline)
            .then((winResponseData: WinResponseData) => {
                if (winResponseData.winRspType === WinRspType.ERROR) {
                    this.win_message_error(winResponseData.msg);
                } else {
                    this.securityBasicInfo = winResponseData.data;
                }
            });
    }

    // 查询Securitycode
    private listAll(queryString: string, cb) {
        const queryVo: SecurityBasicInfoReqVO = new SecurityBasicInfoReqVO();
        queryVo.securityCode = queryString;
        // 指定下拉框条数最多为10条
        queryVo.reqPageSize = 10;
        this.service.list(queryVo).then((response: WinResponseData) => {
            if (response.winRspType === WinRspType.ERROR) {
                this.win_message_error(response.msg);
            } else {
                const list = response.data.list;
                this.filter(list, cb);
            }
        });
    }

    private filter(list: SecurityBasicInfoRepVO[], cb) {
        const array = [];
        if (list && list.length > 0) {
            list.forEach((element: SecurityBasicInfoRepVO) => {
                const ob = { value: "", key: "" };
                ob.key = element.securityCode;
                ob.value = element.securityCode + " " + element.securityName;
                array.push(ob);
            });
        }
        // 调用 callback 返回建议列表的数据
        cb(array);
    }

    // 选中证券代码时，只获得内码，不获取名称
    private handleSelect(item) {
        this.formInline.securityCode = item.key;
    }

    // 重置
    private reset() {
        this.formInline = new SecurityBasicInfoReqVO();
        this.list();
    }

    // 选中行事件
    private handleSelectChange({ selection }) {
        this.selected = selection;
    }

    /**
     * 全选操作
     */
    private handleSelectAll({ selection, checked }) {
        this.selected = selection;
    }

    /**
     * 带分页参数查询
     */
    private pageQuery(pageVO) {
        this.formInline.reqPageNum = pageVO.pageNum;
        this.formInline.reqPageSize = pageVO.pageSize;
        this.list();
    }

    // 双击查看
    private view({ cellValue, row, rowIndex, column, columnIndex }) {
        this.operation(row, OperationTypeEnum.VIEW);
    }
    /**
     * 新增、修改、删除参数预置
     */
    private operation(row: SecurityBasicInfoRepVO, type: OperationTypeEnum) {
        if (type === OperationTypeEnum.ADD) {
            this.cardNumber = {
                dialogTitle: SecurityBasicInfoConst.CREATETITLE,
                type: OperationTypeEnum.ADD,
                data: new SecurityBasicInfoRepVO()
            };
        }
        if (type === OperationTypeEnum.DELETE) {
            this.cardNumber = {
                dialogTitle:
                    BaseConst.DELETE +
                    " " +
                    row.securityCode +
                    " " +
                    row.securityName,
                type: OperationTypeEnum.DELETE,
                data: row
            };
        }
        if (type === OperationTypeEnum.UPDATE) {
            this.cardNumber = {
                dialogTitle:
                    BaseConst.MODIFY +
                    " " +
                    row.securityCode +
                    " " +
                    row.securityName,
                type: OperationTypeEnum.UPDATE,
                data: this.copy(row)
            };
        }
        if (type === OperationTypeEnum.VIEW) {
            this.cardNumber = {
                dialogTitle:
                    BaseConst.VIEW +
                    " " +
                    row.securityCode +
                    " " +
                    row.securityName,
                type: OperationTypeEnum.VIEW,
                data: row
            };
        }

        this.dialogVisible = true;
    }
    // 子组件回调函数
    private toFatherMsg(msg: WinRspType) {
        this.dialogVisible = false;
        if (msg === WinRspType.SUCC) {
            this.list();
        }
    }

    // 批量删除功能
    private delBatch() {
        if (this.selected.length === 1) {
            this.operation(this.selected[0], OperationTypeEnum.DELETE);
        } else {
            this.win_message_box_warning(
                "此操作将永久删除 " +
                    this.selected.length +
                    " 条证券基础信息, 是否继续?",
                "警告"
            ).then(() => {
                const ids: number[] = [];
                this.selected.forEach((element: SecurityBasicInfoRepVO) => {
                    ids.push(element.id);
                });
                this.service.batchDelete(ids).then((res: WinResponseData) => {
                    if (res.winRspType === WinRspType.ERROR) {
                        this.win_message_error(res.msg);
                    } else {
                        this.win_message_success(res.msg);
                        this.list();
                    }
                });
            });
        }
    }

    // 字典转义
    private formatDic({ cellValue, row, rowIndex, column, columnIndex }) {
        return this.dicFormatter(
            cellValue,
            this.securityBasicInfoDicData[column.property]
        );
    }

    // 日期格式
    private DateFormatter({ cellValue }) {
        return DateUtils.dateFtt("yyyyMMdd", new Date(cellValue));
    }

    // 数字千分位
    private CurrencyFormatter({ cellValue }) {
        return cellValue ? numberUtils.formatCurrency(cellValue, 2) : cellValue;
    }

    // 查外部表转义
    private formatExternalTable({ cellValue, row, rowIndex, column }) {
        if (column.property === "issuer") {
            for (const element of this.securityBasicInfoDicData.issuer) {
                if (element.publisherCode === cellValue) {
                    return element.publisherName;
                }
            }
        }
        if (column.property === "securityType") {
            for (const securityTypeRepVO of this.securityBasicInfoDicData
                .securityType) {
                if (securityTypeRepVO.securityType === cellValue) {
                    return securityTypeRepVO.securityTypeName;
                }
            }
        }
    }

    // 如果证券状态为停牌(longDelist值为1)，则标红
    private isRedRow({ row, rowIndex }) {
        if (row.longDelist === "1") {
            return "danger-row";
        }
    }

    // VUE实例被销毁时，释放数据
    private destroyed() {
        this.clear();
    }

    private clear() {
        SecurityBasicInfoEntity.marketCode = [];
        SecurityBasicInfoEntity.issueType = [];
        SecurityBasicInfoEntity.assetTypeDic = [];
        SecurityBasicInfoEntity.otherClassification = [];
        SecurityBasicInfoEntity.longDelist = [];
        SecurityBasicInfoEntity.securityType = [];
        SecurityBasicInfoEntity.issuer = [];
        SecurityBasicInfoEntity.transCurrency = [];
        SecurityBasicInfoEntity.tradeDayCode = [];
    }
}

export const SecurityBasicInfoConst = {
    CREATETITLE: "新增证券信息"
};
