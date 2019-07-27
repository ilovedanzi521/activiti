import { Component, Prop, Emit } from "vue-property-decorator";
import BaseController from "../../common/controller/BaseController";
import ParamFundValueService from "../service/ParamFundValueService";
import {
    ParamFundValueReqVO,
    ParamFundValueRepVO
} from "../vo/ParamFundValueVO";
import { DicReqVO, DicRepVO } from "../../dictionary/vo/DicVO";
import DicService from "../../dictionary/service/DicService";
import { WinResponseData } from "../../common/vo/BaseVO";
import { WinRspType } from "../../common/enum/BaseEnum";
import { ValidateConst } from "../const/ValidateConst";
import numberUtils from "../../common/util/NumberUtils";
import { BaseConst } from "../../common/const/BaseConst";
import { MessageConst } from "../const/MessageConst";
import { OperationTypeEnum } from "../../common/enum/OperationTypeEnum";

@Component
export default class FundValueDialogController extends BaseController {
    @Prop({
        type: Object,
        required: false,
        default: () => ({})
    })
    public toChildMsg!: {
        dialogTitle: string;
        type: string;
        data: ParamFundValueRepVO;
    };

    /** 表单验证 */
    public rules = {
        securityCode: [
            {
                required: true,
                message: ValidateConst.SECURITY_CODE_NOT_NULL,
                trigger: "change"
            }
        ],
        priceDate: [
            {
                required: true,
                message: ValidateConst.PRICE_DATE_NOT_NULL,
                trigger: "change"
            }
        ],
        cleanPrice: [
            {
                required: true,
                message: ValidateConst.CLEAN_PRICE_NOT_NULL,
                trigger: "change"
            }
        ],
        unitCleanPrice: [
            {
                pattern: /^[0-9]+(.[0-9]{1,4})?$/,
                message: ValidateConst.NUMBERS_GREATER_THAN_OR_EQUAL_0,
                trigger: "blur"
            }
        ],
        unitSumPrice: [
            {
                pattern: /^[0-9]+(.[0-9]{1,4})?$/,
                message: ValidateConst.NUMBERS_GREATER_THAN_OR_EQUAL_0,
                trigger: "blur"
            }
        ],
        intradayEarn: [
            {
                pattern: /^[0-9]+(.[0-9]{1,4})?$/,
                message: ValidateConst.NUMBERS_GREATER_THAN_OR_EQUAL_0,
                trigger: "blur"
            }
        ],
        sevenDayEarn: [
            {
                pattern: /^[0-9]+(.[0-9]{1,4})?$/,
                message: ValidateConst.NUMBERS_GREATER_THAN_OR_EQUAL_0,
                trigger: "blur"
            }
        ]
    };
    public $refs: {
        validate: HTMLFormElement;
    };
    private service: ParamFundValueService = new ParamFundValueService();
    /** 查询参数 */
    private form: ParamFundValueReqVO = new ParamFundValueReqVO();
    private form1: ParamFundValueReqVO = new ParamFundValueReqVO();
    /** 查询返回发行人列表 */
    private repVOs: ParamFundValueRepVO[] = [];
    /** 新增、保存对象 */
    private fundValueVO: ParamFundValueRepVO = new ParamFundValueRepVO();

    private fundValueList: ParamFundValueRepVO[] = [];

    private tableData: ParamFundValueRepVO[] = [];

    private value = {
        name: String,
        sex: Number,
        grade: String,
        jointime: String
    };

    private multipleSelection: [];
    private dialogVisible: boolean = true;

    private dialogFormVisible: boolean = false;
    private createFundValue: ParamFundValueRepVO = new ParamFundValueRepVO();
    private dialogTitle: string = "";
    private dialogSumbitText: string = "";
    private isCreate: boolean = false;
    private isDelete: boolean = false;
    private isEdit: boolean = false;
    private dialogLoading: boolean = false;
    private securityCodes = [];
    private dicService: DicService = new DicService();
    private securityCodeDisabaled: boolean = false;
    private formDisabled: boolean = false;
    // 按钮是否显示
    private buttonShow: boolean = true;

