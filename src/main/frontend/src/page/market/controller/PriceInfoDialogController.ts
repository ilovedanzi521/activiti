import { Component, Prop, Emit } from "vue-property-decorator";
import BaseController from "../../common/controller/BaseController";
import ParamPriceInfoService from "../service/ParamPriceInfoService";
import {
    ParamPriceInfoReqVO,
    ParamPriceInfoRepVO
} from "../vo/ParamPriceInfoVO";
import { DicReqVO, DicRepVO } from "../../dictionary/vo/DicVO";
import DicService from "../../dictionary/service/DicService";
import { WinResponseData } from "../../common/vo/BaseVO";
import { WinRspType } from "../../common/enum/BaseEnum";
import { ValidateConst } from "../const/ValidateConst";
import { BaseConst } from "../../common/const/BaseConst";
import { MessageConst } from "../const/MessageConst";
import { OperationTypeEnum } from "../../common/enum/OperationTypeEnum";
import { BondConstant } from "../const/BondConstant";

@Component
export default class PriceInfoDialogController extends BaseController {
    @Prop({
        type: Object,
        required: false,
        default: () => ({})
    })
    toChildMsg!: {
        dialogTitle: string;
        type: OperationTypeEnum;
        data: ParamPriceInfoRepVO;
        delistStatusTypes: DicRepVO[];
    };

    /** 表单验证 */
    private rules = {
        securityCode: [
            {
                required: true,
                message: ValidateConst.SECURITY_CODE_NOT_NULL,
                trigger: "change"
            }
        ],
        infoDate: [
            {
                required: true,
                message: ValidateConst.INFO_DATE_NOT_NULL,
                trigger: "change"
            }
        ],
        delistStatus: [
            {
                required: true,
                message: ValidateConst.DELIST_STATUS_NOT_NULL,
                trigger: "change"
            }
        ],
        newPrice: [
            {
                pattern: /^[0-9]+(.[0-9]{1,4})?$/,
                message: ValidateConst.NUMBERS_GREATER_THAN_OR_EQUAL_0,
                trigger: "blur"
            }
        ],
        yesterdayClosePrice: [
            {
                pattern: /^[0-9]+(.[0-9]{1,4})?$/,
                message: ValidateConst.NUMBERS_GREATER_THAN_OR_EQUAL_0,
                trigger: "blur"
            }
        ],
        todayOpenPrice: [
            {
                pattern: /^[0-9]+(.[0-9]{1,4})?$/,
                message: ValidateConst.NUMBERS_GREATER_THAN_OR_EQUAL_0,
                trigger: "blur"
            }
        ],
        lowPrice: [
            {
                pattern: /^[0-9]+(.[0-9]{1,4})?$/,
                message: ValidateConst.NUMBERS_GREATER_THAN_OR_EQUAL_0,
                trigger: "blur"
            }
        ],
        highPrice: [
            {
                pattern: /^[0-9]+(.[0-9]{1,4})?$/,
                message: ValidateConst.NUMBERS_GREATER_THAN_OR_EQUAL_0,
                trigger: "blur"
            }
        ],
        averagePrice: [
            {
                pattern: /^[0-9]+(.[0-9]{1,4})?$/,
                message: ValidateConst.NUMBERS_GREATER_THAN_OR_EQUAL_0,
                trigger: "blur"
            }
        ],
        limitUpPrice: [
            {
                pattern: /^[0-9]+(.[0-9]{1,4})?$/,
                message: ValidateConst.NUMBERS_GREATER_THAN_OR_EQUAL_0,
                trigger: "blur"
            }
        ],
        limitDownPrice: [
            {
                pattern: /^[0-9]+(.[0-9]{1,4})?$/,
                message: ValidateConst.NUMBERS_GREATER_THAN_OR_EQUAL_0,
                trigger: "blur"
            }
        ],
        // TODO
        tradeCount: [
            {
                pattern: /^[0-9]+(.[0-9]{1,4})?$/,
                message: ValidateConst.NUMBERS_GREATER_THAN_OR_EQUAL_0,
                trigger: "blur"
            }
        ],
        tradePrice: [
            {
                pattern: /^[0-9]+(.[0-9]{1,4})?$/,
                message: ValidateConst.NUMBERS_GREATER_THAN_OR_EQUAL_0,
                trigger: "blur"
            }
        ],
        fullPriceClosedYesterday: [
            {
                pattern: /^[0-9]+(.[0-9]{1,4})?$/,
                message: ValidateConst.NUMBERS_GREATER_THAN_OR_EQUAL_0,
                trigger: "blur"
            }
        ],
        accruedInterest: [
            {
                pattern: /^[0-9]+(.[0-9]{1,4})?$/,
                message: ValidateConst.NUMBERS_GREATER_THAN_OR_EQUAL_0,
                trigger: "blur"
            }
        ],
        chinaBondPrice: [
            {
                pattern: /^[0-9]+(.[0-9]{1,4})?$/,
                message: ValidateConst.NUMBERS_GREATER_THAN_OR_EQUAL_0,
                trigger: "blur"
            }
        ],
        chinaBondYield: [
            {
                pattern: /^[0-9]+(.[0-9]{1,4})?$/,
                message: ValidateConst.NUMBERS_GREATER_THAN_OR_EQUAL_0,
                trigger: "blur"
            }
        ],
        chinaSecurityPrice: [
            {
                pattern: /^[0-9]+(.[0-9]{1,4})?$/,
                message: ValidateConst.NUMBERS_GREATER_THAN_OR_EQUAL_0,
                trigger: "blur"
            }
        ],
        chinaSecurityYield: [
            {
                pattern: /^[0-9]+(.[0-9]{1,4})?$/,
                message: ValidateConst.NUMBERS_GREATER_THAN_OR_EQUAL_0,
                trigger: "blur"
            }
        ]
    };
    $refs: {
        validate: HTMLFormElement;
    };
    private dicService: DicService = new DicService();
    private service: ParamPriceInfoService = new ParamPriceInfoService();
    /** 查询参数 */
    private createFundValue: ParamPriceInfoReqVO = new ParamPriceInfoReqVO();
    private form1: ParamPriceInfoReqVO = new ParamPriceInfoReqVO();
    /** 查询返回发行人列表 */
    private repVOs: ParamPriceInfoRepVO[] = [];
    /** 新增、保存对象 */
    private priceInfoVO: ParamPriceInfoRepVO = new ParamPriceInfoRepVO();

