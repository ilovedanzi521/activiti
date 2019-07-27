/* @ProductInfoController 产品controller
 * @Author: lixiuquan
 * @Date: 2019-06-13 14:01:33
 * @Last Modified by: lixiuquan
 * @Last Modified time: 2019-06-13 19:34:05
 */

import { Component } from "vue-property-decorator";
import BaseController from "../../common/controller/BaseController";
import DateUtils from "../../common/util/DateUtils";
import { WinResponseData } from "../../common/vo/BaseVO";
import { WinRspType } from "../../common/enum/BaseEnum";
import { ConsignorTypeEnum } from "../enum/ProdFundEnum";
import { mapState, mapGetters } from "vuex";
import { ProductInfoReqVO } from "../vo/ProductInfoReqVO";
import ProductInfoService from "../service/ProductInfoService";
import { ProductInfoConstant } from "../const/ProdFundInfoConst";
import { ProdDicEntity, ProdSelectEntity } from "../vo/ProductEntityVO";
import ProdInfoDialog from "../view/ProductInfoDialog.vue";
import ProdInfoDialogController from "../controller/ProdInfoDialogController";
import { ProdSubConsignorReqVO } from "../../consignor/vo/ProdSubConsignorVO";
import ProdSubConsignorService from "../../consignor/service/ProdSubConsignorService";
import ProdConsignorService from "../../consignor/service/ProdConsignorService";
import { ConsignorReqVO } from "../../consignor/vo/ConsignorReqVO";
import ExchangeRateService from "../../currency/service/ExchangeRateService";

@Component({
    components: { ProdInfoDialog },
    computed: {
        ...mapState({
            mandator: (state: any) => state.product.mandator,
            showMore: (state: any) => state.product.showMore
        }),
        ...mapGetters(["getMandator"])
    },
    watch: {
        showMore: {
            handler(newValue, oldValue) {
                // 当关联信息点击修改
                if (newValue.flag) {
                    this.tableHeight =
                        newValue.offsetTop -
                        this.$refs.fundInfoTable.$el.offsetTop -
                        38;
                }
            }
        },
        getMandator: {
            handler(newValue, oldValue) {
                // 当选中一级委托人时
                if (newValue.type === ConsignorTypeEnum.CONSIGNORTYPE) {
                    this.productInfoForm.consignorNoList = [];
                    this.productInfoForm.consignorNo = this.mandator.firstMandator;
                    this.productInfoForm.subConsignorNo = null;
                    this.onFindSubmit();
                }
                // 当选中二级委托人时
                if (newValue.type === ConsignorTypeEnum.SUBCONSIGNORTYPE) {
                    this.productInfoForm.consignorNo = this.mandator.firstMandator;
                    this.productInfoForm.subConsignorNo = this.mandator.secondMandator;
                    this.productInfoForm.consignorNoList = [];
                    this.onFindSubmit();
                }
            }
        }
    }
})
export default class ProductInfoController extends BaseController {
    // 子组件$refs引用声明
    public $refs!: {
        prodInfoDialog: ProdInfoDialogController;
        fundInfoTable: any;
    };
    // 产品service
    private productInfoService = new ProductInfoService();
    // 一级委托人service声明
    private consignorService = new ProdConsignorService();
    // 二级委托人service声明
    private subConsignorService = new ProdSubConsignorService();
    // 币种seivice声明
    private exchangeRateService: ExchangeRateService = new ExchangeRateService();

    // 查询框
    private productInfoForm: ProductInfoReqVO = new ProductInfoReqVO();
    // 数据字典
    private prodInfoDicData: any = ProdDicEntity;
    // 非字典下拉框
    private prodSelectEntity = ProdSelectEntity;

    // 选中多选行
    private multipleSelection: any[] = [];
    // 表格默认高度
    private tableHeight: number = 400;

    // 详情是否显示控制
    private isDetailAble = false;

    /**
     * 初始化
     */
    public mounted() {
        // 初始化表格分页参数
        this.pageVO.pageSize = 10;
        this.pageVO.pageNum = 1;
        this.pageVO.total = 0;

        // 初始化数据字典
        this.productInfoService.publicDicListFun([
            ProductInfoConstant.PROD_TYPE_DICCODE,
            ProductInfoConstant.PROD_STATUS_DICCODE
        ]);

        // 初始化币种
        this.findCuryType();

        // 初始化一二级委托人下拉数据
        this.findConsignorList();
        this.findSubConsignorList();

        // 初始化表格
        this.onFindSubmit();
    }

    /**
     * 组件销毁
     */
    public destroyed() {
        // 字典清空
        for (const key of Object.keys(ProdDicEntity)) {
            ProdDicEntity[key] = [];
        }
        // 下拉数据清空
        for (const key of Object.keys(ProdSelectEntity)) {
            ProdSelectEntity[key] = [];
        }
    }

    /**
     * 查询表格产品列表, 选中并同步第一行数据
     */
    public onFindSubmit() {
        this.productInfoForm.reqPageNum = this.pageVO.pageNum;
        this.productInfoForm.reqPageSize = this.pageVO.pageSize;
        this.productInfoService
            .findFundInfoList(this.productInfoForm)
            .then((res: WinResponseData) => {
                if (res.winRspType === WinRspType.ERROR) {
                    this.win_message_error(res.msg);
                } else {
                    this.pageVO = res.data;
                    this.$nextTick(() => {
                        if (
                            this.$refs.fundInfoTable !== undefined &&
                            this.$refs.fundInfoTable.data.length > 0
                        ) {
                            // 第一行选中
                            this.$refs.fundInfoTable.setCurrentRow(
                                this.$refs.fundInfoTable.data[0]
                            );
                            // 同步
                            this.syncFundState(
                                this.$refs.fundInfoTable.data[0]
                            );
                        } else {
                            this.syncFundState(null);
                        }
                    });
                }
            });
    }

