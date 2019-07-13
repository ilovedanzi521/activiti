package com.win.dfas.bpm.dao;

import com.win.dfas.bpm.entity.FlowAssigners;
import com.win.dfas.bpm.entity.FlowAssignersKey;
import com.win.dfas.bpm.vo.response.AllFlowAssignersRepVO;
import com.win.dfas.bpm.vo.response.FlowAssignersRepVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface FlowAssignersMapper {
    int deleteByPrimaryKey(FlowAssignersKey key);

    int insert(FlowAssigners record);

    int insertSelective(FlowAssigners record);

    FlowAssigners selectByPrimaryKey(FlowAssignersKey key);

    int updateByPrimaryKeySelective(FlowAssigners record);

    int updateByPrimaryKey(FlowAssigners record);

    List<AllFlowAssignersRepVO> queryAllDescribe(String modelId);

    List<FlowAssignersRepVO> queryNodeDescribe(String modelId, String nodeId);
}
