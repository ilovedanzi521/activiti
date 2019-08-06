package com.win.dfas.service;

import org.springframework.stereotype.Service;

/**
 * 包名称：com.win.dfas.service
 * 类名称：IActivitiService
 * 类描述：${TODO}
 * 创建人：@author wanglei
 * 创建时间：2019/6/19/11:02
 */
@Service
public interface IActivitiService {
    /**
     * @Title: queryProcessDefId
     * @Description 根据流程部署ID 查询流程定义
     * @param deploymentId
     * @return java.lang.String
     * @throws
     * @author wanglei
     * @Date 2019/8/6/11:07
     */
    String queryProcessDefId(String deploymentId);
}
