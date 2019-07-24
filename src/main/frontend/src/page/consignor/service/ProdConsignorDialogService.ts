/* @ProdConsignorDialogService 委托人详情Service
 * @Author: lixiuquan
 * @Date: 2019-06-26 14:01:33
 * @Last Modified by: lixiuquan
 * @Last Modified time: 2019-06-26 19:34:05
 */
import AxiosFun from "../../../api/AxiosFun";
import { ProdConsignorVO } from "../vo/ProdConsignorEntityVO";

export default class ProdConsignorDialogService {
    /**
     * 新增委托人基本信息
     */
    public insertConsignorInfo(form: ProdConsignorVO) {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/consignor/info",
            form
        );
    }

    /**
     * 更新委托人基本信息
     */
    public updateConsignorInfo(form: ProdConsignorVO) {
        return AxiosFun.put(
            AxiosFun.basicParameterServiceName + "/consignor/info",
            form
        );
    }

    /**
     * 删除委托人基本信息
     */
    public deleteConsignorInfo(id: string) {
        return AxiosFun.winDelete(
            AxiosFun.basicParameterServiceName + "/consignor/info/" + id,
            { id }
        );
    }
}
