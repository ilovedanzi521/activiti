/****************************************************
 * 创建人：     @author wanglei
 * 创建时间: 2019/6/11/11:48
 * 项目名称：dfbp-common-basicparameter
 * 文件名称: IParamFlowService.java
 * 文件描述: @Description:
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/

package com.win.dfas.service;

import com.github.pagehelper.PageInfo;
import com.win.dfas.vo.request.ParamFlowReqVO;
import com.win.dfas.vo.response.ParamFlowRepVO;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 包名称：com.win.dfas.service
 * 类名称：IParamFlowService
 * 类描述：流程服务接口
 * 创建人：@author wanglei
 * 创建时间：2019/6/11/11:48
 *
 */
@Service
public interface IParamFlowService {

    /**
     * @Title: list
     * @Description: 查询流程列表
     * @param queryVO 查询参数
     * @return PageInfo<ParamFlowRepVO> 分页数据
     * @throws
     * @author: wanglei
     * @Date:  2019/6/11/11:48
     */
    PageInfo<ParamFlowRepVO> list(ParamFlowReqVO queryVO);

    /**
     * @Title: add
     * @Description: 流程新增
     * @param vo 新增参数
     * @return
     * @throws
     * @author: wanglei
     * @Date:  2019/6/11/11:51
     */
    void add(ParamFlowRepVO vo);

    /**
     * @Title: update
     * @Description: 流程修改
     * @param
     * @return
     * @throws
     * @author: wanglei
     * @Date:  2019/6/11/11:51
     */
    void update(ParamFlowRepVO vo);

    /**
     * @Title: delete
     * @Description: 流程删除
     * @param id 流程ID
     * @return
     * @throws
     * @author: wanglei
     * @Date:  2019/6/11/11:51
     */
    void delete(Long id);

    void batchDelete(List ids);
    PageInfo<ParamFlowRepVO> queryFlowByGroupid(ParamFlowReqVO queryVO);

    /**
     * 更新启停标志to stop
     * @param ids
     */
    void updateStartFlagToStop(List<Long> ids);

    /**
     * 更新启停标志
     * @param ids
     */
    void updateStartFlagToStart(List<Long> ids);
    /**
     * @Title: queryProcessDefIdfromFlowInst
     * @Description: 根据流程唯一索引查询流程定义id
     * @param queryVO
     * @return java.lang.String
     * @throws
     * @author wanglei
     * @Date 2019/7/11/11:34
     */
    String queryProcessDefIdfromFlowInst(ParamFlowReqVO queryVO);
}
