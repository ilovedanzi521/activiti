import { Component } from "vue-property-decorator";
import BaseController from "../../common/controller/BaseController";
import ProdEscrowAccountInfoService from "../service/ProdEscrowAccountInfoService";
import {
    ProdEscrowAccountInfoReqVO,
    ProdEscrowAccountInfoRepVO
} from "../vo/ProdEscrowAccountInfoVO";
import { WinResponseData } from "../../common/vo/BaseVO";
import { WinRspType } from "../../common/enum/BaseEnum";
import { OperationTypeEnum } from "../../common/enum/OperationTypeEnum";
import ProdEscrowAccountInfoDic from "../vo/ProdEscrowAccountInfoDic";
import ProdEscrowAccountInfoDialog from "../view/ProdEscrowAccountInfoDialog.vue";
import { DicReqVO, DicRepVO } from "../../dictionary/vo/DicVO";
import DicService from "../../dictionary/service/DicService";
import { mapState } from "vuex";
import dateUtils from "../../common/util/DateUtils";
import ParamCurrencyRepVO from "../../currency/vo/ParamCurrencyRepVO";
import ExchangeRateService from "../../currency/service/ExchangeRateService";
@Component({
    components: { ProdEscrowAccountInfoDialog },
    computed: {
        ...mapState({
            prodInfo: state => state.product.prodInfo
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
export default class ProdEscrowAccountInfoController extends BaseController {
    private dicService: DicService = new DicService();
    private exchangeRateService: ExchangeRateService = new ExchangeRateService();
    private prodEscrowAccountInfoService: ProdEscrowAccountInfoService = new ProdEscrowAccountInfoService();
    private prodEscrowAccountInfoReqVO: ProdEscrowAccountInfoReqVO = new ProdEscrowAccountInfoReqVO();
    private loading: boolean = false;
    private dialogVisible: boolean = false;
    private dicVOList: ProdEscrowAccountInfoDic = new ProdEscrowAccountInfoDic();
    /** 子组件显示的信息 */
    private cardNumber: {
        dialogTitle: string;
        type: OperationTypeEnum;
        data: ProdEscrowAccountInfoRepVO;
        dicVOList: ProdEscrowAccountInfoDic;
    };
    /**
     * 页面初始化
     */
    private mounted() {
        const dic = new DicReqVO();
        const dicCodeArray = ["1000221", "1000270"];
        dic.parentDicCodeList = dicCodeArray;
        this.dicService
            .dicMultipleAllSubList(dic)
            .then((res: WinResponseData) => {
                /** 资金账户类型 */
                this.dicVOList.accountTypeDic = res.data["1000270"];
            });
        this.getTransCurrencys();
        this.$nextTick(() => {
            this.list();
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
                    this.dicVOList.currencyDic = response.data;
                }
            });
    }

    /**
     * 列表数据查询
     */
    private list() {
        this.prodEscrowAccountInfoReqVO.fundNo = this.prodInfo.fundNo;
        this.prodEscrowAccountInfoService
            .list(this.prodEscrowAccountInfoReqVO)
            .then((res: WinResponseData) => {
                if (res.winRspType === WinRspType.ERROR) {
                    this.win_message_error(res.msg);
                } else {
                    this.pageVO = res.data;
                }
            });
    }

    /** 子组件回调函数 */
    private toFatherMsg(msg: string) {
        if (msg === WinRspType.SUCC) {
            this.list();
        }
        this.dialogVisible = false;
    }

    /**
     * 带分页参数查询
     * @param pageParm
     */
    private pageQuery(pageParm: any) {
        this.pageVO.pageNum = pageParm.pageNum;
        this.pageVO.pageSize = pageParm.pageSize;
        this.list();
    }
    /**
     * 双击查看
     * @param row
     * @param event
     */
    private dblclick({ row, rowIndex, column, columnIndex }, event: Event) {
        this.dialogVisible = true;
        this.cardNumber = {
            dialogTitle: EscrowAccountConst.VIEWTITLE,
            type: OperationTypeEnum.VIEW,
            data: this.setFundInfo(row),
            dicVOList: this.dicVOList
        };
    }

    /**
     * 新增、修改、删除弹框
     * @param row
     * @param type
     */
    private operation(row: ProdEscrowAccountInfoRepVO, type: string) {
        this.dialogVisible = true;

        if (type === OperationTypeEnum.ADD) {
            row = new ProdEscrowAccountInfoRepVO();
            this.cardNumber = {
                dialogTitle: EscrowAccountConst.CREATETITLE,
                type: OperationTypeEnum.ADD,
                data: this.setFundInfo(row),
                dicVOList: this.dicVOList
            };
        }

        if (type === OperationTypeEnum.DELETE) {
            this.cardNumber = {
                dialogTitle: EscrowAccountConst.DELETETITLE,
                type: OperationTypeEnum.DELETE,
                data: this.setFundInfo(row),
                dicVOList: this.dicVOList
            };
        }
        if (type === OperationTypeEnum.UPDATE) {
            this.cardNumber = {
                dialogTitle: EscrowAccountConst.MODIFYTITLE,
                type: OperationTypeEnum.UPDATE,
                data: this.setFundInfo(row),
                dicVOList: this.dicVOList
            };
        }
    }

    /**
     * 设置产品信息
     * @param data
     */
    private setFundInfo(data: ProdEscrowAccountInfoRepVO) {
        data.fundNo = this.prodInfo.fundNo;
        data.fundCode = this.prodInfo.fundCode;
        data.fundName = this.prodInfo.fundName;
        return data;
    }

    /** 数据字典映射 */
    private formatDic({ cellValue, row, rowIndex, column, columnIndex }) {
        if (column.property === "accountType") {
            return this.getLabelFromDic(
                row.accountType,
                this.dicVOList.accountTypeDic
            );
        }
        if (column.property === "currencyCode") {
            return this.getCurrrencyName(
                row.currencyCode,
                this.dicVOList.currencyDic
            );
        }
        if (column.property === "createUserId") {
            return row.updateUserId ? row.updateUserId : row.createUserId;
        }
        if (column.property === "createTime") {
            const date = new Date(
                row.updateTime ? row.updateTime : row.createTime
            );
            return dateUtils.dateFtt("yyyy-MM-dd hh:mm:ss", date);
        }
    }

    private getCurrrencyName(str: string, currencyArray: ParamCurrencyRepVO[]) {
        let value = "";
        for (const currency of currencyArray) {
            if (currency.currencyCode === str) {
                value = currency.currencyName;
                break;
            }
        }
        return value;
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
}

export const EscrowAccountConst = {
    /** 新增托管账户 */
    CREATETITLE: "新增托管账户",
    /** 查看托管账户 */
    VIEWTITLE: "查看托管账户",
    /** 修改托管账户 */
    MODIFYTITLE: "修改托管账户",
    /** 删除托管账户 */
    DELETETITLE: "删除托管账户"
};