    private sevenDayEarn: string = "";

    private mounted() {
        this.createFundValue = new ParamFundValueRepVO();
        this.dialogTitle = this.toChildMsg.dialogTitle;
        if (this.toChildMsg.type === OperationTypeEnum.ADD) {
            this.dialogSumbitText = Const.CONFIRM;
            this.isCreate = false;
        }
        if (this.toChildMsg.type === OperationTypeEnum.DELETE) {
            this.dialogSumbitText = Const.DELETE;
            this.createFundValue = this.toChildMsg.data;
            this.isCreate = true;
            this.isDelete = true;
            this.formDisabled = true;
            this.securityCodeDisabaled = true;
        }
        if (this.toChildMsg.type === OperationTypeEnum.UPDATE) {
            this.dialogSumbitText = Const.CONFIRM;
            this.createFundValue = this.toChildMsg.data;
            this.isCreate = true;
            this.isDelete = false;
            this.securityCodeDisabaled = true;
        }
        if (this.toChildMsg.type === OperationTypeEnum.VIEW) {
            this.createFundValue = this.toChildMsg.data;
            this.formDisabled = true;
            this.securityCodeDisabaled = true;
            this.buttonShow = false;
        }
        this.dialogVisible = true;
    }

    /** 下拉数据 */
    private listAll(queryString, cb) {
        this.service.pullFundValueList().then((response: WinResponseData) => {
            if (response.winRspType === "ERROR") {
                this.errorMessage(response.msg);
            } else {
                const list = response.data.list;
                this.filter(list, cb, queryString);
            }
        });
    }
    // 证券代码下拉选择处理
    private handleSelect(item) {
        this.createFundValue.securityCode = item.key;
    }
    private filter(list, cb, queryString) {
        const array = [];
        if (list.length > 0) {
            list.forEach((element: ParamFundValueRepVO) => {
                const ob = { value: "", key: "" };
                ob.key = element.securityCode;
                ob.value =
                    element.securityCode + "(" + element.securityName + ")";
                array.push(ob);
            });
        }
        const results = queryString
            ? array.filter(this.createFilter(queryString))
            : array;
        // 调用 callback 返回建议列表的数据
        cb(results);
    }
    private createFilter(queryString) {
        return (res: any) => {
            return (
                res.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
            );
        };
    }
    /** 按钮 */
    private submitDialog() {
        const create = "create";
        const el: any = this.$refs[create];
        el.validate((valid: boolean) => {
            if (valid) {
                this.dialogLoading = true;
                if (this.toChildMsg.type === OperationTypeEnum.ADD) {
                    const copyCreateFundValue = this.copy(this.createFundValue);
                    // this.divideBy100(copyCreateFundValue);
                    this.service
                        .insert(copyCreateFundValue)
                        .then((response: WinResponseData) => {
                            this.dialogMessage(response);
                        });
                }
                if (this.toChildMsg.type === OperationTypeEnum.UPDATE) {
                    const copyCreateFundValue = this.copy(this.createFundValue);
                    // this.divideBy100(copyCreateFundValue);
                    this.service
                        .update(copyCreateFundValue)
                        .then((response: WinResponseData) => {
                            this.dialogMessage(response);
                        });
                }

                if (this.toChildMsg.type === OperationTypeEnum.DELETE) {
                    this.service
                        .delete(this.createFundValue.id)
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
            this.win_message_info(response.msg);
            this.send(WinRspType.SUCC);
        }
    }
    /** 多选时选择事件监听 */
    private handleSelectionChange(val) {
        this.multipleSelection = val;
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
        //
    }
}
export const Const = {
    DELETE: "删除",
    CONFIRM: "确定"
};
