/****************************************************
 * 创建人：     @author zoujian
 * 创建时间: 2019年6月10日/下午5:52:56
 * 项目名称：  FRONTEND
 * 文件名称: ParamFundController
 * 文件描述: @Description: (投资基金Controller)
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/
import { Component } from "vue-property-decorator";
import ParamFundService from "../service/ParamFundService";
import { ParamFundReqVO, ParamFundRepVO } from "../vo/ParamFundVO";
import { WinResponseData } from "../../common/vo/BaseVO";
import { DicRepVO, DicReqVO } from "../../dictionary/vo/DicVO";
import DicService from "../../dictionary/service/DicService";
import FundDialog from "../view/FundDialog.vue";
import { BaseConst } from "../../common/const/BaseConst";
import { WinRspType } from "../../common/enum/BaseEnum";
import PageVO from "../../common/vo/PageVO";
import BaseController from "../../common/controller/BaseController";
import { OperationTypeEnum } from "../../common/enum/OperationTypeEnum";
import FundDicVO from "../vo/FundDicVO";
import { MessageConst } from "../const/MessageConst";
@Component({ components: { FundDialog } })
export default class ParamFundController extends BaseController {
    private paramFundService: ParamFundService = new ParamFundService();
    private dicService: DicService = new DicService();
    private formInline: ParamFundReqVO = new ParamFundReqVO();
    private fundDicVO: FundDicVO = new FundDicVO();
    private marketTypes: DicRepVO[] = [];

    /** 列表信息 */
    private fundInfo: PageVO = new PageVO();
    private loading: boolean = false;
    private dialogVisible: boolean = false;
    private multipleSelection: any[] = [];
    private dialogSumbitText: string = "";
    private isShow: boolean = false;
    private showMoreText: string = "";
    private isShowClass: string = "";
    /** 子组件显示的信息 */
    private cardNumber: {
        dialogTitle: string;
        type: OperationTypeEnum;
        data: ParamFundRepVO;
        fundDicVO: FundDicVO;
    };

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
                    multipleSelection.forEach((element: ParamFundRepVO) => {
                        ids.push(element.id);
                    });
                    const idsStr: string = ids.join("_");
                    this.paramFundService
                        .delBatch(idsStr)
                        .then((response: WinResponseData) => {
                            this.message(response);
                        })
                        .catch((ex: any) => {
                            this.win_message_error(
                                MessageConst.FUND_BATCH_DELETE_FAIL
                            );
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
    private mounted() {
        this.list();
        const dic = new DicReqVO();
        const dicCodeArray = ["1000201", "1000202", "1000203", "1000204"];
        dic.parentDicCodeList = dicCodeArray;
        this.dicService
            .dicMultipleAllSubList(dic)
            .then((res: WinResponseData) => {
                /** 基金类型 */
                this.fundDicVO.fundTypes = res.data["1000201"];
                /** 投资分类 */
                this.fundDicVO.investmentClassifications = res.data["1000202"];
                /** 收费方式 */
                this.fundDicVO.chargingMethods = res.data["1000203"];
                /** 申赎状态 */
                this.fundDicVO.foreclosureStatuss = res.data["1000204"];
            });
        this.showMoreText = BaseConst.QUERYMORE;
        this.isShowClass = "el-icon-caret-top";
    }
    /** 更多查询样式处理 */
    private showMore() {
        this.isShow = !this.isShow;
        if (this.showMoreText === BaseConst.QUERYMORE) {
            this.showMoreText = BaseConst.RETRACT;
            this.isShowClass = "el-icon-caret-bottom";
        } else {
            this.showMoreText = BaseConst.QUERYMORE;
            this.isShowClass = "el-icon-caret-top";
            this.formInline.foreclosureStatus = null;
        }
    }
    /** 子组件回调函数 */
    private toFatherMsg(msg: string) {
        if (msg === WinRspType.SUCC) {
            this.list();
        }
        this.dialogVisible = false;
    }

    private query() {
        this.list();
    }
    /** 重置 */
    private reset() {
        this.formInline = new ParamFundReqVO();
    }

    private message(resoponse: WinResponseData) {
        if (resoponse.winRspType === WinRspType.ERROR) {
            this.win_message_error(resoponse.msg);
        } else {
            this.win_message_success(resoponse.msg);
            this.list();
        }
    }

    /** 选中 */
    private tableSelectionChange(val: any) {
        this.multipleSelection = val.selection;
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
            data: this.copy(row),
            fundDicVO: this.fundDicVO
        };
        this.dialogVisible = true;
    }

    /** 新增、修改、删除参数预置 */
    private operation(row: ParamFundRepVO, type: string) {
        if (type === OperationTypeEnum.ADD) {
            this.cardNumber = {
                dialogTitle: FundConst.CREATETITLE,
                type: OperationTypeEnum.ADD,
                data: new ParamFundRepVO(),
                fundDicVO: this.fundDicVO
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
                data: this.copy(row),
                fundDicVO: this.fundDicVO
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
                data: this.copy(row),
                fundDicVO: this.fundDicVO
            };
        }
        this.dialogVisible = true;
    }

    /** 数据字典映射 */
    private formatDic({ cellValue, row, rowIndex, column, columnIndex }) {
        if (column.property === "fundType") {
            return this.getLabelFromDic(row.fundType, this.fundDicVO.fundTypes);
        }
        if (column.property === "investmentClassification") {
            return this.getLabelFromDic(
                row.investmentClassification,
                this.fundDicVO.investmentClassifications
            );
        }
        if (column.property === "chargingMethod") {
            return this.getLabelFromDic(
                row.chargingMethod,
                this.fundDicVO.chargingMethods
            );
        }
        if (column.property === "foreclosureStatus") {
            return this.getLabelFromDic(
                row.foreclosureStatus,
                this.fundDicVO.foreclosureStatuss
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
     * 1、查询所有列表数据
     * 2、条件查询
     */
    private list() {
        this.paramFundService
            .list(this.formInline)
            .then((response: WinResponseData) => {
                if (response.winRspType === WinRspType.ERROR) {
                    this.win_message_error(response.msg);
                } else {
                    this.fundInfo = response.data;
                }
            })
            .catch((ex: any) => {
                this.win_message_error(MessageConst.FUND_QUERY_FAIL);
            });
    }

    /** 证券内码查询 */
    private listAll(queryString: string, cb: any) {
        const fundReqVO = new ParamFundReqVO();
        fundReqVO.securityCode = queryString;
        // 查询前10条数据展示
        fundReqVO.reqPageSize = 10;
        this.paramFundService
            .list(fundReqVO)
            .then((response: WinResponseData) => {
                if (response.winRspType === WinRspType.ERROR) {
                    this.win_message_error(response.data);
                } else {
                    const list = response.data.list;
                    this.filter(list, cb, queryString);
                }
            })
            .catch((ex: any) => {
                this.win_message_error(MessageConst.FUND_QUERY_FAIL);
            });
    }

    private filter(list: ParamFundRepVO[], cb: any, queryString: string) {
        const array = [];
        if (list.length > 0) {
            list.forEach((element: ParamFundRepVO) => {
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

    private createFilter(queryString: string) {
        return (res: any) => {
            return (
                res.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
            );
        };
    }

    /** 证券内码下拉选择处理 */
    private handleSelect(item: any) {
        this.formInline.securityCode = item.key;
    }

    /** 带分页参数查询 */
    private pageQuery(pageVO: PageVO) {
        this.formInline.reqPageNum = pageVO.pageNum;
        this.formInline.reqPageSize = pageVO.pageSize;
        this.list();
    }
}

export const FundConst = {
    /** 新增投资基金属性 */
    CREATETITLE: "新增投资基金属性"
};
