package com.win.dfas.dao;

import com.win.dfas.entity.ParamFlowInst;
import com.win.dfas.vo.request.ParamFlowReqVO;
import com.win.dfas.vo.response.item.FlowNameItem;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
@Mapper
public interface ParamFlowInstMapper {
    int deleteByPrimaryKey(Long id);

    int insert(ParamFlowInst record);

    int insertSelective(ParamFlowInst record);

    ParamFlowInst selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(ParamFlowInst record);

    int updateByPrimaryKey(ParamFlowInst record);
    List<ParamFlowInst> list(ParamFlowReqVO queryVO);

    int batchDelete(List ids);

    List<ParamFlowInst> queryFlowByGroupid(Long flowGroupId);

    int updateStartFlagToStop(List<Long> ids);

    int updateStartFlagToStart(List<Long> ids);

    String queryProcessDefIdfromFlowInst(ParamFlowReqVO queryVO);

    Long queryIdFromFlowInst(ParamFlowReqVO queryVO);

    List<FlowNameItem> listFlowName();
}
