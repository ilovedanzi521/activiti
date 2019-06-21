/****************************************************
 * 创建人：     @author wanglei
 * 创建时间: 2019/6/11/14:04
 * 项目名称：dfbp-common-basicparameter
 * 文件名称: ParamFlowController.java
 * 文件描述: @Description:
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/

package com.win.dfas.controller;

import cn.hutool.core.util.ObjectUtil;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.win.dfas.common.vo.WinResponseData;
import com.win.dfas.service.IActivitiService;
import com.win.dfas.service.IParamFlowService;
import com.win.dfas.vo.request.ParamFlowReqVO;
import com.win.dfas.vo.response.ParamFlowGroupRepVO;
import com.win.dfas.vo.response.ParamFlowRepVO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.slf4j.Slf4j;
import org.activiti.bpmn.model.BpmnModel;
import org.activiti.editor.constants.ModelDataJsonConstants;
import org.activiti.editor.language.json.converter.BpmnJsonConverter;
import org.activiti.engine.HistoryService;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.impl.persistence.entity.ExecutionEntity;
import org.activiti.engine.repository.Deployment;
import org.activiti.engine.repository.Model;
import org.activiti.engine.repository.ProcessDefinition;
import org.activiti.engine.repository.ProcessDefinitionQuery;
import org.activiti.engine.runtime.ProcessInstance;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 包名称：com.win.dfas.controller
 * 类名称：paramFlowController
 * 类描述：ParamFlowController
 * 创建人：@author wanglei
 * 创建时间：2019/6/11/14:04
 *
 */
@Api(tags = "流程")
@RestController
@RequestMapping("/param/exchangeFlow")
@Slf4j
public class ParamFlowController {

    @Autowired
    private RepositoryService repositoryService;
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private HistoryService historyService;
    @Autowired
    private RuntimeService runtimeService;

    @Autowired
    private IParamFlowService paramFlowService;
    @Autowired
    private IActivitiService activitiService;

    @ApiOperation(value = "流程实例查询", notes = "<br/>1. 分页查询 ")
    @PostMapping("/list")
    public WinResponseData list(@ApiParam(value = "流程查询参数") @RequestBody ParamFlowReqVO queryVO) {
        PageInfo<ParamFlowRepVO> list = paramFlowService.list(queryVO);
        log. info(list.toString());
        return WinResponseData.handleSuccess(list);
    }

    @ApiOperation(value = "流程组实例查询")
    @PostMapping("/listFlowByGroupid")
    public WinResponseData queryFlowByGroupid(@RequestBody ParamFlowReqVO queryVO) {
        log. info(queryVO.toString());
        if(queryVO.getFlowCode().longValue()==0){//最顶级查询所有
            return list(new ParamFlowReqVO());
        }
        PageInfo<ParamFlowRepVO>  data = paramFlowService.queryFlowByGroupid(queryVO);
        log. info(data.toString());
        return WinResponseData.handleSuccess(data);
    }

    @ApiOperation(value = "流程新增", notes = "<br/>1. 货币数据库保留8位小数;<br/>")
    @PostMapping
    public WinResponseData add(@ApiParam(value = "流程新增参数") @RequestBody ParamFlowRepVO paramFlowRepVO) {
        log. info(paramFlowRepVO.toString());
        paramFlowService.add(paramFlowRepVO);
        return WinResponseData.handleSuccess("流程新增成功");
    }

    @ApiOperation(value = "流程更新", notes = "<br/>1. 流程ID必传")
    @PutMapping
    public WinResponseData update(@ApiParam(value = "流程更新参数") @RequestBody ParamFlowRepVO paramFlowRepVO) {
        paramFlowService.update(paramFlowRepVO);
        return WinResponseData.handleSuccess("流程修改成功");
    }

