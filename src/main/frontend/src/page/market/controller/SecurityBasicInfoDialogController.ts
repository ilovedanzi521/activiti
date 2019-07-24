import { Component, Emit, Prop } from "vue-property-decorator";
import { BaseConst } from "../../common/const/BaseConst";
import BaseController from "../../common/controller/BaseController";
import { WinRspType } from "../../common/enum/BaseEnum";
import { OperationTypeEnum } from "../../common/enum/OperationTypeEnum";
import { WinResponseData } from "../../common/vo/BaseVO";
import ExchangeRateService from "../../currency/service/ExchangeRateService";
import DicService from "../../dictionary/service/DicService";
import MarketService from "../../market/service/MarketService";
import ParamPublisherService from "../../publisher/service/ParamPublisherService";
import { ValidateConst } from "../const/ValidateConst";
import SecurityBasicInfoDialogService from "../service/SecurityBasicInfoDialogService";
import SecurityBasicInfoService from "../service/SecurityBasicInfoService";
import { SecurityTypeRepVO } from "../vo/ParamMarketVO";
import { SecurityBasicInfoEntity } from "../vo/SecurityBasicInfoEntity";
import {
    SecurityBasicInfoRepVO,
    SecurityBasicInfoReqVO
} from "../vo/SecurityBasicInfoVO";
@Component
export default class SecurityBasicInfoDialogController extends BaseController {
    public $refs: {
        validate: HTMLFormElement;
    };
    // 涨停比例展示值
    private upLimitRatio: string = "";
    // 跌停比例展示值
    private downLimitRatio: string = "";
    // 网上预估中签率展示值
    private onlineEstimatedWinningRate: string = "";
    /**
     * 字典service
     */
    private dicService: DicService = new DicService();
    /**
     * 证券弹窗service
     */
    private service: SecurityBasicInfoDialogService = new SecurityBasicInfoDialogService();
    /**
     * 证券基础信息service
     */
    private securityBasicInfoService: SecurityBasicInfoService = new SecurityBasicInfoService();
    /**
     * 货币service,用来取币种
     */
    private exchangeRateService: ExchangeRateService = new ExchangeRateService();
    /**
     * 发行人service,用来取发行人
     */
    private paramPublisherService: ParamPublisherService = new ParamPublisherService();
    /**
     * 交易市场service,用来取证券类别和资产类别
     */
    private marketService: MarketService = new MarketService();
    /**
     * 证券实体
     */
    private createSecurity: SecurityBasicInfoRepVO = new SecurityBasicInfoRepVO();

    // 弹窗标题
    private dialogTitle: string = "";
    // 确定按钮或删除按钮标志
    private dialogSumbitText: string = "";
    private dialogLoading: boolean = false;
    // 控制dialog显隐
    private dialogVisibleSon: boolean = false;

    /**
     * 标准券
     */
    private standardSecuritys: SecurityBasicInfoRepVO[] = [];

    // 数据字典
    private securityBasicInfoDicData: any = SecurityBasicInfoEntity;

