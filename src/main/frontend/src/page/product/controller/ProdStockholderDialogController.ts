import BaseController from "../../common/controller/BaseController";
import { Component, Prop, Emit } from "vue-property-decorator";
import {
    StockholderReqVO,
    StockholderRepVO,
    StockholderDicVO
} from "../vo/ProdStockholderVO";
import { ProdSeatRepVO } from "../vo/ProdSeatVO";
import { OperationTypeEnum } from "../../common/enum/OperationTypeEnum";
import { WinRspType } from "../../common/enum/BaseEnum";
import ProdStockholderService from "../service/ProdStockholderService";
import { WinResponseData } from "../../common/vo/BaseVO";
import { MessageConst } from "../../market/const/MessageConst";
import { BaseConst } from "../../common/const/BaseConst";
import ProdSeatService from "../service/ProdSeatService";

@Component
export default class ProdStockholderDialogController extends BaseController {
    // 股东账户Service
    private service: ProdStockholderService = new ProdStockholderService();
    // 返回数据
    private createStockholder: StockholderRepVO = new StockholderRepVO();
    // 删除VO
    private deleteStockholder: StockholderReqVO = new StockholderReqVO();
    // 字典
    private stockholderDicVO: StockholderDicVO = new StockholderDicVO();
    // 弹框显示
    private formDisabled: boolean = false;
    // 弹窗用途
    private dialogTitle: string = "";
    // 提交按钮的文字
    private dialogSumbitText: string = "";
    // 弹窗显示
    private dialogVisible: boolean = true;
    //
    private dialogLoading: boolean = false;
    // 新增置灰
    private statusDisabaled: boolean = false;
    // 修改置灰
    private updateStatusDisabaled: boolean = false;
    // 按钮是否显示
    private buttonShow: boolean = true;
    // 上交所
    private marketSH: string = "SH";
    // 深交所
    private marketSZ: string = "SZ";
    // 沪港通
    private marketHG: string = "HG";
    // 深港通
    private marketSG: string = "SG";
    // 中登上海分公司
    private companySH: string = "1";
    // 中登深圳分公司
    private companySZ: string = "2";
    // 席位默认置灰
    private seatDisabaled: boolean = true;
    // 席位Service
    private seatService: ProdSeatService = new ProdSeatService();
    // 席位VO
    private prodSeatRepVOs: ProdSeatRepVO[] = [];

    /**
     * 表单验证
     */
    private rules = {
        fundNo: [
            {
                required: true,
                message: "",
                trigger: "change"
            }
        ]
    };

    // 父子组件通信
    @Prop({
        type: Object,
        required: false,
        default: () => ({})
    })
    private toChildMsg!: {
        dialogTitle: string;
        type: string;
        data: StockholderRepVO;
        stockholderDicVO: StockholderDicVO;
    };

    private mounted() {
        this.selectMainSeat();
        this.createStockholder = this.toChildMsg.data;
        this.dialogTitle = this.toChildMsg.dialogTitle;
        if (this.toChildMsg.type === OperationTypeEnum.ADD) {
            this.dialogSumbitText = Const.CONFIRM;
            this.statusDisabaled = true;
        }
        if (this.toChildMsg.type === OperationTypeEnum.DELETE) {
            this.dialogSumbitText = Const.DELETE;
            this.createStockholder = this.toChildMsg.data;
            this.formDisabled = true;
            this.statusDisabaled = false;
        }
        if (this.toChildMsg.type === OperationTypeEnum.UPDATE) {
            this.dialogSumbitText = Const.CONFIRM;
            this.createStockholder = this.toChildMsg.data;
            this.statusDisabaled = true;
            this.updateStatusDisabaled = true;
        }
        if (this.toChildMsg.type === OperationTypeEnum.VIEW) {
            this.createStockholder = this.toChildMsg.data;
            this.formDisabled = true;
            this.buttonShow = false;
        }
        this.dialogVisible = true;
        /** 数据字典 */
        this.stockholderDicVO = this.toChildMsg.stockholderDicVO;
    }

    /** 按钮 */
    private submitDialog() {
        const el: any = this.$refs.create;
        el.validate((valid: any) => {
            if (valid) {
                this.dialogLoading = true;
                if (this.toChildMsg.type === OperationTypeEnum.ADD) {
                    const copycreateStockholder = this.copy(
                        this.createStockholder
                    );
                    // 暂定默认值
                    copycreateStockholder.assetUnitNo = "-1";
                    copycreateStockholder.portfNo = "-1";
                    copycreateStockholder.defaultStatus = "1";

                    this.service
                        .insert(copycreateStockholder)
                        .then((response: WinResponseData) => {
                            this.dialogMessage(response);
                        });
                }
                if (this.toChildMsg.type === OperationTypeEnum.UPDATE) {
                    const copycreateStockholder = this.copy(
                        this.createStockholder
                    );
                    this.service
                        .update(copycreateStockholder)
                        .then((response: WinResponseData) => {
                            this.dialogMessage(response);
                        });
                }

                if (this.toChildMsg.type === OperationTypeEnum.DELETE) {
                    this.win_message_box_warning(
                        MessageConst.DELETE_WARNING_MESSAGE,
                        BaseConst.WARNING,
                        false
                    ).then(() => {
                        const copycreateStockholder = this.copy(
                            this.createStockholder
                        );
                        this.deleteStockholder.fundNo =
                            copycreateStockholder.fundNo;
                        this.deleteStockholder.code =
                            copycreateStockholder.code;
                        this.service
                            .delete(
                                copycreateStockholder.fundNo,
                                copycreateStockholder.code
                            )
                            .then((response: WinResponseData) => {
                                this.dialogMessage(response);
                            });
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
            this.win_message_info(response.msg);
            this.send(WinRspType.SUCC);
        }
    }

    /** 交易市场选择监听 */
    private selectMarketEvent(selectMarketNo: any) {
        // 选择上交所
        if (this.marketSH === selectMarketNo) {
            // 席位可填
            this.seatDisabaled = false;
            // 登记公司为中登上海分公司
            this.createStockholder.registration = this.companySH;
        } else {
            // 席位置灰
            this.seatDisabaled = true;
            // 席位清空
            this.createStockholder.seat = "";
            // 选择深交所和深港通
            if (
                this.marketSZ === selectMarketNo ||
                this.marketSG === selectMarketNo
            ) {
                // 登记公司为中登深圳分公司
                this.createStockholder.registration = this.companySZ;
            } else if (this.marketHG === selectMarketNo) {
                // 沪港通对应中登上海分公司
                this.createStockholder.registration = this.companySH;
            } else {
                // 其他为空
                this.createStockholder.registration = "";
            }
        }
    }

    /** 主席位下拉选择 */
    private selectMainSeat() {
        this.seatService.selectMainSeat().then((response: WinResponseData) => {
            this.prodSeatRepVOs = response.data;
        });
    }

    // 关闭Dialog
    private closeDia() {
        this.send(WinRspType.CANCEL);
    }
    // 取消
    private dialogCancel() {
        this.send(WinRspType.CANCEL);
    }
    @Emit("bindSend")
    private send(msg: WinRspType) {
        //
    }
}
export const Const = {
    DELETE: "删除",
    CONFIRM: "确定"
};
