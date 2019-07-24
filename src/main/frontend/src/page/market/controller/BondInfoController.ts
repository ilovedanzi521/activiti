/* @BondInfoController 债券基本信息controller
 * @Author: lixiuquan
 * @Date: 2019-06-13 14:01:33
 * @Last Modified by: lixiuquan
 * @Last Modified time: 2019-06-13 19:34:05
 */

import { Component } from "vue-property-decorator";
import BaseController from "../../common/controller/BaseController";
import { ParamBondReqVO } from "../vo/ParamBondReqVO";
import { WinResponseData } from "../../common/vo/BaseVO";
import BondInfoService from "../service/BondInfoService";
import BondInfoDialog from "@/page/market/view/BondInfoDialog.vue";
import BondInfoDialogController from "./BondInfoDialogController";
import { BondConstant } from "../const/BondConstant";
import { ParamBondDicEntity, SecuritySelect } from "../vo/ParamBondInfoEntity";
import { WinRspType } from "../../common/enum/BaseEnum";
import DateUtils from "../../common/util/DateUtils";
import numberUtils from "../../common/util/NumberUtils";

@Component({ components: { BondInfoDialog } })
export default class BondInfoController extends BaseController {
    // 子组件$refs引用声明
    public $refs!: {
        bondInfoDialog: BondInfoDialogController;
    };
    // 债券基本信息服务
    private bondInfoService: BondInfoService = new BondInfoService();

    // 查询框数据
    private bondInfoForm: ParamBondReqVO = new ParamBondReqVO();
    // 批量操作选中多选行数据
    private multipleSelection: any[] = [];

    /**
     * 下拉框
     */
    // 证券类别
    private securitySelect: any = SecuritySelect;
    // 数据字典
    private bondDicData: any = ParamBondDicEntity;

    // 新增、修改、删除详情弹出框是否展示（true为显示）
    private isDetailAble: boolean = false;

    /**
     * 初始化
     */
    public mounted() {
        /**
         * 初始化字典项
         */
        this.bondInfoService.publicDicListFun([
            BondConstant.PAY_INTERREST_TYPE_DICCODE,
            BondConstant.RRATE_TYPE_DICCODE,
            BondConstant.BASE_TYPE_DICCODE,
            BondConstant.INTERREST_STANDARD_DICCODE,
            BondConstant.IS_REDEEMABLE_DICCODE,
            BondConstant.EXTERNAL_RATING_DICCODE,
            BondConstant.INTERNAL_RATING_DICCODE,
            BondConstant.PRICE_TYPE_DICCODE,
            BondConstant.CAPITAL_PAY_TYPE_DICCODE,
            BondConstant.TRUSTEE_AGENCY_DICCODE,
            BondConstant.IS_PUT_BACK_DICCODE,
            BondConstant.TRANS_SECURITY_TYPE_DICCODE
        ]);

        /**
         * 初始化分页
         */
        this.pageVO.pageSize = 10;
        this.pageVO.pageNum = 1;
        this.pageVO.total = 0;

        /**
         * 证券类别初始化
         */
        this.bondInfoService.publicTypeFun();

        /**
         * 初始化表格
         */
        this.$nextTick(() => {
            this.onFindSubmit();
        });
    }

    /**
     * 组件销毁
     */
    public destroyed() {
        // 字典清空
        for (const key of Object.keys(ParamBondDicEntity)) {
            ParamBondDicEntity[key] = [];
        }
        // 下拉数据清空
        for (const key of Object.keys(SecuritySelect)) {
            SecuritySelect[key] = [];
        }
    }

    /**
     * 查询点击事件监听
     */
    public onFindSubmit() {
        this.bondInfoForm.reqPageNum = this.pageVO.pageNum;
        this.bondInfoForm.reqPageSize = this.pageVO.pageSize;
        this.bondInfoService
            .findBondInfoByPage(this.bondInfoForm)
            .then((res: WinResponseData) => {
                if (res.winRspType === WinRspType.ERROR) {
                    this.win_message_error(res.msg);
                } else {
                    this.pageVO = res.data;
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
            this.$refs.bondInfoDialog.addClickme(
                BondConstant.ADD_BOND_INFO_TITLE,
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
            this.$refs.bondInfoDialog.editClickme(
                "编辑" + row.securityCode + " " + row.securityName,
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
            this.$refs.bondInfoDialog.deleteClickme(
                "删除" + row.securityCode + " " + row.securityName,
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
            this.$refs.bondInfoDialog.viewClickme(
                "查看" + row.securityCode + " " + row.securityName,
                true,
                row
            );
        });
    }

    /**
     * 子表单数据提交事件监听
     */
    public formDataSubmit(data: any) {
        this.isDetailAble = false;
        // 非取消提交
        if (!data.undo) {
            this.win_message_success(data.msg);
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
                    "选中" +
                        this.multipleSelection.length +
                        "条数据，" +
                        BondConstant.CONFIRM_BATCH_DELETE,
                    "警告"
                ).then((_: any) => {
                    this.bondInfoService
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
                    this.$refs.bondInfoDialog.deleteClickme(
                        "删除" + row.securityCode + " " + row.securityName,
                        true,
                        row
                    );
                });
            }
        } else {
            this.win_message_warning(BondConstant.SELECT_DATA_WARNING);
        }
    }

    /**
     * 内部证券代码  过滤查询事件
     */
    public inCodeSelectFun(query: string, cb: any) {
        this.bondInfoService.publicInCodeSelectFun(query, cb);
    }

    /**
     * 内部证券代码查询参数选中事件
     */
    public handleCodeSelect(item: any) {
        this.bondInfoForm.securityCode = item.key;
    }

    /**
     * 查询重置事件
     */
    public reset() {
        this.bondInfoForm = new ParamBondReqVO();
    }

    /**
     * 表格数据根据数据字典格式化
     */
    public bondDicFormatter({ cellValue, row, rowIndex, column, columnIndex }) {
        return this.dicFormatter(cellValue, this.bondDicData[column.property]);
    }
    /**
     * 票面利率*100处理
     */
    public couponRateFormatter({ cellValue }) {
        return numberUtils.multiplyBy100(cellValue, 3);
    }
    /**
     * 日期格式化
     */
    public DateFormatter({ cellValue, row, rowIndex, column, columnIndex }) {
        const date = new Date(cellValue);
        return DateUtils.dateFtt("yyyyMMdd", date);
    }

    /**
     * 全选操作
     */
    private handleSelectAll({ selection, checked }) {
        this.multipleSelection = selection;
    }

    /**
     * 多选时选择事件监听
     */
    private handleSelectionChange({ selection, checked, row, column }) {
        this.multipleSelection = selection;
    }
}
