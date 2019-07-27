/****************************************************
 * 创建人：     @author zhongyuqi
 * 创建时间: 2019年7月5日/下午5:52:56
 * 项目名称：  FRONTEND
 * 文件名称: ProdSettlementAccountDialogController
 * 文件描述: @Description: (托管行账户账户增删改页面Controller)
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
import { ParamRivalBankAccountRepVO } from "../vo/ParamRivalBankAccountVO";
import RivalBankAccountDicDataVO from "../vo/RivalBankAccountDicDataVO";
import ParamRivalBankAccountService from "../service/ParamRivalBankAccountService";

@Component
export default class ParamRivalBankAccountDialogController extends BaseController {
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
        type: OperationTypeEnum;
        data: ParamRivalBankAccountRepVO;
        rivalBankAccountDicDataVO: RivalBankAccountDicDataVO;
    };
    /** service */
    private service: ParamRivalBankAccountService = new ParamRivalBankAccountService();
    /** 返回数据 */
    private paramRivalBankAccountRepVO: ParamRivalBankAccountRepVO = new ParamRivalBankAccountRepVO();
    /** 数据字典 */
    private rivalBankAccountDicDataVO: RivalBankAccountDicDataVO = new RivalBankAccountDicDataVO();
    // dialog显示
    private dialogVisible: boolean = true;
    // form隐显
    private formDisabled: boolean = false;
    /** 是否显示操作（确定、取消）按钮 */
    private operationShow: boolean = true;
    /** dialog标题 */
    private dialogTitle: string = "";
    // 默认宽度
    private spanWidth: number = 12;
    // dialog显示
    private dialogSumbitText: string = "";
    // 对手方信息
    private rivalDisabled: boolean = true;
    // 确定按钮
    private dialogLoading: boolean = false;

    /** 页面初始化 */
    private mounted() {
        this.paramRivalBankAccountRepVO = new ParamRivalBankAccountRepVO();
        this.paramRivalBankAccountRepVO = this.fromFatherMsg.data;
        if (this.fromFatherMsg.type === OperationTypeEnum.ADD) {
            this.dialogTitle = ParamRivalBankAccountConst.CREATETITLE;
            this.dialogSumbitText = BaseConst.CONFIRM;
            this.operationShow = true;
        }
        if (this.fromFatherMsg.type === OperationTypeEnum.DELETE) {
            this.dialogTitle = ParamRivalBankAccountConst.DELETETITLE;
            this.dialogSumbitText = BaseConst.DELETE;
            this.formDisabled = true;
            this.operationShow = true;
        }
        if (this.fromFatherMsg.type === OperationTypeEnum.UPDATE) {
            this.dialogTitle = ParamRivalBankAccountConst.MODIFYTITLE;
            this.dialogSumbitText = BaseConst.CONFIRM;
            this.operationShow = true;
        }
        if (this.fromFatherMsg.type === OperationTypeEnum.VIEW) {
            this.dialogTitle = ParamRivalBankAccountConst.VIEWTITLE;
            this.operationShow = false;
            this.formDisabled = true;
        }
        this.rivalBankAccountDicDataVO = this.fromFatherMsg.rivalBankAccountDicDataVO;
        this.dialogVisible = true;
    }

    /** 提交按钮 */
    private submitDialog() {
        const ParamRivalBankAccount = "ParamRivalBankAccount";
        const el: any = this.$refs[ParamRivalBankAccount];
        el.validate((valid: boolean) => {
            if (valid) {
                this.dialogLoading = true;
                if (this.fromFatherMsg.type === OperationTypeEnum.ADD) {
                    this.service
                        .insert(this.paramRivalBankAccountRepVO)
                        .then((response: WinResponseData) => {
                            this.dialogMessage(response);
                        });
                }
                if (this.fromFatherMsg.type === OperationTypeEnum.UPDATE) {
                    this.service
                        .update(this.paramRivalBankAccountRepVO)
                        .then((response: WinResponseData) => {
                            this.dialogMessage(response);
                        });
                }
                if (this.fromFatherMsg.type === OperationTypeEnum.DELETE) {
                    this.service
                        .delete(this.paramRivalBankAccountRepVO.id)
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

    /** 取消 */
    private dialogCancel() {
        this.send(WinRspType.CANCEL);
    }

    /** 关闭 */
    private closeDialog() {
        this.send(WinRspType.SUCC);
    }

    /** 回调给父组件函数 */
    @Emit("bindSend")
    private send(msg: WinRspType) {
        //
    }
}
export const ParamRivalBankAccountConst = {
    /** 新增托管账户信息 */
    CREATETITLE: "新增托管账户信息",
    /** 查看托管账户信息 */
    VIEWTITLE: "查看托管账户信息",
    /** 修改托管账户信息 */
    MODIFYTITLE: "修改托管账户信息",
    /** 删除托管账户信息 */
    DELETETITLE: "删除托管账户信息"
};