    @ApiOperation(value = "流程删除", notes = "流程逻辑删除")
    @DeleteMapping("/{id}")
    public WinResponseData delete(@ApiParam(value = "流程ID") @PathVariable("id") Long id) {
        paramFlowService.delete(id);
        return WinResponseData.handleSuccess("流程删除成功");
    }
    @PostMapping("/batchDelete")
    public WinResponseData deletes(@ApiParam(value = "流程新增参数") @RequestBody List<Long> ids) {
        paramFlowService.batchDelete(ids);
        for (Long id : ids) {
//            revokePublish(id.toString())
        }

        return WinResponseData.handleSuccess("流程删除成功");
    }

    /**
     * 创建模型
     *
     * @param response
     */
    @ResponseBody
    @RequestMapping("/create")
    public WinResponseData create(HttpServletResponse response, @RequestBody ParamFlowRepVO paramFlowRepVO) throws IOException {

        if (null != paramFlowRepVO && StringUtils.isNotEmpty(paramFlowRepVO.getModelId())) {
//            response.sendRedirect("/modeler.html?modelId="+ paramFlowRepVO.getModelId());
            return WinResponseData.handleSuccess(paramFlowRepVO.getModelId());
        }
        String name = paramFlowRepVO.getFlowName();
        String key = String.valueOf(paramFlowRepVO.getId());
        log.info("创建模型入参name：{},key:{}", name, key);
        Model model = repositoryService.newModel();
        ObjectNode modelNode = objectMapper.createObjectNode();
        modelNode.put(ModelDataJsonConstants.MODEL_NAME, name);
        modelNode.put(ModelDataJsonConstants.MODEL_DESCRIPTION, "");
        modelNode.put(ModelDataJsonConstants.MODEL_REVISION, 1);
        model.setName(name);
        model.setKey(key);
        model.setMetaInfo(modelNode.toString());
        repositoryService.saveModel(model);
        createObjectNode(model.getId());
        //update flowinst表中的modelid
        String modelId = model.getId();
        paramFlowRepVO.setModelId(modelId);
        paramFlowService.update(paramFlowRepVO);
        log.info("创建模型结束，返回模型ID：{}", modelId);
//        response.sendRedirect("/modeler.html?modelId="+ modelId);
//        repositoryService.addModelEditorSource(modelId);
        return WinResponseData.handleSuccess(modelId);
    }


    /**
     * 创建模型时完善ModelEditorSource
     * @param modelId
     */
    @SuppressWarnings("deprecation")
    private void createObjectNode(String modelId){
        log.info("创建模型完善ModelEditorSource入参模型ID：{}",modelId);
        ObjectNode editorNode = objectMapper.createObjectNode();
        editorNode.put("id", "canvas");
        editorNode.put("resourceId", "canvas");
        ObjectNode stencilSetNode = objectMapper.createObjectNode();
        stencilSetNode.put("namespace","http://b3mn.org/stencilset/bpmn2.0#");
        editorNode.put("stencilset", stencilSetNode);
        try {
            repositoryService.addModelEditorSource(modelId,editorNode.toString().getBytes("utf-8"));
        } catch (Exception e) {
            log.info("创建模型时完善ModelEditorSource服务异常：{}",e);
        }
        log.info("创建模型完善ModelEditorSource结束");
    }

