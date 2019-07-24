import { Component } from "vue-property-decorator";
import { mapState } from "vuex";
import BaseController from "../../common/controller/BaseController";
import { WinRspType } from "../../common/enum/BaseEnum";
import { OperationTypeEnum } from "../../common/enum/OperationTypeEnum";
import dateUtils from "../../common/util/DateUtils";
import { WinResponseData } from "../../common/vo/BaseVO";
import PageVO from "../../common/vo/PageVO";
import DicService from "../../dictionary/service/DicService";
import { DicReqVO } from "../../dictionary/vo/DicVO";
import MarketService from "../../market/service/MarketService";
import {
    SecurityTypeReqVO,
    TransactionDirectionReqVO
} from "../../market/vo/ParamMarketVO";
import { ProductInfoConstant } from "../const/ProdFundInfoConst";
import ProdCapitalAccountDialogService from "../service/ProdCapitalAccountDialogService";
import ProdPortfolioService from "../service/ProdPortfolioService";
import ProdPortfolioDialog from "../view/ProdPortfolioDialog.vue";
import { ProdPortfolioEntity } from "../vo/ProdPortfolioEntity";
import { ProdPortfolioRepVO, ProdPortfolioReqVO } from "../vo/ProdPortfolioVO";

@Component({
    components: { ProdPortfolioDialog },
    computed: {
        ...mapState({
            prodInfo: (state: any) => state.product.prodInfo
        })
    },
    watch: {
        prodInfo: {
            handler(newValue, oldValue) {
                this.list();
            }
        }
    }
})
export default class ProdPortfolioController extends BaseController {
    /**
     * 投资组合service
     */
    private service: ProdPortfolioService = new ProdPortfolioService();
    /**
     * 字典service
     */
    private dicService: DicService = new DicService();
    /**
     * 交易市场service,用来取证券类别和资产类别
     */
    private marketService: MarketService = new MarketService();

    /**
     * 资金账号service,用来取资金账号
     */
    private prodCapitalAccountDialogService: ProdCapitalAccountDialogService = new ProdCapitalAccountDialogService();

    // 数据字典
    private portfolioDicData: any = ProdPortfolioEntity;
    // 查询条件
    private formInline: ProdPortfolioReqVO = new ProdPortfolioReqVO();
    // 返回结果集
    private prodPortfolio: PageVO = new PageVO();

    // 选中行
    private selected: any = [];
    // Loading效果
    private loading: boolean = false;
    // 控制dialog显隐
    private dialogVisible: boolean = false;
    // 子组件显示的信息
    private cardNumber: {
        dialogTitle: string;
        type: OperationTypeEnum;
        data: ProdPortfolioRepVO;
    };

    private mounted() {
        this.list();
        // 缓存字典
        this.cacheDict();
        // 获取交易方向列表
        this.getTransactionDirections();
        // 获取交易规则列表
        this.tradeRules();
        // 获取资金账号列表
        this.cashAccountNumbers();
    }

    // 缓存字典
    private cacheDict() {
        const dic = new DicReqVO();
        /**
         * 交易市场,组合类型
         */
        dic.parentDicCodeList = [
            ProductInfoConstant.MARKET_CODE_DICCODE,
            ProductInfoConstant.PORTFOLIO_TYPE_DICCODE
        ];
        this.dicService
            .dicMultipleAllSubList(dic)
            .then((res: WinResponseData) => {
                this.portfolioDicData.marketCode =
                    res.data[ProductInfoConstant.MARKET_CODE_DICCODE];
                this.portfolioDicData.portfolioType =
                    res.data[ProductInfoConstant.PORTFOLIO_TYPE_DICCODE];
            });
    }

    // 获取交易方向列表
    private getTransactionDirections() {
        const queryVO: TransactionDirectionReqVO = new TransactionDirectionReqVO();
        queryVO.reqPageSize = 10000;
        this.marketService
            .queryTransactionDirection(queryVO)
            .then((response: WinResponseData) => {
                if (response.winRspType === WinRspType.ERROR) {
                    this.win_message_error(response.msg);
                } else {
                    this.portfolioDicData.transactionDirection =
                        response.data.list;
                }
            });
    }

    // 获取交易规则列表
    private tradeRules() {
        const queryVO: SecurityTypeReqVO = new SecurityTypeReqVO();
        queryVO.reqPageSize = 10000;
        this.marketService
            .querySecurityType(queryVO)
            .then((response: WinResponseData) => {
                if (response.winRspType === WinRspType.ERROR) {
                    this.win_message_error(response.msg);
                } else {
                    this.portfolioDicData.tradeRule = response.data.list;
                }
            });
    }

    // 获取资金账号列表
    private cashAccountNumbers() {
        this.prodCapitalAccountDialogService
            .list(null)
            .then((response: WinResponseData) => {
                if (response.winRspType === WinRspType.ERROR) {
                    this.win_message_error(response.data);
                } else {
                    this.portfolioDicData.capitalAccount = response.data;
                }
            });
    }

