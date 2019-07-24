/****************************************************
 * 创建人：  @author zhongyuqi
 * 创建时间: 2019-07-10 17:37:53
 * 项目名称：dfbp-repo-manage
 * 文件名称: ParamRivalBankAccountService.ts
 * 文件描述: @Description: 对手方-托管行账户信息表 服务类
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/

import AxiosFun from "../../../api/AxiosFun";
import { WinResponseData } from "../../common/vo/BaseVO";
import {
    ParamRivalBankAccountReqVO,
    ParamRivalBankAccountRepVO
} from "../vo/ParamRivalBankAccountVO";
/**
 * <p>
 * 对手方-托管行账户信息表 服务类
 * </p>
 *
 * @author zhongyuqi
 * @since 2019-07-10 17:37:53
 */
export default class ParamRivalBankAccountService {
    /**
     * 对手方-托管行账户信息表 列表查询
     *
     * @Title: list
     * @param reqVO
     * @return List<ParamRivalBankAccount>
     * @throws
     * @author: zhongyuqi
     * @Date:  2019-07-10 17:37:53
     */
    public pageList(
        reqVO: ParamRivalBankAccountReqVO
    ): Promise<WinResponseData> {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/rival/bankAccount/pageList",
            reqVO
        );
    }
    /**
     * 对手方-托管行账户信息表 新增
     *
     * @Title: insert
     * @param reqVO
     * @return WinResponseData
     * @throws
     * @author: zhongyuqi
     * @Date:  2019-07-10 17:37:53
     */
    public insert(reqVO: ParamRivalBankAccountRepVO): Promise<WinResponseData> {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/rival/bankAccount",
            reqVO
        );
    }
    /**
     * 对手方-托管行账户信息表 修改
     *
     * @Title: update
     * @param reqVO
     * @return WinResponseData
     * @throws
     * @author: zhongyuqi
     * @Date:  2019-07-10 17:37:53
     */
    public update(reqVO: ParamRivalBankAccountRepVO): Promise<WinResponseData> {
        return AxiosFun.put(
            AxiosFun.basicParameterServiceName + "/rival/bankAccount",
            reqVO
        );
    }
    /**
     * 对手方-托管行账户信息表 逻辑删除
     *
     * @Title: delete
     * @param reqVO
     * @return WinResponseData
     * @throws
     * @author: zhongyuqi
     * @Date:  2019-07-10 17:37:53
     */
    public delete(reqVO: ParamRivalBankAccountRepVO): Promise<WinResponseData> {
        return AxiosFun.winDelete(
            AxiosFun.basicParameterServiceName + "/rival/bankAccount",
            reqVO
        );
    }

    /**
     * 批量删除托管行账户
     * @param ids
     */
    public delBatch(ids: string): Promise<WinResponseData> {
        return AxiosFun.winDelete(
            AxiosFun.basicParameterServiceName +
                "/rival/bankAccount/delBatch/" +
                ids,
            {}
        );
    }
}
