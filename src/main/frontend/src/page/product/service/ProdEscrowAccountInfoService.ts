/****************************************************
 * 创建人：     @author zoujian
 * 创建时间: 2019年6月26日/下午5:52:56
 * 项目名称：  FRONTEND
 * 文件名称: ProdEscrowAccountInfoService
 * 文件描述: @Description: (托管账户Service)
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/
import AxiosFun from "../../../api/AxiosFun";
import {
    ProdEscrowAccountInfoRepVO,
    ProdEscrowAccountInfoReqVO
} from "../vo/ProdEscrowAccountInfoVO";
export default class ProdEscrowAccountInfoService {
    /** 获取投资基金信息列表数据 */
    public list(prodEscrowAccountInfoReqVO: ProdEscrowAccountInfoReqVO) {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/prod/escrowAccount/pageList",
            prodEscrowAccountInfoReqVO
        );
    }
}