    // 查询单条或所有数据
    private list() {
        this.formInline.fundNo = this.prodInfo.fundNo;
        this.service
            .list(this.formInline)
            .then((winResponseData: WinResponseData) => {
                if (winResponseData.winRspType === WinRspType.ERROR) {
                    this.win_message_error(winResponseData.msg);
                } else {
                    this.prodPortfolio = winResponseData.data;
                }
            });
    }

    /** 带分页参数查询 */
    private pageQuery(pageVO) {
        this.formInline.reqPageNum = pageVO.pageNum;
        this.formInline.reqPageSize = pageVO.pageSize;
        this.list();
    }

    // 字典转义
    private formatDic({ cellValue, row, rowIndex, column, columnIndex }) {
        if (column.property === "status") {
            if (row.status === "1") {
                return "正常";
            }
            if (row.status === "2") {
                return "过期";
            }
        }
        if (column.property === "portfolioType") {
            return this.dicFormatter(
                cellValue,
                this.portfolioDicData.portfolioType
            );
        }
        if (column.property === "operator") {
            return row.updateUserId ? row.updateUserId : row.createUserId;
            // return row.updateUserName ? row.updateUserName : row.createUserName;
        }
        if (column.property === "operationTime") {
            const time: string = row.updateTime
                ? row.updateTime
                : row.createTime;
            return dateUtils.dateFtt("yyyy-MM-dd hh:mm:ss", new Date(time));
        }
    }

    private formatCount({ cellValue, row, rowIndex, column, columnIndex }) {
        return this.split(cellValue).length;
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

    // 批量删除功能
    private delBatch() {
        if (this.selected.length === 1) {
            this.operation(this.selected[0], OperationTypeEnum.DELETE);
        } else {
            this.win_message_box_warning(
                "此操作将永久删除 " +
                    this.selected.length +
                    " 条投资组合, 是否继续?",
                "警告"
            ).then(() => {
                const ids: number[] = [];
                this.selected.forEach((element: ProdPortfolioRepVO) => {
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

    // 双击查看
    private view({ cellValue, row, rowIndex, column, columnIndex }) {
        this.operation(row, OperationTypeEnum.VIEW);
    }

    /** 新增、修改、删除参数预置 */
    private operation(row: ProdPortfolioRepVO, type: string) {
        if (type === OperationTypeEnum.ADD) {
            this.cardNumber = {
                dialogTitle: ProdPortfolioConst.CREATETITLE,
                type: OperationTypeEnum.ADD,
                data: this.setFundInfo(new ProdPortfolioRepVO())
            };
        } else {
            row.permitMarketCodeArray = this.split(row.permitMarketCodes);
            if (type === OperationTypeEnum.DELETE) {
                this.cardNumber = {
                    dialogTitle: ProdPortfolioConst.DELETETITLE,
                    type: OperationTypeEnum.DELETE,
                    data: this.setFundInfo(row)
                };
            }
            if (type === OperationTypeEnum.UPDATE) {
                this.cardNumber = {
                    dialogTitle: ProdPortfolioConst.UPDATETITLE,
                    type: OperationTypeEnum.UPDATE,
                    data: this.copy(this.setFundInfo(row))
                };
            }
            if (type === OperationTypeEnum.VIEW) {
                this.cardNumber = {
                    dialogTitle: ProdPortfolioConst.VIEWTITLE,
                    type: OperationTypeEnum.VIEW,
                    data: this.setFundInfo(row)
                };
            }
        }
        this.dialogVisible = true;
    }
    private setFundInfo(data: ProdPortfolioRepVO) {
        data.fundNo = this.prodInfo.fundNo;
        data.fundCode = this.prodInfo.fundCode;
        data.fundName = this.prodInfo.fundName;
        return data;
    }

    // 子组件回调函数
    private toFatherMsg(msg: WinRspType) {
        this.dialogVisible = false;
        if (msg === WinRspType.SUCC) {
            this.list();
        }
    }

    // VUE实例被销毁时，释放数据
    private destroyed() {
        this.clear();
    }

    private clear() {
        ProdPortfolioEntity.marketCode = [];
        ProdPortfolioEntity.portfolioType = [];
        ProdPortfolioEntity.transactionDirection = [];
        ProdPortfolioEntity.tradeRule = [];
        ProdPortfolioEntity.capitalAccount = [];
    }

    private split(val: string) {
        if (val && val.length > 0) {
            return val.split(",");
        }
        return [];
    }
}

export const ProdPortfolioConst = {
    CREATETITLE: "新增投资组合",
    UPDATETITLE: "修改投资组合",
    DELETETITLE: "删除投资组合",
    VIEWTITLE: "查看投资组合"
};
