/****************************************************
 * 创建人: @author wanglei
 * 创建时间: 2019/9/4/16:19
 * 项目名称: dfas-common-bpm
 * 文件名称: DefaultInstHistImgService.java
 * 文件描述: @Description: 画图service
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/

package com.win.dfas.bpm.img;

import cn.hutool.core.util.ObjectUtil;
import com.win.dfas.bpm.constant.BpmConstant;
import com.win.dfas.bpm.service.BpmService;
import org.activiti.bpmn.model.BpmnModel;
import org.activiti.engine.ProcessEngineConfiguration;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.impl.pvm.process.ActivityImpl;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

/**
 * 包名称：com.win.dfas.bpm.controller.api
 * 类名称：DefaultInstHistImgService
 * 类描述：画图service
 * 创建人：@author wanglei
 * 创建时间：2019/9/4/16:19
 */
@Service
public class DefaultInstHistImgService {
    @Autowired
    private RepositoryService repositoryService;
    @Autowired
    RuntimeService runtimeService;
    @Autowired
    private TaskService taskService;
    @Autowired
    private ProcessEngineConfiguration processEngineConfiguration;
    @Autowired
    private BpmService bpmService;
    public DefaultInstHistImgService() {
    }

    public InputStream draw(BpmnModel bpmnModel, String processId) throws Exception {
        Map<String, Paint> nodeMap = new HashMap();
        Map<String, Paint> flowMap = new HashMap();
        Map<String, Paint> gateMap = new HashMap();
        ActivityImpl activityImpl = bpmService.findActivity(processId);
        if(ObjectUtil.isNotEmpty(activityImpl)){

            nodeMap.put(activityImpl.getId(), this.paint((String) activityImpl.getProperties().get(BpmConstant.NODE_NAME)));
            ThreadMapUtil.put("DefaultInstHistImgService_nodeMap", nodeMap);
            ThreadMapUtil.put("DefaultInstHistImgService_flowMap", flowMap);
            ThreadMapUtil.put("DefaultInstHistImgService_gateMap", gateMap);
        }
        InputStream imageStream = null;
        try {
            BpmProcessDiagramGenerator diagramGenerator = (BpmProcessDiagramGenerator) processEngineConfiguration.getProcessDiagramGenerator();
            imageStream = diagramGenerator.generateDiagram(bpmnModel, "png", nodeMap, flowMap);
        } finally {
            IOUtils.closeQuietly(imageStream);
        }

        return imageStream;
    }

    private Paint paint(String action) {
        return Color.GREEN;
    }
}
