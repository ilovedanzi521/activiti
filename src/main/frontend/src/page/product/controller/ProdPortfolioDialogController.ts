import { Component, Prop, Emit } from "vue-property-decorator";
import { WinResponseData } from "../../common/vo/BaseVO";
import { ProdPortfolioRepVO } from "../vo/ProdPortfolioVO";
import BaseController from "../../common/controller/BaseController";
import ProdPortfolioDialogService from "../service/ProdPortfolioDialogService";
import { WinRspType } from "../../common/enum/BaseEnum";
import { BaseConst } from "../../common/const/BaseConst";
import { ProdValidateConst } from "../const/ProdValidateConst";
import { OperationTypeEnum } from "../../common/enum/OperationTypeEnum";
import ProdAssetUnitService from "../service/ProdAssetUnitService";
import { ProdAssetUnitRepVO, ProdAssetUnitReqVO } from "../vo/ProdAssetUnitVO";
import DicService from "../../dictionary/service/DicService";
import { ProdPortfolioEntity } from "../vo/ProdPortfolioEntity";
import ProdPortfolioTransfer from "../view/ProdPortfolioTransfer.vue";
import {
    SecurityTypeRepVO,
    TransactionDirectionRepVO
} from "../../market/vo/ParamMarketVO";
@Component({
    components: { ProdPortfolioTransfer }
})
export default class ProdPortfolioDialogController extends BaseController {
    public $refs: {
        validate: HTMLFormElement;
    };
    /**
     * 资产单元service
     */
    private prodAssetUnitService: ProdAssetUnitService = new ProdAssetUnitService();
    /**
     * 投资组合service
     */
    private service: ProdPortfolioDialogService = new ProdPortfolioDialogService();
    /**
     * 字典service
     */
    private dicService: DicService = new DicService();
    /**
     * 投资组合实体
     */
    private prodPortfolioDetail: ProdPortfolioRepVO = new ProdPortfolioRepVO();

    private statuss = [
        { dicCode: "1", dicExplain: "正常" },
        { dicCode: "2", dicExplain: "过期" }
    ];

    // 数据字典
    private portfolioDicData: any = ProdPortfolioEntity;

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

    // 控制Transfer显隐
    private transferVisible: boolean = false;
    /**
     * 资产单元
     */
    private prodAssetUnitRepVOs: ProdAssetUnitRepVO[] = [];

    /**
     * 资金账号
     */
    private cashAccountNumber = [];

    // 根据交易市场过滤后的证券类别
    private filterSecurityType: SecurityTypeRepVO[] = [];

    // 根据证券类别过滤后的交易方向
    private filterTransactionDirection: TransactionDirectionRepVO[] = [];

