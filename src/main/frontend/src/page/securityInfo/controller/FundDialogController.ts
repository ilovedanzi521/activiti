/****************************************************
 * 创建人：     @author zoujian
 * 创建时间: 2019年6月10日/下午5:52:56
 * 项目名称：  FRONTEND
 * 文件名称: FundDialogController
 * 文件描述: @Description: (投资基金增删改页面Controller)
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/
import { Component, Prop, Emit } from "vue-property-decorator";
import BaseController from "../../common/controller/BaseController";
import { ParamFundRepVO, ParamFundReqVO } from "../vo/ParamFundVO";
import FundDialogService from "../service/FundDialogService";
import { WinResponseData } from "../../common/vo/BaseVO";
import { DicRepVO, DicReqVO } from "../../dictionary/vo/DicVO";
import DicService from "../../dictionary/service/DicService";
import { ValidateConst } from "../const/ValidateConst";
import { BaseConst } from "../../common/const/BaseConst";
import { WinRspType } from "../../common/enum/BaseEnum";
import { OperationTypeEnum } from "../../common/enum/OperationTypeEnum";
import FundDicVO from "../vo/FundDicVO";
import { MessageConst } from "../const/MessageConst";
@Component
export default class FundDialogController extends BaseController {
    public $refs: {
        validate: HTMLFormElement;
    };

    @Prop({
        type: Object,
        required: false,
        default: () => ({})
    })
    private toChildMsg!: {
        dialogTitle: string;
        type: OperationTypeEnum;
        data: ParamFundRepVO;
        fundDicVO: FundDicVO;
    };
    private repoDialogService: FundDialogService = new FundDialogService();
    private dicService: DicService = new DicService();
    private fundDicVO: FundDicVO = new FundDicVO();
    private diaTitle: string = "";
    private createFund: ParamFundRepVO = new ParamFundRepVO();
    private createLoading: boolean = false;
    private dialogVisible: boolean = true;
    private dialogLoading: boolean = false;
    private operationShow: boolean = true;
    private dialogTitle: string = "";
    private dialogSumbitText: string = "";
    private securityCodeDisabaled: boolean = false;
    private formDisabled: boolean = false;
    private spanWidth: number = 12;
    private fundTypes: DicRepVO[] = [];
    private chargingMethods: DicRepVO[] = [];
    private investmentClassifications: DicRepVO[] = [];
    private foreclosureStatuss: DicRepVO[] = [];
    private securityCodes = [];
    private rules = {
        securityCode: [
            {
                required: true,
                message: ValidateConst.SECURITY_CODE_NOT_NULL,
                trigger: "change"
            }
        ],
        establishmentDate: [
            {
                required: true,
                message: ValidateConst.ESTABLISHMENT_DATE_NOT_NULL,
                trigger: "change"
            }
        ],
        fundType: [
            {
                required: true,
                message: ValidateConst.FUND_TYPE_NOT_NULL,
                trigger: "change"
            }
        ],
        chargingMethod: [
            {
                required: true,
                message: ValidateConst.CHARGING_METHOD_NOT_NULL,
                trigger: "change"
            }
        ],
        investmentClassification: [
            {
                required: true,
                message: ValidateConst.INVESTMENT_CLASSIFICATION_NOT_NULL,
                trigger: "change"
            }
        ]
    };

    /** 页面初始化 */
    private mounted() {
        this.createFund = new ParamFundRepVO();
        this.dialogTitle = this.toChildMsg.dialogTitle;
        if (this.toChildMsg.type === OperationTypeEnum.ADD) {
            this.dialogSumbitText = BaseConst.CONFIRM;
        }
        if (this.toChildMsg.type === OperationTypeEnum.DELETE) {
            this.dialogSumbitText = BaseConst.DELETE;
            this.createFund = this.toChildMsg.data;
            this.formDisabled = true;
        }
        if (this.toChildMsg.type === OperationTypeEnum.UPDATE) {
            this.dialogSumbitText = BaseConst.CONFIRM;
            this.createFund = this.toChildMsg.data;
            this.securityCodeDisabaled = true;
        }
        if (this.toChildMsg.type === OperationTypeEnum.VIEW) {
            this.operationShow = false;
            this.createFund = this.toChildMsg.data;
            this.formDisabled = true;
        }
        this.dialogVisible = true;
        const dic = new DicReqVO();
        /** 数据字典 */
        this.fundDicVO = this.toChildMsg.fundDicVO;
        this.getSecurityCode("");
    }

    /** 提交按钮 */
    private submitDialog() {
        const create = "create";
        const el: any = this.$refs[create];
        el.validate(valid => {
            if (valid) {
                this.dialogLoading = true;
                if (this.toChildMsg.type === OperationTypeEnum.ADD) {
                    this.repoDialogService
                        .add(this.createFund)
                        .then((response: WinResponseData) => {
                            this.dialogMessage(response);
                        })
                        .catch((ex: any) => {
                            this.win_message_error(MessageConst.FUND_ADD_FAIL);
                        });
                }
                if (this.toChildMsg.type === OperationTypeEnum.UPDATE) {
                    this.repoDialogService
                        .update(this.createFund)
                        .then((response: WinResponseData) => {
                            this.dialogMessage(response);
                        })
                        .catch((ex: any) => {
                            this.win_message_error(
                                MessageConst.FUND_UPDATE_FAIL
                            );
                        });
                }
                if (this.toChildMsg.type === OperationTypeEnum.DELETE) {
                    this.repoDialogService
                        .del(this.createFund.id)
                        .then((response: WinResponseData) => {
                            this.dialogMessage(response);
                        })
                        .catch((ex: any) => {
                            this.win_message_error(
                                MessageConst.FUND_DELETE_FAIL
                            );
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

    private dialogCancel() {
        this.send(WinRspType.CANCEL);
    }

    private closeDialog() {
        this.send(WinRspType.CANCEL);
    }

    private getSecurityCode(queryString: string) {
        // TODO 获取marketCode
        this.repoDialogService
            .securityCodeList(queryString, "SZ")
            .then((response: WinResponseData) => {
                if (response.winRspType === WinRspType.ERROR) {
                    this.win_message_error(response.msg);
                } else {
                    this.securityCodes = response.data;
                }
            });
    }

    @Emit("bindSend")
    private send(msg: WinRspType) {}
}
