import AxiosFun from "../../../api/AxiosFun";
import {ParamFlowInstRepVO} from "../bean/ParamFlowInstVO";

export default class ExchangeFlowService {
    /**流程类**/
    listFlowClass() {
        return AxiosFun.get("/param/flowclass", undefined);
    }
    /**流程组列表 */
    listFlowGroup() {
        return AxiosFun.post("/param/flowgroup/list", undefined);
    }
    delflowgroup(id: number) {
        return AxiosFun.delete("/param/flowgroup/" + id, undefined);
    }
    addflowgroup(ParamFlowGroupVO) {
        return AxiosFun.post("/param/flowgroup/", ParamFlowGroupVO);
    }
    getflowgroupid() {
        return AxiosFun.get("/param/flowgroup/getflowgroupid", undefined);
    }

    /**流程实例列表 */
    listExchangeFlow(FlowVO) {
        return AxiosFun.post("/param/exchangeFlow/list", FlowVO);
    }
    listFlowByGroupid(reqVo){
        return AxiosFun.post("/param/exchangeFlow/listFlowByGroupid",reqVo);
    }
    /**流程实例新增 */
    addExchangeFlow(FlowVO) {
        return AxiosFun.post("/param/exchangeFlow", FlowVO);
    }
    /**流程实例修改 */
    updateExchangeFlow(FlowVO) {
        return AxiosFun.put("/param/exchangeFlow", FlowVO);
    }
    /**流程实例删除 */
    deleteExchangeFlow(FlowId) {
        return AxiosFun.delete(
            "/param/exchangeFlow/" + FlowId,
            undefined
        );
    }
    deleteExchangeFlows(flowIds: Array<number>) {
        return AxiosFun.post("/param/exchangeFlow/batchDelete/", flowIds);
    }

    /**
     * 1-请确认删除此流程分类信息;
     * 2-请确认删除此流程分类及流程组信息;
     * 3-该流程类中存在流程数据，请优先删除流程数据
     * @param flowId
     */
    queryGroupCount(flowId: number) {
        return AxiosFun.get("/param/flowgroup/getflowcount/"+flowId);
    }

    deleteFlowInfo(flowId: number,type: string) {

        return AxiosFun.get("/param/flowgroup/getflowcount/"+flowId);
    }

    batchStopFlow(ids: Array<number>){
        return AxiosFun.post("/param/exchangeFlow/batchStopFlow/", ids);
    }

    batchStartFlow(rows: Array<ParamFlowInstRepVO>) {
        return AxiosFun.post("/param/exchangeFlow/batchStartFlow/", rows);
    }

    loadSelectsItems() {
        return AxiosFun.get("/param/feign/loadSelectsItems");
    }
}
