import { Component } from "vue-property-decorator";
import ExchangeFlowService from "../service/ExchangeFlowService";
import {
    ParamFlowInstReqVO,
    ParamFlowInstRepVO
} from "../bean/ParamFlowInstVO";
import { ParamFlowGroupVO } from "../bean/ParamFlowGroupVO";
import { UserInfoVO } from "../bean/UserInfoVO";
import AxiosFun from "../../../api/AxiosFun";
import BaseController from "../../common/controller/BaseController";
import { DeleteEnum } from "../../flow/enum/DeleteEnum";
import PageVO from "../../common/vo/PageVO";
import {
    FlowTypeItem,
    InstructionTypeItem,
    InvestCompanyItem,
    InvestConstituteItem,
    MarketItem,
    ProductItem,
    SecurityTypeItem,
    TransactionDirectionItem
} from "../bean/SelectSources";
@Component({
    components: {}
})
export default class ExchangeFlowController extends BaseController {
    /**下拉框数据**/
    // 流程类型
    flowTypeItems: FlowTypeItem[] = [];
    // 产品
    productItems: ProductItem[] = [];
    // 投资单位
    investCompanyItems: InvestCompanyItem[] = [];
    // 组合资产
    investConstituteItems: InvestConstituteItem[] = [];
    // 指令类型
    instructionTypeItems: InstructionTypeItem[] = [];
    // 交易市场
    marketItems: MarketItem[] = [];
    //证券类型
    securityTypeItems: SecurityTypeItem[] = [];
    // 交易方向
    transactionDirectionItems: TransactionDirectionItem[] = [];
    /**下拉框数据end**/
    dialogTableVisible = false;
    flowUrl: string = "";
    service: ExchangeFlowService = new ExchangeFlowService();
    /**查询表单数据 */
    reqVO: ParamFlowInstReqVO = new ParamFlowInstReqVO();
    flowVO: ParamFlowInstRepVO = new ParamFlowInstRepVO();
    /*  /!**返回的货币列表 *!/
    repCurrencyVOs: ParamFlowClassReqVO[] = [];*/
    /**返回的实例列表 */
    repFlowVOs: ParamFlowInstRepVO[] = [];
    pageVO: PageVO = new PageVO();
    /**编辑、保存开关 */
    // editFormVisible: boolean = true;
    /**打开、编辑弹出框标题 */
    dialogTitle: string = "";
    /**开始时间、结束时间 */
    timeArray: string[] = [];
    userVOs: UserInfoVO[] = [];
    ids: Array<number> = [];
    tableChecked: [];
    options: boolean = false;
    flowGroupId: number;
    //处理flowgroup的增加删除变量
    level: number = 0;
    flowGroupVO: ParamFlowGroupVO = new ParamFlowGroupVO();
    //查询流程实例
    // flowCode: string = "";
    //rownum
    rownum: number = 0;
    // $refs: {
    //     validate: HTMLFormElement
    // }
    startFlag: boolean = true;
    $refs;
    treedata: any[] = [
        {
            label: "默认流程分类",
            children: [
                {
                    label: "默认流程组"
                }
            ]
        }
    ];
    //选中树形行
    handleNodeClick(data) {
        this.$refs.SlotTree.store.defaultExpandAll = true;
        // console.info(data);
        this.flowGroupId = data.id;
        this.level = data.level;
        this.rownum = data.rownum;
        this.queryFlowByGroupid(data.id);
    }
    //选中树形行后点击删除
    public delflowgroup() {
        let flowId = this.flowGroupId;
        let level = this.level;
        if (flowId != 1 && flowId!=null) {
            this.deleteFlowClass(flowId, level);
        } else if(flowId == 1) {
            this.win_message_box_warning(
                "不能删除默认流程类",
                "提示",
                false,
                null,
                null
            ).catch();
        }
    }

