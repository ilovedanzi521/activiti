/****************************************************
 * 创建人：     @author wanglei
 * 创建时间: 2019/6/11/13:46
 * 项目名称：dfbp-common-basicparameter
 * 文件名称: ParamFlowServiceImpl.java
 * 文件描述: @Description:
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/

package com.win.dfas.service.impl;

import cn.hutool.core.util.ObjectUtil;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.win.dfas.common.entity.BaseEntity;
import com.win.dfas.common.util.ObjectUtils;
import com.win.dfas.common.util.PrimaryKeyUtil;
import com.win.dfas.common.util.WinExceptionUtil;
import com.win.dfas.constant.BpmExceptionEnum;
import com.win.dfas.dao.ParamFlowInstMapper;
import com.win.dfas.entity.ParamFlowInst;
import com.win.dfas.service.IParamFlowService;
import com.win.dfas.vo.request.ParamFlowReqVO;
import com.win.dfas.vo.response.ParamFlowRepVO;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 包名称：com.win.dfas.service.impl
 * 类名称：ParamFlowServiceImpl
 * 类描述：流程服务实现类
 * 创建人：@author wanglei
 * 创建时间：2019/6/11/13:46
 *
 */
@Service
public class ParamFlowServiceImpl implements IParamFlowService {

    @Autowired
    private ParamFlowInstMapper paramFlowMapper;

    @Override
    public PageInfo<ParamFlowRepVO> list(ParamFlowReqVO queryVO) {
        PageHelper.startPage(queryVO.getReqPageNum(),queryVO.getReqPageSize());
        List<ParamFlowInst> flows = paramFlowMapper.list(queryVO);
        PageInfo<ParamFlowInst> pageInfo = new PageInfo<ParamFlowInst>(flows);
		return ObjectUtils.copyPageInfo(pageInfo, ParamFlowRepVO.class);
    }

    @Override
    public void add(ParamFlowRepVO vo) {
//        if(StrUtil.isBlank(vo.get)) {
//            throw ParameterExceptionUtil.winException(WinRspTypeEnum.EXCHANGE_RATE_SOURCE_NOT_NULL);
//        }
//        vo.setId(PrimaryKeyUtil.generateId());
        ParamFlowInst entity = new ParamFlowInst();
        BeanUtils.copyProperties(vo, entity);
//        entity.setId(PrimaryKeyUtil.generateId());
        entity.preInsert();
        ParamFlowReqVO reqVO = new ParamFlowReqVO();
        BeanUtils.copyProperties(vo, reqVO);
        if(paramFlowMapper.queryIdFromFlowInst(reqVO)!=null){
            throw WinExceptionUtil.winException(BpmExceptionEnum.NOTUNIQUEKEY);
        }else {
            paramFlowMapper.insert(entity);
        }
    }

    @Override
    public void update(ParamFlowRepVO vo) {
        ParamFlowReqVO reqVO = new ParamFlowReqVO();
        BeanUtils.copyProperties(vo, reqVO);
        Long id = paramFlowMapper.queryIdFromFlowInst(reqVO);
        if(id==null || id.equals(vo.getId())){
            ParamFlowInst entity = new ParamFlowInst();
            BeanUtils.copyProperties(vo, entity);
            paramFlowMapper.updateByPrimaryKeySelective(entity);
        }else{
            throw WinExceptionUtil.winException(BpmExceptionEnum.NOTUNIQUEKEY);
        }
    }

    @Override
    public void delete(Long id) {
        if(ObjectUtil.isNull(id)) {
            //TODO
        }

        paramFlowMapper.deleteByPrimaryKey(id);
    }

    @Override
    public void batchDelete(List ids) {
        paramFlowMapper.batchDelete(ids);
    }

    @Override
    public  PageInfo<ParamFlowRepVO>  queryFlowByGroupid(ParamFlowReqVO queryVO) {
        PageHelper.startPage(queryVO.getReqPageNum(),queryVO.getReqPageSize());
        List<ParamFlowInst> flows =paramFlowMapper.queryFlowByGroupid(queryVO.getFlowCode());
        PageInfo<ParamFlowInst> pageInfo = new PageInfo<ParamFlowInst>(flows);
        return ObjectUtils.copyPageInfo(pageInfo, ParamFlowRepVO.class);
    }

    @Override
    public void updateStartFlagToStop(List<Long> ids) {
        paramFlowMapper.updateStartFlagToStop(ids);
    }

    @Override
    public void updateStartFlagToStart(List<Long> ids) {
        paramFlowMapper.updateStartFlagToStart(ids);
    }

    @Override
    public String queryProcessDefIdfromFlowInst(ParamFlowReqVO queryVO) {
        return  paramFlowMapper.queryProcessDefIdfromFlowInst(queryVO);
    }
}
