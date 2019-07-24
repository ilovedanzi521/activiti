/****************************************************
 * 创建人：     @author zoujian
 * 创建时间: 2019年6月10日/下午5:52:56
 * 项目名称：  FRONTEND
 * 文件名称: RepoDialogController
 * 文件描述: @Description: (回购参数增删改页面Controller)
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/
import { Component, Prop, Emit } from "vue-property-decorator";
import BaseController from "../../common/controller/BaseController";
import { ParamRepoRepVO } from "../vo/ParamRepoVO";
import { WinResponseData } from "../../common/vo/BaseVO";
import RepoDialogService from "../service/RepoDialogService";
import { ValidateConst } from "../const/ValidateConst";
import { BaseConst } from "../../common/const/BaseConst";
import { WinRspType } from "../../common/enum/BaseEnum";
import { OperationTypeEnum } from "../../common/enum/OperationTypeEnum";
import { MessageConst } from "../const/MessageConst";
@Component
export default class RepoDialogController extends BaseController {
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
        data: ParamRepoRepVO;
    };
    private repoDialogService: RepoDialogService = new RepoDialogService();
    private createRepo: ParamRepoRepVO = new ParamRepoRepVO();
    private dialogVisible: boolean = true;
    private dialogLoading: boolean = false;
    private securityCodeDisabaled: boolean = false;
    private formDisabled: boolean = false;
    private operationShow: boolean = true;
    private dialogSumbitText: string = "";
    private dialogTitle: string = "";
    private securityCodes = [];
    /** form表单校验规则 */
    private rules = {
        securityCode: [
            {
                required: true,
                message: ValidateConst.SECURITY_CODE_NOT_NULL,
                trigger: "change"
            }
        ],
        repoDay: [
            {
                required: true,
                message: ValidateConst.REPO_REPO_DAY_NOT_NULL,
                trigger: "blur"
            },
            {
                type: "number",
                min: 1,
                message: ValidateConst.NUMBERS_GREATER_THAN_OR_EQUAL_0,
                trigger: "blur"
            }
        ]
    };
    /** 页面初始化 */
    private mounted() {
        this.createRepo = new ParamRepoRepVO();
        this.dialogTitle = this.fromFatherMsg.dialogTitle;
        if (this.fromFatherMsg.type === OperationTypeEnum.ADD) {
            this.dialogSumbitText = BaseConst.CONFIRM;
            this.operationShow = true;
        }
        if (this.fromFatherMsg.type === OperationTypeEnum.DELETE) {
            this.dialogSumbitText = BaseConst.DELETE;
            this.createRepo = this.fromFatherMsg.data;
            this.formDisabled = true;
            this.operationShow = true;
        }
        if (this.fromFatherMsg.type === OperationTypeEnum.UPDATE) {
            this.dialogSumbitText = BaseConst.CONFIRM;
            this.createRepo = this.fromFatherMsg.data;
            this.securityCodeDisabaled = true;
            this.operationShow = true;
        }
        if (this.fromFatherMsg.type === OperationTypeEnum.VIEW) {
            this.operationShow = false;
            this.createRepo = this.fromFatherMsg.data;
            this.formDisabled = true;
        }
        this.dialogVisible = true;
        this.getSecurityCode();
    }

    /** 回调给父组件函数 */
    @Emit("bindSend")
    private send(msg: WinRspType) {}

    /** 取消 */
    private dialogCancel() {
        this.send(WinRspType.CANCEL);
    }

    /** 查询当前证券基础类中所有的securityCode(排除回购参数类中已存在的) */
    private getSecurityCode() {
        // TODO 获取marketCode
        this.repoDialogService
            .securityCodeList("", "SZ")
            .then((response: WinResponseData) => {
                if (response.winRspType === WinRspType.ERROR) {
                    this.win_message_error(response.msg);
                } else {
                    this.securityCodes = response.data;
                }
            });
    }

    private closeDialog() {
        this.send(WinRspType.SUCC);
    }

    /** 提交按钮 */
    private submitDialog() {
        const ob = "createRepo";
        const el: any = this.$refs[ob];
        el.validate((valid: boolean) => {
            if (valid) {
                this.dialogLoading = true;
                if (this.fromFatherMsg.type === OperationTypeEnum.ADD) {
                    this.repoDialogService
                        .add(this.createRepo)
                        .then((response: WinResponseData) => {
                            this.dialogMessage(response);
                        })
                        .catch((ex: any) => {
                            this.win_message_error(MessageConst.REPO_ADD_FAIL);
                        });
                }
                if (this.fromFatherMsg.type === OperationTypeEnum.UPDATE) {
                    this.repoDialogService
                        .update(this.createRepo)
                        .then((response: WinResponseData) => {
                            this.dialogMessage(response);
                        })
                        .catch((ex: any) => {
                            this.win_message_error(
                                MessageConst.REPO_UPDATE_FAIL
                            );
                        });
                }
                if (this.fromFatherMsg.type === OperationTypeEnum.DELETE) {
                    this.repoDialogService
                        .del(this.createRepo.id)
                        .then((response: WinResponseData) => {
                            this.dialogMessage(response);
                        })
                        .catch((ex: any) => {
                            this.win_message_error(
                                MessageConst.REPO_DELETE_FAIL
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
}
