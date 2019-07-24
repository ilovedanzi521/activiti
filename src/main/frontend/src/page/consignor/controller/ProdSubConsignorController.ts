import { Component } from "vue-property-decorator";
import BaseController from "../../common/controller/BaseController";
import { WinRspType } from "../../common/enum/BaseEnum";
import { OperationTypeEnum } from "../../common/enum/OperationTypeEnum";
import dateUtils from "../../common/util/DateUtils";
import { WinResponseData } from "../../common/vo/BaseVO";
import PageVO from "../../common/vo/PageVO";
import DicService from "../../dictionary/service/DicService";
import { DicReqVO } from "../../dictionary/vo/DicVO";
import { ProdConsignorConst } from "../const/ProdConsignorConst";
import ProdSubConsignorService from "../service/ProdSubConsignorService";
import ProdSubConsignorDialog from "../view/ProdSubConsignorDialog.vue";
import { ConsignorDicEntity } from "../vo/ProdConsignorEntityVO";
import {
    ProdSubConsignorRepVO,
    ProdSubConsignorReqVO
} from "../vo/ProdSubConsignorVO";

@Component({ components: { ProdSubConsignorDialog } })
export default class ProdSubConsignorController extends BaseController {
    /**
     * 二级委托人service
     */
    private service: ProdSubConsignorService = new ProdSubConsignorService();
    // 查询条件
    private formInline: ProdSubConsignorReqVO = new ProdSubConsignorReqVO();
    // 返回结果集
    private prodSubConsignor: PageVO = new PageVO();
    /**
     * 字典service
     */
    private dicService: DicService = new DicService();
    // 数据字典
    private subConsignorDicData: any = ConsignorDicEntity;

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
        data: ProdSubConsignorRepVO;
    };

    private mounted() {
        this.$nextTick(() => {
            this.list();
        });
        // 缓存字典
        this.cacheDict();
    }

    // 缓存字典
    private cacheDict() {
        const dic = new DicReqVO();
        /**
         * 交易市场,组合类型
         */
        dic.parentDicCodeList = [ProdConsignorConst.CONSIGNOR_TYPE_DICCODE];
        this.dicService
            .dicMultipleAllSubList(dic)
            .then((res: WinResponseData) => {
                this.subConsignorDicData.type =
                    res.data[ProdConsignorConst.CONSIGNOR_TYPE_DICCODE];
            });
    }

    // 查询单条或所有数据
    private list() {
        this.service
            .list(this.formInline)
            .then((winResponseData: WinResponseData) => {
                if (winResponseData.winRspType === WinRspType.ERROR) {
                    this.win_message_error(winResponseData.msg);
                } else {
                    this.prodSubConsignor = winResponseData.data;
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
        if (column.property === "companyType") {
            return this.dicFormatter(cellValue, this.subConsignorDicData.type);
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
                    " 条二级委托人, 是否继续?",
                "警告"
            ).then(() => {
                const ids: number[] = [];
                this.selected.forEach((element: ProdSubConsignorRepVO) => {
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
    private operation(row: ProdSubConsignorRepVO, type: string) {
        if (type === OperationTypeEnum.ADD) {
            this.cardNumber = {
                dialogTitle: ProdAssetUnitConst.CREATETITLE,
                type: OperationTypeEnum.ADD,
                data: new ProdSubConsignorRepVO()
            };
        }
        if (type === OperationTypeEnum.DELETE) {
            this.cardNumber = {
                dialogTitle: ProdAssetUnitConst.DELETETITLE,
                type: OperationTypeEnum.DELETE,
                data: row
            };
        }
        if (type === OperationTypeEnum.UPDATE) {
            this.cardNumber = {
                dialogTitle: ProdAssetUnitConst.UPDATETITLE,
                type: OperationTypeEnum.UPDATE,
                data: this.copy(row)
            };
        }
        if (type === OperationTypeEnum.VIEW) {
            this.cardNumber = {
                dialogTitle: ProdAssetUnitConst.VIEWTITLE,
                type: OperationTypeEnum.VIEW,
                data: row
            };
        }
        this.dialogVisible = true;
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
    CREATETITLE: "新增二级委托人",
    UPDATETITLE: "修改二级委托人",
    DELETETITLE: "删除二级委托人",
    VIEWTITLE: "查看二级委托人"
};
