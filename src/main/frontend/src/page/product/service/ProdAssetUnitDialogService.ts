import AxiosFun from "../../../api/AxiosFun";
import { ProdAssetUnitRepVO } from "../vo/ProdAssetUnitVO";
export default class ProdAssetUnitDialogService {
    /**
     * 资产单元新增
     */
    public insert(insertVo: ProdAssetUnitRepVO) {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/prod/assetUnit",
            insertVo
        );
    }

    /**
     * 资产单元修改
     */
    public update(updateVo: ProdAssetUnitRepVO) {
        return AxiosFun.put(
            AxiosFun.basicParameterServiceName + "/prod/assetUnit",
            updateVo
        );
    }

    /**
     * 资产单元删除
     */
    public delete(id: number) {
        return AxiosFun.winDelete(
            AxiosFun.basicParameterServiceName + "/prod/assetUnit/" + id
        );
    }
}
