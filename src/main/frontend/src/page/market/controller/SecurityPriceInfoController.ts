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
// import { WinRspType } from "@win-frond-frameworks/biz-common";
import { WinRspType } from "@win-frond-frameworks/biz-common";
import priceInfoDialog from "../view/PriceInfoDialog.vue";
import { BondConstant } from "../const/BondConstant";
import DateUtils from "../../common/util/DateUtils";
import { BaseConst } from "../../common/const/BaseConst";
import { SecurityTypeRepVO } from "../vo/ParamMarketVO";
import MarketService from "../../market/service/MarketService";
import numberUtils from "../../common/util/NumberUtils";
import { OperationTypeEnum } from "../../common/enum/OperationTypeEnum";
import { SecurityTypeReqVO } from "../vo/ParamMarketVO";

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

    private priceInfoList: Array<ParamPriceInfoRepVO> = [];

    private tableData = [];

    private value = {
        name: String,
        sex: Number,
        grade: String,
        jointime: String
    };

    private multipleSelection: any = {};
    private dialogVisible: boolean = false;

    private dialogFormVisible: boolean = false;

    /**
     * 证券类别，资产类别相关
     */
    private securityTypeRepVOs: SecurityTypeRepVO[] = [];

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

    private mounted() {
        this.$nextTick(() => {
            this.query();
        });

        /**
         * 初始化分页
         */
        this.pageVO.pageSize = 10;
        this.pageVO.pageNum = 1;
        this.pageVO.total = 0;

        const dic = new DicReqVO();
        /** 证券状态类型 0正常 1停牌 2退市 */
        dic.parentDicCode = "1000217";
        this.dicService.dicAllSubList(dic).then(res => {
            this.delistStatusTypes = res.data;
        });
        const dic2 = new DicReqVO();
        /** 资产类别 */
        dic2.parentDicCode = "1000116";
        this.dicService.dicAllSubList(dic2).then(res => {
            this.assetTypes = res.data;
        });
        this.getSecurityTypes();
    }
    private activeName() {}
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
    }

    // 子组件回调函数
    private toFatherMsg(msg: WinRspType) {
        this.dialogVisible = false;
        if (msg === WinRspType.SUCC) {
            this.query();
        }
    }

    /** 处理table万元/10000 */
    private CountFormatter(
        row: any,
        column: any,
        cellValue: string,
        index: number
    ) {
        if (cellValue != null) {
            cellValue = (parseFloat(cellValue) / 10000).toString();
            return cellValue;
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
            )
                .then((res: any) => {
                    const ids = [];
                    multipleSelection.forEach(
                        (element: ParamPriceInfoRepVO) => {
                            ids.push(element.id);
                        }
                    );
                    const idsStr: string = ids.join(",");
                    this.service
                        .delBatch(idsStr)
                        .then((response: WinResponseData) => {
                            this.message(response);
                        })
                        .catch((ex: any) => {
                            this.win_message_error("批量删除失败");
                        });
                })
                .catch(() => {});
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
    // 证券内码下拉选择处理
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
        return res => {
            return (
                res.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
            );
        };
    }

    /**字典code与字典释义转换 */
    private formatDic({ row, rowIndex, column, columnIndex }) {
        if (column.property === "delistStatus") {
            return this.getLabelFromDic(
                row.delistStatus,
                this.delistStatusTypes
            );
        }
    }
    private getLabelFromDic(str, dic: Array<DicRepVO>) {
        let value = "";
        for (let i = 0; i < dic.length; i++) {
            if (dic[i].dicCode === str) {
                value = dic[i].dicExplain;
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
                    this.securityTypeRepVOs = response.data;
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
