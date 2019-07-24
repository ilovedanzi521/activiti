import { Component, Emit, Prop } from "vue-property-decorator";
import { BaseConst } from "../../common/const/BaseConst";
import BaseController from "../../common/controller/BaseController";
import { WinRspType } from "../../common/enum/BaseEnum";
import { OperationTypeEnum } from "../../common/enum/OperationTypeEnum";
import { WinResponseData } from "../../common/vo/BaseVO";
import BondInfoService from "../../market/service/BondInfoService";
import { ValidateConst } from "../const/ValidateConst";
import InterestRateChangeInfoDialogService from "../service/InterestRateChangeInfoDialogService";
import { InterestRateChangeInfoRepVO } from "../vo/InterestRateChangeInfoVO";
import { ParamBondInfoRepVO } from "../vo/ParamBondRepVO";
import { ParamBondReqVO } from "../vo/ParamBondReqVO";
@Component
export default class InterestRateChangeInfoDialogController extends BaseController {
    public $refs: {
        validate: HTMLFormElement;
    };
    // 票面利率展示值
    private couponRate: string = "";
    /**
     * 利率service
     */
    private service: InterestRateChangeInfoDialogService = new InterestRateChangeInfoDialogService();
    /**
     * 利率实体
     */
    private InterestRateDetail: InterestRateChangeInfoRepVO = new InterestRateChangeInfoRepVO();
    /**
     * 债券信息service
     */
    private bondInfoService: BondInfoService = new BondInfoService();

    /** 时间控件 */
    // dateArray: Date[] = [];
    // 弹窗标题
    private dialogTitle: string = "";
    // 确定按钮或删除按钮标志
    private dialogSumbitText: string = "";
    // 字段样式
    private spanWidth: number = 12;
    /**
     * 修改信息时字段是否置灰
     */
    private editDisabled: boolean = false;
    /**
     * 所有字段是否置灰
     */
    private allDisabled: boolean = false;
    /**
     * 按钮是否显示
     */
    private buttonShow: boolean = true;

    private createLoading: boolean = false;
    private dialogLoading: boolean = false;
    /**
     * 证券内码下拉框
     */
    private securityCodes: ParamBondInfoRepVO[] = [];
    // 控制dialog显隐
    private dialogVisibleSon: boolean = false;
    // 校验规则
    private rules = {
        securityCode: [
            {
                required: true,
                message: ValidateConst.SECURITY_CODE_NOT_NULL,
                trigger: "change"
            }
        ],
        couponRate: [
            {
                required: true,
                message: ValidateConst.COUPON_RATE_NOT_NULL,
                trigger: "blur"
            }
        ],
        beginDate: [
            {
                required: true,
                message: ValidateConst.BEGIN_DATE_NOT_NULL,
                trigger: "blur"
            }
        ],
        endDate: [
            {
                required: true,
                message: ValidateConst.END_DATE_NOT_NULL,
                trigger: "blur"
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
        data: InterestRateChangeInfoRepVO;
    };

    private couponRateInput(value) {
        const len = value.length;
        const lastChar = value[len - 1];
        if (value.substr(0, len - 1).includes(".") && lastChar === ".") {
            this.InterestRateDetail.couponRate = value.substr(0, len - 1);
        } else {
            if (/(\d|\.)/.test(lastChar)) {
                this.InterestRateDetail.couponRate = value;
            } else {
                this.InterestRateDetail.couponRate = value.substr(0, len - 1);
            }
        }
    }

    private mounted() {
        this.dialogTitle = this.toChildMsg.dialogTitle;
        if (this.toChildMsg.type === OperationTypeEnum.ADD) {
            this.InterestRateDetail = new InterestRateChangeInfoRepVO();
            this.dialogSumbitText = BaseConst.CONFIRM;
        }
        if (this.toChildMsg.type === OperationTypeEnum.DELETE) {
            this.allDisabled = true;
            this.dialogSumbitText = BaseConst.DELETE;
            this.InterestRateDetail = this.toChildMsg.data;
        }
        if (this.toChildMsg.type === OperationTypeEnum.UPDATE) {
            this.editDisabled = true;
            this.dialogSumbitText = BaseConst.CONFIRM;
            this.InterestRateDetail = this.toChildMsg.data;
        }
        if (this.toChildMsg.type === OperationTypeEnum.VIEW) {
            this.allDisabled = true;
            this.buttonShow = false;
            this.InterestRateDetail = this.toChildMsg.data;
        }
        this.dialogVisibleSon = true;
    }

    // 查询Securitycode,在证券信息表所有为债券的数据（因为有多个日期，所以不需要排除本表数据）
    private getSecurityCode(queryString: string) {
        const queryVo: ParamBondReqVO = new ParamBondReqVO();
        queryVo.securityCode = queryString;
        // 债券的利率类型为浮动（码值为2）
        queryVo.rateType = "2";
        // 指定下拉框条数最多为10条
        queryVo.reqPageSize = 10;
        this.bondInfoService
            .findBondInfoByPage(queryVo)
            .then((response: WinResponseData) => {
                if (response.winRspType === WinRspType.ERROR) {
                    this.win_message_error(response.msg);
                } else {
                    this.securityCodes = response.data.list;
                }
            });
    }

    /**
     * 证券代码下拉框下拉触发事件
     */
    private visibleChangeTrigger(flag: boolean) {
        if (flag) {
            this.getSecurityCode(null);
        }
    }
    // 提交
    private submitDialog(formName: string) {
        this.$refs[formName].validate((valid: boolean) => {
            if (valid) {
                this.dialogLoading = true;
                if (
                    new Date(this.InterestRateDetail.endDate).getTime() -
                        new Date(this.InterestRateDetail.beginDate).getTime() <=
                    0
                ) {
                    this.win_message_error("结束日必须大于开始日！");
                    return;
                }
                if (this.toChildMsg.type === OperationTypeEnum.ADD) {
                    this.service
                        .insert(this.InterestRateDetail)
                        .then((response: WinResponseData) => {
                            this.dialogMessage(response);
                        });
                }
                if (this.toChildMsg.type === OperationTypeEnum.UPDATE) {
                    this.service
                        .update(this.InterestRateDetail)
                        .then((response: WinResponseData) => {
                            this.dialogMessage(response);
                        });
                }
                if (this.toChildMsg.type === OperationTypeEnum.DELETE) {
                    this.service
                        .delete(this.InterestRateDetail.id)
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
