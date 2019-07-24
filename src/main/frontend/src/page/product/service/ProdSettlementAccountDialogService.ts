/****************************************************
 * 创建人：     @author zoujian
 * 创建时间: 2019年6月26日/下午5:52:56
 * 项目名称：  FRONTEND
 * 文件名称: ProdFundsAccountInfoDialogService
 * 文件描述: @Description: (托管账户Service)
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/
import AxiosFun from "../../../api/AxiosFun";
import { ProdSettlementAccountRepVO } from "../vo/ProdSettlementAccountVO";

export default class ProdSettlementAccountDialogService {
    /**
     * 新增结算账户
     * @param prodFundsAccountInfoReqVO
     */
    public insert(prodSettlementAccountRepVO: ProdSettlementAccountRepVO) {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/prod/settlementAccount/",
            prodSettlementAccountRepVO
        );
    }

    /**
     * 修改结算账户
     * @param paramFundVO
     */
    public update(prodSettlementAccountRepVO: ProdSettlementAccountRepVO) {
        return AxiosFun.put(
            AxiosFun.basicParameterServiceName + "/prod/settlementAccount/",
            prodSettlementAccountRepVO
        );
    }

    /**
     * 单个删除结算账户
     * @param id
     */
    public del(id: number) {
        return AxiosFun.winDelete(
            AxiosFun.basicParameterServiceName +
                "/prod/settlementAccount/" +
                id,
            {}
        );
    }
}
