import AxiosFun from "../../../api/AxiosFun";
import { StockholderReqVO, StockholderRepVO } from "../vo/ProdStockholderVO";

export default class ProdStockholderService {
    /** 获取股东账户列表 */
    public list(stockholderVO) {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/prod/stockholder/list",
            stockholderVO
        );
    }
    /** 新增股东账户 */
    public insert(stockholderEntity: StockholderRepVO) {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/prod/stockholder",
            stockholderEntity
        );
    }
    /** 删除股东账户 */
    public delete(fundNo, code) {
        return AxiosFun.winDelete(
            AxiosFun.basicParameterServiceName + "/prod/stockholder",
            { fundNo: fundNo, code: code }
        );
    }
    /** 修改股东账户 */
    public update(stockholder: StockholderReqVO) {
        return AxiosFun.put(
            AxiosFun.basicParameterServiceName + "/prod/stockholder",
            stockholder
        );
    }
}
