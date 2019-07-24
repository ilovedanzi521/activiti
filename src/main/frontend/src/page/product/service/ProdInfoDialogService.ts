/* @ProdInfoDialogService 产品详情Service
 * @Author: lixiuquan
 * @Date: 2019-06-26 14:01:33
 * @Last Modified by: lixiuquan
 * @Last Modified time: 2019-07-01 19:34:05
 */
import AxiosFun from "../../../api/AxiosFun";
import { ProdInfoVO } from "../vo/ProductEntityVO";

export default class ProdInfoDialogService {
    /**
     * 新增产品基本信息
     */
    public insertFundInfo(form: ProdInfoVO) {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/prod/info",
            form
        );
    }

    /**
     * 更新产品基本信息
     */
    public updateFundInfo(form: ProdInfoVO) {
        return AxiosFun.put(
            AxiosFun.basicParameterServiceName + "/prod/info",
            form
        );
    }

    /**
     * 删除产品信息提交
     */
    public deleteFundInfo(id: string) {
        return AxiosFun.winDelete(
            AxiosFun.basicParameterServiceName + "/prod/info/" + id,
            { id }
        );
    }
}