    private priceInfoList: Array<ParamPriceInfoRepVO> = [];

    private tableData: Array<ParamPriceInfoRepVO> = [];

    private value = {
        name: String,
        sex: Number,
        grade: String,
        jointime: String
    };

    private multipleSelection: [];
    private dialogVisible: boolean = true;
    private createLoading: boolean = false;
    private dialogFormVisible: boolean = false;
    private createPriceInfo: ParamPriceInfoRepVO = new ParamPriceInfoRepVO();
    private dialogTitle: string = "";
    private dialogSumbitText: string = "";
    private isCreate: boolean = false;
    private isDelete: boolean = false;
    private isEdit: boolean = false;
    private dialogLoading: boolean = false;
    private spanWidth: number = 8;
    private securityCodes: [] = [];
    private delistStatusTypes: DicRepVO[] = [];
    // 标题窗口类别  0-新增 1-编辑 2-删除
    private myTitleType: number = 0;
    private securityCodeDisabaled: boolean = false;
    private formDisabled: boolean = false;
    private showDIV: boolean = false;
    // 按钮是否显示
    private buttonShow: boolean = true;

    // 证券代码
    private securityCodeSelect: any[] = [];

    private mounted() {
        let dic = new DicReqVO();
        /** 证券状态类型 0正常 1停牌 2退市 */

        this.createPriceInfo = new ParamPriceInfoRepVO();
        this.dialogTitle = this.toChildMsg.dialogTitle;
        if (this.toChildMsg.type === OperationTypeEnum.ADD) {
            this.dialogSumbitText = Const.CONFIRM;
            this.delistStatusTypes = this.toChildMsg.delistStatusTypes;
            this.isCreate = false;
        }
        if (this.toChildMsg.type === OperationTypeEnum.DELETE) {
            this.dialogSumbitText = Const.DELETE;
            this.createPriceInfo = this.toChildMsg.data;
            if (
                this.createPriceInfo.assetType === BondConstant.BOND_ASSET_TYPE
            ) {
                this.showDIV = true;
            }
            //  this.selectSecurityEvent(this.createPriceInfo.securityCode);
            this.delistStatusTypes = this.toChildMsg.delistStatusTypes;
            this.isCreate = true;
            this.isDelete = true;
            this.formDisabled = true;
            this.securityCodeDisabaled = true;
        }
        if (this.toChildMsg.type === OperationTypeEnum.UPDATE) {
            this.dialogSumbitText = Const.CONFIRM;
            this.delistStatusTypes = this.toChildMsg.delistStatusTypes;
            this.createPriceInfo = this.toChildMsg.data;
            if (
                this.createPriceInfo.assetType === BondConstant.BOND_ASSET_TYPE
            ) {
                this.showDIV = true;
            }
            // this.selectSecurityEvent(this.createPriceInfo.securityCode);
            this.isCreate = true;
            this.isDelete = false;
            this.securityCodeDisabaled = true;
        }
        if (this.toChildMsg.type === OperationTypeEnum.VIEW) {
            this.createPriceInfo = this.toChildMsg.data;
            if (
                this.createPriceInfo.assetType === BondConstant.BOND_ASSET_TYPE
            ) {
                this.showDIV = true;
            }
            this.delistStatusTypes = this.toChildMsg.delistStatusTypes;

            this.formDisabled = true;
            this.securityCodeDisabaled = true;
            this.buttonShow = false;
        }

        this.dialogVisible = true;
        // 加载下拉数据
        //  this.listAll("", "");
        // 初始化证券代码下拉框
        this.publicOutCodeSelectFun(null);
    }

