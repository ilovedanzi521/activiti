/****************************************************
 * 创建人：     @author zoujian
 * 创建时间: 2019年6月10日/下午5:52:56
 * 项目名称：  FRONTEND
 * 文件名称: ParamRepoService
 * 文件描述: @Description: (回购参数主界面Service)
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/
import AxiosFun from "../../../api/AxiosFun";
import { ParamRepoReqVO } from "../vo/ParamRepoVO";
export default class ParamRepoService {
    /** 获取回购参数信息列表数据 */
    public list(paramRepoVO: ParamRepoReqVO) {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/param/repo/list",
            paramRepoVO
        );
    }
    /** 批量删除回购参数 */
    public delBatch(ids: string) {
        return AxiosFun.winDelete(
            AxiosFun.basicParameterServiceName + "/param/repo/batch/" + ids
        );
    }
}
