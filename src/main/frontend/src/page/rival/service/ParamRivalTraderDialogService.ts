/****************************************************
 * 创建人：     @author zoujian
 * 创建时间: 2019年7月11日/下午5:52:56
 * 项目名称：  FRONTEND
 * 文件名称: ProdFundsAccountInfoDialogService
 * 文件描述: @Description: (交易员Service)
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/
import AxiosFun from "../../../api/AxiosFun";
import { ParamRivalTraderRepVO } from "../vo/ParamRivalTraderVO";

export default class ParamRivalInfoDialogService {
    /**
     * 新增交易员
     * @param paramRivalTraderRepVO
     */
    public insert(paramRivalTraderRepVO: ParamRivalTraderRepVO) {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/rival/rivalTrader/",
            paramRivalTraderRepVO
        );
    }

    /**
     * 修改交易员
     * @param paramRivalTraderRepVO
     */
    public update(paramRivalTraderRepVO: ParamRivalTraderRepVO) {
        return AxiosFun.put(
            AxiosFun.basicParameterServiceName + "/rival/rivalTrader/",
            paramRivalTraderRepVO
        );
    }

    /**
     * 单个删除交易员
     * @param id
     */
    public del(id: number) {
        return AxiosFun.winDelete(
            AxiosFun.basicParameterServiceName + "/rival/rivalTrader/" + id,
            {}
        );
    }
}