    /**
     * 启动流程
     * @param paramFlowRepVOS
     * @return
     */
    @PostMapping("/batchStartFlow")
    public WinResponseData start(@ApiParam(value = "批量启动流程") @RequestBody  List<ParamFlowRepVO> paramFlowRepVOS) {
        log.info(paramFlowRepVOS.toString());
        List<Long> ids = new ArrayList<>();
        for (ParamFlowRepVO paramFlowRepVO : paramFlowRepVOS) {
            //关联ids，用于批量更新启动状态
            ids.add(paramFlowRepVO.getId());
            String modelId = paramFlowRepVO.getModelId();
            //没有发布的，才开始发布
            String deploymentId=paramFlowRepVO.getDeploymentId();
            String processDefId=paramFlowRepVO.getProcessDefId();
            boolean startFlag=paramFlowRepVO.getStartFlag();
            if(ObjectUtil.isEmpty(deploymentId)) {
                deploymentId=publish(modelId,paramFlowRepVO.getFlowName());
                processDefId = activitiService.queryProcessDefId(deploymentId);
                //TODO 是否批量更新
                paramFlowRepVO.setDeploymentId(deploymentId);
                paramFlowRepVO.setProcessDefId(processDefId);
                paramFlowService.update(paramFlowRepVO);
            }else{
                //如果发布id不为空,流程定义id为空,则提示错误退出。
                if(ObjectUtil.isEmpty(processDefId)){
                    log.info("流程有问题！");
                    return WinResponseData.handleError("异常");
                }
                if(!startFlag){
                    //后面启动使用激活
                    repositoryService.activateProcessDefinitionById(processDefId);
                    continue;
                }
            }
            Map<String, Object> map = new HashMap<String, Object>();
            map.put("apply", paramFlowRepVO.getCreateUserId());
            map.put("approve", "wanglei");
            //启动流程
            startProcessInstance(processDefId,map);
            log.info("启动流程实例,流程定义id="+processDefId);

        }
        //批量更新启动状态
        paramFlowService.updateStartFlagToStart(ids);
        return WinResponseData.handleSuccess("成功");
    }

    /**
     * 根据流程部署ID 查询流程定义并启动流程实例
     * @param processDefId
     * @param map
     */
    private String startProcessInstance(String processDefId,Map map) {
        //通过指定流程定义的id，开启流程定义，得到流程实例。流程实例是一系列任务的集合
        ProcessInstance processInstance = runtimeService.startProcessInstanceById(processDefId,map);
        return processDefId;
    }

    //发布流程并获取activit 根据流程部署ID
    public String publish(String modelId,String key){
        log.info("流程部署入参modelId：{}",modelId);
        try {
            Model modelData = repositoryService.getModel(modelId);
            byte[] bytes = repositoryService.getModelEditorSource(modelData.getId());
            if (bytes == null) {
                log.info("部署ID:{}的模型数据为空，请先设计流程并成功保存，再进行发布",modelId);
                return null;
            }
            JsonNode modelNode = new ObjectMapper().readTree(bytes);
            BpmnModel model = new BpmnJsonConverter().convertToBpmnModel(modelNode);
            Deployment deployment = repositoryService.createDeployment()
                    .name(modelData.getName())
                    .addBpmnModel(modelData.getKey()+".bpmn20.xml", model)
                    .deploy();
            String deploymentId = deployment.getId();
            modelData.setDeploymentId(deploymentId);
            modelData.setKey(key);
            repositoryService.saveModel(modelData);
//            map.put("code", "SUCCESS");
            log.info("流程部署出参map：{}",deploymentId);
            return deploymentId;
        } catch (Exception e) {
            log.info("部署modelId:{}模型服务异常：{}",modelId,e);
        }
        return null;
    }

    /**
     * 停止挂起流程
     * @param ids
     * @return
     */
    @RequestMapping("/batchStopFlow")
    public WinResponseData stop( @RequestBody List<String> ids) {
        log.info(ids.toString());
        for (String id : ids) {
            repositoryService.suspendProcessDefinitionById(id);
        }
        paramFlowService.updateStartFlagToStop(ids);
        return WinResponseData.handleSuccess("成功");
    }

    /**
     * 撤销流程
     * @param modelId
     * @return
     */
    public Object revokePublish(String modelId){
        log.info("撤销发布流程入参modelId：{}",modelId);
        Map<String, String> map = new HashMap<String, String>();
        Model modelData = repositoryService.getModel(modelId);
        if(null != modelData){
            try {
                /**
                 * 参数不加true:为普通删除，如果当前规则下有正在执行的流程，则抛异常
                 * 参数加true:为级联删除,会删除和当前规则相关的所有信息，包括历史
                 */
                repositoryService.deleteDeployment(modelData.getDeploymentId(),true);
                map.put("code", "SUCCESS");
            } catch (Exception e) {
                log.error("撤销已部署流程服务异常：{}",e);
                map.put("code", "FAILURE");
            }
        }
        log.info("撤销发布流程出参map：{}",map);
        return map;
    }

}
