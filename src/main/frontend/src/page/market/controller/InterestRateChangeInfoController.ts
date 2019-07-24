import { Component } from "vue-property-decorator";
import { BaseConst } from "../../common/const/BaseConst";
import BaseController from "../../common/controller/BaseController";
import { WinRspType } from "../../common/enum/BaseEnum";
import { OperationTypeEnum } from "../../common/enum/OperationTypeEnum";
import dateUtils from "../../common/util/DateUtils";
import numberUtils from "../../common/util/NumberUtils";
import { WinResponseData } from "../../common/vo/BaseVO";
import PageVO from "../../common/vo/PageVO";
import InterestRateChangeService from "../service/InterestRateChangeInfoService";
import InterestRateChangeInfoDialog from "../view/InterestRateChangeInfoDialog.vue";
import {
    InterestRateChangeInfoRepVO,
    InterestRateChangeInfoReqVO
} from "../vo/InterestRateChangeInfoVO";

@Component({ components: { InterestRateChangeInfoDialog } })
export default class InterestRateChangeInfoController extends BaseController {
    /**
     * 利率变动信息service
     */
    private service: InterestRateChangeService = new InterestRateChangeService();
    // 查询条件
    private formInline: InterestRateChangeInfoReqVO = new InterestRateChangeInfoReqVO();
    // 返回结果集
    private interestRateChangeInfo: PageVO = new PageVO();

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
        data: InterestRateChangeInfoRepVO;
    };

    private mounted() {
        this.$nextTick(() => {
            this.list();
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
                    this.interestRateChangeInfo = winResponseData.data;
                }
            });
    }

    /** 带分页参数查询 */
    private pageQuery(pageVO) {
        this.formInline.reqPageNum = pageVO.pageNum;
        this.formInline.reqPageSize = pageVO.pageSize;
        this.list();
    }

    // 查询Securitycode
    private listAll(queryString: string, cb) {
        const queryVo: InterestRateChangeInfoReqVO = new InterestRateChangeInfoReqVO();
        queryVo.securityCode = queryString;
        // 指定下拉框条数最多为10条
        queryVo.reqPageSize = 10;
        this.service.list(queryVo).then((response: WinResponseData) => {
            if (response.winRspType === WinRspType.ERROR) {
                this.win_message_error(response.msg);
            } else {
                const list = response.data.list;
                this.filter(list, cb);
            }
        });
    }

    private filter(list: InterestRateChangeInfoRepVO[], cb) {
        const array = [];
        if (list.length > 0) {
            list.forEach((element: InterestRateChangeInfoRepVO) => {
                const ob = { value: "", key: "" };
                ob.key = element.securityCode;
                ob.value = element.securityCode + " " + element.securityName;
                array.push(ob);
            });
        }
        // 调用 callback 返回建议列表的数据
        cb(array);
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

    // 选中证券内码时，只获得内码，不获取名称
    private handleSelect(item: any) {
        this.formInline.securityCode = item.key;
    }

    // 重置
    private reset() {
        this.formInline = new InterestRateChangeInfoReqVO();
    }

    // 批量删除功能
    private delBatch() {
        if (this.selected.length === 1) {
            this.operation(this.selected[0], OperationTypeEnum.DELETE);
        } else {
            this.win_message_box_warning(
                "此操作将永久删除 " +
                    this.selected.length +
                    " 条利率变动信息, 是否继续?",
                "警告"
            ).then(() => {
                const ids: number[] = [];
                this.selected.forEach(
                    (element: InterestRateChangeInfoRepVO) => {
                        ids.push(element.id);
                    }
                );
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
    // 日期格式
    private DateFormatter({ cellValue, row, rowIndex, column, columnIndex }) {
        return dateUtils.dateFtt("yyyyMMdd", new Date(cellValue));
    }

    // 票面利率*100处理
    private couponRateFormatter({ cellValue }) {
        return numberUtils.multiplyBy100(cellValue, 3);
    }

    // 双击查看
    private view({ cellValue, row }) {
        this.operation(row, OperationTypeEnum.VIEW);
    }
    /** 新增、修改、删除参数预置 */
    private operation(row: InterestRateChangeInfoRepVO, type: string) {
        if (type === OperationTypeEnum.ADD) {
            this.cardNumber = {
                dialogTitle: InterestRateChangeInfoConst.CREATETITLE,
                type: OperationTypeEnum.ADD,
                data: new InterestRateChangeInfoRepVO()
            };
        }
        if (type === OperationTypeEnum.DELETE) {
            this.cardNumber = {
                dialogTitle:
                    BaseConst.DELETE +
                    " " +
                    row.securityCode +
                    " " +
                    row.securityName,
                type: OperationTypeEnum.DELETE,
                data: row
            };
        }
        if (type === OperationTypeEnum.UPDATE) {
            this.cardNumber = {
                dialogTitle:
                    BaseConst.MODIFY +
                    " " +
                    row.securityCode +
                    " " +
                    row.securityName,
                type: OperationTypeEnum.UPDATE,
                data: this.copy(row)
            };
        }
        if (type === OperationTypeEnum.VIEW) {
            this.cardNumber = {
                dialogTitle:
                    BaseConst.VIEW +
                    " " +
                    row.securityCode +
                    " " +
                    row.securityName,
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

export const InterestRateChangeInfoConst = {
    CREATETITLE: "新增利率变动信息"
};
