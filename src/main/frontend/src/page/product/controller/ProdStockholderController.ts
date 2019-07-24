import { Component } from "vue-property-decorator";
import BaseController from "../../common/controller/BaseController";
import DicService from "../../dictionary/service/DicService";
import ProdStockholderService from "../service/ProdStockholderService";
import { DicRepVO, DicReqVO } from "../../dictionary/vo/DicVO";
import { WinResponseData } from "../../common/vo/BaseVO";
import { WinRspType } from "@win-frond-frameworks/trade-biz";
import {
    StockholderReqVO,
    StockholderRepVO,
    StockholderDicVO
} from "../vo/ProdStockholderVO";
import DateUtils from "../../common/util/DateUtils";
import { OperationTypeEnum } from "../../common/enum/OperationTypeEnum";
import { BaseConst } from "../../common/const/BaseConst";
import ProdStockholderDialog from "../view/ProdStockholderDialog.vue";
import { mapState } from "vuex";
import { ProductInfoConstant } from "../const/ProdFundInfoConst";

@Component({
    components: { ProdStockholderDialog },
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
export default class ProdStockholderController extends BaseController {
    // 字典service
    private dicService: DicService = new DicService();
    // 股东账户Service
    private service: ProdStockholderService = new ProdStockholderService();
    // 缓存字典
    private stockholderDicVO: StockholderDicVO = new StockholderDicVO();
    // 列表数据
    private tableData = [];
    // 查询条件
    private stockholderReqVO: StockholderReqVO = new StockholderReqVO();
    // 返回数据
    private stockholderRepVO: StockholderRepVO = new StockholderRepVO();
    // 弹框
    private dialogVisible: boolean = false;
    // 已选数据
    private selected: any = [];

    // 子组件显示的信息
    private cardNumber: {
        dialogTitle: string;
        type: OperationTypeEnum;
        data: StockholderRepVO;
        stockholderDicVO: StockholderDicVO;
    };

    private mounted() {
        this.$nextTick(() => {
            this.list();
        });

        this.cacheDict();
    }
    /**
     * 缓存字典
     */
    // private cacheDict() {
    //     // 登记公司
    //     const dic = new DicReqVO();
    //     dic.parentDicCode = "1000226";
    //     this.dicService.dicAllSubList(dic).then((res: WinResponseData) => {
    //         this.stockholderDicVO.registrations = res.data;
    //     });
    //     // 交易市场
    //     const dic2 = new DicReqVO();
    //     dic2.parentDicCode = "1000102";
    //     this.dicService.dicAllSubList(dic2).then((res: WinResponseData) => {
    //         this.stockholderDicVO.marketTypes = res.data;
    //     });
    //     // 股东属性
    //     const dic3 = new DicReqVO();
    //     dic3.parentDicCode = "1000265";
    //     this.dicService.dicAllSubList(dic3).then((res: WinResponseData) => {
    //         this.stockholderDicVO.ownerTypes = res.data;
    //     });
    //     // 股东登记状态
    //     const dic4 = new DicReqVO();
    //     dic4.parentDicCode = "1000266";
    //     this.dicService.dicAllSubList(dic4).then((res: WinResponseData) => {
    //         this.stockholderDicVO.dicRegisterStatus = res.data;
    //     });
    // }

    private cacheDict() {
        const dic = new DicReqVO();
        /**
         * 交易市场,登记公司,股东属性,股东登记状态
         */
        dic.parentDicCodeList = [
            ProductInfoConstant.MARKET_CODE_DICCODE,
            ProductInfoConstant.REGISTRATIONS_TYPE_DICCODE,
            ProductInfoConstant.OWNER_TYPE_DICCODE,
            ProductInfoConstant.REGISTERSTAUS_TYPE_DICCODE
        ];
        this.dicService
            .dicMultipleAllSubList(dic)
            .then((res: WinResponseData) => {
                this.stockholderDicVO.marketTypes =
                    res.data[ProductInfoConstant.MARKET_CODE_DICCODE];
                this.stockholderDicVO.registrations =
                    res.data[ProductInfoConstant.REGISTRATIONS_TYPE_DICCODE];
                this.stockholderDicVO.ownerTypes =
                    res.data[ProductInfoConstant.OWNER_TYPE_DICCODE];
                this.stockholderDicVO.dicRegisterStatus =
                    res.data[ProductInfoConstant.REGISTERSTAUS_TYPE_DICCODE];
            });
    }

    /**
     * 数据字典映射
     */
    private formatDic({ cellValue, row, rowIndex, column, columnIndex }) {
        // 交易市场
        if (column.property === "marketNo") {
            return this.getLabelFromDic(
                row.marketNo,
                this.stockholderDicVO.marketTypes
            );
        }
        // 登记公司
        if (column.property === "registration") {
            return this.getLabelFromDic(
                row.registration,
                this.stockholderDicVO.registrations
            );
        }
        // 股东属性
        if (column.property === "ownerType") {
            return this.getLabelFromDic(
                row.ownerType,
                this.stockholderDicVO.ownerTypes
            );
        }
        // 股东登记状态
        if (column.property === "registerStatus") {
            return this.getLabelFromDic(
                row.registerStatus,
                this.stockholderDicVO.dicRegisterStatus
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
        this.stockholderReqVO.fundNo = this.prodInfo.fundNo;
        this.service
            .list(this.stockholderReqVO)
            .then((winResponseData: WinResponseData) => {
                if (WinRspType.SUCC === winResponseData.winRspType) {
                    console.log(winResponseData.data);
                    this.tableData = winResponseData.data;
                }
            });
    }
    /**
     * 设置产品信息
     */
    private setFundInfo(data: StockholderRepVO) {
        data.fundNo = this.prodInfo.fundNo;
        data.fundCode = this.prodInfo.fundCode;
        data.fundName = this.prodInfo.fundName;
        return data;
    }

    /**
     * 双击查看
     */
    private dblclick({ row, rowIndex, column, columnIndex }, event: Event) {
        this.cardNumber = {
            dialogTitle: BaseConst.VIEW + " " + row.code + " " + row.name,
            type: OperationTypeEnum.VIEW,
            data: this.copy(row),
            stockholderDicVO: this.stockholderDicVO
        };
        this.dialogVisible = true;
    }

    // 子组件回调函数
    private toFatherMsg(msg: WinRspType) {
        this.dialogVisible = false;
        if (msg === WinRspType.SUCC) {
            this.list();
        }
    }

    /**
     *  选择相关
     */
    private tableSelectionChange(val) {
        this.selected = val;
    }

    /**
     * 增删改dialog弹框
     */
    private operation(row: StockholderRepVO, type: string) {
        if (type === OperationTypeEnum.ADD) {
            this.cardNumber = {
                dialogTitle: Stockholder.CREATETITLE,
                type: OperationTypeEnum.ADD,
                data: this.setFundInfo(new StockholderRepVO()),
                stockholderDicVO: this.stockholderDicVO
            };
        }
        if (type === OperationTypeEnum.DELETE) {
            const copyRow = this.copy(row);

            this.cardNumber = {
                dialogTitle: BaseConst.DELETE + " " + row.code + " " + row.name,
                type: OperationTypeEnum.DELETE,
                data: copyRow,
                stockholderDicVO: this.stockholderDicVO
            };
        }
        if (type === OperationTypeEnum.UPDATE) {
            const copyRow = this.copy(row);
            this.cardNumber = {
                dialogTitle: BaseConst.MODIFY + " " + row.code + " " + row.name,
                type: OperationTypeEnum.UPDATE,
                data: copyRow,
                stockholderDicVO: this.stockholderDicVO
            };
        }
        this.dialogVisible = true;
    }

    /**
     * 带分页参数查询
     */
    private pageQuery(pageVO) {
        this.stockholderReqVO.reqPageNum = pageVO.pageNum;
        this.stockholderReqVO.reqPageSize = pageVO.pageSize;
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

export const Stockholder = {
    CREATETITLE: "新增股东账户",
    DELETETITLE: "删除股东账户",
    UPDATETITLE: "修改股东账户",
    DELETE: "删除",
    CONFIRM: "确定"
};
