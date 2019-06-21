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

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.github.pagehelper.PageInfo;
import com.win.dfas.common.util.LongJsonDeserializer;
import com.win.dfas.common.util.LongJsonSerializer;
import com.win.dfas.common.vo.WinResponseData;
import com.win.dfas.service.IFlowGroupService;
import com.win.dfas.service.IParamFlowService;
import com.win.dfas.vo.request.ParamFlowGroupReqVO;
import com.win.dfas.vo.request.ParamFlowReqVO;
import com.win.dfas.vo.response.DeleteEnum;
import com.win.dfas.vo.response.ParamFlowGroupRepVO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.slf4j.Slf4j;
import org.activiti.editor.constants.ModelDataJsonConstants;
import org.activiti.engine.HistoryService;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.repository.Model;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

/**
 * 包名称：com.win.dfas.controller
 * 类名称：FlowGroupController
 * 类描述：FlowGroupController
 * 创建人：@author wanglei
 * 创建时间：2019/6/11/14:04
 *
 */
@Api(tags = "流程组类管理")
@RestController
@RequestMapping("/param/flowgroup")
@Slf4j
public class FlowGroupController {


    @Autowired
    private IFlowGroupService paramFlowService;

    @ApiOperation(value = "流程组实例查询")
    @PostMapping("/list")
    public WinResponseData list() {
        List<ParamFlowGroupRepVO> data = paramFlowService.list();
        log. info(data.toString());
        return WinResponseData.handleSuccess(data);
    }


    @ApiOperation(value = "流程组新增")
    @PostMapping
    public WinResponseData add(@ApiParam(value = "流程组新增参数") @RequestBody ParamFlowGroupReqVO paramFlowGroupReqVO) {
        paramFlowService.add(paramFlowGroupReqVO);
        return WinResponseData.handleSuccess("流程组新增成功");
    }

    @ApiOperation(value = "流程组更新", notes = "<br/>1. 流程组CODE必传")
    @PutMapping
    public WinResponseData update(@ApiParam(value = "流程组更新参数") @RequestBody ParamFlowGroupReqVO paramFlowGroupRepVO) {
        paramFlowService.update(paramFlowGroupRepVO);
        return WinResponseData.handleSuccess("流程组修改成功");
    }

    @ApiOperation(value = "流程组删除", notes = "流程组逻辑删除")
    @DeleteMapping("/{id}")
    public WinResponseData delete(@ApiParam(value = "流程组ID") @PathVariable("id") Long id) {
        paramFlowService.delete(id);
        return WinResponseData.handleSuccess("流程组删除成功");
    }

    @ApiOperation(value = "流程组id生成")
    @GetMapping("/getflowgroupid")
    public WinResponseData getFlowGroupId() {
        Long flowGroupId = paramFlowService.getFlowGroupId();
        log. info(flowGroupId.toString());
        return WinResponseData.handleSuccess(flowGroupId);
    }
    @GetMapping("/getflowcount/{flowId}")
    public WinResponseData deleteFlowByType(@PathVariable("flowId")  Long flowId) {
        DeleteEnum type =  paramFlowService.queryFlowByType(flowId);
        log. info(type.toString());
        return WinResponseData.handleSuccess(type);
    }

}
