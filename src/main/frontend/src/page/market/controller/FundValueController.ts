import { Component } from "vue-property-decorator";
import BaseController from "../../common/controller/BaseController";
import { DicReqVO, DicRepVO } from "../../dictionary/vo/DicVO";
import DicService from "../../dictionary/service/DicService";
import { WinResponseData } from "../../common/vo/BaseVO";
import { WinRspType } from "../../common/enum/BaseEnum";
import ParamFundValueService from "../service/ParamFundValueService";
import {
    ParamFundValueReqVO,
    ParamFundValueRepVO
} from "../vo/ParamFundValueVO";
import fundValueDialog from "../view/FundValueDialog.vue";
import DateUtils from "../../common/util/DateUtils";
import numberUtils from "../../common/util/NumberUtils";
import { BaseConst } from "../../common/const/BaseConst";
import { OperationTypeEnum } from "../../common/enum/OperationTypeEnum";

@Component({ components: { fundValueDialog } })
export default class FundValueController extends BaseController {
    private dicService: DicService = new DicService();
    private service: ParamFundValueService = new ParamFundValueService();
    /** 查询参数 */
    private form: ParamFundValueReqVO = new ParamFundValueReqVO();
    private form1: ParamFundValueRepVO = new ParamFundValueRepVO();
    /** 查询返回发行人列表 */
    private repVOs: ParamFundValueRepVO[] = [];
    /** 新增、保存对象 */
    private fundValueVO: ParamFundValueRepVO = new ParamFundValueRepVO();

    private fundValueList: Array<ParamFundValueRepVO> = [];

    private tableData = [];

    private value = {
        name: String,
        sex: Number,
        grade: String,
        jointime: String
    };

    private multipleSelection: any[] = [];
    private dialogVisible: boolean = false;

    private dialogFormVisible: boolean = false;
    // 修改6-13
    // 子组件显示的信息
    private cardNumber: any;
    private securityCodes = [];
    private dialogSumbitText: string = "";
    private selected: any = [];
    private fundValuePage = [];
    /** 列表信息 */

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
    }
    private activeName() {}
    /** 获取投资基金list */
    private query() {
        this.service
            .list(this.form)
            .then((winResponseData: WinResponseData) => {
                if (WinRspType.SUCC == winResponseData.winRspType) {
                    this.pageVO = winResponseData.data;
                }
            });
    }
    /** 重置 */
    private resetForm() {
        this.form = new ParamFundValueReqVO();
    }

    /** 选中 */
    private tableSelectionChange(val: any) {
        this.multipleSelection = val.selection;
    }

    /** 增删改dialog弹框 */
    private operation(row: ParamFundValueRepVO, type: string) {
        if (type === OperationTypeEnum.ADD) {
            this.cardNumber = {
                dialogTitle: fundValue.CREATETITLE,
                type: OperationTypeEnum.ADD,
                data: new ParamFundValueRepVO()
            };
        }
        if (type === OperationTypeEnum.DELETE) {
            const copyRow = this.copy(row);
            this.cardNumber = {
                dialogTitle: fundValue.DELETETITLE,
                type: OperationTypeEnum.DELETE,
                data: copyRow
            };
        }
        if (type === OperationTypeEnum.UPDATE) {
            const copyRow = this.copy(row);
            this.cardNumber = {
                dialogTitle: fundValue.UPDATETITLE,
                type: OperationTypeEnum.UPDATE,
                data: copyRow
            };
        }
        this.dialogVisible = true;
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
                        (element: ParamFundValueRepVO) => {
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
                            this.win_message_error("删除失败");
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

    /** 带分页参数查询 */
    private pageQuery(pageVO) {
        this.form.reqPageNum = pageVO.pageNum;
        this.form.reqPageSize = pageVO.pageSize;
        this.query();
    }

    /** 查询下拉数据 */
    private listAll(queryString, cb) {
        this.service
            .list(new ParamFundValueReqVO())
            .then((response: WinResponseData) => {
                if (response.winRspType === "ERROR") {
                    this.errorMessage(response.msg);
                } else {
                    let list = response.data.list;
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
            list.forEach((element: ParamFundValueRepVO) => {
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

    // 日期格式
    private DateFormatter({ cellValue }) {
        return DateUtils.dateFtt("yyyyMMdd", new Date(cellValue));
    }

    /**
     * 处理折算率*100处理
     */
    public couponRateFormatter({ cellValue }) {
        return numberUtils.multiplyBy100(cellValue, 3);
    }

    // 子组件回调函数
    private toFatherMsg(msg: WinRspType) {
        this.dialogVisible = false;
        if (msg === WinRspType.SUCC) {
            this.query();
        }
    }

    /** 双击查看 */
    private dblclick({ row, rowIndex, column, columnIndex }, event: Event) {
        this.cardNumber = {
            dialogTitle:
                BaseConst.VIEW +
                " " +
                row.securityCode +
                " " +
                row.securityName,
            type: OperationTypeEnum.VIEW,
            data: this.copy(row)
        };
        this.dialogVisible = true;
    }
    private message(resoponse: WinResponseData) {
        if (resoponse.winRspType === WinRspType.ERROR) {
            this.win_message_error(resoponse.msg);
        } else {
            this.win_message_success(resoponse.msg);
            this.query();
        }
    }
}
export const fundValue = {
    CREATETITLE: "新增投资基金净值",
    DELETETITLE: "删除投资基金净值",
    UPDATETITLE: "修改投资基金净值",
    DELETE: "删除",
    CONFIRM: "确定"
};
