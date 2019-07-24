/****************************************************
 * 创建人：     @author zoujian
 * 创建时间: 2019年7月5日/下午5:52:56
 * 项目名称：  FRONTEND
 * 文件名称: ProdCapitalAccountDialogController
 * 文件描述: @Description: (资金账户增删改页面Controller)
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/
import BaseController from "../../common/controller/BaseController";
import { Component, Prop, Emit } from "vue-property-decorator";
import { OperationTypeEnum } from "../../common/enum/OperationTypeEnum";
import prodCapitalAccountRepVODic from "../vo/ProdCapitalAccountDic";
import { WinRspType } from "../../common/enum/BaseEnum";
import { BaseConst } from "../../common/const/BaseConst";
import { WinResponseData } from "../../common/vo/BaseVO";
import ProdCapitalAccountDialogService from "../service/ProdCapitalAccountDialogService";
import { ProdValidateConst } from "../const/ProdValidateConst";
import DicService from "../../dictionary/service/DicService";
import ProdCapitalAccountService from "../service/ProdCapitalAccountService";
import {
    ProdCapitalAccountRepVO,
    ProdCapitalAccountReqVO
} from "../vo/ProdCapitalAccountVO";
import ProdAssetUnitService from "../service/ProdAssetUnitService";
import { ProdAssetUnitReqVO } from "../vo/ProdAssetUnitVO";

@Component
export default class ProdCapitalAccountDialogController extends BaseController {
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
        data: ProdCapitalAccountRepVO;
        dicVOList: prodCapitalAccountRepVODic;
    };
    private prodCapitalAccountDialogService: ProdCapitalAccountDialogService = new ProdCapitalAccountDialogService();
    private prodCapitalAccountService: ProdCapitalAccountService = new ProdCapitalAccountService();
    private dicService: DicService = new DicService();
    /** 资产单元service */
    private prodAssetUnitService: ProdAssetUnitService = new ProdAssetUnitService();
    private prodCapitalAccountInfo: ProdCapitalAccountRepVO = new ProdCapitalAccountRepVO();
    private spanWidth: number = 8;
    private dicVOList: prodCapitalAccountRepVODic = new prodCapitalAccountRepVODic();
    private createLoading: boolean = false;
    private dialogVisible: boolean = true;
    private dialogLoading: boolean = false;
    private operationShow: boolean = true;
    /** 产品信息置disabled */
    private fundInfoDisabled: boolean = true;
    private dialogTitle: string = "";
    private dialogSumbitText: string = "";
    /** 修改时需置disabled */
    private editDisabled: boolean = false;
    private formDisabled: boolean = false;
    private unitNoList: any[] = [];
    private rules = {
        accountType: [
            {
                required: true,
                message: ProdValidateConst.CAPTITAL_ACCOUNT_TYPE_NOT_NULL,
                trigger: "change"
            }
        ],
        accountCode: [
            {
                required: true,
                message: ProdValidateConst.CAPITAL_ACCOUNT_CODE_NOT_NULL,
                trigger: "blur"
            }
        ],
        accountName: [
            {
                required: true,
                message: ProdValidateConst.CAPITAL_ACCOUNT_NAME_NOT_NULL,
                trigger: "blur"
            }
        ],
        brokerName: [
            {
                required: true,
                message: ProdValidateConst.BROKER_NAME_NOT_NULL,
                trigger: "blur"
            }
        ],
        departmentCode: [
            {
                required: true,
                message: ProdValidateConst.DEPARTMENT_CODE_NOT_NULL,
                trigger: "blur"
            }
        ],
        currencyCode: [
            {
                required: true,
                message: ProdValidateConst.CURRENCY_CODE_NOT_NULL,
                trigger: "blur"
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
        this.prodCapitalAccountInfo = this.toChildMsg.data;
        // 账户状态默认为正常
        this.prodCapitalAccountInfo.accountStatus =
            ProdCapitalAccountConst.NORMAL;
        if (this.toChildMsg.type === OperationTypeEnum.ADD) {
            this.dialogTitle = ProdCapitalAccountConst.CREATETITLE;
            this.dialogSumbitText = BaseConst.CONFIRM;
        }
        if (this.toChildMsg.type === OperationTypeEnum.DELETE) {
            this.dialogTitle = ProdCapitalAccountConst.DELETETITLE;
            this.dialogSumbitText = BaseConst.DELETE;
            this.prodCapitalAccountInfo = this.toChildMsg.data;
            this.formDisabled = true;
        }
        if (this.toChildMsg.type === OperationTypeEnum.UPDATE) {
            this.dialogTitle = ProdCapitalAccountConst.MODIFYTITLE;
            this.dialogSumbitText = BaseConst.CONFIRM;
            this.prodCapitalAccountInfo = this.toChildMsg.data;
            this.editDisabled = true;
        }
        if (this.toChildMsg.type === OperationTypeEnum.VIEW) {
            this.dialogTitle = ProdCapitalAccountConst.VIEWTITLE;
            this.operationShow = false;
            this.prodCapitalAccountInfo = this.toChildMsg.data;
            this.formDisabled = true;
        }
        this.dicVOList = this.toChildMsg.dicVOList;
        /** 资产单元初始化 */
        const prodAssetUnitReqVO = new ProdAssetUnitReqVO();
        prodAssetUnitReqVO.fundNo = this.toChildMsg.data.fundNo;
        this.getAssetUnitInfo(prodAssetUnitReqVO);
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
     * 取消
     */
    private dialogCancel() {
        this.send(WinRspType.CANCEL);
    }

    /**
     * 关闭dialog
     */
    private closeDialog() {
        this.send(WinRspType.CANCEL);
    }

    /**
     * 查询当前已存在的券商资金账户
     * @param queryString
     * @param cb
     */
    private capitalAccountList(queryString: string, cb: any) {
        const prodCapitalAccountRepVO: ProdCapitalAccountReqVO = new ProdCapitalAccountReqVO();
        prodCapitalAccountRepVO.departmentCode = queryString;
        prodCapitalAccountRepVO.reqPageSize = 10;
        prodCapitalAccountRepVO.fundNo = this.prodCapitalAccountInfo.fundNo;
        this.prodCapitalAccountDialogService
            .list(prodCapitalAccountRepVO)
            .then((response: WinResponseData) => {
                if (response.winRspType === WinRspType.ERROR) {
                    this.win_message_error(response.data);
                } else {
                    const list = response.data;
                    this.filter(list, cb, queryString, "capitalAccountList");
                }
            });
    }

    /**
     * 查询已存在的券商
     * @param queryString
     * @param cb
     */
    private brokerList(queryString: string, cb: any) {
        const prodCapitalAccountReqVO: ProdCapitalAccountReqVO = new ProdCapitalAccountReqVO();
        prodCapitalAccountReqVO.accountCode = queryString;
        prodCapitalAccountReqVO.reqPageSize = 10;
        this.prodCapitalAccountDialogService
            .brokerList(prodCapitalAccountReqVO)
            .then((response: WinResponseData) => {
                if (response.winRspType === WinRspType.ERROR) {
                    this.win_message_error(response.data);
                } else {
                    const list = response.data;
                    this.filter(list, cb, queryString, "brokerList");
                }
            });
    }

    /**
     * 查询已存在的营业部
     */
    private departmentList(queryString: string, cb: any) {
        const prodCapitalAccountRepVO: ProdCapitalAccountReqVO = new ProdCapitalAccountReqVO();
        prodCapitalAccountRepVO.departmentCode = queryString;
        prodCapitalAccountRepVO.brokerName = this.prodCapitalAccountInfo.brokerName;
        prodCapitalAccountRepVO.reqPageSize = 10;
        this.prodCapitalAccountDialogService
            .departmentList(prodCapitalAccountRepVO)
            .then((response: WinResponseData) => {
                if (response.winRspType === WinRspType.ERROR) {
                    this.win_message_error(response.data);
                } else {
                    const list = response.data;
                    this.filter(list, cb, queryString, "departmentList");
                }
            });
    }

    /**
     * input框搜索过滤
     * @param list
     * @param cb
     * @param queryString
     * @param name
     */
    private filter(list: [], cb: any, queryString: string, name: string) {
        const array = [];
        if (list.length > 0) {
            list.forEach((element: any) => {
                const ob = { value: "", key: {} };
                ob.key = element;
                if (name === "brokerList") {
                    ob.value = element.brokerName;
                } else if (name === "departmentList") {
                    ob.value = element.departmentCode;
                } else if (name === "capitalAccountList") {
                    ob.value = element.accountCode + " " + element.accountName;
                }
                array.push(ob);
            });
        }
        const results = queryString
            ? array.filter(this.createFilter(queryString))
            : array;
        // 调用 callback 返回建议列表的数据
        cb(results);
    }

    private createFilter(queryString: string) {
        return (res: any) => {
            return (
                res.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
            );
        };
    }

    /**
     * 下拉选择券商名称  填充数据
     * @param item
     */
    private handleBrokerSelect(item: any) {
        this.prodCapitalAccountInfo.brokerCode = item.key.brokerCode;
        const prodCapitalAccountInfo = "prodCapitalAccountInfo";
        const el: any = this.$refs[prodCapitalAccountInfo];
        el.validateField("brokerName");
    }

    /**
     * 下拉选择营业部号  填充数据
     * @param item
     */
    private handleDepartmentSelect(item: any) {
        this.prodCapitalAccountInfo.departmentCode = item.key.departmentCode;
        const prodCapitalAccountInfo = "prodCapitalAccountInfo";
        const el: any = this.$refs[prodCapitalAccountInfo];
        el.validateField("departmentCode");
    }

    /**
     * 下拉选择资金账号  填充form表单数据
     * @param item
     */
    private handleCapitalAccountSelect(item: any) {
        this.prodCapitalAccountInfo = item.key;
        this.setFundInfo(this.prodCapitalAccountInfo);
        const prodCapitalAccountInfo = "prodCapitalAccountInfo";
        const el: any = this.$refs[prodCapitalAccountInfo];
        el.validateField("accountCode");
    }

    /**
     * 清空form表单数据
     * @param item
     */
    private handleCapitalAccountChange(item: any) {
        if (item === "") {
            this.prodCapitalAccountInfo = new ProdCapitalAccountRepVO();
            this.setFundInfo(this.prodCapitalAccountInfo);
        }
    }

    /**
     * 设置产品信息
     * @param data
     */
    private setFundInfo(data: ProdCapitalAccountRepVO) {
        data.fundNo = this.toChildMsg.data.fundNo;
        data.fundCode = this.toChildMsg.data.fundCode;
        data.fundName = this.toChildMsg.data.fundName;
        return data;
    }

    /**
     * dialog数据提交
     */
    private submitDialog() {
        const prodCapitalAccountInfo = "prodCapitalAccountInfo";
        const el: any = this.$refs[prodCapitalAccountInfo];
        el.validate((valid: boolean) => {
            if (valid) {
                this.dialogLoading = true;
                if (this.toChildMsg.type === OperationTypeEnum.ADD) {
                    this.prodCapitalAccountDialogService
                        .insert(this.prodCapitalAccountInfo)
                        .then((response: WinResponseData) => {
                            this.dialogMessage(response);
                        });
                }
                if (this.toChildMsg.type === OperationTypeEnum.UPDATE) {
                    this.prodCapitalAccountDialogService
                        .update(this.prodCapitalAccountInfo)
                        .then((response: WinResponseData) => {
                            this.dialogMessage(response);
                        });
                }
                if (this.toChildMsg.type === OperationTypeEnum.DELETE) {
                    this.prodCapitalAccountDialogService
                        .del(this.prodCapitalAccountInfo.id)
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

    @Emit("bindSend")
    private send(msg: WinRspType) {}
}
export const ProdCapitalAccountConst = {
    /** 新增资金账户 */
    CREATETITLE: "新增券商资金账户",
    /** 查看资金账户 */
    VIEWTITLE: "查看券商资金账户",
    /** 修改资金账户 */
    MODIFYTITLE: "修改券商资金账户",
    /** 删除资金账户 */
    DELETETITLE: "删除券商资金账户",
    /** 资金账户1 正常 */
    NORMAL: "1"
};
