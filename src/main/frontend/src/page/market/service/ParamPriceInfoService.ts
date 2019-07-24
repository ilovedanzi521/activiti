import AxiosFun from "../../../api/AxiosFun";

export default class ParamPriceInfoService {
    /** 证券行情list查询*/
    public list(queryVO) {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/param/priceInfo/list",
            queryVO
        );
    }
    /**新增证券行情 */
    public insert(paramPriceInfoEntity) {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/param/priceInfo",
            paramPriceInfoEntity
        );
    }

    /**修改证券行情 */
    public update(paramPriceInfoEntity) {
        return AxiosFun.put(
            AxiosFun.basicParameterServiceName + "/param/priceInfo",
            paramPriceInfoEntity
        );
    }

    /**删除证券行情*/
    public delete(id: number) {
        return AxiosFun.winDelete(
            AxiosFun.basicParameterServiceName + "/param/priceInfo/" + id,
            {}
        );
    }
    /** 批量删除 */
    public delBatch(ids: string) {
        return AxiosFun.winDelete(
            AxiosFun.basicParameterServiceName +
                "/param/priceInfo/batchDelete/" +
                ids
        );
    }
    /** 新增页面获取证券内码 */
    public pullSecurityList(priceInforeqVO) {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName +
                "/param/priceInfo/pullSecurityList",
            priceInforeqVO
        );
    }
    /** 查询资产类别 */
    public selectAssetTypeBySecurityCode(securityCode: string) {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName +
                "/param/priceInfo/selectAssetTypeBySecurityCode/" +
                securityCode,
            {}
        );
    }
}
