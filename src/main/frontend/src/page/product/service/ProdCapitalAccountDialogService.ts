/****************************************************
 * 创建人：     @author zoujian
 * 创建时间: 2019年6月26日/下午5:52:56
 * 项目名称：  FRONTEND
 * 文件名称: ProdFundsAccountInfoDialogService
 * 文件描述: @Description: (券商资金账户Service)
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/
import AxiosFun from "../../../api/AxiosFun";
import {
    ProdCapitalAccountRepVO,
    ProdCapitalAccountReqVO
} from "../vo/ProdCapitalAccountVO";
export default class ProdCapitalAccountDialogService {
    /**
     * 新增券商资金账户
     * @param prodCapitalAccountRepVO
     */
    public insert(prodCapitalAccountRepVO: ProdCapitalAccountRepVO) {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/prod/capitalAccount/",
            prodCapitalAccountRepVO
        );
    }

    /**
     * 修改券商资金账户
     * @param paramFundVO
     */
    public update(prodCapitalAccountRepVO: ProdCapitalAccountRepVO) {
        return AxiosFun.put(
            AxiosFun.basicParameterServiceName + "/prod/capitalAccount/",
            prodCapitalAccountRepVO
        );
    }

    /**
     * 单个删除券商资金账户
     * @param id
     */
    public del(id: number) {
        return AxiosFun.winDelete(
            AxiosFun.basicParameterServiceName + "/prod/capitalAccount/" + id,
            {}
        );
    }

    /**
     * 查询券商列表数据
     * @param prodCapitalAccountReqVO
     */
    public brokerList(prodCapitalAccountReqVO: ProdCapitalAccountReqVO) {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName +
                "/prod/capitalAccount/brokerList",
            prodCapitalAccountReqVO
        );
    }

    /**
     * 查询营业部列表数据
     * @param prodCapitalAccountReqVO
     */
    public departmentList(prodCapitalAccountReqVO: ProdCapitalAccountReqVO) {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName +
                "/prod/capitalAccount/brokerDepartmentList",
            prodCapitalAccountReqVO
        );
    }

    /** 获取券商资金账户信息列表数据 */
    public list(prodCapitalAccountReqVO: ProdCapitalAccountReqVO) {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/prod/capitalAccount/list",
            prodCapitalAccountReqVO
        );
    }
}
