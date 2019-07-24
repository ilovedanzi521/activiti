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
import ParamRivalTraderDialogService from "../service/ParamRivalTraderDialogService";
import { RivalValidateConst } from "../const/RivalValidateConst";
import { ParamRivalTraderRepVO } from "../vo/ParamRivalTraderVO";
import RivalTraderDicDataVO from "../vo/RivalTraderDicDataVO";
@Component
export default class ParamRivalTraderDialogController extends BaseController {
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
        data: ParamRivalTraderRepVO;
        rivalTraderDicDataVO: RivalTraderDicDataVO;
    };

    private rivalTraderDialogService: ParamRivalTraderDialogService = new ParamRivalTraderDialogService();
    private paramRivalTraderRepVO: ParamRivalTraderRepVO = new ParamRivalTraderRepVO();
    private rivalTraderDicDataVO: RivalTraderDicDataVO = new RivalTraderDicDataVO();
    private dialogVisible: boolean = true;
    private dialogLoading: boolean = false;
    private createLoading: boolean = false;
    private formDisabled: boolean = false;
    /** 是否显示操作（确定、取消）按钮 */
    private operationShow: boolean = true;
    private rivalDisabled: boolean = true;
    private dialogSumbitText: string = "";
    /** dialog标题 */
    private dialogTitle: string = "";
    private spanWidth: number = 12;

    /** form表单校验规则 */
    private rules = {
        traderName: [
            {
                required: true,
                message: RivalValidateConst.TRADER_NAME_NOT_NULL,
                trigger: "blur"
            }
        ]
    };
    /** 页面初始化 */
    private mounted() {
        this.paramRivalTraderRepVO = new ParamRivalTraderRepVO();
        this.paramRivalTraderRepVO = this.fromFatherMsg.data;
        if (this.fromFatherMsg.type === OperationTypeEnum.ADD) {
            this.dialogTitle = ParamRivalTraderConst.CREATETITLE;
            this.dialogSumbitText = BaseConst.CONFIRM;
            this.operationShow = true;
        }
        if (this.fromFatherMsg.type === OperationTypeEnum.DELETE) {
            this.dialogTitle = ParamRivalTraderConst.DELETETITLE;
            this.dialogSumbitText = BaseConst.DELETE;
            this.formDisabled = true;
            this.operationShow = true;
        }
        if (this.fromFatherMsg.type === OperationTypeEnum.UPDATE) {
            this.dialogTitle = ParamRivalTraderConst.MODIFYTITLE;
            this.dialogSumbitText = BaseConst.CONFIRM;
            this.operationShow = true;
        }
        if (this.fromFatherMsg.type === OperationTypeEnum.VIEW) {
            this.dialogTitle = ParamRivalTraderConst.VIEWTITLE;
            this.operationShow = false;
            this.formDisabled = true;
        }
        this.rivalTraderDicDataVO = this.fromFatherMsg.rivalTraderDicDataVO;
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
        const paramRivalTrader = "paramRivalTrader";
        const el: any = this.$refs[paramRivalTrader];
        el.validate((valid: boolean) => {
            if (valid) {
                this.dialogLoading = true;
                if (this.fromFatherMsg.type === OperationTypeEnum.ADD) {
                    this.rivalTraderDialogService
                        .insert(this.paramRivalTraderRepVO)
                        .then((response: WinResponseData) => {
                            this.dialogMessage(response);
                        });
                }
                if (this.fromFatherMsg.type === OperationTypeEnum.UPDATE) {
                    this.rivalTraderDialogService
                        .update(this.paramRivalTraderRepVO)
                        .then((response: WinResponseData) => {
                            this.dialogMessage(response);
                        });
                }
                if (this.fromFatherMsg.type === OperationTypeEnum.DELETE) {
                    this.rivalTraderDialogService
                        .del(this.paramRivalTraderRepVO.id)
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
export const ParamRivalTraderConst = {
    /** 新增交易员信息 */
    CREATETITLE: "新增交易员信息",
    /** 查看交易员信息 */
    VIEWTITLE: "查看交易员信息",
    /** 修改交易员信息 */
    MODIFYTITLE: "修改交易员信息",
    /** 删除交易员信息 */
    DELETETITLE: "删除交易员信息"
};
