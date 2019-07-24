import AxiosFun from "../../../api/AxiosFun";
import { ProdSubConsignorReqVO } from "../vo/ProdSubConsignorVO";
export default class ProdAssetUnitService {
    /**
     * 二级委托人查询
     */
    public list(queryVo: ProdSubConsignorReqVO) {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/consignor/subconsignor/list",
            queryVo
        );
    }

    /**
     * 二级委托人批量删除
     */
    public batchDelete(ids: number[]) {
        return AxiosFun.winDelete(
            AxiosFun.basicParameterServiceName +
                "/consignor/subconsignor/batch/" +
                ids
        );
    }
}