    //删除流程实例
    deleteFlowClass(flowId: number, level: number) {
        //1.获取流程组信息
        this.service.queryGroupCount(flowId).then(res => {
            if (res.winRspType === "ERROR") {
                console.log(res.msg);
            } else {
                let msg = "";
                let type = res.data;
                if (DeleteEnum.EXIST_INST == type) {
                    msg = "该流程类中存在流程数据，请优先删除流程数据。";
                    if (level == 2) {
                        msg = "该流程组存在流程数据，请优先删除对应流程数据。";
                    }
                    this.win_message_box_warning(msg, "提示", false, null, null)
                        .then(() => {})
                        .catch();
                } else {
                    if (DeleteEnum.EXIST_GROUP == type) {
                        msg = "请确认删除此流程分类及流程组信息";
                    } else {
                        msg = "请确认删除此流程分类信息";
                    }
                    if (level == 2) {
                        msg = "请确认删除该流程组信息";
                    }
                    this.win_message_box_warning(msg, "提示", false, null, null)
                        .then(() => {
                            this.service.delflowgroup(flowId).then(res => {
                                if (res.winRspType === "ERROR") {
                                    console.log(res.msg);
                                }
                                this.queryflowgroup();
                            });
                        })
                        .catch();
                }
            }
        });
    }
    //选中树形后点击新增
    addflowgroup() {
        let that = this;
        if (this.flowGroupId == 1) {
            let s = document.createElement("input");
            let d = this.$refs.SlotTree.$el;
            d.appendChild(s);
            s.focus();
            s.addEventListener("blur", function() {
                that.flowGroupVO.flowName = s.value;
                that.flowGroupVO.level = "1";
                s.remove();
                AxiosFun.post("/param/flowgroup/", that.flowGroupVO).then(
                    res => {
                        if (res.winRspType === "ERROR") {
                            console.log(res.msg);
                        }
                        that.queryflowgroup();
                    }
                );
            });
        } else if (this.flowGroupId > 1) {
            let s = document.createElement("input");
            let d = this.$refs.SlotTree.$el.children[that.rownum];
            console.log(that.rownum);
            d.appendChild(s);
            s.focus();
            s.addEventListener("blur", function() {
                console.log(s.value);
                that.flowGroupVO.flowName = s.value;
                that.flowGroupVO.level = "2";
                that.flowGroupVO.fatherId = that.flowGroupId;
                s.remove();
                AxiosFun.post("/param/flowgroup/", that.flowGroupVO).then(
                    res => {
                        if (res.winRspType === "ERROR") {
                            console.log(res.msg);
                        }

                        that.queryflowgroup();
                    }
                );
            });
            // s.onkeyup = function (value){
            //     console.log(value);
            //     console.log(s.value)
            //     that.flowGroupVO.flowName = s.value;
            //     that.flowGroupVO.level = "2";
            //     that.flowGroupVO.fatherId = that.flowGroupId;
            //     s.remove();
            //     AxiosFun.post("/param/flowgroup/", that.flowGroupVO).then(res => {
            //         if (res.winRspType === "ERROR") {
            //             console.log(res.msg);
            //         }
            //
            //         that.queryflowgroup();
            //     });
            // };
        }
    }
    //todo
    handleEdit(level, s, that) {
        that.flowGroupVO.flowName = s.value;
        that.flowGroupVO.level = level;
        that.flowGroupVO.fatherId = that.fatherId;
        s.remove();
        AxiosFun.post("/param/flowgroup/", that.flowGroupVO).then(res => {
            if (res.winRspType === "ERROR") {
                console.log(res.msg);
            }
            that.queryflowgroup();
        });
    }

