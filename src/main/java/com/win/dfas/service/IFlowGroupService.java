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
import com.win.dfas.vo.request.ParamFlowGroupReqVO;
import com.win.dfas.vo.request.ParamFlowReqVO;
import com.win.dfas.vo.response.DeleteEnum;
import com.win.dfas.vo.response.ParamFlowGroupRepVO;
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
public interface IFlowGroupService {

    /**
     * @Title: list
     * @Description: 查询流程类列表
     * @return PageInfo<ParamFlowRepVO> 分页数据
     * @throws
     * @author: wanglei
     * @Date:  2019/6/11/11:48
     */
    List<ParamFlowGroupRepVO> list();

    /**
     * @Title: add
     * @Description: 流程类新增
     * @param vo 新增参数
     * @return
     * @throws
     * @author: wanglei
     * @Date:  2019/6/11/11:51
     */
    void add(ParamFlowGroupReqVO vo);

    /**
     * @Title: update
     * @Description: 流程类修改
     * @param
     * @return
     * @throws
     * @author: wanglei
     * @Date:  2019/6/11/11:51
     */
    void update(ParamFlowGroupReqVO vo);

    /**
     * @Title: delete
     * @Description: 流程删除
     * @param id 流程id
     * @return
     * @throws
     * @author: wanglei
     * @Date:  2019/6/11/11:51
     */
    void delete(Long id);

    Long getFlowGroupId();

    DeleteEnum queryFlowByType(Long flowId);

}
