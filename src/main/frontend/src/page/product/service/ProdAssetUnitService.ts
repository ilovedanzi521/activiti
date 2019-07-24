import AxiosFun from "../../../api/AxiosFun";
import { ProdAssetUnitReqVO } from "../vo/ProdAssetUnitVO";
export default class ProdAssetUnitService {
    /**
     * 资产单元查询
     */
    public list(queryVo: ProdAssetUnitReqVO) {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/prod/assetUnit/list",
            queryVo
        );
    }

    /**
     * 资产单元批量删除
     */
    public batchDelete(ids: number[]) {
        return AxiosFun.winDelete(
            AxiosFun.basicParameterServiceName + "/prod/assetUnit/batch/" + ids
        );
    }
}
