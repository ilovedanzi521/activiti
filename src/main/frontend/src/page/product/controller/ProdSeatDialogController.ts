import BaseController from "../../common/controller/BaseController";
import { Component, Prop, Emit } from "vue-property-decorator";
import { ProdSeatReqVO, ProdSeatRepVO, ProdSeatDicVO } from "../vo/ProdSeatVO";
import { OperationTypeEnum } from "../../common/enum/OperationTypeEnum";
import { WinRspType } from "../../common/enum/BaseEnum";
import ProdSeatService from "../service/ProdSeatService";
import { WinResponseData } from "../../common/vo/BaseVO";
import { MessageConst } from "../../market/const/MessageConst";
import { BaseConst } from "../../common/const/BaseConst";
import ProdCapitalAccountDialogService from "../service/ProdCapitalAccountDialogService";
import {
    ProdCapitalAccountRepVO,
    ProdCapitalAccountReqVO
} from "../vo/ProdCapitalAccountVO";

@Component
export default class ProdSeatDialogController extends BaseController {
    // 父子组件通信
    @Prop({
        type: Object,
        required: false,
        default: () => ({})
    })
    public toChildMsg!: {
        dialogTitle: string;
        type: string;
        data: ProdSeatRepVO;
        seatDicVO: ProdSeatDicVO;
    };
    // 股东账户Service
    private service: ProdSeatService = new ProdSeatService();
    // 返回数据
    private createSeat: ProdSeatRepVO = new ProdSeatRepVO();
    // 删除VO
    private deleteSeat: ProdSeatReqVO = new ProdSeatReqVO();
    // 弹框显示
    private formDisabled: boolean = false;
    // 弹窗用途
    private dialogTitle: string = "";
    // 提交按钮的文字
    private dialogSumbitText: string = "";
    // 弹窗显示
    private dialogVisible: boolean = true;
    //
    private dialogLoading: boolean = false;
    // 置灰
    private statusDisabaled: boolean = false;
    // 席位置灰
    private seatCodeDisabaled: boolean = false;
    // 席位选择后详情信息置灰
    private selectDisabled: boolean = false;
    // 修改置灰
    private updateStatusDisabaled: boolean = false;
    // 字典
    private seatDicVO: ProdSeatDicVO = new ProdSeatDicVO();
    // 按钮是否显示
    private buttonShow: boolean = true;
    // 下拉数据
    private prodAllSeatRepVOs: ProdSeatRepVO = new ProdSeatRepVO();
    // 下拉主席位数据
    private prodSeatRepVOs: ProdSeatRepVO = new ProdSeatRepVO();
    // 字段宽度
    private spanWidth: number = 12;
    // 主席位默认置灰
    private seatDisabaled: boolean = true;
    // 深交所
    private marketSZ: string = "SZ";
    // 席位数量
    private seatCount: number;
    // 券商资金账户service
    private prodCapitalAccountDialogService: ProdCapitalAccountDialogService = new ProdCapitalAccountDialogService();

    private mounted() {
        this.selectAllSeat();
        this.selectSeat();
        this.createSeat = this.toChildMsg.data;
        this.dialogTitle = this.toChildMsg.dialogTitle;
        if (this.toChildMsg.type === OperationTypeEnum.ADD) {
            this.dialogSumbitText = Const.CONFIRM;
            this.statusDisabaled = true;
            this.prodSeatCount(this.toChildMsg.data.fundNo);
        }
        if (this.toChildMsg.type === OperationTypeEnum.DELETE) {
            this.dialogSumbitText = Const.DELETE;
            this.createSeat = this.toChildMsg.data;
            this.formDisabled = true;
        }
        if (this.toChildMsg.type === OperationTypeEnum.UPDATE) {
            this.dialogSumbitText = Const.CONFIRM;
            this.createSeat = this.toChildMsg.data;
            this.statusDisabaled = true;
            this.updateStatusDisabaled = true;
            this.seatCodeDisabaled = true;
        }
        if (this.toChildMsg.type === OperationTypeEnum.VIEW) {
            this.createSeat = this.toChildMsg.data;
            this.formDisabled = true;
            this.buttonShow = false;
        }

        this.dialogVisible = true;
        /** 数据字典 */
        this.seatDicVO = this.toChildMsg.seatDicVO;
    }

