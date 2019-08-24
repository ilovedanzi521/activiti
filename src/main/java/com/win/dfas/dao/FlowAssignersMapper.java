package com.win.dfas.dao;

import com.win.dfas.bpm.entity.FlowAssigners;
import com.win.dfas.bpm.entity.FlowAssignersKey;
import com.win.dfas.bpm.vo.request.FlowAssignersReqVO;
import com.win.dfas.bpm.vo.response.AllFlowAssignersRepVO;
import com.win.dfas.bpm.vo.response.FlowAssignersRepVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
/**
 * 包名称：com.win.dfas.dao
 * 类名称：FlowAssignersMapper
 * 类描述：FlowAssignersMapper
 * 创建人：@author wanglei
 * 创建时间：2019/8/6/10:20
 */
@Mapper
public interface FlowAssignersMapper {
    /**
     * @Title: deleteByPrimaryKey
     * @Description: 用户信息删除
     * @param key
     * @return int
     * @throws
     * @author wanglei
     * @Date 2019/8/6/10:42
     */
    int deleteByPrimaryKey(FlowAssignersKey key);
    /**
     * @Title: insert
     * @Description: 流程接地那用户信息插入
     * @param record
     * @return int
     * @throws
     * @author wanglei
     * @Date 2019/8/6/10:43
     */
    int insert(FlowAssigners record);
    /**
     * @Title: selectByPrimaryKey
     * @Description: 根据主键查询用户信息
     * @param key
     * @return com.win.dfas.bpm.entity.FlowAssigners
     * @throws
     * @author wanglei
     * @Date 2019/8/6/10:43
     */
    FlowAssigners selectByPrimaryKey(FlowAssignersKey key);
    /**
     * @Title: updateByPrimaryKeySelective
     * @Description:根据主键更新数据
     * @param record
     * @return int
     * @throws
     * @author wanglei
     * @Date 2019/8/6/10:44
     */
    int updateByPrimaryKeySelective(FlowAssigners record);
    /**
     * @Title: updateByPrimaryKey
     * @Description: 更新数据
     * @param record
     * @return int
     * @throws
     * @author wanglei
     * @Date 2019/8/6/10:45
     */
    int updateByPrimaryKey(FlowAssigners record);
    /**
     * @Title: queryAllDescribe
     * @Description: 根据modelId查询用户信息
     * @param modelId
     * @return java.util.List<com.win.dfas.bpm.vo.response.AllFlowAssignersRepVO>
     * @throws
     * @author wanglei
     * @Date 2019/8/6/10:45
     */
    List<AllFlowAssignersRepVO> queryAllDescribe(String modelId);
    /**
     * @Title: queryNodeDescribe
     * @Description:根据modelId和nodeId获取用户信息
     * @param modelId
     * @param nodeId
     * @return java.util.List<com.win.dfas.bpm.vo.response.FlowAssignersRepVO>
     * @throws
     * @author wanglei
     * @Date 2019/8/6/10:46
     */
    List<FlowAssignersRepVO> queryNodeDescribe(String modelId, String nodeId);
    /**
     * @Title: listUserInfoToType
     * @Description: 根据taskType获取用户信息、
     * @param taskType
     * @return java.util.List<java.lang.String>
     * @throws
     * @author wanglei
     * @Date 2019/8/6/10:47
     */
    List<String> listUserInfoToType(@Param("taskType")String taskType);
    /**
     * @Title: updateTaskTypeToModel
     * @Description: 根据数据的taskType信息
     * @param flowAssignersReqVO
     * @return int
     * @throws
     * @author wanglei
     * @Date 2019/8/6/10:48
     */
    int updateTaskTypeToModel(FlowAssignersReqVO flowAssignersReqVO);
    /**
     * @Title: selectByNodeId
     * @Description: 根据nodeId获取信息
     * @param flowAssignersReqVO
     * @return java.util.List<com.win.dfas.bpm.entity.FlowAssigners>
     * @throws
     * @author wanglei
     * @Date 2019/8/6/10:48
     */
    List<FlowAssigners> selectByNodeId(FlowAssignersReqVO flowAssignersReqVO);
}