    /**
     * 分页查询点击事件监听
     * @param pageParm 分页参数
     */
    public pageFindSubmit(pageParm: any) {
        this.pageVO.pageNum = pageParm.pageNum;
        this.pageVO.pageSize = pageParm.pageSize;
        this.onFindSubmit();
    }

    /**
     * 新增点击事件监听
     */
    public onAddSubmit() {
        this.isDetailAble = true;
        this.$nextTick(() => {
            this.$refs.prodInfoDialog.addClickme(
                ProductInfoConstant.ADD_PROD_TITLE,
                true
            );
        });
    }

    /**
     * 编辑点击事件监听
     * @param row 行数据
     */
    public onEditClick(row: any) {
        this.isDetailAble = true;
        this.$nextTick(() => {
            this.$refs.prodInfoDialog.editClickme(
                "编辑" + row.code + " " + row.name,
                true,
                row
            );
        });
    }

    /**
     * 删除点击事件监听
     * @param row 行数据
     */
    public onDeleteClick(row: any) {
        this.isDetailAble = true;
        this.$nextTick(() => {
            this.$refs.prodInfoDialog.deleteClickme(
                "删除" + row.code + " " + row.name,
                true,
                row
            );
        });
    }

    /**
     * 双击某一行显示详情
     * @param row 行数据
     */
    public handleRowDBClick({ row }) {
        this.isDetailAble = true;
        this.$nextTick(() => {
            this.$refs.prodInfoDialog.viewClickme(
                "查看" + row.code + " " + row.name,
                true,
                row
            );
        });
    }

    /**
     * 子表单数据提交事件监听
     */
    public formDataSubmit(msg: any) {
        this.isDetailAble = false;
        if (!msg.undo) {
            this.win_message_success(msg.msg);
            this.onFindSubmit();
        }
    }

    /**
     * 查询一级委托人列表下拉
     */
    public findConsignorList() {
        const conReqVO = new ConsignorReqVO();
        conReqVO.reqPageNum = 1;
        conReqVO.reqPageSize = 10000;
        this.consignorService
            .findConsignorList(conReqVO)
            .then((res: WinResponseData) => {
                if (res.winRspType === WinRspType.SUCC) {
                    this.prodSelectEntity.consignorSelect = res.data.list;
                } else {
                    this.win_message_error(res.msg);
                }
            });
    }

    /**
     * 查询二级委托人列表下拉
     */
    public findSubConsignorList() {
        const subConsignorReqVO = new ProdSubConsignorReqVO();
        subConsignorReqVO.reqPageNum = 1;
        subConsignorReqVO.reqPageSize = 10000;
        this.subConsignorService
            .list(subConsignorReqVO)
            .then((res: WinResponseData) => {
                if (res.winRspType === WinRspType.SUCC) {
                    this.prodSelectEntity.allSubConsignorSelect = res.data.list;
                } else {
                    this.win_message_error(res.msg);
                }
            });
    }

    /**
     * 查询币种类别下拉
     */
    public findCuryType() {
        this.exchangeRateService
            .listCurrency()
            .then((response: WinResponseData) => {
                if (response.winRspType === WinRspType.ERROR) {
                    this.win_message_error(response.msg);
                } else {
                    ProdDicEntity.collectCury = response.data;
                    ProdDicEntity.assetCury = response.data;
                }
            });
    }

    /**
     * 选中当前行触发事件
     * @param row 行数据
     */
    public handleCurrentChange({ row }) {
        this.syncFundState(row);
    }

    /**
     * 产品名称  过滤查询事件
     * @param query 参数
     * @param cb 回调
     */
    public inCodeSelectFun(query: string, cb: any) {
        this.productInfoService.publicInCodeSelectFun(query, cb);
    }

    /**
     * 产品名称查询参数选中事件
     * @param item 选中项
     */
    public handleCodeSelect(item: any) {
        this.productInfoForm.name = item.value;
    }

    /**
     * 同步选中行
     * @param row 行数据
     */
    public syncFundState(row: any) {
        if (row !== null) {
            // 同步一行
            this.$store.commit("setProdInfo", {
                fundNo: row.no,
                fundCode: row.code,
                fundName: row.name
            });
        } else {
            // 同步默认
            this.$store.commit("setProdInfo", {
                fundNo: -1,
                fundCode: "",
                fundName: ""
            });
        }
    }

    /**
     * 查询重置
     */
    public reset() {
        this.productInfoForm.status = "";
        this.productInfoForm.name = "";
        this.onFindSubmit();
    }

    /**
     * 表格数据根据数据字典格式化
     */
    public prodDicFormatter({ cellValue, row, rowIndex, column, columnIndex }) {
        return this.dicFormatter(
            cellValue,
            this.prodInfoDicData[column.property]
        );
    }
    // 币种格式化
    public prodCuryFormatter({ cellValue, column }) {
        for (const currency of this.prodInfoDicData[column.property]) {
            if (cellValue === currency.currencyCode) {
                return currency.currencyName;
            }
        }
        return "";
    }
    // 日期格式
    public DateFormatter({ cellValue, row, rowIndex, column, columnIndex }) {
        if (cellValue !== "" && cellValue !== null) {
            const date = new Date(cellValue);
            return DateUtils.dateFtt("yyyy-MM-dd hh:mm:ss", date);
        } else {
            return "";
        }
    }

    /**
     * 全选操作
     */
    private handleSelectAll({ selection, checked }) {
        this.multipleSelection = selection;
    }

    /**
     * 多选时选择事件监听
     * @param val
     */
    private handleSelectionChange({ selection, checked, row, column }) {
        this.multipleSelection = selection;
    }
}
