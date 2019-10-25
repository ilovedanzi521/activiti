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
import com.win.dfas.common.util.ObjectUtils;
import com.win.dfas.common.util.WinExceptionUtil;
import com.win.dfas.constant.BpmExceptionEnum;
import com.win.dfas.dao.ParamFlowInstMapper;
import com.win.dfas.entity.ParamFlowInst;
import com.win.dfas.service.IParamFlowService;
import com.win.dfas.util.DataBaseExceptionUtil;
import com.win.dfas.vo.request.ParamFlowReqVO;
import com.win.dfas.vo.response.ParamFlowRepVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

/**
 * 包名称：com.win.dfas.service.impl
 * 类名称：ParamFlowServiceImpl
 * 类描述：流程服务实现类
 * 创建人：@author wanglei
 * 创建时间：2019/6/11/13:46
 *
 */
@Slf4j
@Service
public class ParamFlowServiceImpl implements IParamFlowService {

    @Autowired
    private ParamFlowInstMapper paramFlowMapper;

    @Override
    public PageInfo<ParamFlowRepVO> list(ParamFlowReqVO queryVO) {
        PageHelper.startPage(queryVO.getReqPageNum(),queryVO.getReqPageSize());
        List<ParamFlowRepVO> flows = paramFlowMapper.list(queryVO);
        ObjectUtils.formatList(flows, ParamFlowRepVO.class);

		return new PageInfo<ParamFlowRepVO>(flows);
    }

    @Override
    public void add(ParamFlowRepVO vo) {
        ParamFlowInst entity = new ParamFlowInst();
        BeanUtils.copyProperties(vo, entity);
        entity.preInsert();
        ParamFlowReqVO reqVO = new ParamFlowReqVO();
        BeanUtils.copyProperties(vo, reqVO);
        if(paramFlowMapper.queryIdFromFlowInst(reqVO)!=null){
            log.error("入参:{}",reqVO.primaryKey());
            throw WinExceptionUtil.winException(BpmExceptionEnum.NOTUNIQUEKEY);
        }else {
            try {
                paramFlowMapper.insert(entity);
            }catch (Throwable throwable){
                DataBaseExceptionUtil.exceptionHandler(throwable);
            }
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
            try{
                paramFlowMapper.updateByPrimaryKeySelective(entity);
            }catch (Throwable throwable){
                DataBaseExceptionUtil.exceptionHandler(throwable);
            }
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
        List<ParamFlowRepVO> flows =paramFlowMapper.queryFlowByGroupid(queryVO.getFlowCode());
        ObjectUtils.formatList(flows, ParamFlowRepVO.class);
        return new PageInfo<ParamFlowRepVO>(flows);
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
        List<ParamFlowRepVO> list =  paramFlowMapper.queryProcessDefIdfromFlowInst(queryVO);
        if(list.size()==0){
            throw WinExceptionUtil.winException(BpmExceptionEnum.NOT_EXIST_FUND_INFO);
        }
        ParamFlowRepVO sourceParamFlowRepVO = new ParamFlowRepVO();
        sourceParamFlowRepVO.setSecurityType(queryVO.getSecurityType());
        sourceParamFlowRepVO.setInstructionType(queryVO.getInstructionType());
        sourceParamFlowRepVO.setMarketCode(queryVO.getMarketCode());
        sourceParamFlowRepVO.setInvestCompany(queryVO.getInvestCompany());
        sourceParamFlowRepVO.setInvestConstitute(queryVO.getInvestConstitute());
        LinkedHashMap<Integer,String> map = parseParamFlowRepVO(sourceParamFlowRepVO);
        return fetchRecord(map,list);
    }
    private String fetchRecord(LinkedHashMap<Integer,String> map,List<ParamFlowRepVO> list){
        String processDefId = null;
        LinkedList<String> tmpList = new LinkedList<>();
        for (ParamFlowRepVO paramFlowRepVO : list) {
            processDefId = paramFlowRepVO.getProcessDefId();
            tmpList.addFirst(processDefId);
            LinkedHashMap<Integer,String> tempMap = parseParamFlowRepVO(paramFlowRepVO);
            for (Map.Entry<Integer, String> entry : map.entrySet()) {
                Integer key = entry.getKey();
                String value = entry.getValue();
                if(value.equals(tempMap.get(key))){
                }else if(tempMap.get(key)==null){
                    continue;
                }else{
                    tmpList.removeFirst();
                    break;
//                    processDefId = fetchRecord(map,list);
                }
            }
        }

        return tmpList.getFirst();
    }

    private LinkedHashMap<Integer,String> parseParamFlowRepVO(ParamFlowRepVO queryVO){
        LinkedHashMap<Integer,String> map = new LinkedHashMap<Integer,String>();
        if(ObjectUtil.isNotEmpty(queryVO.getSecurityType())){
            map.put(5,queryVO.getSecurityType());
        }
        //指令类型
        if(ObjectUtil.isNotEmpty(queryVO.getInstructionType())){
            map.put(4,queryVO.getInstructionType());
        }
        String instructionType=queryVO.getInstructionType();
        //交易市场
        if(ObjectUtil.isNotEmpty(queryVO.getMarketCode())){
            map.put(3,queryVO.getMarketCode());
        }
        String marketCode=queryVO.getMarketCode();
        //组合
        if(ObjectUtil.isNotEmpty(queryVO.getInvestConstitute())){
            map.put(2,queryVO.getInvestConstitute());
        }
        String investConstitute=queryVO.getInvestConstitute();
        //资产单元
        if(ObjectUtil.isNotEmpty(queryVO.getInvestCompany())){
            map.put(1,queryVO.getInvestCompany());
        }
        return map;
    }
}
