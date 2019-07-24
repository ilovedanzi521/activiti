/****************************************************
 * 创建人：  @author wanglei
 * 创建时间: 2019-07-11 13:55:33
 * 项目名称：dfas-common-schedule
 * 文件名称: CellTaskService.ts
 * 文件描述: @Description: 基础任务表 服务类
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/

import AxiosFun from "../../../api/AxiosFun";
import { WinResponseData } from "../../common/vo/BaseVO";
import CellTaskReqVO from "../vo/CellTaskReqVO";
/**
 * <p>
 * 基础任务表 服务类
 * </p>
 *
 * @author wanglei
 * @since 2019-07-11 13:55:33
 */
export default class CellTaskService {
    /**
     * 基础任务表 列表查询
     *
     * @Title: list
     * @param reqVO
     * @return List<CellTask>
     * @throws
     * @author: wanglei
     * @Date:  2019-07-11 13:55:33
     */
    public list(reqVO: CellTaskReqVO): Promise<WinResponseData> {
        return AxiosFun.post(
            "/dfas-common-schedule/scheduler/task/list",
            reqVO
        );
    }

    /**
     * 基础任务表 基础任务表分页列表查询
     *
     * @Title: list
     * @param reqVO
     * @return List<CellTask>
     * @throws
     * @author: wanglei
     * @Date:  2019-07-11 13:55:33
     */
    public pageList(reqVO: CellTaskReqVO): Promise<WinResponseData> {
        return AxiosFun.post(
            "/dfas-common-schedule/scheduler/task/pageList",
            reqVO
        );
    }
    /**
     * 基础任务表 新增
     *
     * @Title: list
     * @param reqVO
     * @return List<CellTask>
     * @throws
     * @author: wanglei
     * @Date:  2019-07-11 13:55:33
     */
    public add(reqVO: CellTaskReqVO): Promise<WinResponseData> {
        return AxiosFun.post("/dfas-common-schedule/scheduler/task/add", reqVO);
    }

    /**
     * 基础任务表 修改
     *
     * @Title: list
     * @param reqVO
     * @return string
     * @throws
     * @author: wanglei
     * @Date:  2019-07-11 13:55:33
     */
    public update(reqVO: CellTaskReqVO): Promise<WinResponseData> {
        return AxiosFun.post(
            "/dfas-common-schedule/scheduler/task/update",
            reqVO
        );
    }

    /**
     * 基础任务表 删除
     *
     * @Title: list
     * @param reqVO
     * @return string
     * @throws
     * @author: wanglei
     * @Date:  2019-07-11 13:55:33
     */
    public delete(reqVO: CellTaskReqVO): Promise<WinResponseData> {
        return AxiosFun.post(
            "/dfas-common-schedule/scheduler/task/delete",
            reqVO
        );
    }
    /**
     * 基础任务表 删除
     *
     * @Title: list
     * @param reqVO
     * @return string
     * @throws
     * @author: wanglei
     * @Date:  2019-07-11 13:55:33
     */
    public exec(reqVO: CellTaskReqVO): Promise<WinResponseData> {
        return AxiosFun.post(
            "/dfas-common-schedule/scheduler/task/exec",
            reqVO
        );
    }
}
