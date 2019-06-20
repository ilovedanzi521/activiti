package com.win.dfas.service.impl;

import com.win.dfas.service.IActivitiService;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.repository.ProcessDefinition;
import org.activiti.engine.repository.ProcessDefinitionQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 包名称：com.win.dfas.service.impl
 * 类名称：ActivitiServiceImpl
 * 类描述：${TODO}
 * 创建人：@author wanglei
 * 创建时间：2019/6/19/11:05
 */
@Service
public class ActivitiServiceImpl implements IActivitiService {
    @Autowired
    private RepositoryService repositoryService;

    @Override
    public String queryProcessDefId(String deploymentId) {
        //重点！！！！！！！！
        ProcessDefinitionQuery query = repositoryService.createProcessDefinitionQuery();
        //添加查询条件，KEY
        query.deploymentId(deploymentId);
        //最新版本过滤
        query.latestVersion();
        //查询
        ProcessDefinition definition = query.singleResult();
        //获取流程定义id
        String processDefId = definition.getId();
        return processDefId;
    }
}
