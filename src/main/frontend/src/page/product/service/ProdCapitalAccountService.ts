/****************************************************
 * 创建人：     @author zoujian
 * 创建时间: 2019年6月26日/下午5:52:56
 * 项目名称：  FRONTEND
 * 文件名称: ProdEscrowAccountInfoService
 * 文件描述: @Description: (资金账户Service)
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/
import AxiosFun from "../../../api/AxiosFun";
import { ProdCapitalAccountReqVO } from "../vo/ProdCapitalAccountVO";
export default class ProdCapitalAccountService {
    /** 获取券商资金账户信息列表数据 */
    public list(prodCapitalAccountReqVO: ProdCapitalAccountReqVO) {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/prod/capitalAccount/listAll",
            prodCapitalAccountReqVO
        );
    }
}