    mounted() {
        this.$nextTick(() => {
            this.queryflowgroup();
            this.loadSelectsItems();
        });
    }
    //查询流程组
    queryflowgroup() {
        let _this = this;
        this.service.listFlowGroup().then(res => {
            if (res.winRspType === "ERROR") {
                console.log(res.data);
            }
            // _this.data = JSON.parse(res.data);
            _this.treedata = res.data;
        });
    }
    //查询流程ByGroupid
    queryFlowByGroupid(flowGroupid){
        let reqVo: ParamFlowInstReqVO = new ParamFlowInstReqVO();
        reqVo.flowCode = flowGroupid;
        this.service.listFlowByGroupid(reqVo).then(res => {
            if (res.winRspType === "ERROR") {
                console.log(res.msg);
            }
            this.pageVO = res.data;
        });
    }
    /** 汇率分页查询 */
    public pageQuery(pageVO: PageVO) {
        this.reqVO.reqPageNum = pageVO.pageNum;
        this.reqVO.reqPageSize = pageVO.pageSize;
        this.queryExchangeFlow(null);
    }
    //查询流程all
    queryExchangeFlow(reqVO) {
        // this.flowGroupId = 0;
        let _this = this;
        this.service.listExchangeFlow(reqVO).then(res => {
            if (res.winRspType === "ERROR") {
                console.log(res.msg);
            }
            _this.pageVO = res.data;
        });
    }
    //流程实例批量选择
    handleSelectionChange(val) {
        this.tableChecked = val;
        this.tableChecked.length > 0
            ? (this.options = true)
            : (this.options = false);
        console.log(this.level != 2 || this.options);
    }
    //批量删除
    batchDelete(rows: Array<ParamFlowInstRepVO>) {
        this.win_message_box_warning(
            "请确认删除此流程数据信息",
            "提示",
            false,
            null,
            null
        )
            .then(() => {
                let _this = this;
                _this.ids = [];
                rows.forEach((repVO: ParamFlowInstRepVO) => {
                    _this.ids.push(repVO.id);
                });
                this.service.deleteExchangeFlows(_this.ids).then(res => {
                    if (res.winRspType === "ERROR") {
                        console.log(res.msg);
                    }
                    _this.queryFlowByGroupid(this.flowGroupId);
                });
            })
            .catch();
    }
    //批量启动
    startflow(rows: Array<ParamFlowInstRepVO>) {
        if (this.conditionFlowDiagram(rows, true)) {
            this.win_message_box_warning(
                "请确认批量启用流程。",
                "提示",
                false,
                null,
                null
            )
                .then(() => {
                    this.service.batchStartFlow(rows).then(res => {
                        if (res.winRspType === "ERROR") {
                            console.log(res.msg);
                        }
                        this.queryFlowByGroupid(this.flowGroupId);
                    });
                })
                .catch();
        }
    }
    //批量停止
    stopflow(rows: Array<ParamFlowInstRepVO>) {
        if (this.conditionFlowDiagram(rows, false)) {
            let ids = [];
            rows.forEach((repVO: ParamFlowInstRepVO) => {
                ids.push(repVO.processDefId);
            });
            this.win_message_box_warning(
                "请确认批量停用流程。",
                "提示",
                false,
                null,
                null
            )
                .then(() => {
                    this.service.batchStopFlow(ids).then(res => {
                        if (res.winRspType === "ERROR") {
                            console.log(res.msg);
                        }
                        this.queryFlowByGroupid(this.flowGroupId);
                    });
                })
                .catch();
        }
    }
    //判断流程是否设计
    private conditionFlowDiagram(
        rows: Array<ParamFlowInstRepVO>,
        flag: boolean
    ) {
        let msg: string = flag ? "启动" : "停止";
        let modelIds: any = [];
        let startFlag: any = [];
        rows.forEach((repVO: ParamFlowInstRepVO) => {
            if (repVO.modelId == "") {
                modelIds.push(repVO.modelId);
            }
            //如果启动，提示重复启动|如果停止，提示已停止
            if (repVO.startFlag == flag) {
                startFlag.push(repVO.startFlag);
            }
        });
        if (modelIds.length > 0) {
            this.win_message_box_warning(
                "存在流程没有设计,无法正常" + msg,
                "提示",
                false,
                null,
                null
            ).catch(() => {});
            return false;
        }
        if (startFlag.length > 0) {
            this.win_message_box_warning(
                "存在流程已" + msg,
                "提示",
                false,
                null,
                null
            ).catch(() => {});
            return false;
        }
        return true;
    }
    //流程模型设计
    designFlow(flowVO) {
        this.flowVO = flowVO;
        // return AxiosFun.get("/service/editor?modelId="+this.flowVO.modleId);
        return AxiosFun.post("/param/exchangeFlow/create", flowVO).then(res => {
            if (res.winRspType === "ERROR") {
                console.log(res.msg);
            } else {
                this.dialogTableVisible = true;
                console.log("/modeler.html?modelId=" + res.msg);
                this.flowUrl = "/modeler.html?modelId=" + res.msg;
                // this.flowUrl='https://www.baidu.com';
                let href = "/modeler.html?modelId=" + res.msg;
                // window.open(href,"流程设计", "height=754, width=1277, top=0, left=2, toolbar=no, menubar=no, scrollbars=no, resizable=yes,location=no, status=no")
            }
            // document.write('https://www.baidu.com')
            // AxiosFun.get("/modeler.html?modelId="+flowVO.modelId);
        });
    }

