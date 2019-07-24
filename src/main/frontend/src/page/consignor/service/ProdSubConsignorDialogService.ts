import AxiosFun from "../../../api/AxiosFun";
import { ProdSubConsignorRepVO } from "../vo/ProdSubConsignorVO";
export default class ProdAssetUnitDialogService {
    /**
     * 二级委托人新增
     */
    public insert(insertVo: ProdSubConsignorRepVO) {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/consignor/subconsignor",
            insertVo
        );
    }

    /**
     * 二级委托人修改
     */
    public update(updateVo: ProdSubConsignorRepVO) {
        return AxiosFun.put(
            AxiosFun.basicParameterServiceName + "/consignor/subconsignor",
            updateVo
        );
    }

    /**
     * 二级委托人删除
     */
    public delete(id: number) {
        return AxiosFun.winDelete(
            AxiosFun.basicParameterServiceName + "/consignor/subconsignor/" + id
        );
    }
}
