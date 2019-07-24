import { Component } from "vue-property-decorator";
import BaseController from "../../common/controller/BaseController";
import { WinResponseData } from "../../common/vo/BaseVO";
import { WinRspType } from "../../common/enum/BaseEnum";
import { OperationTypeEnum } from "../../common/enum/OperationTypeEnum";
import ProdCapitalAccountDialog from "../view/ProdCapitalAccountDialog.vue";
import { DicReqVO, DicRepVO } from "../../dictionary/vo/DicVO";
import DicService from "../../dictionary/service/DicService";
import ProdCapitalAccountDic from "../vo/ProdCapitalAccountDic";
import { mapState } from "vuex";
import {
    ProdCapitalAccountRepVO,
    ProdCapitalAccountReqVO
} from "../vo/ProdCapitalAccountVO";
import ProdCapitalAccountService from "../service/ProdCapitalAccountService";
import dateUtils from "../../common/util/DateUtils";
import ExchangeRateService from "../../currency/service/ExchangeRateService";
import ParamCurrencyRepVO from "../../currency/vo/ParamCurrencyRepVO";
@Component({
    components: { ProdCapitalAccountDialog },
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
export default class ProdCapitalAccountController extends BaseController {
    private dicService: DicService = new DicService();
    private prodCapitalAccountService: ProdCapitalAccountService = new ProdCapitalAccountService();
    private exchangeRateService: ExchangeRateService = new ExchangeRateService();
    private prodCapitalAccountReqVO: ProdCapitalAccountReqVO = new ProdCapitalAccountReqVO();
    private loading: boolean = false;
    private dialogVisible: boolean = false;
    private dicVOList: ProdCapitalAccountDic = new ProdCapitalAccountDic();
    /** 子组件显示的信息 */
    private cardNumber: {
        type: OperationTypeEnum;
        data: ProdCapitalAccountRepVO;
        dicVOList: ProdCapitalAccountDic;
    };
    /**
     * 页面初始化
     */
    private mounted() {
        const dic = new DicReqVO();
        const dicCodeArray = ["1000221", "1000222", "1000223"];
        dic.parentDicCodeList = dicCodeArray;
        this.dicService
            .dicMultipleAllSubList(dic)
            .then((res: WinResponseData) => {
                /** 资金账户类型 */
                this.dicVOList.accountType = res.data["1000222"];
                /** 资金账户状态 */
                this.dicVOList.accountStatus = res.data["1000223"];
            });
        /** 资产币种 */
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
        this.prodCapitalAccountReqVO.fundNo = this.prodInfo.fundNo;
        this.prodCapitalAccountService
            .list(this.prodCapitalAccountReqVO)
            .then((res: WinResponseData) => {
                if (res.winRspType === WinRspType.ERROR) {
                    this.win_message_error(res.msg);
                } else {
                    this.pageVO = res.data;
                }
            });
    }

    /**
     * 子组件回调函数
     * @param msg
     */
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
    private operation(row: ProdCapitalAccountRepVO, type: string) {
        this.dialogVisible = true;

        if (type === OperationTypeEnum.ADD) {
            row = new ProdCapitalAccountRepVO();
            this.cardNumber = {
                type: OperationTypeEnum.ADD,
                data: this.setFundInfo(row),
                dicVOList: this.dicVOList
            };
        }
        if (type === OperationTypeEnum.DELETE) {
            this.cardNumber = {
                type: OperationTypeEnum.DELETE,
                data: this.setFundInfo(row),
                dicVOList: this.dicVOList
            };
        }
        if (type === OperationTypeEnum.UPDATE) {
            this.cardNumber = {
                type: OperationTypeEnum.UPDATE,
                data: this.setFundInfo(row),
                dicVOList: this.dicVOList
            };
        }
    }

    /**
     * 数据字典映射
     * @param row
     * @param column
     * @param cellValue
     */
    private formatDic({ cellValue, row, rowIndex, column, columnIndex }) {
        if (column.property === "accountType") {
            return this.getLabelFromDic(
                row.accountType,
                this.dicVOList.accountType
            );
        }
        if (column.property === "brokerType") {
            return this.getLabelFromDic(
                row.brokerType,
                this.dicVOList.brokerType
            );
        }
        if (column.property === "accountStatus") {
            return this.getLabelFromDic(
                row.accountStatus,
                this.dicVOList.accountStatus
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

    /**
     * 设置产品信息
     * @param data
     */
    private setFundInfo(data: ProdCapitalAccountRepVO) {
        data.fundNo = this.prodInfo.fundNo;
        data.fundCode = this.prodInfo.fundCode;
        data.fundName = this.prodInfo.fundName;
        return data;
    }
}