    // 新增时下拉选择证券内码，判断是否为债券
    private selectSecurityEvent(securityCode: any) {
        this.service
            .selectAssetTypeBySecurityCode(securityCode)
            .then((response: WinResponseData) => {
                if (response.msg === BondConstant.BOND_ASSET_TYPE) {
                    // 为债券时打开隐藏页面
                    this.showDIV = true;
                } else {
                    this.showDIV = false;
                }
            });
    }

    // 万元转成元
    private multiplyBy10000(row: ParamPriceInfoRepVO) {
        /**
         * 转成元存后台
         */
        if (row.tradeCount != null && row.tradeCount != "") {
            let tradeCount = parseFloat(row.tradeCount);
            tradeCount = tradeCount * 10000;
            row.tradeCount = tradeCount.toString();
        }
        if (row.tradePrice != null && row.tradePrice != "") {
            let tradePrice = parseFloat(row.tradePrice);
            tradePrice = tradePrice * 10000;
            row.tradePrice = tradePrice.toString();
        }
    }

    /** 提交按钮 */
    private submitDialog() {
        const el: any = this.$refs["create"];
        el.validate(valid => {
            if (valid) {
                this.dialogLoading = true;
                if (this.toChildMsg.type === OperationTypeEnum.ADD) {
                    const copyCreatePriceInfo = this.copy(this.createPriceInfo);
                    debugger;
                    this.multiplyBy10000(copyCreatePriceInfo);
                    this.service
                        .insert(copyCreatePriceInfo)
                        .then((response: WinResponseData) => {
                            this.dialogMessage(response);
                        });
                }
                if (this.toChildMsg.type === OperationTypeEnum.UPDATE) {
                    const copyCreatePriceInfo = this.copy(this.createPriceInfo);
                    this.multiplyBy10000(copyCreatePriceInfo);
                    this.service
                        .update(copyCreatePriceInfo)
                        .then((response: WinResponseData) => {
                            this.dialogMessage(response);
                        });
                }
                // if (this.toChildMsg.type === OperationTypeEnum.DELETE) {
                //     this.win_message_box_warning(
                //         MessageConst.DELETE_WARNING_MESSAGE,
                //         BaseConst.WARNING,
                //         false
                //     ).then(() => {
                //         this.service
                //             .delete(this.createPriceInfo.id)
                //             .then((response: WinResponseData) => {
                //                 this.dialogMessage(response);
                //             });
                //     });
                // }

                if (this.toChildMsg.type === OperationTypeEnum.DELETE) {
                    this.service
                        .delete(this.createPriceInfo.id)
                        .then((response: WinResponseData) => {
                            this.dialogMessage(response);
                        });
                }
            }
        });
    }

    private dialogMessage(response: WinResponseData) {
        this.dialogLoading = false;
        if (response.winRspType === WinRspType.ERROR) {
            this.win_message_error(response.msg);
        } else {
            this.win_message_success(response.msg);
            this.send(WinRspType.SUCC);
        }
    }
    /** 多选时选择事件监听 */
    private handleSelectionChange(val) {
        this.multipleSelection = val;
    }

    /**
     * 证券代码下拉框下拉触发事件
     */
    public visibleChangeTrigger() {
        this.publicOutCodeSelectFun(null);
    }
    /**
     * 新增页面时查询外部已存在证券代码和类别
     */
    public outCodeSelectFun(query: any) {
        this.publicOutCodeSelectFun(query);
    }

    /**
     * 外部证券代码查询 公共方法
     */
    public publicOutCodeSelectFun(query: string) {
        const codeParam = new ParamPriceInfoReqVO();
        codeParam.reqPageNum = 1;
        codeParam.reqPageSize = 10;
        if (query !== null && query !== "") {
            codeParam.securityCode = query;
        }
        // 获取证券内码
        this.service
            .pullSecurityList(codeParam)
            .then((response: WinResponseData) => {
                if (response.winRspType === "ERROR") {
                    this.errorMessage(response.msg);
                } else {
                    this.securityCodeSelect = response.data.list;
                }
            });
    }
    public selectCodeTrigger(securityCode: any) {
        if (securityCode !== null && securityCode !== "") {
            this.service
                .selectAssetTypeBySecurityCode(securityCode)
                .then((response: WinResponseData) => {
                    if (response.msg === BondConstant.BOND_ASSET_TYPE) {
                        // 为债券时打开隐藏页面
                        this.showDIV = true;
                    } else {
                        this.showDIV = false;
                    }
                });
        }
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
    private send(msg: WinRspType) {}
}
export const Const = {
    DELETE: "删除",
    CONFIRM: "确定"
};
