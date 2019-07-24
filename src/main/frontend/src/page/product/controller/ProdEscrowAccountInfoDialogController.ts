/****************************************************
 * 创建人：     @author zoujian
 * 创建时间: 2019年7月6日/下午5:52:56
 * 项目名称：  FRONTEND
 * 文件名称: FundDialogController
 * 文件描述: @Description: (托管账户增删改页面Controller)
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/
import BaseController from "../../common/controller/BaseController";
import { Component, Prop, Emit } from "vue-property-decorator";
import { OperationTypeEnum } from "../../common/enum/OperationTypeEnum";
import {
    ProdEscrowAccountInfoRepVO,
    ProdEscrowAccountInfoReqVO
} from "../vo/ProdEscrowAccountInfoVO";
import ProdEscrowAccountInfoDic from "../vo/ProdEscrowAccountInfoDic";
import { WinRspType } from "../../common/enum/BaseEnum";
import { BaseConst } from "../../common/const/BaseConst";
import { WinResponseData } from "../../common/vo/BaseVO";
import ProdEscrowAccountInfoDialogService from "../service/ProdEscrowAccountInfoDialogService";
import { DicRepVO, DicReqVO } from "../../dictionary/vo/DicVO";
import { ProdValidateConst } from "../const/ProdValidateConst";
import DicService from "../../dictionary/service/DicService";
import ProdAssetUnitService from "../service/ProdAssetUnitService";
import { ProdAssetUnitReqVO } from "../vo/ProdAssetUnitVO";

@Component
export default class ProdEscrowAccountInfoDialogController extends BaseController {
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
        data: ProdEscrowAccountInfoRepVO;
        dicVOList: ProdEscrowAccountInfoDic;
    };
    private prodEscrowAccountInfoDialogService: ProdEscrowAccountInfoDialogService = new ProdEscrowAccountInfoDialogService();
    private dicService: DicService = new DicService();
    /** 资产单元service */
    private prodAssetUnitService: ProdAssetUnitService = new ProdAssetUnitService();
    private prodEscrowAccountInfo: ProdEscrowAccountInfoRepVO = new ProdEscrowAccountInfoRepVO();
    private spanWidth: number = 12;
    private dicVOList: ProdEscrowAccountInfoDic = new ProdEscrowAccountInfoDic();
    private createLoading: boolean = false;
    private dialogVisible: boolean = true;
    private dialogLoading: boolean = false;
    private operationShow: boolean = true;
    private fundInfoDisabled: boolean = true;
    private dialogTitle: string = "";
    private dialogSumbitText: string = "";
    private securityCodeDisabaled: boolean = false;
    private formDisabled: boolean = false;
    private unitNoList: any[] = [];
    private rules = {
        accountType: [
            {
                required: true,
                message: ProdValidateConst.ACCOUNT_TYPE_NOT_NULL,
                trigger: "change"
            }
        ],
        accountCode: [
            {
                required: true,
                message: ProdValidateConst.ACCOUNT_NUMBER_NOT_NULL,
                trigger: "blur"
            }
        ],
        accountName: [
            {
                required: true,
                message: ProdValidateConst.CASH_ACCOUNT_NAME_NOT_NULL,
                trigger: "blur"
            }
        ],
        currencyCode: [
            {
                required: true,
                message: ProdValidateConst.CURRENCY_CODE_NOT_NULL,
                trigger: "change"
            }
        ],
        assetUnitNo: [
            {
                required: true,
                message: ProdValidateConst.ASSET_UNIT_NO_NOT_NULL,
                trigger: "blur"
            }
        ]
    };

    private mounted() {
        this.prodEscrowAccountInfo = this.toChildMsg.data;
        this.dialogTitle = this.toChildMsg.dialogTitle;
        if (this.toChildMsg.type === OperationTypeEnum.ADD) {
            this.dialogSumbitText = BaseConst.CONFIRM;
        }
        if (this.toChildMsg.type === OperationTypeEnum.DELETE) {
            this.dialogSumbitText = BaseConst.DELETE;
            this.prodEscrowAccountInfo = this.toChildMsg.data;
            this.formDisabled = true;
        }
        if (this.toChildMsg.type === OperationTypeEnum.UPDATE) {
            this.dialogSumbitText = BaseConst.CONFIRM;
            this.prodEscrowAccountInfo = this.toChildMsg.data;
            this.securityCodeDisabaled = true;
        }
        if (this.toChildMsg.type === OperationTypeEnum.VIEW) {
            this.operationShow = false;
            this.prodEscrowAccountInfo = this.toChildMsg.data;
            this.formDisabled = true;
        }
        this.dicVOList = this.toChildMsg.dicVOList;
        /** 资产单元初始化 */
        const prodAssetUnitReqVO = new ProdAssetUnitReqVO();
        prodAssetUnitReqVO.fundNo = this.toChildMsg.data.fundNo;
        this.getAssetUnitInfo(prodAssetUnitReqVO);
    }

    private dialogCancel() {
        this.send(WinRspType.CANCEL);
    }

    private closeDialog() {
        this.send(WinRspType.CANCEL);
    }

    /**
     * 获取资产单元信息
     * @param queryVo
     */
    private getAssetUnitInfo(queryVo: ProdAssetUnitReqVO) {
        this.prodAssetUnitService.list(queryVo).then((res: WinResponseData) => {
            if (res.winRspType === WinRspType.ERROR) {
                this.win_message_error(res.msg);
            } else {
                this.unitNoList = res.data.list;
            }
        });
    }

    /**
     * 提交
     */
    private submitDialog() {
        const prodEscrowAccountInfo = "prodEscrowAccountInfo";
        const el: any = this.$refs[prodEscrowAccountInfo];
        el.validate((valid: boolean) => {
            if (valid) {
                this.dialogLoading = true;
                if (this.toChildMsg.type === OperationTypeEnum.ADD) {
                    this.prodEscrowAccountInfoDialogService
                        .insert(this.prodEscrowAccountInfo)
                        .then((response: WinResponseData) => {
                            this.dialogMessage(response);
                        });
                }
                if (this.toChildMsg.type === OperationTypeEnum.UPDATE) {
                    this.prodEscrowAccountInfoDialogService
                        .update(this.prodEscrowAccountInfo)
                        .then((response: WinResponseData) => {
                            this.dialogMessage(response);
                        });
                }
                if (this.toChildMsg.type === OperationTypeEnum.DELETE) {
                    this.prodEscrowAccountInfoDialogService
                        .del(this.prodEscrowAccountInfo.escrowAccountNo)
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

    /** 数据字典映射 */
    private formatDic(row, column, cellValue) {
        if (column.property === "accountType") {
            return this.getLabelFromDic(
                row.fundType,
                this.dicVOList.accountTypeDic
            );
        }
    }

    private getLabelFromDic(str: string, dicArray: DicRepVO[]) {
        let value = "";
        for (const dic of dicArray) {
            if (dic.dicCode === str) {
                value = dic.dicExplain;
                break;
            }
        }
        return value;
    }

    @Emit("bindSend")
    private send(msg: WinRspType) {}
}
