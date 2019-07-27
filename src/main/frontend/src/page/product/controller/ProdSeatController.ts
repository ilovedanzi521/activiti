import { Component } from "vue-property-decorator";
import BaseController from "../../common/controller/BaseController";
import DicService from "../../dictionary/service/DicService";
import ProdSeatService from "../service/ProdSeatService";
import { DicRepVO, DicReqVO } from "../../dictionary/vo/DicVO";
import { WinResponseData } from "../../common/vo/BaseVO";
import { WinRspType } from "../../common/enum/BaseEnum";
import { ProdSeatReqVO, ProdSeatRepVO, ProdSeatDicVO } from "../vo/ProdSeatVO";
import DateUtils from "../../common/util/DateUtils";
import { OperationTypeEnum } from "../../common/enum/OperationTypeEnum";
import { BaseConst } from "../../common/const/BaseConst";
import ProdSeatDialog from "../view/ProdSeatDialog.vue";
import { mapState } from "vuex";
import { ProductInfoConstant } from "../const/ProdFundInfoConst";

@Component({
    components: { ProdSeatDialog },
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
export default class ProdSeatController extends BaseController {
    // 字典
    private dicService: DicService = new DicService();
    // 席位Service
    private service: ProdSeatService = new ProdSeatService();
    // 缓存字典
    private seatDicVO: ProdSeatDicVO = new ProdSeatDicVO();
    // 列表数据
    private tableData = [];
    // 查询条件
    private seatReqVO: ProdSeatReqVO = new ProdSeatReqVO();
    // 返回数据
    private seatRepVO: ProdSeatRepVO = new ProdSeatRepVO();
    // 弹框
    private dialogVisible: boolean = false;
    // 已选数据
    private selected: any = [];

    // 子组件显示的信息
    private cardNumber: {
        dialogTitle: string;
        type: OperationTypeEnum;
        data: ProdSeatRepVO;
        seatDicVO: ProdSeatDicVO;
    };

    private mounted() {
        this.$nextTick(() => {
            this.list();
        });

        this.cacheDict();

        /**
         * 初始化分页
         */
        this.pageVO.pageSize = 10;
        this.pageVO.pageNum = 1;
        this.pageVO.total = 0;
    }
    /**
     * 缓存字典
     */
    // private cacheDict() {
    //     // 当天是否交易
    //     const dic = new DicReqVO();
    //     dic.parentDicCode = "1000267";
    //     this.dicService.dicAllSubList(dic).then((res: WinResponseData) => {
    //         this.seatDicVO.tradeTypes = res.data;
    //     });
    //     // 交易市场
    //     const dic2 = new DicReqVO();
    //     dic2.parentDicCode = "1000102";
    //     this.dicService.dicAllSubList(dic2).then((res: WinResponseData) => {
    //         this.seatDicVO.marketTypes = res.data;
    //     });
    // }
    private cacheDict() {
        const dic = new DicReqVO();
        /**
         * 交易市场,当天是否交易
         */
        dic.parentDicCodeList = [
            ProductInfoConstant.MARKET_CODE_DICCODE,
            ProductInfoConstant.TRADE_TYPE_DICCODE
        ];

        this.dicService
            .dicMultipleAllSubList(dic)
            .then((res: WinResponseData) => {
                this.seatDicVO.marketTypes =
                    res.data[ProductInfoConstant.MARKET_CODE_DICCODE];
                this.seatDicVO.tradeTypes =
                    res.data[ProductInfoConstant.TRADE_TYPE_DICCODE];
            });
    }

    /**
     * 数据字典映射
     */
    private formatDic({ cellValue, row, rowIndex, column, columnIndex }) {
        // 当天是否交易
        if (column.property === "trade") {
            return this.getLabelFromDic(row.trade, this.seatDicVO.tradeTypes);
        }
        // 交易市场
        if (column.property === "marketNo") {
            return this.getLabelFromDic(
                row.marketNo,
                this.seatDicVO.marketTypes
            );
        }
        // 操作人
        if (column.property === "createUserId") {
            return row.updateUserId ? row.updateUserId : row.createUserId;
            // return row.updateUserName ? row.updateUserName : row.createUserName;
        }
        // 操作时间
        if (column.property === "createTime") {
            return row.updateTime ? row.updateTime : row.createTime;
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
     * 获取列表数据
     */
    private list() {
        this.seatReqVO.fundNo = this.prodInfo.fundNo;

        this.service
            .list(this.seatReqVO)
            .then((winResponseData: WinResponseData) => {
                if (WinRspType.SUCC === winResponseData.winRspType) {
                    this.pageVO = winResponseData.data;
                }
            });
    }

    private setFundInfo(data: ProdSeatRepVO) {
        data.fundNo = this.prodInfo.fundNo;
        data.fundCode = this.prodInfo.fundCode;
        data.fundName = this.prodInfo.fundName;
        return data;
    }

    /** 双击查看 */
    private dblclick({ row, rowIndex, column, columnIndex }, event: Event) {
        this.dialogVisible = true;
        this.cardNumber = {
            dialogTitle: BaseConst.VIEW + " " + row.code + " " + row.name,
            type: OperationTypeEnum.VIEW,
            data: this.copy(row),
            seatDicVO: this.seatDicVO
        };
    }

    // private dblclick({ row, rowIndex, column, columnIndex }, event: Event) {
    //     this.dialogVisible = true;
    //     this.cardNumber = {
    //         type: OperationTypeEnum.VIEW,
    //         data: this.setFundInfo(row),
    //         dicVOList: this.dicVOList
    //     };
    // }

    // 子组件回调函数
    private toFatherMsg(msg: WinRspType) {
        this.dialogVisible = false;
        if (msg === WinRspType.SUCC) {
            this.list();
        }
    }

    /** 选择相关 */
    private tableSelectionChange(val) {
        this.selected = val;
    }

    /** 增删改dialog弹框 */
    private operation(row: ProdSeatRepVO, type: string) {
        if (type === OperationTypeEnum.ADD) {
            this.cardNumber = {
                dialogTitle: Seat.CREATETITLE,
                type: OperationTypeEnum.ADD,
                data: this.setFundInfo(new ProdSeatRepVO()),
                seatDicVO: this.seatDicVO
            };
        }
        if (type === OperationTypeEnum.DELETE) {
            const copyRow = this.copy(row);

            this.cardNumber = {
                dialogTitle: BaseConst.DELETE + " " + row.code + " " + row.name,
                type: OperationTypeEnum.DELETE,
                data: copyRow,
                seatDicVO: this.seatDicVO
            };
        }
        if (type === OperationTypeEnum.UPDATE) {
            const copyRow = this.copy(row);

            this.cardNumber = {
                dialogTitle: BaseConst.MODIFY + " " + row.code + " " + row.name,
                type: OperationTypeEnum.UPDATE,
                data: copyRow,
                seatDicVO: this.seatDicVO
            };
        }
        this.dialogVisible = true;
    }

    /** 带分页参数查询 */
    private pageQuery(pageVO) {
        this.seatReqVO.reqPageNum = pageVO.pageNum;
        this.seatReqVO.reqPageSize = pageVO.pageSize;
        this.list();
    }

    /**
     * 日期格式化
     */
    private DateFormatter(
        row: any,
        column: any,
        cellValue: string,
        index: number
    ) {
        const date = new Date(cellValue);
        return DateUtils.dateFtt("yyyyMMdd", date);
    }
}
export const Seat = {
    CREATETITLE: "新增席位",
    DELETETITLE: "删除席位",
    UPDATETITLE: "修改席位",
    DELETE: "删除",
    CONFIRM: "确定"
};
