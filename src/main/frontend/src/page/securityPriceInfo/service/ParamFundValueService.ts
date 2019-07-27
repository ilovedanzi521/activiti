import AxiosFun from "../../../api/AxiosFun";

export default class ParamFundValueService {
    /** 基金净值list查询 */
    public list(queryVO) {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/param/fundValue/list",
            queryVO
        );
    }
    /** 新增基金净值 */
    public insert(paramFundValueEntity) {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/param/fundValue",
            paramFundValueEntity
        );
    }

    /** 修改基金净值 */
    public update(paramFundValueEntity) {
        return AxiosFun.put(
            AxiosFun.basicParameterServiceName + "/param/fundValue",
            paramFundValueEntity
        );
    }

    /** 删除基金净值 */
    public delete(id) {
        return AxiosFun.winDelete(
            AxiosFun.basicParameterServiceName + "/param/fundValue/" + id,
            null
        );
    }
    /** 批量删除 */
    public delBatch(ids: string) {
        return AxiosFun.winDelete(
            AxiosFun.basicParameterServiceName +
                "/param/fundValue/batchDelete/" +
                ids
        );
    }
    /** 新增页面获取证券代码 */
    public pullFundValueList() {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName +
                "/param/fundValue/pullFundValueList",
            {}
        );
    }
}
