import AxiosFun from "../../../api/AxiosFun";
import { ProdPortfolioReqVO } from "../vo/ProdPortfolioVO";
export default class ProdPortfolioService {
    /**
     * 投资组合查询
     */
    public list(queryVo: ProdPortfolioReqVO) {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/prod/portfolio/list",
            queryVo
        );
    }

    /**
     * 投资组合批量删除
     */
    public batchDelete(ids: number[]) {
        return AxiosFun.winDelete(
            AxiosFun.basicParameterServiceName + "/prod/portfolio/batch/" + ids
        );
    }
}
