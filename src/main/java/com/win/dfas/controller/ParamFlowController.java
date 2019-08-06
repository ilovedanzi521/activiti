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

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.json.JSONUtil;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.github.pagehelper.PageInfo;
import com.win.dfas.bpm.converter.ConverterUtil;
import com.win.dfas.bpm.converter.CostomBpmnJsonConverter;
import com.win.dfas.common.util.WinExceptionUtil;
import com.win.dfas.common.vo.WinResponseData;
import com.win.dfas.constant.BpmExceptionEnum;
import com.win.dfas.constant.InitDataConstant;
import com.win.dfas.service.IActivitiService;
import com.win.dfas.service.IParamFlowService;
import com.win.dfas.vo.request.FlowTaskReqVO;
import com.win.dfas.vo.request.ParamFlowReqVO;
import com.win.dfas.vo.response.ParamFlowRepVO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.slf4j.Slf4j;
import org.activiti.bpmn.model.BpmnModel;
import org.activiti.editor.constants.ModelDataJsonConstants;
import org.activiti.engine.HistoryService;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.history.HistoricProcessInstance;
import org.activiti.engine.impl.persistence.entity.ExecutionEntity;
import org.activiti.engine.repository.Deployment;
import org.activiti.engine.repository.Model;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    private IParamFlowService paramFlowService;
    @Autowired
    private IActivitiService activitiService;
    /**
     * @Title: list
     * @Description 查询
     * @param queryVO
     * @return com.win.dfas.common.vo.WinResponseData
     * @throws
     * @author wanglei
     * @Date 2019/8/6/17:32
     */
    @ApiOperation(value = "流程实例查询", notes = "<br/>1. 分页查询 ")
    @PostMapping("/list")
    public WinResponseData list(@ApiParam(value = "流程查询参数") @RequestBody ParamFlowReqVO queryVO) {
        log.info("list 入参："+BeanUtil.beanToMap(queryVO).toString());
        PageInfo<ParamFlowRepVO> list = paramFlowService.list(queryVO);
        log. info(list.toString());
        return WinResponseData.handleSuccess(list);
    }
    /**
     * @Title: queryFlowByGroupid
     * @Description 根据流程组id查询流程信息
     * @param queryVO
     * @return com.win.dfas.common.vo.WinResponseData
     * @throws
     * @author wanglei
     * @Date 2019/8/6/17:31
     */
    @ApiOperation(value = "流程组实例查询")
    @PostMapping("/listFlowByGroupid")
    public WinResponseData queryFlowByGroupid(@RequestBody ParamFlowReqVO queryVO) {
        log. info(queryVO.toString());
        //最顶级查询所有
        if(queryVO==null||queryVO.getFlowCode()==null||queryVO.getFlowCode().longValue()==0){
            return list(queryVO);
        }
        PageInfo<ParamFlowRepVO>  data = paramFlowService.queryFlowByGroupid(queryVO);
        log. info(data.toString());
        return WinResponseData.handleSuccess(data);
    }
    /**
     * @Title: add
     * @Description 流程新增
     * @param paramFlowRepVO
     * @return com.win.dfas.common.vo.WinResponseData
     * @throws
     * @author wanglei
     * @Date 2019/8/6/17:31
     */
    @ApiOperation(value = "流程新增", notes = "<br/>1. add;<br/>")
    @PostMapping
    public WinResponseData add(@ApiParam(value = "流程新增参数") @RequestBody ParamFlowRepVO paramFlowRepVO) {
        log. info(paramFlowRepVO.toString());
        //判断name不能为空
        if(ObjectUtil.isEmpty(paramFlowRepVO.getFlowName())){
            throw WinExceptionUtil.winException(BpmExceptionEnum.NAME_IS_NOTNULL);
        }
        //判断type不能为空
        if(ObjectUtil.isEmpty(paramFlowRepVO.getFlowType())){
            throw WinExceptionUtil.winException(BpmExceptionEnum.TYPE_IS_NOTNULL);
        }
        paramFlowService.add(paramFlowRepVO);
        return WinResponseData.handleSuccess("流程新增成功");
    }
    /**
     * @Title: update
     * @Description 流程更新
     * @param paramFlowRepVO
     * @return com.win.dfas.common.vo.WinResponseData
     * @throws
     * @author wanglei
     * @Date 2019/8/6/17:30
     */
    @ApiOperation(value = "流程更新", notes = "<br/>1. 流程ID必传")
    @PutMapping
    public WinResponseData update(@ApiParam(value = "流程更新参数") @RequestBody ParamFlowRepVO paramFlowRepVO) {
        paramFlowService.update(paramFlowRepVO);
        return WinResponseData.handleSuccess("流程修改成功");
    }
    /**
     * @Title: delete
     * @Description 流程数据删除
     * @param id
     * @return com.win.dfas.common.vo.WinResponseData
     * @throws
     * @author wanglei
     * @Date 2019/8/6/17:30
     */
    @ApiOperation(value = "流程删除", notes = "流程物理删除")
    @DeleteMapping("/{id}")
    public WinResponseData delete(@ApiParam(value = "流程ID") @PathVariable("id") Long id) {
        paramFlowService.delete(id);
        return WinResponseData.handleSuccess("流程删除成功");
    }
    /**
     * @Title: deletes
     * @Description 批量删除
     * @param paramFlowRepVOS
     * @return com.win.dfas.common.vo.WinResponseData
     * @throws
     * @author wanglei
     * @Date 2019/8/6/17:30
     */
    @PostMapping("/batchDelete")
    public WinResponseData deletes(@ApiParam(value = "流程新增参数") @RequestBody  List<ParamFlowRepVO> paramFlowRepVOS) {
        List<Long> ids = new ArrayList<>();
        for (ParamFlowRepVO paramFlowRepVO : paramFlowRepVOS) {
            ids.add(paramFlowRepVO.getId());
        }
        paramFlowService.batchDelete(ids);
        return WinResponseData.handleSuccess("流程删除成功");
    }

    /**
     * @Title: create
     * @Description 创建模型
     * @param response
     * @param paramFlowRepVO
     * @return com.win.dfas.common.vo.WinResponseData
     * @throws IOException
     * @author wanglei
     * @Date 2019/8/6/11:34
     */
    @ResponseBody
    @RequestMapping("/create")
    public WinResponseData create(HttpServletResponse response, @RequestBody ParamFlowRepVO paramFlowRepVO) throws IOException {

        if (null != paramFlowRepVO && StringUtils.isNotEmpty(paramFlowRepVO.getModelId())) {
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
        return WinResponseData.handleSuccess(modelId);
    }


    /**
     * @Title: createObjectNode
     * @Description 创建模型时完善ModelEditorSource
     * @param modelId
     * @return void
     * @throws
     * @author wanglei
     * @Date 2019/8/6/11:30
     */
    private void createObjectNode(String modelId){
        log.info("创建模型完善ModelEditorSource入参模型ID：{}",modelId);
        ObjectNode editorNode = objectMapper.createObjectNode();
        editorNode.put("id", "canvas");
        editorNode.put("resourceId", "canvas");
        ObjectNode stencilSetNode = objectMapper.createObjectNode();
        stencilSetNode.put("namespace","http://b3mn.org/stencilset/bpmn2.0#");
        editorNode.putPOJO("stencilset", stencilSetNode);
        try {
            repositoryService.addModelEditorSource(modelId,editorNode.toString().getBytes("utf-8"));
        } catch (Exception e) {
            log.info("创建模型时完善ModelEditorSource服务异常：{}",e);
        }
        log.info("创建模型完善ModelEditorSource结束");
    }

    /**
     * @Title: start
     * @Description  启动流程
     * @param paramFlowRepVOS
     * @return com.win.dfas.common.vo.WinResponseData
     * @throws
     * @author wanglei
     * @Date 2019/8/6/11:30
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
                updatePublish(paramFlowRepVO,modelId);
            }else{
                //如果发布id不为空,流程定义id为空,则提示错误退出。
                if(ObjectUtil.isEmpty(processDefId)){
                    log.info("流程有问题！");
                    return WinResponseData.handleError("异常");
                }
                if(startFlag){
                    //重新发布
                    updatePublish(paramFlowRepVO,modelId);
                }

            }
            log.info("启动流程实例,流程定义id="+processDefId);

        }
        //批量更新启动状态
        paramFlowService.updateStartFlagToStart(ids);
        return WinResponseData.handleSuccess("成功");
    }
    /**
     * @Title: updatePublish
     * @Description 发布并更新状态
     * @param paramFlowRepVO
     * @param modelId
     * @return void
     * @throws
     * @author wanglei
     * @Date 2019/8/6/11:37
     */
    public void  updatePublish(ParamFlowRepVO paramFlowRepVO,String modelId){
        String deploymentId=publish(modelId,paramFlowRepVO.getFlowName());
        String processDefId = activitiService.queryProcessDefId(deploymentId);
        //TODO 是否批量更新
        paramFlowRepVO.setDeploymentId(deploymentId);
        paramFlowRepVO.setProcessDefId(processDefId);
        paramFlowService.update(paramFlowRepVO);
    }

    /**
     * @Title: publish
     * @Description 发布流程并获取activit 根据流程部署ID
     * @param modelId
     * @param key
     * @return java.lang.String
     * @throws
     * @author wanglei
     * @Date 2019/8/6/11:16
     */
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
            //modify
            CostomBpmnJsonConverter jsonConverter = new CostomBpmnJsonConverter();
            BpmnModel model = jsonConverter.convertToBpmnModel(modelNode);
            //modify end
            Deployment deployment = ConverterUtil.convertToXML(repositoryService.createDeployment()
                    .name(modelData.getName()),modelData.getKey()+".bpmn20.xml",model)
                    .deploy();
            log.info(String.valueOf(deployment)+"===="+deployment!=null?deployment.getId():"builder失败");
            String deploymentId = deployment.getId();
            modelData.setDeploymentId(deploymentId);
            modelData.setKey(key);
            repositoryService.saveModel(modelData);
            log.info("流程部署出参map：{}",deploymentId);
            return deploymentId;
        } catch (Exception e) {
            log.info("部署modelId:{}模型服务异常：{}",modelId,e);
            throw  WinExceptionUtil.winException(BpmExceptionEnum.DESIGN_PROBLEMS);
        }
    }

    /**
     * @Title: stop
     * @Description 流程停止
     * @param paramFlowRepVOS
     * @return com.win.dfas.common.vo.WinResponseData
     * @throws
     * @author wanglei
     * @Date 2019/8/6/11:29
     */
    @PostMapping("/batchStopFlow")
    public WinResponseData stop( @RequestBody  List<ParamFlowRepVO> paramFlowRepVOS) {
        List<Long> ids = new ArrayList<>();
        for (ParamFlowRepVO paramFlowRepVO : paramFlowRepVOS) {
            ids.add(paramFlowRepVO.getId());
        }
        paramFlowService.updateStartFlagToStop(ids);
        return WinResponseData.handleSuccess("成功");
    }

    /**
     * @Title: start
     * @Description 启停流程
     * @param paramFlowRepVO
     * @return com.win.dfas.common.vo.WinResponseData
     * @throws
     * @author wanglei
     * @Date 2019/8/6/11:34
     */
    @PostMapping("/startOrStopFlow")
    public WinResponseData start(@ApiParam(value = "启动/停止流程") @RequestBody ParamFlowRepVO paramFlowRepVO) {
        List<ParamFlowRepVO> paramFlowRepVOS = new ArrayList<>();
        paramFlowRepVOS.add(paramFlowRepVO);
        if(paramFlowRepVO.getStartFlag()){
            start(paramFlowRepVOS);
        }else{
            stop(paramFlowRepVOS);
        }
        return WinResponseData.handleSuccess("成功");
    }

}
