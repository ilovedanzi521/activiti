/* @ProductService 产品主页面Service
 * @Author: lixiuquan
 * @Date: 2019-06-26 14:01:33
 * @Last Modified by: lixiuquan
 * @Last Modified time: 2019-06-26 19:34:05
 */
import AxiosFun from "../../../api/AxiosFun";

export default class ProductService {
    /**
     * 查询委托人目录结构
     */
    public findConsignorCatalog() {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/consignor/structure/list",
            null
        );
    }
}
