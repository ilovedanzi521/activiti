import { Component, Prop, Emit } from "vue-property-decorator";
import { WinResponseData } from "../../common/vo/BaseVO";
import { ProdSubConsignorRepVO } from "../vo/ProdSubConsignorVO";
import BaseController from "../../common/controller/BaseController";
import ProdSubConsignorDialogService from "../service/ProdSubConsignorDialogService";
import { WinRspType } from "../../common/enum/BaseEnum";
import { BaseConst } from "../../common/const/BaseConst";
import { OperationTypeEnum } from "../../common/enum/OperationTypeEnum";
import {
    ConsignorDicEntity,
    ProdConsignorVO
} from "../vo/ProdConsignorEntityVO";
import ProdConsignorService from "../service/ProdConsignorService";
import { ConsignorReqVO } from "../vo/ConsignorReqVO";
import { ProdConsignorConst } from "../const/ProdConsignorConst";
@Component
export default class ProdSubConsignorDialogController extends BaseController {
    public $refs: {
        validate: HTMLFormElement;
    };
    /**
     * 一级委托人service
     */
    private consignorService = new ProdConsignorService();
    /**
     * 二级委托人service
     */
    private service: ProdSubConsignorDialogService = new ProdSubConsignorDialogService();
    /**
     * 二级委托人实体
     */
    private prodSubConsignorDetail: ProdSubConsignorRepVO = new ProdSubConsignorRepVO();

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
    /**
     * 修改信息时字段是否置灰
     */
    private editDisabled: boolean = false;
    // 数据字典
    private subConsignorDicData: any = ConsignorDicEntity;

    /**
     * 一级委托人列表
     */
    private ProdConsignorVOs: ProdConsignorVO[] = [];

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
        consignorNo: [
            {
                required: true,
                message: ProdConsignorConst.CONSIGNOR_NO_NOT_NULL,
                trigger: "change"
            }
        ],
        no: [
            {
                required: true,
                message: ProdConsignorConst.NO_NOT_NULL,
                trigger: "blur"
            }
        ],
        name: [
            {
                required: true,
                message: ProdConsignorConst.NAME_NOT_NULL,
                trigger: "blur"
            }
        ],
        shortName: [
            {
                required: true,
                message: ProdConsignorConst.SHROT_NAME_NOT_NULL,
                trigger: "blur"
            }
        ],
        companyType: [
            {
                required: true,
                message: ProdConsignorConst.COMPANY_TYPE_NOT_NULL,
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
        data: ProdSubConsignorRepVO;
    };

    private mounted() {
        this.dialogTitle = this.toChildMsg.dialogTitle;
        this.prodSubConsignorDetail = this.toChildMsg.data;
        if (this.toChildMsg.type === OperationTypeEnum.ADD) {
            this.showNo = false;
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
        this.cacheSelectItems();
    }
    private cacheSelectItems() {
        // 获取一级委托人列表
        this.getProdConsignor();
    }

    private getProdConsignor() {
        const queryVo: ConsignorReqVO = new ConsignorReqVO();
        queryVo.reqPageSize = 10000;
        this.consignorService
            .findConsignorList(queryVo)
            .then((res: WinResponseData) => {
                if (res.winRspType === WinRspType.ERROR) {
                    this.win_message_error(res.msg);
                } else {
                    this.ProdConsignorVOs = res.data.list;
                }
            });
    }
    // 提交
    private submitDialog(formName: string) {
        this.$refs[formName].validate((valid: boolean) => {
            if (valid) {
                this.dialogLoading = true;
                if (this.toChildMsg.type === OperationTypeEnum.ADD) {
                    this.service
                        .insert(this.prodSubConsignorDetail)
                        .then((response: WinResponseData) => {
                            this.dialogMessage(response);
                        });
                }
                if (this.toChildMsg.type === OperationTypeEnum.UPDATE) {
                    this.service
                        .update(this.prodSubConsignorDetail)
                        .then((response: WinResponseData) => {
                            this.dialogMessage(response);
                        });
                }
                if (this.toChildMsg.type === OperationTypeEnum.DELETE) {
                    this.service
                        .delete(this.prodSubConsignorDetail.id)
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
