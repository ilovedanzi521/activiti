/****************************************************
 * 创建人：     @author zoujian
 * 创建时间: 2019年6月10日/下午5:52:56
 * 项目名称：  FRONTEND
 * 文件名称: ParamFundService
 * 文件描述: @Description: (投资基金Service)
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/
import AxiosFun from "../../../api/AxiosFun";
import { ParamFundReqVO } from "../vo/ParamFundVO";
export default class ParamFundService {
    /** 获取投资基金信息列表数据 */
    public list(paramFundVO: ParamFundReqVO) {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/param/fund/list",
            paramFundVO
        );
    }
    /** 批量删除 */
    public delBatch(ids: string) {
        return AxiosFun.winDelete(
            AxiosFun.basicParameterServiceName + "/param/fund/batch/" + ids
        );
    }
}
