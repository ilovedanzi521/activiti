package com.win.dfas.dao;

import com.win.dfas.entity.ParamFlowInst;
import com.win.dfas.vo.request.ParamFlowReqVO;
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

    int updateStartFlagToStop(List<String> ids);

    int updateStartFlagToStart(List<Long> ids);

    String queryProcessDefIdfromFlowInst(ParamFlowReqVO queryVO);
}
