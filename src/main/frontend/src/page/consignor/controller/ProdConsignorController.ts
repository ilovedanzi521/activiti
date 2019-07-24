/* @ProdConsignorController 委托人controller
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
import ProdConsignorService from "../service/ProdConsignorService";
import { ProdConsignorConst } from "../const/ProdConsignorConst";
import { ConsignorDicEntity } from "../vo/ProdConsignorEntityVO";
import ProdConsignorDialog from "../view/ProdConsignorDialog.vue";
import ProdConsignorDialogController from "../controller/ProdConsignorDialogController";
import { ConsignorReqVO } from "../vo/ConsignorReqVO";

@Component({
    components: { ProdConsignorDialog }
})
export default class ProdConsignorController extends BaseController {
    // 子组件$refs引用声明
    public $refs!: {
        prodConsignorDialog: ProdConsignorDialogController;
    };
    // 委托人service
    private consignorService = new ProdConsignorService();

    // 查询框
    private consignorReqVO = new ConsignorReqVO();
    // 数据字典
    private consignorDicData: any = ConsignorDicEntity;

    // 选中多选行
    private multipleSelection: any[] = [];

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
        this.consignorService.publicDicFun(
            "type",
            ProdConsignorConst.CONSIGNOR_TYPE_DICCODE
        );

        // 初始化表格
        this.onFindSubmit();
    }

    /**
     * 组件销毁
     */
    public destroyed() {
        // 字典清空
        ConsignorDicEntity.type = [];
    }

    /**
     * 查询表格委托人列表
     */
    public onFindSubmit() {
        this.consignorReqVO.reqPageNum = this.pageVO.pageNum;
        this.consignorReqVO.reqPageSize = this.pageVO.pageSize;
        this.consignorService
            .findConsignorList(this.consignorReqVO)
            .then((res: WinResponseData) => {
                if (res.winRspType === WinRspType.ERROR) {
                    this.win_message_error(res.msg);
                } else {
                    this.pageVO = res.data;
                    this.multipleSelection = [];
                }
            });
    }

    /**
     * 分页查询点击事件监听
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
            this.$refs.prodConsignorDialog.addClickme(
                ProdConsignorConst.ADD_PROD_TITLE,
                true
            );
        });
    }

    /**
     * 编辑点击事件监听
     */
    public onEditClick(row: any) {
        this.isDetailAble = true;
        this.$nextTick(() => {
            this.$refs.prodConsignorDialog.editClickme(
                "修改" + row.code + " " + row.name,
                true,
                row
            );
        });
    }

    /**
     * 删除点击事件监听
     */
    public onDeleteClick(row: any) {
        this.isDetailAble = true;
        this.$nextTick(() => {
            this.$refs.prodConsignorDialog.deleteClickme(
                "删除" + row.code + " " + row.name,
                true,
                row
            );
        });
    }

    /**
     * 双击某一行显示详情
     */
    public handleRowDBClick({ row }) {
        this.isDetailAble = true;
        this.$nextTick(() => {
            this.$refs.prodConsignorDialog.viewClickme(
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
     * 批量删除点击事件监听
     */
    public onBatchDeleteSubmit() {
        const ids: string[] = [];
        if (this.multipleSelection.length > 0) {
            if (this.multipleSelection.length > 1) {
                this.multipleSelection.forEach((element: any) => {
                    ids.push(element.id);
                });
                this.win_message_box_warning(
                    "选中" + this.multipleSelection.length + "条数据，是否删除",
                    "警告"
                ).then((_: any) => {
                    this.consignorService
                        .batchDeleteBondInfo(ids)
                        .then((res: WinResponseData) => {
                            if (res.winRspType === WinRspType.ERROR) {
                                this.win_message_error(res.msg);
                            } else {
                                this.win_message_success(res.msg);
                                this.onFindSubmit();
                            }
                        });
                });
            } else {
                this.isDetailAble = true;
                const row = this.multipleSelection[0];
                this.$nextTick(() => {
                    this.$refs.prodConsignorDialog.deleteClickme(
                        "删除" + row.code + " " + row.name,
                        true,
                        row
                    );
                });
            }
        } else {
            this.win_message_warning(ProdConsignorConst.SELECT_DATA_WARNING);
        }
    }

    /**
     * 表格数据根据数据字典格式化
     */
    public prodDicFormatter({ cellValue, row, rowIndex, column, columnIndex }) {
        return this.dicFormatter(
            cellValue,
            this.consignorDicData[column.property]
        );
    }
    // 日期格式
    public TimeFormatter({ cellValue, row, rowIndex, column, columnIndex }) {
        const date = new Date(cellValue);
        return DateUtils.dateFtt("yyyy-MM-dd hh:mm:ss", date);
    }

    /**
     * 多选时选择事件监听
     */
    public handleSelectionChange({ selection }) {
        this.multipleSelection = selection;
    }

    /**
     * 全选操作
     */
    private handleSelectAll({ selection, checked }) {
        this.multipleSelection = selection;
    }
}
