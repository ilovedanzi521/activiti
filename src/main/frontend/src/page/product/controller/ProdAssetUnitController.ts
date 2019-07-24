import { Component } from "vue-property-decorator";
import { mapState } from "vuex";
import BaseController from "../../common/controller/BaseController";
import { WinRspType } from "../../common/enum/BaseEnum";
import { OperationTypeEnum } from "../../common/enum/OperationTypeEnum";
import dateUtils from "../../common/util/DateUtils";
import { WinResponseData } from "../../common/vo/BaseVO";
import PageVO from "../../common/vo/PageVO";
import ProdAssetUnitService from "../service/ProdAssetUnitService";
import ProdAssetUnitDialog from "../view/ProdAssetUnitDialog.vue";
import { ProdAssetUnitRepVO, ProdAssetUnitReqVO } from "../vo/ProdAssetUnitVO";

@Component({
    components: { ProdAssetUnitDialog },
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
export default class ProdAssetUnitController extends BaseController {
    /**
     * 资产单元service
     */
    private service: ProdAssetUnitService = new ProdAssetUnitService();
    // 查询条件
    private formInline: ProdAssetUnitReqVO = new ProdAssetUnitReqVO();
    // 返回结果集
    private prodAssetUnit: PageVO = new PageVO();

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
        data: ProdAssetUnitRepVO;
    };

    private mounted() {
        this.list();
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
                    this.prodAssetUnit = winResponseData.data;
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
                return "冻结";
            }
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
                    " 条资产单元, 是否继续?",
                "警告"
            ).then(() => {
                const ids: number[] = [];
                this.selected.forEach((element: ProdAssetUnitRepVO) => {
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
    private operation(row: ProdAssetUnitRepVO, type: string) {
        if (type === OperationTypeEnum.ADD) {
            this.cardNumber = {
                dialogTitle: ProdAssetUnitConst.CREATETITLE,
                type: OperationTypeEnum.ADD,
                data: this.setFundInfo(new ProdAssetUnitRepVO())
            };
        }
        if (type === OperationTypeEnum.DELETE) {
            this.cardNumber = {
                dialogTitle: ProdAssetUnitConst.DELETETITLE,
                type: OperationTypeEnum.DELETE,
                data: this.setFundInfo(row)
            };
        }
        if (type === OperationTypeEnum.UPDATE) {
            this.cardNumber = {
                dialogTitle: ProdAssetUnitConst.UPDATETITLE,
                type: OperationTypeEnum.UPDATE,
                data: this.copy(this.setFundInfo(row))
            };
        }
        if (type === OperationTypeEnum.VIEW) {
            this.cardNumber = {
                dialogTitle: ProdAssetUnitConst.VIEWTITLE,
                type: OperationTypeEnum.VIEW,
                data: this.setFundInfo(row)
            };
        }
        this.dialogVisible = true;
    }

    private setFundInfo(data: ProdAssetUnitRepVO) {
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
}

export const ProdAssetUnitConst = {
    CREATETITLE: "新增资产单元",
    UPDATETITLE: "修改资产单元",
    DELETETITLE: "删除资产单元",
    VIEWTITLE: "查看资产单元"
};
