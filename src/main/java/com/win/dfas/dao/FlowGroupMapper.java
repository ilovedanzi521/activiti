package com.win.dfas.dao;

import com.win.dfas.entity.FlowGroup;
import com.win.dfas.vo.response.ParamFlowGroupRepVO;
import com.win.dfas.vo.response.item.FlowTypeItem;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
/**
 * 包名称：com.win.dfas.dao
 * 类名称：FlowGroupMapper
 * 类描述：FlowGroupMapper
 * 创建人：@author wanglei
 * 创建时间：2019/8/6/10:20
 */

@Mapper
public interface FlowGroupMapper {
    /**
     * @Title: deleteByPrimaryKey
     * @Description 根据主键删除
     * @param id
     * @return int
     * @throws
     * @author wanglei
     * @Date 2019/8/6/11:02
     */
    int deleteByPrimaryKey(Long id);
    /**
     * @Title: insert
     * @Description 插入新增信息
     * @param record
     * @return int
     * @throws
     * @author wanglei
     * @Date 2019/8/6/11:03
     */
    int insert(FlowGroup record);
    /**
     * @Title: insertSelective
     * @Description 插入新增主键信息
     * @param record
     * @return int
     * @throws
     * @author wanglei
     * @Date 2019/8/6/11:03
     */
    int insertSelective(FlowGroup record);
    /**
     * @Title: selectByPrimaryKey
     * @Description 根据主键查询信息
     * @param id
     * @return com.win.dfas.entity.FlowGroup
     * @throws
     * @author wanglei
     * @Date 2019/8/6/11:03
     */
    FlowGroup selectByPrimaryKey(Long id);
    /**
     * @Title: updateByPrimaryKeySelective
     * @Description 更新信息
     * @param record
     * @return int
     * @throws
     * @author wanglei
     * @Date 2019/8/6/11:03
     */
    int updateByPrimaryKeySelective(FlowGroup record);
    /**
     * @Title: updateByPrimaryKey
     * @Description 根据主键更新
     * @param record
     * @return int
     * @throws
     * @author wanglei
     * @Date 2019/8/6/11:04
     */
    int updateByPrimaryKey(FlowGroup record);
    /**
     * @Title: list
     * @Description 全量查询
     * @param
     * @return java.util.List<com.win.dfas.vo.response.ParamFlowGroupRepVO>
     * @throws
     * @author wanglei
     * @Date 2019/8/6/11:04
     */
    List<ParamFlowGroupRepVO> list();
    /**
     * @Title: selectCountGroup
     * @Description 根据流程id获取流程组信息数量
     * @param flowId
     * @return int
     * @throws
     * @author wanglei
     * @Date 2019/8/6/11:04
     */
    int selectCountGroup(Long flowId);
    /**
     * @Title: selectCountFlowInst
     * @Description 根据流程id获取流程实际id的数量
     * @param flowId
     * @return int
     * @throws
     * @author wanglei
     * @Date 2019/8/6/11:05
     */
    int selectCountFlowInst(Long flowId);
    /**
     * @Title: listFlowClass
     * @Description 获取流程类型信息
     * @param
     * @return java.util.List<com.win.dfas.vo.response.item.FlowTypeItem>
     * @throws
     * @author wanglei
     * @Date 2019/8/6/11:05
     */
    List<FlowTypeItem> listFlowClass();
}
