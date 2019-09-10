import { Component } from "vue-property-decorator";
import ExchangeFlowService from "../service/ExchangeFlowService";
import { ParamFlowInstReqVO, ParamFlowInstRepVO } from "../vo/ParamFlowInstVO";
import { ParamFlowGroupVO } from "../vo/ParamFlowGroupVO";
import { UserInfoVO } from "../vo/UserInfoVO";
import AxiosFun from "../../../api/AxiosFun";
import BaseController from "../../common/controller/BaseController";
import { DeleteEnum } from "../../flow/enum/DeleteEnum";
import PageVO from "../../common/vo/PageVO";
import dateUtils from "../../common/util/DateUtils";
import { WinRspType } from "../../common/enum/BaseEnum";
import { WinResponseData } from "../../common/vo/BaseVO";
import { DynamicSelectItemVO, StaticSelectItemVO } from "../vo/SelectItemVO";
import { FlowConstant } from "../../flow/constant/FlowConstant";
import { BaseConst } from "../../common/const/BaseConst";
@Component({
    components: {}
})
export default class ExchangeFlowController extends BaseController {
    staticSelectItemVO: StaticSelectItemVO = new StaticSelectItemVO();
    items = {
        reqVO: new DynamicSelectItemVO(),
        flowVO: new DynamicSelectItemVO()
    };

    // selectItemFormVO: SelectItemVO = new SelectItemVO();
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
    userVOs: UserInfoVO[] = [];
    tableChecked: any = [];
    options: boolean = false;
    flowGroupId: number = 2;
    //处理flowgroup的增加删除变量
    level: number = 2;
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
    dialogVisible: boolean = false;
    deleteFlag: boolean = false;
    //是否执行
    isExecute: boolean = false;

    expandList: number[] = [];
    treedata: any[] = [
        {
            id: "1",
            level: "1",
            label: "默认流程分类",
            children: [{ id: "2", level: "2", label: "默认流程组" }]
        }
    ];

