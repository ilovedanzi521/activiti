/****************************************************
 * 创建人：     @author zoujian
 * 创建时间: 2019年6月10日/下午5:52:56
 * 项目名称：  FRONTEND
 * 文件名称: RepoDialogService
 * 文件描述: @Description: (回购参数增删改界面Service)
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/
import AxiosFun from "../../../api/AxiosFun";
import { ParamRepoRepVO } from "../vo/ParamRepoVO";
export default class RepoDialogService {
    /** 新增回购参数属性 */
    public add(paramRepoVO: ParamRepoRepVO) {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/param/repo/",
            paramRepoVO
        );
    }
    /** 获取前20个符合条件的securityCode */
    public securityCodeList(securityCode: string, marketCode: string) {
        return AxiosFun.get(
            AxiosFun.basicParameterServiceName + "/param/repo/securityCodeList",
            {
                securityCode,
                marketCode
            }
        );
    }
    /** 修改回购参数 */
    public update(paramRepoVO: ParamRepoRepVO) {
        return AxiosFun.put(
            AxiosFun.basicParameterServiceName + "/param/repo/",
            paramRepoVO
        );
    }
    /** 单个删除回购参数属性 */
    public del(id: number) {
        return AxiosFun.winDelete(
            AxiosFun.basicParameterServiceName + "/param/repo/" + id,
            {}
        );
    }
}
