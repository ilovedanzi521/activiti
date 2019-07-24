/* @BondSerialController 债券分期还本主页面Controller
 * @Author: lixiuquan
 * @Date: 2019-06-13 14:01:33
 * @Last Modified by: lixiuquan
 * @Last Modified time: 2019-06-13 19:34:05
 */

import { Component } from "vue-property-decorator";
import BaseController from "../../common/controller/BaseController";
import { ParamBondBaseReqVO } from "../vo/ParamBondReqVO";
import { DicReqVO, DicRepVO } from "../../dictionary/vo/DicVO";
import BondSerialService from "../service/BondSerialService";
import DicService from "../../dictionary/service/DicService";
import BondSerialDialog from "@/page/market/view/BondSerialDialog.vue";
import BondSerialDetailController from "../controller/BondSerialDialogController";
import { BondConstant } from "../const/BondConstant";
import DateUtils from "../../common/util/DateUtils";
import { WinRspType } from "../../common/enum/BaseEnum";
import numberUtils from "../../common/util/NumberUtils";
import { WinResponseData } from "../../common/vo/BaseVO";
import { ParamBondSerialDicEntity } from "../vo/ParamBondInfoEntity";

/**
 * 债券分期还本主页面Controller
 */
@Component({ components: { BondSerialDialog } })
export default class BondSerialController extends BaseController {
    // $refs引用声明
    public $refs!: {
        bondSerialDetail: BondSerialDetailController;
    };
    // 债券分期还本服务
    private service: BondSerialService = new BondSerialService();
    // 数据字典服务
    private dicService: DicService = new DicService();

    // 查询框
    private bondInfoForm: ParamBondBaseReqVO = new ParamBondBaseReqVO();

    /**
     * 下拉框
     */
    // 证券代码
    private securityCodeSelect: any[] = [];
    // 分期偿还数据字典
    private bondSerialDicEntity = ParamBondSerialDicEntity;

    // 新增、编辑、删除弹出框是否展示
    private isDetailAble: boolean = false;

    // 选中多选行
    private multipleSelection: any[] = [];

    /**
     * 初始化
     */
    public mounted() {
        /**
         * 数据字典初始化
         */
        // 分期偿还类型
        this.publicDicFun("amortizeType", BondConstant.AMORTIZE_TYPE_DICCODE);

        /**
         * 初始化表格分页参数
         */
        this.pageVO.pageSize = 10;
        this.pageVO.pageNum = 1;
        this.pageVO.total = 0;

        // 初始化表格
        this.$nextTick(() => {
            this.onFindSubmit();
        });
    }

    /**
     * 组件销毁
     */
    public destroyed() {
        // 字典清空
        for (const key of Object.keys(ParamBondSerialDicEntity)) {
            ParamBondSerialDicEntity[key] = [];
        }
    }

    /**
     * 数据字典初始化 公共方法
     */
    public publicDicFun(dicName: string, dicCode: string) {
        const dic = new DicReqVO();
        dic.parentDicCode = dicCode;
        this.dicService.dicAllSubList(dic).then((res: WinResponseData) => {
            ParamBondSerialDicEntity[dicName] = res.data;
        });
    }

    /**
     * 内部证券代码查询 公共方法
     */
    public publicInCodeSelectFun(query: any, cb: any) {
        const codeParam = new ParamBondBaseReqVO();
        codeParam.reqPageNum = 1;
        codeParam.reqPageSize = 10;
        if (query !== null && query !== "") {
            codeParam.securityCode = query;
        }
        this.service
            .findBondSerialByPage(codeParam)
            .then((res: WinResponseData) => {
                if (res.winRspType === WinRspType.ERROR) {
                    this.win_message_error(res.msg);
                } else {
                    this.service.codeFilter(res.data.list, cb, query);
                }
            });
    }

    /**
     * 内部证券代码查询
     */
    public inCodeSelectFun(query: any, cb: any) {
        this.publicInCodeSelectFun(query, cb);
    }

    /**
     * 内部证券代码查询参数选中
     */
    public handleCodeSelect(item: any) {
        this.bondInfoForm.securityCode = item.key;
    }

    /**
     * 查询重置
     */
    public reset() {
        this.bondInfoForm = new ParamBondBaseReqVO();
    }

    /**
     * 表格数据根据数据字典格式化
     */
    // 分期偿还类型
    public amortizeTypeFormatter({ cellValue }) {
        return this.dicFormatter(
            cellValue,
            ParamBondSerialDicEntity.amortizeType
        );
    }
    // 票面利率
    public repayRateFormatter({ cellValue }) {
        return numberUtils.multiplyBy100(cellValue, 3);
    }
    // 日期格式
    public DateFormatter({ cellValue, row, rowIndex, column, columnIndex }) {
        const date = new Date(cellValue);
        return DateUtils.dateFtt("yyyyMMdd", date);
    }

    /**
     * 全选操作
     */
    public handleSelectAll({ selection, checked }) {
        this.multipleSelection = selection;
    }

    /**
     * 多选时选择事件监听
     */
    public handleSelectionChange({ selection, checked, row, column }) {
        this.multipleSelection = selection;
    }

    /**
     * 查询事件监听函数
     */
    public onFindSubmit() {
        this.bondInfoForm.reqPageNum = this.pageVO.pageNum;
        this.bondInfoForm.reqPageSize = this.pageVO.pageSize;
        this.service
            .findBondSerialByPage(this.bondInfoForm)
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
            this.$refs.bondSerialDetail.addClickme(
                BondConstant.ADD_BOND_SERIAL_TILE,
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
            this.$refs.bondSerialDetail.editClickme(
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
            this.$refs.bondSerialDetail.deleteClickme(
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
            this.$refs.bondSerialDetail.viewClickme(
                "查看" + row.securityCode + " " + row.securityName,
                true,
                row
            );
        });
    }

    /**
     * 表单数据提交事件监听
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
                    this.service
                        .batchDeleteBondSerial(ids)
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
                const row = this.multipleSelection[0];
                this.isDetailAble = true;
                this.$nextTick(() => {
                    this.$refs.bondSerialDetail.deleteClickme(
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
}
