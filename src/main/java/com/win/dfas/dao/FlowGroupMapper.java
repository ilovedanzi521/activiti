package com.win.dfas.dao;

import com.win.dfas.entity.FlowGroup;
import com.win.dfas.vo.response.ParamFlowGroupRepVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
@Mapper
public interface FlowGroupMapper {
    int deleteByPrimaryKey(Long id);

    int insert(FlowGroup record);

    int insertSelective(FlowGroup record);

    FlowGroup selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(FlowGroup record);

    int updateByPrimaryKey(FlowGroup record);

    List<ParamFlowGroupRepVO> list();

    int selectCountGroup(Long flowId);


    int selectCountFlowInst(Long flowId);
}
