package com.win.dfas.service.impl;

import cn.hutool.json.JSONUtil;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.win.dfas.common.util.ObjectUtils;
import com.win.dfas.common.util.PrimaryKeyUtil;
import com.win.dfas.common.util.WinExceptionUtil;
import com.win.dfas.constant.BpmExceptionEnum;
import com.win.dfas.dao.FlowGroupMapper;
import com.win.dfas.dao.ParamFlowInstMapper;
import com.win.dfas.entity.FlowGroup;
import com.win.dfas.entity.ParamFlowInst;
import com.win.dfas.service.IFlowGroupService;
import com.win.dfas.util.DataBaseExceptionUtil;
import com.win.dfas.vo.request.ParamFlowGroupReqVO;
import com.win.dfas.vo.request.ParamFlowGroupUpdateReqVO;
import com.win.dfas.vo.response.DeleteEnum;
import com.win.dfas.vo.response.ParamFlowGroupRepVO;
import com.win.dfas.vo.response.ParamFlowRepVO;
import com.win.dfas.vo.response.item.FlowTypeItem;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.DataTruncation;
import java.util.List;

/**
 * 包名称：com.win.dfas.service.impl
 * 类名称：FlowGroupService
 * 类描述：${TODO}
 * 创建人：@author wanglei
 * 创建时间：2019/6/13/16:15
 */
@Service
@Slf4j
public class FlowGroupServiceImpl implements IFlowGroupService {
    @Autowired
    private FlowGroupMapper flowGroupMapper;
    @Override
    public  List<ParamFlowGroupRepVO> list() {
         List<ParamFlowGroupRepVO> flowGroups = flowGroupMapper.list();
          return flowGroups;
    }

    @Override
    public void add(ParamFlowGroupReqVO vo) {
        vo.setId(PrimaryKeyUtil.generateId());
        FlowGroup entity = new FlowGroup();
        BeanUtils.copyProperties(vo, entity);
        try {
            flowGroupMapper.insert(entity);
        }catch (Throwable throwable){
            DataBaseExceptionUtil.exceptionHandler(throwable);
        }
    }

    @Override
    public void update(ParamFlowGroupReqVO vo) {
        FlowGroup entity = new FlowGroup();
        BeanUtils.copyProperties(vo, entity);
        try {
            flowGroupMapper.updateByPrimaryKey(entity);
        }catch (Throwable throwable){
            DataBaseExceptionUtil.exceptionHandler(throwable);
        }
    }

    @Override
    public void delete(Long id) {
        flowGroupMapper.deleteByPrimaryKey(id);
    }

    @Override
    public Long getFlowGroupId() {
        return PrimaryKeyUtil.generateId();
    }

    @Override
    public DeleteEnum queryFlowByType(Long flowId) {
        int flowInstCount =  flowGroupMapper.selectCountFlowInst(flowId);
        if(flowInstCount>0){
            return DeleteEnum.EXIST_INST;
        }
        int groupCount =  flowGroupMapper.selectCountGroup(flowId);
        if(groupCount >0){
            return DeleteEnum.EXIST_GROUP;
        }
        return DeleteEnum.ONLY_CLASS;
    }

    @Override
    public int merger(ParamFlowGroupReqVO reqVO) {
        FlowGroup flowGroup = flowGroupMapper.selectByPrimaryKey(reqVO.getId());
        FlowGroup entity = new FlowGroup();
        BeanUtils.copyProperties(reqVO, entity);

        if(flowGroup==null){
            try {
                flowGroupMapper.insert(entity);
            }catch (Throwable throwable){
                DataBaseExceptionUtil.exceptionHandler(throwable);
            }
            return 0;
        }else{
            try {
                flowGroupMapper.updateByPrimaryKey(entity);
            }catch (Throwable throwable){
                DataBaseExceptionUtil.exceptionHandler(throwable);
            }
            return 1;
        }
    }

    @Override
    public List<FlowTypeItem> listFlowClass() {
        return flowGroupMapper.listFlowClass();
    }
}
