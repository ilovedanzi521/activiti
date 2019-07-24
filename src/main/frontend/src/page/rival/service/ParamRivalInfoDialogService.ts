/****************************************************
 * 创建人：     @author zoujian
 * 创建时间: 2019年7月11日/下午5:52:56
 * 项目名称：  FRONTEND
 * 文件名称: ProdFundsAccountInfoDialogService
 * 文件描述: @Description: (交易对手方Service)
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/
import AxiosFun from "../../../api/AxiosFun";
import { ParamRivalInfoRepVO } from "../vo/ParamRivalInfoVO";

export default class ParamRivalInfoDialogService {
    /**
     * 新增交易对手
     * @param paramRivalInfoRepVO
     */
    public insert(paramRivalInfoRepVO: ParamRivalInfoRepVO) {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/rival/rivalInfo/",
            paramRivalInfoRepVO
        );
    }

    /**
     * 修改交易对手
     * @param paramRivalInfoRepVO
     */
    public update(paramRivalInfoRepVO: ParamRivalInfoRepVO) {
        return AxiosFun.put(
            AxiosFun.basicParameterServiceName + "/rival/rivalInfo/",
            paramRivalInfoRepVO
        );
    }

    /**
     * 单个删除交易对手
     * @param id
     */
    public del(id: number) {
        return AxiosFun.winDelete(
            AxiosFun.basicParameterServiceName + "/rival/rivalInfo/" + id,
            {}
        );
    }
}