    /** 按钮 */
    private submitDialog() {
        const el: any = this.$refs.create;
        el.validate((valid: any) => {
            if (valid) {
                this.dialogLoading = true;
                if (this.toChildMsg.type === OperationTypeEnum.ADD) {
                    const copycreateSeat = this.copy(this.createSeat);
                    copycreateSeat.no = 1;
                    this.service
                        .insert(copycreateSeat)
                        .then((response: WinResponseData) => {
                            this.dialogMessage(response);
                        });
                }
                if (this.toChildMsg.type === OperationTypeEnum.UPDATE) {
                    const copycreateSeat = this.copy(this.createSeat);
                    this.service
                        .update(copycreateSeat)
                        .then((response: WinResponseData) => {
                            this.dialogMessage(response);
                        });
                }

                if (this.toChildMsg.type === OperationTypeEnum.DELETE) {
                    this.win_message_box_warning(
                        MessageConst.DELETE_WARNING_MESSAGE,
                        BaseConst.WARNING,
                        false
                    ).then(() => {
                        const copycreateSeat = this.copy(this.createSeat);
                        this.deleteSeat.fundNo = copycreateSeat.fundNo;
                        this.service
                            .delete(copycreateSeat.fundNo, copycreateSeat.code)
                            .then((response: WinResponseData) => {
                                this.dialogMessage(response);
                            });
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

    /** 席位下拉选择 */
    private selectAllSeat() {
        const prod = new ProdSeatReqVO();
        prod.fundNo = this.toChildMsg.data.fundNo;
        this.service.selectAllSeat(prod).then((response: WinResponseData) => {
            this.prodAllSeatRepVOs = response.data;
        });
    }

    /** 全部席位下拉选择 */
    private selectSeat() {
        this.service.selectSeat().then((response: WinResponseData) => {
            this.prodSeatRepVOs = response.data;
        });
    }

    /** 查询席位代码下拉数据 */
    private listAll(queryString, cb) {
        const prod = new ProdSeatReqVO();
        prod.fundNo = this.toChildMsg.data.fundNo;
        this.service.selectAllSeat(prod).then((response: WinResponseData) => {
            if (response.winRspType === "ERROR") {
                this.errorMessage(response.msg);
            } else {
                const list = response.data;
                this.filter(list, cb, queryString);
            }
        });
    }
    // 席位代码下拉选择处理
    private handleSelect(item) {
        // 带出该席位的信息
        this.service.seatMessage(item.key).then((response: WinResponseData) => {
            if (response.winRspType === "ERROR") {
                this.errorMessage(response.msg);
            } else {
                this.createSeat.name = response.data.name;
                this.createSeat.marketNo = response.data.marketNo;
                this.createSeat.brokerCode = response.data.brokerCode;
                this.createSeat.mainCode = response.data.mainCode;
                this.createSeat.marketRemark = response.data.marketRemark;
                this.createSeat.participantAccount =
                    response.data.participantAccount;
                this.createSeat.password = response.data.password;
                this.createSeat.linkman = response.data.linkman;
                this.createSeat.linkType = response.data.linkType;
                this.createSeat.minContractNo = response.data.minContractNo;
                this.createSeat.maxContractNo = response.data.maxContractNo;
                this.createSeat.contractNo = response.data.contractNo;
                this.updateStatusDisabaled = true;
                this.selectDisabled = true;
                this.seatDisabaled = true;
            }
        });
        this.createSeat.code = item.key;
    }
    private filter(list, cb, queryString) {
        const array = [];
        if (list.length > 0) {
            list.forEach((element: ProdSeatRepVO) => {
                const ob = { value: "", key: "" };
                ob.key = element.code;
                ob.value = element.code + " " + element.name;
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

    /** 交易市场选择监听 */
    private selectMarketEvent(selectMarketNo: any) {
        // 选择深交所
        if (this.marketSZ === selectMarketNo) {
            // 席位可填
            this.seatDisabaled = false;
        } else {
            // 席位置灰
            this.seatDisabaled = true;
            // 席位清空
            this.createSeat.mainCode = "";
        }
    }

    /** 查询xx产品下有效席位的数量 */
    private prodSeatCount(fundNo: number) {
        this.service.prodSeatCount(fundNo).then((response: WinResponseData) => {
            this.seatCount = response.data;

            if (this.seatCount > 0) {
                // 存在有效席位时，"当天是否交易"默认为"否"
                this.createSeat.trade = "2";
            } else {
                // 不存在有效席位时，"当天是否交易"默认为"是"
                this.createSeat.trade = "1";
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
                    this.filterb(list, cb, queryString, "brokerList");
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
    private filterb(list: [], cb: any, queryString: string, name: string) {
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
            ? array.filter(this.createFilterb(queryString))
            : array;
        // 调用 callback 返回建议列表的数据
        cb(results);
    }

    private createFilterb(queryString: string) {
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
        this.createSeat.brokerCode = item.key.brokerCode;
        const prodCapitalAccountInfo = "prodCapitalAccountInfo";
        const el: any = this.$refs[prodCapitalAccountInfo];
        el.validateField("brokerCode");
    }
    /** 监听席位，席位代码改变，带出来的值全部去掉 */
    private seatCodeChange(queryString: string) {
        this.createSeat.name = "";
        this.createSeat.marketNo = "";
        this.createSeat.brokerCode = "";
        this.createSeat.mainCode = "";
        this.createSeat.marketRemark = "";
        this.createSeat.participantAccount = "";
        this.createSeat.password = "";
        this.createSeat.linkman = "";
        this.createSeat.linkType = "";
        this.createSeat.minContractNo = null;
        this.createSeat.maxContractNo = null;
        this.createSeat.contractNo = null;
        this.updateStatusDisabaled = false;
        this.selectDisabled = false;
    }

    // 关闭Dialog
    private closeDia() {
        this.send(WinRspType.CANCEL);
    }
    // 取消
    private dialogCancel() {
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
