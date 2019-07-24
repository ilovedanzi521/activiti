import BaseController from "../../common/controller/BaseController";
import { WinRspType } from "../../common/enum/BaseEnum";
import { Emit, Prop, Component } from "vue-property-decorator";
import { OperationTypeEnum } from "../../common/enum/OperationTypeEnum";
import { ProdPortfolioEntity } from "../vo/ProdPortfolioEntity";
import { ProdPortfolioRepVO } from "../vo/ProdPortfolioVO";

@Component
export default class ProdPortfolioTransferController extends BaseController {
    // 控制Transfer显隐
    private transferVisible: boolean = false;
    // 所有的数据选项
    private dataDic = [];
    // 已选中的数据
    private checkedItem = [];
    // 弹窗标题
    private dialogTitle: string = "";
    // 数据字典
    private portfolioDicData: any = ProdPortfolioEntity;
    /**
     * 按钮是否显示
     */
    private buttonShow: boolean = true;
    /**
     * 所有字段是否置灰
     */
    private allDisabled: boolean = false;

    private createLoading: boolean = false;

    // 接受父组件的值
    @Prop({
        type: Object,
        required: false,
        default: () => ({})
    })
    private toChildMsg!: {
        columnName: string;
        type: OperationTypeEnum;
        data: ProdPortfolioRepVO;
        filterSecurityType: [];
        filterTransactionDirection: [];
    };
    private mounted() {
        this.init(this.toChildMsg.columnName);
        if (
            this.toChildMsg.type === OperationTypeEnum.VIEW ||
            this.toChildMsg.type === OperationTypeEnum.DELETE
        ) {
            // 置灰表单
            this.allDisabled = true;
            // 隐藏按钮
            this.buttonShow = false;
        }
        this.transferVisible = true;
    }

    private init(columnName: string) {
        this.dataDic = [];
        if (columnName === "permitSecurityTypes") {
            // 初始化Title
            this.dialogTitle = ProdPortfolioTransferConst.SECURITYTYPETITLE;
            // 初始化已选中数据
            this.checkedItem = this.split(
                this.toChildMsg.data.permitSecurityTypes
            );
            // 初始化所有的数据选项
            this.toChildMsg.filterSecurityType.forEach((item: any) => {
                this.dataDic.push({
                    key: item.securityType,
                    label: item.securityTypeName
                });
            });
        }
        if (columnName === "permitTransactionDirections") {
            // 初始化Title
            this.dialogTitle =
                ProdPortfolioTransferConst.TRANSACTIONDIRECTIONSTITLE;
            // 初始化已选中数据
            this.checkedItem = this.split(
                this.toChildMsg.data.permitTransactionDirections
            );
            // 初始化所有的数据选项
            this.toChildMsg.filterTransactionDirection.forEach((item: any) => {
                this.dataDic.push({
                    key: item.transactionDirection,
                    label: item.transactionDirectionName
                });
            });
        }
    }
    private handleChange(value, direction, movedKeys) {
        this.checkedItem = value;
    }
    // 确定
    private dialogConfirm() {
        // 去掉数组中第一个空元素
        if (this.checkedItem[0] === "") {
            this.checkedItem.shift();
        }
        // 回写
        if (this.toChildMsg.columnName === "permitSecurityTypes") {
            this.toChildMsg.data.permitSecurityTypes = this.checkedItem.join(
                ","
            );
        }
        if (this.toChildMsg.columnName === "permitTransactionDirections") {
            this.toChildMsg.data.permitTransactionDirections = this.checkedItem.join(
                ","
            );
        }
        this.send(WinRspType.SUCC, this.toChildMsg.columnName);
    }
    // 取消
    private dialogCancel() {
        this.send(WinRspType.CANCEL);
    }

    // 关闭Dialog
    private closeDia() {
        this.send(WinRspType.CANCEL);
    }

    @Emit("bindSend")
    private send(msg: WinRspType, columnName: string = "") {
        // tslint规范
    }

    private split(val: string) {
        if (val && val.length > 0) {
            return val.split(",");
        }
        return [];
    }
}

export const ProdPortfolioTransferConst = {
    SECURITYTYPETITLE: "证券类别权限",
    TRANSACTIONDIRECTIONSTITLE: "交易方向权限"
};