    // Transfer显示的信息
    private cardNumber: {
        columnName: string;
        type: OperationTypeEnum;
        data: ProdPortfolioRepVO;
        filterSecurityType: SecurityTypeRepVO[];
        filterTransactionDirection: TransactionDirectionRepVO[];
    };

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
        assetUnitName: [
            {
                required: true,
                message: ProdValidateConst.ASSET_UNIT_NAME_NOT_NULL,
                trigger: "change"
            }
        ],
        no: [
            {
                required: true,
                message: ProdValidateConst.NO_NOT_NULL,
                trigger: "blur"
            }
        ],
        portfolioName: [
            {
                required: true,
                message: ProdValidateConst.PORTFOLIO_NAME_NOT_NULL,
                trigger: "blur"
            }
        ],
        cashAccountNumber: [
            {
                required: true,
                message: ProdValidateConst.CASH_ACCOUNT_NUMBER_NOT_NULL,
                trigger: "change"
            }
        ],
        portfolioType: [
            {
                required: true,
                message: ProdValidateConst.PORTFOLIO_TYPE_NOT_NULL,
                trigger: "change"
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
        data: ProdPortfolioRepVO;
    };

    private mounted() {
        this.dialogTitle = this.toChildMsg.dialogTitle;
        this.prodPortfolioDetail = this.toChildMsg.data;
        if (this.toChildMsg.type === OperationTypeEnum.ADD) {
            this.showNo = false;
            this.dialogSumbitText = BaseConst.CONFIRM;
        }
        if (this.toChildMsg.type === OperationTypeEnum.DELETE) {
            this.editDisabled = true;
            this.allDisabled = true;
            this.dialogSumbitText = BaseConst.DELETE;
        }
        if (this.toChildMsg.type === OperationTypeEnum.UPDATE) {
            this.editDisabled = true;
            this.dialogSumbitText = BaseConst.CONFIRM;
        }
        if (this.toChildMsg.type === OperationTypeEnum.VIEW) {
            this.editDisabled = true;
            this.allDisabled = true;
            this.buttonShow = false;
        }
        this.dialogVisibleSon = true;
        this.cacheSelectItems();
        // 初始化穿梭框
        this.setTransferAllItem();
    }

    private cacheSelectItems() {
        // 获取资产单元列表
        this.getProdAssetUnits();
    }

    // 只查询该产品下的资产单元
    private getProdAssetUnits() {
        const queryVo: ProdAssetUnitReqVO = new ProdAssetUnitReqVO();
        queryVo.fundNo = this.prodPortfolioDetail.fundNo;
        this.prodAssetUnitService
            .list(queryVo)
            .then((winResponseData: WinResponseData) => {
                if (winResponseData.winRspType === WinRspType.ERROR) {
                    this.win_message_error(winResponseData.msg);
                } else {
                    this.prodAssetUnitRepVOs = winResponseData.data.list;
                }
            });
    }

    // 根据资产单元过滤资金账号
    private setCashAccountNumber() {
        this.cashAccountNumber = this.portfolioDicData.cashAccountNumber.filter(
            (item: any) => {
                return (
                    item.assetUnitNo === this.prodPortfolioDetail.assetUnitNo
                );
            }
        );
    }

    // 初始化穿梭框
    private setTransferAllItem() {
        // 没有选中交易市场时，无需初始化
        if (
            !this.prodPortfolioDetail.permitMarketCodes ||
            this.prodPortfolioDetail.permitMarketCodes === ""
        ) {
            return;
        }
        this.prodPortfolioDetail.permitMarketCodeArray = this.split(
            this.prodPortfolioDetail.permitMarketCodes
        );
        this.setPermitSecurityTypes(false);
    }

    // 交易市场权限下拉框隐藏时时调用,visibleFlag为false
    private setPermitSecurityTypes(visibleFlag: boolean) {
        if (!visibleFlag) {
            // 填充证券类别穿梭框
            this.filterSecurityType = this.portfolioDicData.tradeRule.filter(
                this.filterSecurityTypesByMarketCode().bind(this)
            );
            // 去掉重复的证券类别(因为证券类别会有交易平台的不同，所以会有重复数据)
            this.filterSecurityType = this.uniqueSecurityType(
                this.filterSecurityType
            );
            // 修改证券类别权限的选中项
            this.changeSecurityTypecheckItem();
            // 修改证券类别权限后调用
            this.setpermitTransactionDirections();
        }
    }

    // 修改证券类别权限后调用
    private setpermitTransactionDirections() {
        // 根据已选中的证券类别修改交易方向权限的选中项和填充交易权限穿梭框
        this.setTransactionDirectionsCommon();
    }

    // 根据已选中的证券类别修改交易方向权限的选中项和填充交易权限穿梭框
    private setTransactionDirectionsCommon() {
        // 根据证券类别代码拿到证券类别VO
        const filterSecurityType: SecurityTypeRepVO[] = this.portfolioDicData.tradeRule
            .filter(this.filterSecurityTypesByMarketCode().bind(this))
            .filter(
                this.filterSecurityTypes(
                    this.split(this.prodPortfolioDetail.permitSecurityTypes)
                ).bind(this)
            );
        // 取出该证券类别下的交易方向
        let tempTransactionDirections: string[] = [];
        filterSecurityType.forEach((item: SecurityTypeRepVO) => {
            if (
                item.transactionDirections &&
                item.transactionDirections.length > 0
            ) {
                tempTransactionDirections = tempTransactionDirections.concat(
                    this.split(item.transactionDirections)
                );
            }
        });
        // 去掉重复数据
        tempTransactionDirections = Array.from(
            new Set(tempTransactionDirections)
        );

        // 修改交易方向权限的选中项
        this.changeTransactionDirectioncheckItem(tempTransactionDirections);

        // 填充交易方向穿梭框（根据交易方向code获取交易方向名称）
        this.filterTransactionDirection = this.portfolioDicData.transactionDirection.filter(
            this.filterTransactionDirections(tempTransactionDirections).bind(
                this
            )
        );
    }

    // 根据交易市场过滤证券类别
    private filterSecurityTypesByMarketCode() {
        return (res: any) => {
            return (
                this.prodPortfolioDetail.permitMarketCodeArray.indexOf(
                    res.marketCode
                ) >= 0
            );
        };
    }

    // 去掉重复的证券类别(因为证券类别会有交易平台的不同，所以会有重复数据),合并交易方向
    private uniqueSecurityType(filterSecurityType: SecurityTypeRepVO[]) {
        const tempUnique: SecurityTypeRepVO[] = filterSecurityType
            .map((item: SecurityTypeRepVO) => {
                const i = filterSecurityType.find(
                    (itemNew: SecurityTypeRepVO) =>
                        item.securityType === itemNew.securityType
                );
                if (i !== item) {
                    i.transactionDirections += "," + item.transactionDirections;
                    return undefined;
                } else {
                    return i;
                }
            })
            .filter((item: SecurityTypeRepVO) => item);
        return tempUnique;
    }

    // 修改证券类别权限的选中项
    private changeSecurityTypecheckItem() {
        this.prodPortfolioDetail.permitSecurityTypes = this.split(
            this.prodPortfolioDetail.permitSecurityTypes
        )
            .filter(
                this.filterSecurityTypesCheckItem(this.filterSecurityType).bind(
                    this
                )
            )
            .join(",");
    }

    // 根据证券类别过滤交易方向
    private filterTransactionDirections(tempTransactionDirections: string[]) {
        return (res: any) => {
            return tempTransactionDirections.some((item: string) => {
                return item === res.transactionDirection;
            });
        };
    }

    // 根据证券类别代码拿到证券类别VO
    private filterSecurityTypes(permitSecurityTypesArray: string[]) {
        return (res: any) => {
            return permitSecurityTypesArray.some((item: string) => {
                return item === res.securityType;
            });
        };
    }

    // 根据交易市场权限修改选中的证券类别
    private filterSecurityTypesCheckItem(
        filterSecurityType: SecurityTypeRepVO[]
    ) {
        return (res: any) => {
            return filterSecurityType.some((item: SecurityTypeRepVO) => {
                return item.securityType === res;
            });
        };
    }

    // 修改交易方向权限的选中项
    private changeTransactionDirectioncheckItem(
        tempTransactionDirections: string[]
    ) {
        this.prodPortfolioDetail.permitTransactionDirections = tempTransactionDirections
            .filter(
                this.filterTransactionDirectionsCheckItem(
                    this.prodPortfolioDetail.permitTransactionDirections
                ).bind(this)
            )
            .join(",");
    }

    // 根据交易方向权限修改选中的交易方向
    private filterTransactionDirectionsCheckItem(
        permitTransactionDirections: string
    ) {
        return (res: any) => {
            return this.split(permitTransactionDirections).some(
                (item: string) => {
                    return item === res;
                }
            );
        };
    }

    // 提交
    private submitDialog(formName: string) {
        this.$refs[formName].validate((valid: boolean) => {
            if (valid) {
                if (
                    this.prodPortfolioDetail.permitTransactionDirections === ""
                ) {
                    this.win_message_box_warning(
                        "交易方向权限为空，该组合无法进行任何的投资交易，是否继续?",
                        "提示"
                    ).then(() => {
                        this.dialogLoading = true;
                        if (this.toChildMsg.type === OperationTypeEnum.ADD) {
                            this.preSubmit();
                            this.service
                                .insert(this.prodPortfolioDetail)
                                .then((response: WinResponseData) => {
                                    this.dialogMessage(response);
                                });
                        }
                        if (this.toChildMsg.type === OperationTypeEnum.UPDATE) {
                            this.preSubmit();
                            this.service
                                .update(this.prodPortfolioDetail)
                                .then((response: WinResponseData) => {
                                    this.dialogMessage(response);
                                });
                        }
                        if (this.toChildMsg.type === OperationTypeEnum.DELETE) {
                            this.service
                                .delete(this.prodPortfolioDetail.id)
                                .then((response: WinResponseData) => {
                                    this.dialogMessage(response);
                                });
                        }
                    });
                }
            } else {
                this.win_message_error("表单验证未通过");
                return false;
            }
        });
    }
    // 提交前处理数据
    private preSubmit() {
        // 交易市场权限多选框的值是数组，需要转换为string
        this.prodPortfolioDetail.permitMarketCodes = this.prodPortfolioDetail.permitMarketCodeArray.join(
            ","
        );
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

    // 创建Transfer
    private createTransfer(columnName) {
        this.cardNumber = {
            columnName,
            type: this.toChildMsg.type,
            data: this.prodPortfolioDetail,
            filterSecurityType: this.filterSecurityType,
            filterTransactionDirection: this.filterTransactionDirection
        };
        this.transferVisible = true;
    }

    // 子组件回调函数
    private toFatherMsg(msg: WinRspType, columnName: string) {
        this.transferVisible = false;
        // 修改证券类别权限后调用
        if (columnName === "permitSecurityTypes") {
            this.setpermitTransactionDirections();
        }
    }

    private split(val: string) {
        if (val && val.length > 0) {
            return val.split(",");
        }
        return [];
    }
}

export const Const = {
    DELETE: "删除",
    CONFIRM: "确定"
};
