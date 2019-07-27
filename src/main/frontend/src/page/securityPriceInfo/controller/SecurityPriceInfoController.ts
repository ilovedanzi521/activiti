import { Component } from "vue-property-decorator";
import BaseController from "../../common/controller/BaseController";
import ParamPriceInfoService from "../service/ParamPriceInfoService";
import {
    ParamPriceInfoReqVO,
    ParamPriceInfoRepVO
} from "../vo/ParamPriceInfoVO";
import { DicReqVO, DicRepVO } from "../../dictionary/vo/DicVO";
import DicService from "../../dictionary/service/DicService";
import { WinResponseData } from "../../common/vo/BaseVO";
import { WinRspType } from "../../common/enum/BaseEnum";
import priceInfoDialog from "../view/PriceInfoDialog.vue";
import { BondConstant } from "../const/BondConstant";
import DateUtils from "../../common/util/DateUtils";
import { BaseConst } from "../../common/const/BaseConst";
import MarketService from "../../market/service/MarketService";
import { OperationTypeEnum } from "../../common/enum/OperationTypeEnum";
import { ParamPriceInfoDic } from "../vo/ParamPriceInfoDic";

@Component({ components: { priceInfoDialog } })
export default class PriceInfoController extends BaseController {
    private dicService: DicService = new DicService();
    private service: ParamPriceInfoService = new ParamPriceInfoService();
    /** 查询参数 */
    private form: ParamPriceInfoReqVO = new ParamPriceInfoReqVO();
    /** 查询返回发行人列表 */
    private repVOs: ParamPriceInfoRepVO[] = [];
    /** 新增、保存对象 */
    private priceInfoVO: ParamPriceInfoRepVO = new ParamPriceInfoRepVO();

    private priceInfoList: [];

    private tableData = [];

    private value = {
        name: String,
        sex: Number,
        grade: String,
        jointime: String
    };

    private multipleSelection: any = [];
    private dialogVisible: boolean = false;

    private dialogFormVisible: boolean = false;

    // 修改6-13
    // 子组件显示的信息
    private cardNumber: {
        dialogTitle: string;
        type: OperationTypeEnum;
        data: ParamPriceInfoRepVO;
        delistStatusTypes: DicRepVO[];
    };
    private securityCodes = [];
    private dialogSumbitText: string = "";
    private selected: any = [];
    private priceInfoPage = [];
    private delistStatusTypes: DicRepVO[] = [];
    private assetTypes: DicRepVO[] = [];
    private marketService: MarketService = new MarketService();
    // 缓存字典项
    private priceInfoDicData: any = ParamPriceInfoDic;

    private mounted() {
        this.$nextTick(() => {
            this.query();
        });
        this.cacheDict();
        /**
         * 初始化分页
         */
        this.pageVO.pageSize = 10;
        this.pageVO.pageNum = 1;
        this.pageVO.total = 0;
    }

    /** 获取证券行情list */
    /** 获取列表数据 */
    private query() {
        this.service
            .list(this.form)
            .then((winResponseData: WinResponseData) => {
                if (WinRspType.SUCC === winResponseData.winRspType) {
                    this.pageVO = winResponseData.data;
                }
            });
    }
    /** 重置 */
    private resetForm() {
        this.form = new ParamPriceInfoReqVO();
        this.query();
    }

    // 子组件回调函数
    private toFatherMsg(msg: WinRspType) {
        this.dialogVisible = false;
        if (msg === WinRspType.SUCC) {
            this.query();
        }
    }

    /** 字典缓存 */
    private cacheDict() {
        const dic = new DicReqVO();
        /**
         * 证券状态,资产类别,交易市场
         */
        dic.parentDicCodeList = ["1000217", "1000116", "1000102"];
        this.dicService
            .dicMultipleAllSubList(dic)
            .then((res: WinResponseData) => {
                this.delistStatusTypes = res.data[1000217];
                this.priceInfoDicData.assetType = res.data[1000116];
                this.priceInfoDicData.marketType = res.data[1000102];
            });
        // 证券类型
        this.getSecurityTypes();
    }

    /** 处理table万元/10000 */
    private CountFormatter({ row, rowIndex, column, columnIndex }) {
        // 成交量
        if (column.property === "tradeCount") {
            return (parseFloat(row.tradeCount) / 10000).toString();
        }
        // 成交额
        if (column.property === "tradePrice") {
            return (parseFloat(row.tradePrice) / 10000).toString();
        }
    }

    // 修改删除展示万元
    private divideBy10000(row: ParamPriceInfoRepVO) {
        /**
         * 元转万元
         */
        if (row.tradeCount != null) {
            row.tradeCount = (parseFloat(row.tradeCount) / 10000).toString();
        }
        if (row.tradePrice != null) {
            row.tradePrice = (parseFloat(row.tradePrice) / 10000).toString();
        }
    }

    /** 双击查看 */
    private dblclick({ row, rowIndex, column, columnIndex }, event: Event) {
        const copyRow = this.copy(row);
        this.divideBy10000(copyRow);
        this.cardNumber = {
            dialogTitle:
                BaseConst.VIEW +
                " " +
                row.securityCode +
                " " +
                row.securityName,
            type: OperationTypeEnum.VIEW,
            data: copyRow,
            delistStatusTypes: this.delistStatusTypes
            // fundDicVO: this.fundDicVO
        };
        this.dialogVisible = true;
    }

