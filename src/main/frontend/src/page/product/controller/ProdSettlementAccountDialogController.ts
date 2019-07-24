/****************************************************
 * 创建人：     @author zoujian
 * 创建时间: 2019年7月5日/下午5:52:56
 * 项目名称：  FRONTEND
 * 文件名称: ProdSettlementAccountDialogController
 * 文件描述: @Description: (结算账户增删改页面Controller)
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/
import { Component, Prop, Emit } from "vue-property-decorator";
import BaseController from "../../common/controller/BaseController";
import { WinResponseData } from "../../common/vo/BaseVO";
import { BaseConst } from "../../common/const/BaseConst";
import { WinRspType } from "../../common/enum/BaseEnum";
import { OperationTypeEnum } from "../../common/enum/OperationTypeEnum";
import { ProdSettlementAccountRepVO } from "../vo/ProdSettlementAccountVO";
import ProdSettlementAccountDialogService from "../service/ProdSettlementAccountDialogService";
import { DicRepVO } from "../../dictionary/vo/DicVO";
import { ProdValidateConst } from "../const/ProdValidateConst";
@Component
export default class ProdSettlementAccountDialogController extends BaseController {
    public $refs: {
        validate: HTMLFormElement;
    };

    /** 父子组件通信 */
    @Prop({
        type: Object,
        required: false,
        default: () => ({})
    })
    private fromFatherMsg!: {
        dialogTitle: string;
        type: OperationTypeEnum;
        data: ProdSettlementAccountRepVO;
        escrowAgencyDic: DicRepVO[];
    };

    private prodSettlementAccountDialogService: ProdSettlementAccountDialogService = new ProdSettlementAccountDialogService();
    private prodSettlementAccountRepVO: ProdSettlementAccountRepVO = new ProdSettlementAccountRepVO();
    private dialogVisible: boolean = true;
    private dialogLoading: boolean = false;
    private createLoading: boolean = false;
    private formDisabled: boolean = false;
    private operationShow: boolean = true;
    private fundInfoDisabled: boolean = true;
    private dialogSumbitText: string = "";
    /** dialog标题 */
    private dialogTitle: string = "";
    private spanWidth: number = 12;
    /** 托管机构数据字典 */
    private escrowAgencyDic: DicRepVO[] = [];

    /** form表单校验规则 */
    private rules = {
        capitalAccountCode: [
            {
                required: true,
                message: ProdValidateConst.CAPITAL_ACCOUNT_CODE_NOT_NULL,
                trigger: "blur"
            }
        ],
        capitalAccountName: [
            {
                required: true,
                message: ProdValidateConst.CAPITAL_ACCOUNT_NAME2_NOT_NULL,
                trigger: "blur"
            }
        ],
        capitalOpenBank: [
            {
                required: true,
                message: ProdValidateConst.CAPITAL_OPEN_BANK_NOT_NULL,
                trigger: "blur"
            }
        ],
        escrowAccountCode: [
            {
                required: true,
                message: ProdValidateConst.ESCROW_ACCOUNT_CODE_NOT_NULL,
                trigger: "blur"
            }
        ],
        escrowAccountName: [
            {
                required: true,
                message: ProdValidateConst.ESCROW_ACCOUNT_NAME_NOT_NULL,
                trigger: "blur"
            }
        ],
        escrowAgency: [
            {
                required: true,
                message: ProdValidateConst.ESCROW_AGENCY_NOT_NULL,
                trigger: "change"
            }
        ]
    };
    /** 页面初始化 */
    private mounted() {
        this.prodSettlementAccountRepVO = new ProdSettlementAccountRepVO();
        this.dialogTitle = this.fromFatherMsg.dialogTitle;
        this.prodSettlementAccountRepVO = this.fromFatherMsg.data;
        if (this.fromFatherMsg.type === OperationTypeEnum.ADD) {
            this.dialogSumbitText = BaseConst.CONFIRM;
            this.operationShow = true;
        }
        if (this.fromFatherMsg.type === OperationTypeEnum.DELETE) {
            this.dialogSumbitText = BaseConst.DELETE;
            this.formDisabled = true;
            this.operationShow = true;
        }
        if (this.fromFatherMsg.type === OperationTypeEnum.UPDATE) {
            this.dialogSumbitText = BaseConst.CONFIRM;
            this.operationShow = true;
        }
        if (this.fromFatherMsg.type === OperationTypeEnum.VIEW) {
            this.operationShow = false;
            this.formDisabled = true;
        }
        this.escrowAgencyDic = this.fromFatherMsg.escrowAgencyDic;
        this.dialogVisible = true;
    }

    /** 取消 */
    private dialogCancel() {
        this.send(WinRspType.CANCEL);
    }

    /** 关闭 */
    private closeDialog() {
        this.send(WinRspType.SUCC);
    }

    /** 提交按钮 */
    private submitDialog() {
        const prodSettlementAccountRepVO = "prodSettlementAccountRepVO";
        const el: any = this.$refs[prodSettlementAccountRepVO];
        el.validate((valid: boolean) => {
            if (valid) {
                this.dialogLoading = true;
                if (this.fromFatherMsg.type === OperationTypeEnum.ADD) {
                    this.prodSettlementAccountDialogService
                        .insert(this.prodSettlementAccountRepVO)
                        .then((response: WinResponseData) => {
                            this.dialogMessage(response);
                        });
                }
                if (this.fromFatherMsg.type === OperationTypeEnum.UPDATE) {
                    this.prodSettlementAccountDialogService
                        .update(this.prodSettlementAccountRepVO)
                        .then((response: WinResponseData) => {
                            this.dialogMessage(response);
                        });
                }
                if (this.fromFatherMsg.type === OperationTypeEnum.DELETE) {
                    this.prodSettlementAccountDialogService
                        .del(this.prodSettlementAccountRepVO.id)
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

    /** 回调给父组件函数 */
    @Emit("bindSend")
    private send(msg: WinRspType) {}
}
