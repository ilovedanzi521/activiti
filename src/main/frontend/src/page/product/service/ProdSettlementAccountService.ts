/****************************************************
 * 创建人：  @author zoujian
 * 创建时间: 2019-07-03 17:27:28
 * 项目名称：dfbp-common-basicparameter
 * 文件名称: ProdSettlementAccountService.ts
 * 文件描述: @Description: 结算账户表 服务类
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/

import AxiosFun from "../../../api/AxiosFun";
import { WinResponseData } from "../../common/vo/BaseVO";
import {
    ProdSettlementAccountReqVO,
    ProdSettlementAccountRepVO
} from "../vo/ProdSettlementAccountVO";

/**
 * 类名称：ProdSettlementAccountService
 * 类描述：结算账户表 服务类
 * 创建人：@author zoujian
 * 创建时间：2019-07-03 17:27:28
 */
export default class ProdSettlementAccountService {
    /**
     * 结算账户表 列表查询
     * @Title: list
     * @param reqVO
     * @return List<ProdSettlementAccount>
     * @throws
     * @author: zoujian
     * @Date:  2019-07-03 17:27:28
     */
    public list(reqVO: ProdSettlementAccountReqVO): Promise<WinResponseData> {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/prod/settlementAccount/list",
            reqVO
        );
    }
}
