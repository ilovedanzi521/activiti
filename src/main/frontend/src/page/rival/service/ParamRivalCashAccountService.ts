/****************************************************
 * 创建人：  @author zhongyuqi
 * 创建时间: 2019-07-11 13:33:24
 * 项目名称：dfbp-repo-manage
 * 文件名称: ParamRivalCashAccountService.ts
 * 文件描述: @Description: 对手方-资金账户信息表 服务类
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/

import AxiosFun from "../../../api/AxiosFun";
import { WinResponseData } from "../../common/vo/BaseVO";
import {
    ParamRivalCashAccountReqVO,
    ParamRivalCashAccountRepVO
} from "../vo/ParamRivalCashAccountVO";
/**
 * <p>
 * 对手方-资金账户信息表 服务类
 * </p>
 *
 * @author zhongyuqi
 * @since 2019-07-11 13:33:24
 */
export default class ParamRivalCashAccountService {
    /**
     * 对手方-资金账户信息表 列表查询
     *
     * @Title: list
     * @param reqVO
     * @return List<ParamRivalCashAccount>
     * @throws
     * @author: zhongyuqi
     * @Date:  2019-07-11 13:33:24
     */
    public pageList(
        reqVO: ParamRivalCashAccountReqVO
    ): Promise<WinResponseData> {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/rival/cashAccount/pageList",
            reqVO
        );
    }

    /**
     * 对手方-资金账户信息表 新增
     *
     * @Title: insert
     * @param reqVO
     * @return WinResponseData
     * @throws
     * @author: zhongyuqi
     * @Date:  2019-07-10 17:37:53
     */
    public insert(reqVO: ParamRivalCashAccountRepVO): Promise<WinResponseData> {
        return AxiosFun.post(
            AxiosFun.basicParameterServiceName + "/rival/cashAccount",
            reqVO
        );
    }
    /**
     * 对手方-资金账户信息表 修改
     *
     * @Title: update
     * @param reqVO
     * @return WinResponseData
     * @throws
     * @author: zhongyuqi
     * @Date:  2019-07-10 17:37:53
     */
    public update(reqVO: ParamRivalCashAccountRepVO): Promise<WinResponseData> {
        return AxiosFun.put(
            AxiosFun.basicParameterServiceName + "/rival/cashAccount",
            reqVO
        );
    }
    /**
     * 对手方-资金账户信息表 逻辑删除
     *
     * @Title: delete
     * @param reqVO
     * @return WinResponseData
     * @throws
     * @author: zhongyuqi
     * @Date:  2019-07-10 17:37:53
     */
    public delete(reqVO: ParamRivalCashAccountRepVO): Promise<WinResponseData> {
        return AxiosFun.winDelete(
            AxiosFun.basicParameterServiceName + "/rival/cashAccount",
            reqVO
        );
    }

    /**
     * 批量删除资金账户
     * @param ids
     */
    public delBatch(ids: string): Promise<WinResponseData> {
        return AxiosFun.winDelete(
            AxiosFun.basicParameterServiceName +
                "/rival/cashAccount/delBatch/" +
                ids,
            {}
        );
    }
}