    // 字段样式
    private spanWidth: number = 8;
    // 控制字段是否置灰
    /**
     * 修改信息时字段是否置灰
     */
    private editDisabled: boolean = false;
    /**
     * 所有字段是否置灰
     */
    private allDisabled: boolean = false;
    private createLoading: boolean = false;
    /**
     * 按钮是否显示
     */
    private buttonShow: boolean = true;
    // 校验规则
    private rules = {
        reportCode: [
            {
                required: true,
                message: ValidateConst.REPORT_CODE_NOT_NULL,
                trigger: "blur"
            }
        ],
        securityCode: [
            {
                required: true,
                message: ValidateConst.SECURITY_CODE_NOT_NULL,
                trigger: "change"
            }
        ],
        securityName: [
            {
                required: true,
                message: ValidateConst.SECURITY_NAME_NOT_NULL,
                trigger: "blur"
            }
        ],
        securityFullName: [
            {
                required: true,
                message: ValidateConst.SECURITY_FULL_NAME_NOT_NULL,
                trigger: "blur"
            }
        ],
        securityType: [
            {
                required: true,
                message: ValidateConst.SECURITY_TYPE_NOT_NULL,
                trigger: "blur"
            }
        ],
        assetType: [
            {
                required: true,
                message: ValidateConst.ASSET_TYPE_NOT_NULL,
                trigger: "blur"
            }
        ],
        assetSecurity: [
            {
                required: true,
                message: ValidateConst.ASSET_SECURITY_NOT_NULL,
                trigger: "blur"
            }
        ],
        relatedSecurity: [
            {
                required: true,
                message: ValidateConst.RELATED_SECURITY_NOT_NULL,
                trigger: "blur"
            }
        ],
        transCurrency: [
            {
                required: true,
                message: ValidateConst.TRANS_CURRENCY_NOT_NULL,
                trigger: "change"
            }
        ],
        faceValue: [
            {
                required: true,
                message: ValidateConst.FACE_VALUE_NOT_NULL,
                trigger: "blur"
            }
        ],
        longDelist: [
            {
                required: true,
                message: ValidateConst.LONG_DELIST_NOT_NULL,
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
        data: SecurityBasicInfoRepVO;
    };

    private mounted() {
        this.dialogTitle = this.toChildMsg.dialogTitle;
        this.createSecurity = this.toChildMsg.data;
        if (this.toChildMsg.type === OperationTypeEnum.ADD) {
            this.dialogSumbitText = BaseConst.CONFIRM;
        }
        if (this.toChildMsg.type === OperationTypeEnum.DELETE) {
            this.allDisabled = true;
            this.dialogSumbitText = BaseConst.DELETE;
        }
        if (this.toChildMsg.type === OperationTypeEnum.UPDATE) {
            this.editDisabled = true;
            this.dialogSumbitText = BaseConst.CONFIRM;
        }
        if (this.toChildMsg.type === OperationTypeEnum.VIEW) {
            this.allDisabled = true;
            this.buttonShow = false;
        }
        this.dialogVisibleSon = true;
    }

    /**
     * 标准券下拉框下拉触发事件
     */
    private visibleChangeTrigger(flag: boolean) {
        if (flag) {
            this.getStandardSecurity(null);
        }
    }

    // 获取标准券列表
    private getStandardSecurity(queryString: string) {
        const queryVo: SecurityBasicInfoReqVO = new SecurityBasicInfoReqVO();
        queryVo.securityCode = queryString;
        // 指定下拉框条数最多为10条
        queryVo.reqPageSize = 10;
        this.securityBasicInfoService
            .list(queryVo)
            .then((response: WinResponseData) => {
                if (response.winRspType === WinRspType.ERROR) {
                    this.win_message_error(response.msg);
                } else {
                    this.standardSecuritys = response.data.list;
                }
            });
    }

    /** 根据申报代码生成证券内码：生成规则：申报代码+"."+交易市场代码 */
    private setSecurityCode() {
        // TODO 目前交易市场代码取不到，默认使用SH（上交所）
        this.createSecurity.securityCode = this.createSecurity.reportCode
            ? this.createSecurity.reportCode + ".SH"
            : "";
    }
    // 选中证券类别，带出资产类别
    private changeSecurityType(securityType: string) {
        if (securityType === "") {
            this.createSecurity.assetType = "";
        }
        this.securityBasicInfoDicData.securityType.forEach(
            (element: SecurityTypeRepVO) => {
                if (element.securityType === securityType) {
                    this.createSecurity.assetType = element.assetType;
                }
            }
        );
    }

    // 提交
    private submitDialog(formName: string) {
        this.$refs[formName].validate((valid: boolean) => {
            if (valid) {
                this.dialogLoading = true;
                if (
                    this.createSecurity.listDate &&
                    this.createSecurity.issueDate &&
                    new Date(this.createSecurity.listDate).getTime() -
                        new Date(this.createSecurity.issueDate).getTime() <=
                        0
                ) {
                    this.win_message_error("上市日期必须大于发行日期！");
                    return;
                }
                if (
                    this.createSecurity.negotiableCapital &&
                    this.createSecurity.sharesOutstanding &&
                    this.createSecurity.negotiableCapital -
                        this.createSecurity.sharesOutstanding >
                        0
                ) {
                    this.win_message_error("流通股本不能大于总股本！");
                    return;
                }
                // 取不到值，暂时给个默认值
                this.createSecurity.marketCode = "SH";
                if (this.toChildMsg.type === OperationTypeEnum.ADD) {
                    this.service
                        .insert(this.createSecurity)
                        .then((response: WinResponseData) => {
                            this.dialogMessage(response);
                        });
                }
                if (this.toChildMsg.type === OperationTypeEnum.UPDATE) {
                    this.service
                        .update(this.createSecurity)
                        .then((response: WinResponseData) => {
                            this.dialogMessage(response);
                        });
                }
                if (this.toChildMsg.type === OperationTypeEnum.DELETE) {
                    this.service
                        .delete(this.createSecurity.id)
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
