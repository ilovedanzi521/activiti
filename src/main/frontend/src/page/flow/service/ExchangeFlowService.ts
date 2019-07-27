import AxiosFun from "../../../api/AxiosFun";
import { ParamFlowInstRepVO } from "../bean/ParamFlowInstVO";
export default class ExchangeFlowService {
    /**流程类**/
    listFlowClass() {
        return AxiosFun.get(
            AxiosFun.commonBpmServiceName + "/param/flowclass",
            undefined
        );
    }
    /**流程组列表 */
    listFlowGroup() {
        return AxiosFun.post(
            AxiosFun.commonBpmServiceName + "/param/flowgroup/list",
            undefined
        );
    }
    delflowgroup(id: number) {
        return AxiosFun.winDelete(
            AxiosFun.commonBpmServiceName + "/param/flowgroup/" + id
        );
    }
    addflowgroup(ParamFlowGroupVO) {
        return AxiosFun.post(
            AxiosFun.commonBpmServiceName + "/param/flowgroup/",
            ParamFlowGroupVO
        );
    }
    updateFlowgroup(item) {
        return AxiosFun.put(
            AxiosFun.commonBpmServiceName + "/param/flowgroup/",
            item
        );
    }
    getflowgroupid() {
        return AxiosFun.get(
            AxiosFun.commonBpmServiceName + "/param/flowgroup/getflowgroupid",
            undefined
        );
    }

    /**流程实例列表 */
    listExchangeFlow(FlowVO) {
        return AxiosFun.post(
            AxiosFun.commonBpmServiceName + "/param/exchangeFlow/list",
            FlowVO
        );
    }
    listFlowByGroupid(reqVo) {
        return AxiosFun.post(
            AxiosFun.commonBpmServiceName +
                "/param/exchangeFlow/listFlowByGroupid",
            reqVo
        );
    }
    /**流程实例新增 */
    addExchangeFlow(FlowVO) {
        return AxiosFun.post(
            AxiosFun.commonBpmServiceName + "/param/exchangeFlow",
            FlowVO
        );
    }
    /**流程实例修改 */
    updateExchangeFlow(FlowVO) {
        return AxiosFun.put(
            AxiosFun.commonBpmServiceName + "/param/exchangeFlow",
            FlowVO
        );
    }
    /**流程实例删除 */
    deleteExchangeFlow(FlowId) {
        return AxiosFun.winDelete(
            AxiosFun.commonBpmServiceName + "/param/exchangeFlow/" + FlowId
        );
    }
    deleteExchangeFlows(rows: Array<ParamFlowInstRepVO>) {
        return AxiosFun.post(
            AxiosFun.commonBpmServiceName + "/param/exchangeFlow/batchDelete/",
            rows
        );
    }

    /**
     * 1-请确认删除此流程分类信息;
     * 2-请确认删除此流程分类及流程组信息;
     * 3-该流程类中存在流程数据，请优先删除流程数据
     * @param flowId
     */
    queryGroupCount(flowId: number) {
        return AxiosFun.get(
            AxiosFun.commonBpmServiceName +
                "/param/flowgroup/getflowcount/" +
                flowId
        );
    }

    deleteFlowInfo(flowId: number, type: string) {
        return AxiosFun.get(
            AxiosFun.commonBpmServiceName +
                "/param/flowgroup/getflowcount/" +
                flowId
        );
    }

    batchStopFlow(rows: Array<ParamFlowInstRepVO>) {
        return AxiosFun.post(
            AxiosFun.commonBpmServiceName +
                "/param/exchangeFlow/batchStopFlow/",
            rows
        );
    }

    batchStartFlow(rows: Array<ParamFlowInstRepVO>) {
        return AxiosFun.post(
            AxiosFun.commonBpmServiceName +
                "/param/exchangeFlow/batchStartFlow/",
            rows
        );
    }

    loadSelectsItems() {
        return AxiosFun.get(
            AxiosFun.commonBpmServiceName + "/param/feign/loadSelectsItems"
        );
    }

    startOrStopFlow(flowVO: ParamFlowInstRepVO) {
        return AxiosFun.post(
            AxiosFun.commonBpmServiceName +
                "/param/exchangeFlow/startOrStopFlow/",
            flowVO
        );
    }
}
