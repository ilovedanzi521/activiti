/****************************************************
 * 创建人：  @author zoujian
 * 创建时间: 2019-07-11 16:46:44
 * 项目名称：dfbp-common-basicparameter
 * 文件名称: ParamRivalTraderService.ts
 * 文件描述: @Description: 对手交易员信息表 服务类
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/

import AxiosFun from "../../../api/AxiosFun";
import { WinResponseData } from "../../common/vo/BaseVO";
import { ParamRivalTraderReqVO } from "../vo/ParamRivalTraderVO";

/**
 * 类名称：ParamRivalTraderService
 * 类描述：对手交易员信息表 服务类
 * 创建人：@author zoujian
 * 创建时间：2019-07-11 16:46:44
 */
export default class ParamRivalTraderService {
    /**
     * 对手交易员信息表 列表查询
     * @param reqVO
     */
    public list(reqVO: ParamRivalTraderReqVO): Promise<WinResponseData> {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/rival/rivalTrader/list",
            reqVO
        );
    }

    /**
     * 批量删除交易员
     * @param ids
     */
    public delBatch(ids: string): Promise<WinResponseData> {
        return AxiosFun.winDelete(
            AxiosFun.basicParameterServiceName +
                "/rival/rivalTrader/delBatch/" +
                ids,
            {}
        );
    }
}
