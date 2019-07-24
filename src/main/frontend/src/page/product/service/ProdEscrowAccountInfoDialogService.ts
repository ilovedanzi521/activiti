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
export default class ProdEscrowAccountInfoDialogService {
    /**
     * 新增托管账户
     * @param prodEscrowAccountInfoReqVO
     */
    public insert(prodEscrowAccountInfoRepVO: ProdEscrowAccountInfoRepVO) {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/prod/escrowAccount/",
            prodEscrowAccountInfoRepVO
        );
    }

    /**
     * 修改托管账户
     * @param paramFundVO
     */
    public update(prodEscrowAccountInfoRepVO: ProdEscrowAccountInfoRepVO) {
        return AxiosFun.put(
            AxiosFun.basicParameterServiceName + "/prod/escrowAccount/",
            prodEscrowAccountInfoRepVO
        );
    }

    /**
     * 单个删除托管账户
     * @param escrowAccountNo
     */
    public del(escrowAccountNo: number) {
        return AxiosFun.winDelete(
            AxiosFun.basicParameterServiceName +
                "/prod/escrowAccount/" +
                escrowAccountNo,
            {}
        );
    }

    public bankList(prodEscrowAccountInfoReqVO: ProdEscrowAccountInfoReqVO) {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/prod/escrowAccount/bankList",
            prodEscrowAccountInfoReqVO
        );
    }
}
