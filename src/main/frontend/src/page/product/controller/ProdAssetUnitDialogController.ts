import { Component, Prop, Emit } from "vue-property-decorator";
import { WinResponseData } from "../../common/vo/BaseVO";
import { ProdAssetUnitRepVO } from "../vo/ProdAssetUnitVO";
import BaseController from "../../common/controller/BaseController";
import ProdAssetUnitDialogService from "../service/ProdAssetUnitDialogService";
import { WinRspType } from "../../common/enum/BaseEnum";
import { BaseConst } from "../../common/const/BaseConst";
import { ProdValidateConst } from "../const/ProdValidateConst";
import { OperationTypeEnum } from "../../common/enum/OperationTypeEnum";
@Component
export default class InterestRateChangeInfoDialogController extends BaseController {
    public $refs: {
        validate: HTMLFormElement;
    };
    /**
     * 资产单元service
     */
    private service: ProdAssetUnitDialogService = new ProdAssetUnitDialogService();
    /**
     * 资产单元实体
     */
    private prodAssetUnitDetail: ProdAssetUnitRepVO = new ProdAssetUnitRepVO();

    // 页面定义状态字典
    private statuss = [
        { dicCode: "1", dicExplain: "正常" },
        { dicCode: "2", dicExplain: "冻结" }
    ];

    // 弹窗标题
    private dialogTitle: string = "";
    // 确定按钮或删除按钮标志
    private dialogSumbitText: string = "";
    // 字段样式
    private spanWidth: number = 12;
    /**
     * 所有字段是否置灰
     */
    private allDisabled: boolean = false;

    /** 显示no字段标志位，新增时不展示no */
    private showNo: boolean = true;
    /**
     * 按钮是否显示
     */
    private buttonShow: boolean = true;

    private createLoading: boolean = false;
    private dialogLoading: boolean = false;
    // 控制dialog显隐
    private dialogVisibleSon: boolean = false;
    // 校验规则
    private rules = {
        fundCode: [
            {
                required: true,
                message: ProdValidateConst.FUND_CODE_NOT_NULL,
                trigger: "blur"
            }
        ],
        fundName: [
            {
                required: true,
                message: ProdValidateConst.FUND_NAME_NOT_NULL,
                trigger: "blur"
            }
        ],
        no: [
            {
                required: true,
                message: ProdValidateConst.NO_NOT_NULL,
                trigger: "blur"
            }
        ],
        assetUnitName: [
            {
                required: true,
                message: ProdValidateConst.ASSET_UNIT_NAME_NOT_NULL,
                trigger: "blur"
            }
        ],
        status: [
            {
                required: true,
                message: ProdValidateConst.STATUS_NOT_NULL,
                trigger: "change"
            }
        ]
    };
    // 接受父组件的值
    @Prop({
        type: Object,
        required: false,
        default: () => ({})
    })
    private toChildMsg!: {
        dialogTitle: string;
        type: OperationTypeEnum;
        data: ProdAssetUnitRepVO;
    };

    private mounted() {
        this.dialogTitle = this.toChildMsg.dialogTitle;
        this.prodAssetUnitDetail = this.toChildMsg.data;
        if (this.toChildMsg.type === OperationTypeEnum.ADD) {
            this.showNo = false;
            this.dialogSumbitText = BaseConst.CONFIRM;
        }
        if (this.toChildMsg.type === OperationTypeEnum.DELETE) {
            this.allDisabled = true;
            this.dialogSumbitText = BaseConst.DELETE;
        }
        if (this.toChildMsg.type === OperationTypeEnum.UPDATE) {
            this.dialogSumbitText = BaseConst.CONFIRM;
        }
        if (this.toChildMsg.type === OperationTypeEnum.VIEW) {
            this.allDisabled = true;
            this.buttonShow = false;
        }
        this.dialogVisibleSon = true;
    }
    // 提交
    private submitDialog(formName: string) {
        this.$refs[formName].validate((valid: boolean) => {
            if (valid) {
                this.dialogLoading = true;
                if (this.toChildMsg.type === OperationTypeEnum.ADD) {
                    this.service
                        .insert(this.prodAssetUnitDetail)
                        .then((response: WinResponseData) => {
                            this.dialogMessage(response);
                        });
                }
                if (this.toChildMsg.type === OperationTypeEnum.UPDATE) {
                    this.service
                        .update(this.prodAssetUnitDetail)
                        .then((response: WinResponseData) => {
                            this.dialogMessage(response);
                        });
                }
                if (this.toChildMsg.type === OperationTypeEnum.DELETE) {
                    this.service
                        .delete(this.prodAssetUnitDetail.id)
                        .then((response: WinResponseData) => {
                            this.dialogMessage(response);
                        });
                }
            } else {
                this.win_message_error("表单验证未通过");
                return false;
            }
        });
    }

    // 消息
    private dialogMessage(response: WinResponseData) {
        this.dialogLoading = false;
        if (response.winRspType === WinRspType.ERROR) {
            this.win_message_error(response.msg);
        } else {
            this.win_message_success(response.msg);
            this.send(WinRspType.SUCC);
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
    private send(msg: WinRspType) {
        // tslint规范
    }
}

export const Const = {
    DELETE: "删除",
    CONFIRM: "确定"
};