    //选中树形行
    handleNodeClick(data) {
        this.$refs.SlotTree.store.defaultExpandAll = true;
        this.flowGroupId = data.id;
        this.level = data.level;
        this.rownum = data.rownum;
        this.reqVO.flowCode = data.id;
        this.queryFlowByGroupid(data.id);
    }
    //选中树形行后点击删除
    public delflowgroup() {
        let flowId = this.flowGroupId;
        let level = this.level;
        if (flowId != 1 && flowId != null) {
            this.deleteFlowClass(flowId, level);
        } else if (flowId == 1) {
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
                this.errorMessage(res.msg);
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
                                    this.errorMessage(res.msg);
                                }
                                // this.queryflowgroup();
                                this.remove(flowId);
                            });
                        })
                        .catch();
                }
            }
        });
    }

    remove(flowId) {
        if (this.level == 1) {
            for (let i = 0; i < this.treedata.length; i++) {
                if (this.treedata[i].id == flowId) {
                    this.treedata.splice(i, 1);
                    this.successMessage("删除成功");
                }
            }
        }
        if (this.level == 2) {
            for (let i = 0; i < this.treedata.length; i++) {
                var children = this.treedata[i].children;
                for (let j = 0; j < children.length; j++) {
                    if (children[j].id == flowId) {
                        this.treedata[i].children.splice(j, 1);
                        this.successMessage("删除成功");
                        console.log(this.treedata);
                        return;
                    }
                }
            }
        }
        // this.expandList = [flowId];
    }

    addNode(id, level, label, fatherId) {
        //增加一级节点
        if (this.flowGroupId == 1) {
            let obj = {
                id: "",
                label: "",
                level: "",
                children: []
            };
            obj.id = id;
            obj.label = label;
            obj.children = [];
            obj.level = level;
            this.treedata.push(obj);
            this.expandList = [id];
            console.log(obj);
            this.edit(obj);
        } else {
            //增加二级节点
            for (let i = 0; i < this.treedata.length; i++) {
                if (this.treedata[i].id == fatherId) {
                    let obj = {
                        id: "",
                        label: "",
                        fatherId: "",
                        level: "",
                        children: []
                    };
                    obj.id = id;
                    obj.label = label;
                    obj.children = [];
                    obj.level = level;
                    obj.fatherId = fatherId;
                    this.treedata[i].children.push(obj);
                    this.expandList = [fatherId];
                    this.edit(obj);
                    return;
                }
            }
        }
    }
    //选中树形后点击新增
    addflowgroup() {
        this.expandList = [this.flowGroupId];
        if (this.flowGroupId == 1) {
            this.service.getflowgroupid().then(res => {
                if (res.winRspType === "ERROR") {
                    this.errorMessage(res.msg);
                }
                var id = res.data;
                this.addNode(id, "1", "新增流程类", null);
            });
        } else if (this.flowGroupId > 1) {
            this.service.getflowgroupid().then(res => {
                if (res.winRspType === "ERROR") {
                    this.errorMessage(res.msg);
                }
                var id = res.data;
                this.addNode(id, "2", "新增流程组", this.flowGroupId);
            });
        }
    }

    handleBlur(item) {
        if (this.isExecute) {
            return;
        }
        let reg = /^[\w\u4e00-\u9fa5]{1,80}$/g;

        if (new RegExp(reg).test(item.label) == false) {
            setTimeout(() => {}, 500);
            //   this.$set(item, "isEdit", true);
            this.errorMessage("请输入正确的名称");
            return;
        }
        if (!item.label || item.label === "") {
            this.errorMessage("名称不能为空");
            // this.$set(item, "isEdit", true);
            return;
        }

        this.isExecute = true;
        this.$set(item, "isEdit", false);
        var flowGroupVO = new ParamFlowGroupVO();
        flowGroupVO.flowName = item.label;
        flowGroupVO.id = item.id;
        flowGroupVO.level = item.level;
        flowGroupVO.fatherId = item.fatherId;
        this.service.updateFlowgroup(flowGroupVO).then(res => {
            if (res.winRspType === "ERROR") {
                this.errorMessage(res.msg);
            } else {
                this.successMessage(res.msg);
            }
            this.expandList = [item.id];
            // this.queryflowgroup();
            this.isExecute = false;
        });
    }

    //todo
    handleEdit(level, s, that) {
        that.flowGroupVO.flowName = s.value;
        that.flowGroupVO.level = level;
        that.flowGroupVO.fatherId = that.fatherId;
        s.remove();
        AxiosFun.post(
            AxiosFun.commonBpmServiceName + "/param/flowgroup/",
            that.flowGroupVO
        ).then(res => {
            if (res.winRspType === "ERROR") {
                this.errorMessage(res.msg);
            }
            that.queryflowgroup();
        });
    }

    edit(item) {
        this.$set(item, "isEdit", true);
    }

    mounted() {
        this.$nextTick(() => {
            this.queryflowgroup();
            this.loadSelectsItems();
            var defaultId = 2;
            this.queryFlowByGroupid(defaultId);
        });
    }
    //查询流程组
    queryflowgroup() {
        let _this = this;
        this.service.listFlowGroup().then(res => {
            if (res.winRspType === "ERROR") {
                this.errorMessage(res.msg);
            }
            // _this.data = JSON.parse(res.data);
            this.expandList = [res.data[0].id];
            this.treedata = res.data;
        });
    }
    //查询流程ByGroupid
    queryFlowByGroupid(flowGroupid) {
        let reqVo: ParamFlowInstReqVO = new ParamFlowInstReqVO();
        reqVo.flowCode = flowGroupid;
        // this.reqVO.flowCode = flowGroupid;
        this.service.listFlowByGroupid(reqVo).then(res => {
            if (res.winRspType === "ERROR") {
                this.errorMessage(res.msg);
            }
            this.pageVO = res.data;
        });
    }
    /** 汇率分页查询 */
    public pageQuery(pageVO: PageVO) {
        this.reqVO.reqPageNum = pageVO.pageNum;
        this.reqVO.reqPageSize = pageVO.pageSize;
        this.queryExchangeFlow(this.reqVO);
    }
    //查询流程all
    queryExchangeFlow(reqVO) {
        // this.flowGroupId = 0;
        // this.reqVO.flowCode = null;
        let _this = this;
        this.service.listExchangeFlow(reqVO).then(res => {
            if (res.winRspType === "ERROR") {
                this.errorMessage(res.msg);
            }
            _this.pageVO = res.data;
        });
    }
    selectAllEvent({ checked }) {
        this.tableChecked = this.$refs.xTable1.getSelectRecords();
        this.tableChecked.length > 0
            ? (this.options = true)
            : (this.options = false);
    }
    //流程实例批量选择
    handleSelectionChange({ checked, row }) {
        this.tableChecked = this.$refs.xTable1.getSelectRecords();
        this.tableChecked.length > 0
            ? (this.options = true)
            : (this.options = false);
    }
    //批量删除
    batchDelete(rows: Array<ParamFlowInstRepVO>) {
        let startFlag = [];
        rows.forEach((repVO: ParamFlowInstRepVO) => {
            //启动的流程不能停止
            if (repVO.startFlag == true) {
                startFlag.push(repVO.startFlag);
            }
        });
        if (startFlag.length > 0) {
            this.win_message_box_warning(
                "目前流程有正在被使用,无法删除,请确认。",
                "提示",
                false,
                null,
                null
            ).catch(() => {});
            return;
        }
        if (rows.length == 1) {
            this.openDeleteDialog(rows[0]);
        } else {
            this.win_message_box_warning(
                "请确认批量删除流程信息",
                "提示",
                false,
                null,
                null
            )
                .then(() => {
                    this.service.deleteExchangeFlows(rows).then(res => {
                        if (res.winRspType === "ERROR") {
                            this.errorMessage(res.msg);
                        } else {
                            this.successMessage(res.msg);
                        }
                        this.queryExchangeFlow(this.reqVO);
                    });
                })
                .catch();
        }
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
                            if (res.code == FlowConstant.DESIGN_PROBLEMS) {
                                this.warningMessage(res.msg);
                            } else {
                                this.errorMessage(res.msg);
                            }
                        } else {
                            this.successMessage(res.msg);
                        }
                        this.queryExchangeFlow(this.reqVO);
                    });
                })
                .catch();
        }
    }
    //批量停止
    stopflow(rows: Array<ParamFlowInstRepVO>) {
        if (this.conditionFlowDiagram(rows, false)) {
            // let ids = [];
            // rows.forEach((repVO: ParamFlowInstRepVO) => {
            //     ids.push(repVO.processDefId);
            // });
            this.win_message_box_warning(
                "请确认批量停用流程。",
                "提示",
                false,
                null,
                null
            )
                .then(() => {
                    this.service.batchStopFlow(rows).then(res => {
                        if (res.winRspType === "ERROR") {
                            this.errorMessage(res.msg);
                        } else {
                            this.successMessage(res.msg);
                        }
                        this.queryExchangeFlow(this.reqVO);
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
        if (flowVO.startFlag) {
            this.errorMessage("流程已启动不能修改");
            return;
        }
        this.flowVO = flowVO;
        // return AxiosFun.get("/service/editor?modelId="+this.flowVO.modleId);
        return AxiosFun.post(
            AxiosFun.commonBpmServiceName + "/param/exchangeFlow/create",
            flowVO
        ).then(res => {
            if (res.winRspType === "ERROR") {
                this.errorMessage(res.data);
            } else {
                this.dialogTableVisible = true;
                // console.log("/flow-editor/modeler.html?modelId=" + res.msg);
                this.flowUrl =
                    AxiosFun.commonBpmServiceName +
                    "/flow-editor/modeler.html?modelId=" +
                    res.msg;
                // this.flowUrl='https://www.baidu.com';
                let href =
                    AxiosFun.commonBpmServiceName +
                    "/flow-editor/modeler.html?modelId=" +
                    res.msg;
                // window.open(href,"流程设计", "height=754, width=1277, top=0, left=2, toolbar=no, menubar=no, scrollbars=no, resizable=yes,location=no, status=no")
            }
            // document.write('https://www.baidu.com')
            // AxiosFun.get("/modeler.html?modelId="+flowVO.modelId);
        });
    }

    closeFlowDialog() {
        this.queryExchangeFlow(this.reqVO);
    }
    /**重置 */
    reset() {
        this.reqVO = new ParamFlowInstReqVO();
        this.queryExchangeFlow(this.reqVO);
        this.clearItemsData("reqVO");
    }

    /**打开新增弹框 */
    openAddDialog() {
        this.$nextTick(() => {
            if (this.$refs.exchangeForm) {
                this.$refs.exchangeForm.resetFields();
            }
        });
        this.deleteFlag = false;
        this.dialogVisible = true;
        this.dialogTitle = "流程-新增";
        this.flowVO = new ParamFlowInstRepVO();
        this.flowVO.flowCode = this.flowGroupId;
        /**开始时间、结束时间 */
        this.flowVO.timeArray = [
            new Date(),
            (function(): Date {
                var myDate = new Date();
                myDate.setDate(myDate.getDate() + 1);
                return myDate;
            })()
        ];
    }

    /**新增流程 */
    addExchangeFlow(exchangeForm) {
        this.$refs[exchangeForm].validate(valid => {
            if (valid) {
                this.setFormTime(this.flowVO.timeArray);
                this.service.addExchangeFlow(this.flowVO).then(res => {
                    if (res.winRspType === "ERROR") {
                        this.errorMessage(res.msg);
                    } else {
                        this.successMessage("添加流程成功");
                        this.dialogVisible = false;
                    }
                });
            }
        });
    }

    /**打开删除弹出框 */
    openDeleteDialog(flowVO): void {
        this.deleteFlag = true;
        this.dialogVisible = true;
        this.dialogTitle = "流程-删除";
        this.flowVO = flowVO;
        this.flowVO = {
            ...flowVO,
            timeArray: [new Date(flowVO.beginDate), new Date(flowVO.endDate)]
        };
    }

    /**打开修改弹框 */
    async openUpdateDialog(flowVO) {
        if (flowVO.startFlag) {
            this.errorMessage("流程已启动不能修改");
            return;
        }
        this.deleteFlag = false;
        this.dialogVisible = true;
        this.dialogTitle = "流程-修改";

        this.flowVO = {
            ...flowVO,
            timeArray: [new Date(flowVO.beginDate), new Date(flowVO.endDate)]
        };

        let resulut = await this.loadStartItemsData(flowVO);
    }

    /**修改流程*/
    updateExchangeFlow(exchangeForm) {
        this.$refs[exchangeForm].validate(valid => {
            if (valid) {
                this.setFormTime(this.flowVO.timeArray);
                this.service.updateExchangeFlow(this.flowVO).then(res => {
                    if (res.winRspType === "ERROR") {
                        this.errorMessage(res.msg);
                    } else {
                        this.successMessage("修改流程成功");
                        this.dialogVisible = false;
                    }
                });
            }
        });
    }

    /**删除流程实例 */
    deleteExchangeFlow(exchangeForm) {
        let _this = this;
        this.service.deleteExchangeFlow(this.flowVO.id).then(res => {
            if (res.winRspType === "ERROR") {
                this.errorMessage(res.msg);
            } else {
                this.successMessage(res.msg);
            }
            // this.dialogVisible = false;
        });
        this.dialogVisible = false;
        // this.queryExchangeFlow(this.reqVO);
    }

    setFormTime(timeArray) {
        this.flowVO.beginDate = dateUtils.dateFtt("yyyy-MM-dd", timeArray[0]);
        this.flowVO.endDate = dateUtils.dateFtt("yyyy-MM-dd", timeArray[1]);
    }
    // closeDialog() {
    //     this.dialogVisible = false;
    //     this.deleteFlag = false;
    //     this.queryFlowByGroupid(this.flowVO.flowCode);
    // }

    /**新增、修改，表单验证规则 */
    rules = {
        flowName: [
            {
                required: true,
                message: "流程名称不能为空",
                trigger: "blur"
            },
            {
                pattern: /^[\w\u4e00-\u9fa5]{1,80}$/g,
                message: "请输入正确的名称",
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
        ],
        marketCode: [
            {
                required: true,
                message: "交易市场不能为空",
                trigger: "change"
            }
        ],
        transactionDirection: [
            {
                required: true,
                message: "交易方向不能为空",
                trigger: "change"
            }
        ],
        timeArray: [
            {
                validator: function(rule, value, callback) {
                    // var beginDate = new Date(value[0]);
                    // var endDate = new Date(value[1]);
                    if (
                        value[1].getTime() + 24 * 3600 * 1000 - 1 <
                        new Date().getTime()
                    ) {
                        callback(new Error("结束日期应选择大于系统日期"));
                    }
                    // if (value[1].getTime() <= value[0].getTime()) {
                    //     callback(new Error("结束日期应选择大于开始日期"));
                    // }
                    callback();
                },
                trigger: "change"
            }
        ]
    };
    //开关
    change(flowVO: ParamFlowInstRepVO, value: boolean) {
        //启动
        let startFlag = flowVO.startFlag;
        this.service.startOrStopFlow(flowVO).then(res => {
            if (res.winRspType === "ERROR") {
                if (res.code == FlowConstant.DESIGN_PROBLEMS) {
                    this.warningMessage(res.msg);
                } else {
                    this.errorMessage(res.msg);
                }
            } else {
                this.successMessage(res.msg);
            }
            this.queryExchangeFlow(this.reqVO);
        });
    }

    private loadSelectsItems() {
        this.service.loadSelectsItems().then(res => {
            if (res.winRspType === "ERROR") {
                this.errorMessage(res.msg);
            }
            this.setItemsValue(res.data);
        });
    }

    setItemsValue(data) {
        this.staticSelectItemVO.flowNameItems = data.flowNameItems;
        this.staticSelectItemVO.flowTypeItems = data.flowTypeItems;
        // 产品
        this.staticSelectItemVO.productItems = data.productItems;
        // 指令类型
        this.staticSelectItemVO.instructionTypeItems =
            data.instructionTypeItems;
        // 交易市场
        this.staticSelectItemVO.marketItems = data.marketItems;
        this.staticSelectItemVO.controlTypeItems = data.controlTypeItems;
    }

    /**
     * 产品下拉框联动操作
     */
    changeItems(vo: string, itemType, value) {
        this.clear(vo, itemType);
        this.loadItemData(vo, itemType, value);
    }
    loadItemData(vo, itemType, value) {
        this.service.loadItems(itemType, value).then(res => {
            if (res.winRspType === "ERROR") {
                this.errorMessage(res.msg);
            } else {
                if (itemType === "PRO") {
                    this.items[vo].investCompanyItems = res.data;
                }
                if (itemType === "COM") {
                    this.items[vo].investConstituteItems = res.data;
                }
                if (itemType === "MAK") {
                    //证券类型
                    this.items[vo].securityTypeItems =
                        res.data.securityTypeItems;
                    // 交易方向
                    this.items[vo].transactionDirectionItems =
                        res.data.transactionDirectionItems;
                }
            }
        });
    }
    /**
     * 联动清理数据后反转
     */
    changeLink() {
        this.$forceUpdate();
    }
    /**
     *
     * @param itemType 清理数据
     */
    clear(vo: string, itemType: string) {
        if (itemType === "PRO") {
            this.init(vo, "investCompany");
            this.init(vo, "investConstitute");
        }
        if (itemType === "COM") {
            this.init(vo, "investConstitute");
            this.changeLink();
        }
        if (itemType === "MAK") {
            this.init(vo, "securityType");
            this.init(vo, "transactionDirection");
        }
    }
    /**
     *
     * @param flowVO 修改数据时，加载数据
     */
    loadStartItemsData(flowVO) {
        if (flowVO.productCode) {
            this.loadItemData("flowVO", "PRO", flowVO.productCode);
        }
        if (flowVO.investCompany) {
            this.loadItemData("flowVO", "COM", flowVO.investCompany);
        }
        if (flowVO.marketCode) {
            this.loadItemData("flowVO", "MAK", flowVO.marketCode);
        }
    }
    /**
     * 清理items数据
     */
    clearItemsData(vo: string) {
        //投资单元
        this.items[vo].investCompanyItems = [];
        // 组合资产
        this.items[vo].investConstituteItems = [];
        //证券类型
        this.items[vo].securityTypeItems = [];
        // 交易方向
        this.items[vo].transactionDirectionItems = [];
    }
    /**
     * 清理数据以及对规则和弹框的清理
     */

    closeDialog(formRule) {
        this.$refs[formRule].resetFields();
        this.deleteFlag = false;
        this.clearItemsData("flowVO");
        this.queryExchangeFlow(this.reqVO);
    }
    closeDia(formRule) {
        this.dialogVisible = false;
        // this.closeDialog(formRule);
    }

    init(vo: string, lable: string) {
        if (this[vo][lable]) {
            this[vo][lable] = "";
        }
    }

    private isShow: boolean = false;
    private showMoreText: string = BaseConst.QUERYMORE;
    private isShowClass: string = "el-icon-caret-bottom";

    /** 更多查询样式处理 */
    private showMore() {
        this.isShow = !this.isShow;
        if (this.showMoreText === BaseConst.QUERYMORE) {
            this.showMoreText = BaseConst.RETRACT;
            this.isShowClass = "el-icon-caret-top";
        } else {
            this.showMoreText = BaseConst.QUERYMORE;
            this.isShowClass = "el-icon-caret-bottom";
        }
    }
}