    closeFlowDialog() {
        this.queryFlowByGroupid(this.flowVO.flowCode);
        console.log(this.flowVO);
    }
    /**重置 */
    reset() {
        this.reqVO = new ParamFlowInstReqVO();
    }

    /**打开新增弹框 */
    openAddDialog() {
        this.dialogVisible = true;
        this.dialogTitle = "流程-新增";
        this.flowVO = new ParamFlowInstRepVO();
        this.flowVO.flowCode = this.flowGroupId;
    }

    /**新增流程 */
    addExchangeFlow() {
        this.$refs["exchangeForm"].validate(valid => {
            if (valid) {
                this.service.addExchangeFlow(this.flowVO).then(res => {
                    if (res.winRspType === "ERROR") {
                        console.log(res.msg);
                    } else {
                        this.dialogVisible = false;
                    }
                    this.queryFlowByGroupid(this.flowVO.flowCode);
                });
            }
        });
    }

    /**打开修改弹框 */
    openUpdateDialog(flowVO) {
        this.dialogVisible = true;
        this.dialogTitle = "流程-修改";
        this.flowVO = flowVO;
    }

    /**修改流程*/
    updateExchangeFlow() {
        let _this = this;
        this.service.updateExchangeFlow(this.flowVO).then(res => {
            if (res.winRspType === "ERROR") {
                console.log(res.msg);
            } else {
                this.dialogVisible = false;
            }
            _this.queryFlowByGroupid(this.flowVO.flowCode);
        });
    }

    /**删除流程实例 */
    deleteExchangeFlow(flowId) {
        let _this = this;
        this.service.deleteExchangeFlow(flowId).then(res => {
            if (res.winRspType === "ERROR") {
                console.log(res.msg);
            }
            _this.queryFlowByGroupid(this.flowGroupId);
        });
    }

    setFormTime(times) {
        this.reqVO.beginDate = times[0];
        this.reqVO.endDate = times[1];
    }

    /**新增、修改，表单验证规则 */
    rules = {
        flowName: [
            {
                required: true,
                message: "流程名称不能为空",
                trigger: "blur"
            }
        ],
        flowType: [
            {
                required: true,
                message: "流程类型不能为空",
                trigger: "change"
            }
        ],
        productCode: [
            {
                required: true,
                message: "产品不能为空",
                trigger: "change"
            }
        ]
    };
    change(value) {
        console.log(value);
    }

    private loadSelectsItems() {
        this.service.loadSelectsItems().then(res => {
            if (res.winRspType === "ERROR") {
                console.log(res.data);
            }
            this.flowTypeItems = res.data.flowTypeItems;
            //  console.log(this.flowTypeItems)
            // 产品
            this.productItems = res.data.productItems;
            // 投资单位
            this.investCompanyItems = res.data.investCompanyItems;
            // 组合资产
            this.investConstituteItems = res.data.investConstituteItems;
            // 指令类型
            this.instructionTypeItems = res.data.instructionTypeItems;
            // 交易市场
            this.marketItems = res.data.marketItems;
            //证券类型
            this.securityTypeItems = res.data.securityTypeItems;
            // 交易方向
            this.transactionDirectionItems = res.data.transactionDirectionItems;
        });
    }
}