    /** 增删改dialog弹框 */
    private operation(row: ParamPriceInfoRepVO, type: string) {
        if (type === OperationTypeEnum.ADD) {
            this.cardNumber = {
                dialogTitle: PriceInfo.CREATETITLE,
                type: OperationTypeEnum.ADD,
                data: new ParamPriceInfoRepVO(),
                delistStatusTypes: this.delistStatusTypes
            };
        }
        if (type === OperationTypeEnum.DELETE) {
            const copyRow = this.copy(row);
            this.divideBy10000(copyRow);
            this.cardNumber = {
                dialogTitle:
                    BaseConst.DELETE +
                    " " +
                    row.securityCode +
                    " " +
                    row.securityName,
                type: OperationTypeEnum.DELETE,
                data: copyRow,
                delistStatusTypes: this.delistStatusTypes
            };
        }
        if (type === OperationTypeEnum.UPDATE) {
            const copyRow = this.copy(row);
            this.divideBy10000(copyRow);
            this.cardNumber = {
                dialogTitle:
                    BaseConst.MODIFY +
                    " " +
                    row.securityCode +
                    " " +
                    row.securityName,
                type: OperationTypeEnum.UPDATE,
                data: copyRow,
                delistStatusTypes: this.delistStatusTypes
            };
        }
        this.dialogVisible = true;
    }
    // 选中
    private tableSelectionChange(val: any) {
        this.multipleSelection = val.selection;
    }

    /** 批量删除 */
    private delBatch() {
        const multipleSelection = this.multipleSelection;
        if (multipleSelection.length > 1) {
            this.win_message_box_warning(
                "此操作将永久删除" +
                    multipleSelection.length +
                    " 条信息, 是否继续?",
                BaseConst.WARNING,
                false
            ).then((res: any) => {
                const ids = [];
                multipleSelection.forEach((element: ParamPriceInfoRepVO) => {
                    ids.push(element.id);
                });
                const idsStr: string = ids.join(",");
                this.service
                    .delBatch(idsStr)
                    .then((response: WinResponseData) => {
                        this.message(response);
                    })
                    .catch((ex: any) => {
                        this.win_message_error("批量删除失败");
                    });
            });
        } else {
            const row = multipleSelection[0];
            this.$nextTick(() => {
                this.operation(row, OperationTypeEnum.DELETE);
            });
        }
    }
    private message(resoponse: WinResponseData) {
        if (resoponse.winRspType === WinRspType.ERROR) {
            this.win_message_error(resoponse.msg);
        } else {
            this.win_message_success(resoponse.msg);
            this.query();
        }
    }
    /** 带分页参数查询 */
    private pageQuery(pageVO) {
        this.form.reqPageNum = pageVO.pageNum;
        this.form.reqPageSize = pageVO.pageSize;
        this.query();
    }

    /** 查询下拉数据 */
    private listAll(queryString, cb) {
        this.service
            .list(new ParamPriceInfoReqVO())
            .then((response: WinResponseData) => {
                if (response.winRspType === "ERROR") {
                    this.errorMessage(response.msg);
                } else {
                    const list = response.data.list;
                    this.filter(list, cb, queryString);
                }
            });
    }
    // 证券代码下拉选择处理
    private handleSelect(item) {
        this.form.securityCode = item.key;
    }
    private filter(list, cb, queryString) {
        const array = [];
        if (list.length > 0) {
            list.forEach((element: ParamPriceInfoRepVO) => {
                const ob = { value: "", key: "" };
                ob.key = element.securityCode;
                ob.value =
                    element.securityCode + "(" + element.securityName + ")";
                array.push(ob);
            });
        }
        const results = queryString
            ? array.filter(this.createFilter(queryString))
            : array;
        // 调用 callback 返回建议列表的数据
        cb(results);
    }
    private createFilter(queryString) {
        return (res: any) => {
            return (
                res.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
            );
        };
    }

    /** 字典code与字典释义转换 */
    private formatDic({ row, rowIndex, column, columnIndex }) {
        // 证券状态
        if (column.property === "delistStatus") {
            return this.getLabelFromDic(
                row.delistStatus,
                this.delistStatusTypes
            );
        }
        // 交易市场
        if (column.property === "marketCode") {
            return this.getLabelFromDic(
                row.marketCode,
                this.priceInfoDicData.marketType
            );
        }
    }
    private getLabelFromDic(str: string, dicArray: DicRepVO[]) {
        let value = "";
        for (const dic of dicArray) {
            if (dic.dicCode === str) {
                value = dic.dicExplain;
                break;
            }
        }
        return value;
    }

    /**
     * 表单数据提交事件监听
     */
    private formDataSubmit(msg: any) {
        if (msg.myTitleType === 0) {
            this.win_message_success(BondConstant.ADD_SUCCESS);
        }
        if (msg.myTitleType === 1) {
            this.win_message_success(BondConstant.EDIT_SUCCESS);
        }
        if (msg.myTitleType === 2) {
            this.win_message_success(BondConstant.DELETE_SUCCESS);
        }
        this.query();
    }

    // 如果证券状态为停牌(longDelist值为1)，则标红
    private isRedRow({ row, rowIndex }) {
        if (row.delistStatus === "1") {
            return "danger-row";
        }
    }

    // 日期格式
    private DateFormatter({ cellValue }) {
        return DateUtils.dateFtt("yyyyMMdd", new Date(cellValue));
    }
    // 获取证券类别列表
    private getSecurityTypes() {
        this.marketService
            .querySecurityCode()
            .then((response: WinResponseData) => {
                if (response.winRspType === WinRspType.ERROR) {
                    this.errorMessage(response.msg);
                } else {
                    this.priceInfoDicData.securityType = response.data;
                }
            });
    }
}
export const PriceInfo = {
    CREATETITLE: "新增证券行情",
    DELETETITLE: "删除证券行情",
    UPDATETITLE: "修改证券行情",
    DELETE: "删除",
    CONFIRM: "确定"
};
