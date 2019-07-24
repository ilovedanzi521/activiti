import AxiosFun from "../../../api/AxiosFun";
import { ProdPortfolioRepVO } from "../vo/ProdPortfolioVO";
export default class ProdAssetUnitDialogService {
    /**
     * 投资组合新增
     */
    public insert(insertVo: ProdPortfolioRepVO) {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/prod/portfolio",
            insertVo
        );
    }

    /**
     * 投资组合修改
     */
    public update(updateVo: ProdPortfolioRepVO) {
        return AxiosFun.put(
            AxiosFun.basicParameterServiceName + "/prod/portfolio",
            updateVo
        );
    }

    /**
     * 投资组合删除
     */
    public delete(id: number) {
        return AxiosFun.winDelete(
            AxiosFun.basicParameterServiceName + "/prod/portfolio/" + id
        );
    }
}
