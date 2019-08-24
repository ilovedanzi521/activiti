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
import com.win.dfas.common.util.WinExceptionUtil;
import com.win.dfas.common.vo.WinResponseData;
import com.win.dfas.constant.BpmExceptionEnum;
import com.win.dfas.service.IFlowGroupService;
import com.win.dfas.vo.request.ParamFlowGroupReqVO;
import com.win.dfas.vo.request.ParamFlowGroupUpdateReqVO;
import com.win.dfas.vo.response.DeleteEnum;
import com.win.dfas.vo.response.ParamFlowGroupRepVO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

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

    /**
     * service层
     */
    @Autowired
    private IFlowGroupService paramFlowService;
    /**
     * @Title: list
     * @Description 获取流程实例信息
     * @param
     * @return com.win.dfas.common.vo.WinResponseData
     * @throws
     * @author wanglei
     * @Date 2019/8/6/17:28
     */
    @ApiOperation(value = "流程组实例查询")
    @PostMapping("/list")
    public WinResponseData list() {
        List<ParamFlowGroupRepVO> data = paramFlowService.list();
        log. info(data.toString());
        return WinResponseData.handleSuccess(data);
    }

    /**
     * @Title: add
     * @Description 流程组信息新增
     * @param paramFlowGroupReqVO
     * @return com.win.dfas.common.vo.WinResponseData
     * @throws
     * @author wanglei
     * @Date 2019/8/6/17:28
     */
    @ApiOperation(value = "流程组新增")
    @PostMapping
    public WinResponseData add(@ApiParam(value = "流程组新增参数") @RequestBody @Validated  ParamFlowGroupReqVO paramFlowGroupReqVO) {
            paramFlowService.add(paramFlowGroupReqVO);
            return WinResponseData.handleSuccess("流程组新增成功", paramFlowGroupReqVO);

    }
    /**
     * @Title: update
     * @Description 流程组信息更新
     * @param reqVO
     * @return com.win.dfas.common.vo.WinResponseData
     * @throws
     * @author wanglei
     * @Date 2019/8/6/17:28
     */
    @ApiOperation(value = "流程组更新", notes = "<br/>1. 流程组NAME必传")
    @PutMapping
    public WinResponseData update(@ApiParam(value = "流程组更新参数") @RequestBody @Validated ParamFlowGroupReqVO reqVO) {
        log.info("updateReqVO:{}",reqVO);
        int ret = paramFlowService.merger(reqVO);
        String msg ="";
        if(ret==0){
            msg="流程信息新增成功";
        }else{
            msg="流程信息修改成功";
        }
        return WinResponseData.handleSuccess(msg);
    }
    /**
     * @Title: delete
     * @Description 删除流程组信息
     * @param id
     * @return com.win.dfas.common.vo.WinResponseData
     * @throws
     * @author wanglei
     * @Date 2019/8/6/17:27
     */
    @ApiOperation(value = "流程组删除", notes = "流程组逻辑删除")
    @DeleteMapping("/{id}")
    public WinResponseData delete(@ApiParam(value = "流程组ID") @PathVariable("id") Long id) {
        if(ObjectUtil.isEmpty(id)){
            throw WinExceptionUtil.winException(BpmExceptionEnum.ID_IS_NOTNULL);
        }
        paramFlowService.delete(id);
        return WinResponseData.handleSuccess("流程组删除成功");
    }
    /**
     * @Title: getFlowGroupId
     * @Description 生成id
     * @param
     * @return com.win.dfas.common.vo.WinResponseData
     * @throws
     * @author wanglei
     * @Date 2019/8/6/17:29
     */
    @ApiOperation(value = "流程组id生成")
    @GetMapping("/getflowgroupid")
    public WinResponseData getFlowGroupId() {
        Long flowGroupId = paramFlowService.getFlowGroupId();
        log. info(flowGroupId.toString());
        return WinResponseData.handleSuccess(flowGroupId);
    }
    /**
     * @Title: queryFlowByType
     * @Description 根据id查询流程
     * @param flowId
     * @return com.win.dfas.common.vo.WinResponseData
     * @throws
     * @author wanglei
     * @Date 2019/8/6/17:29
     */
    @GetMapping("/getflowcount/{flowId}")
    public WinResponseData queryFlowByType(@PathVariable("flowId")  Long flowId) {
        if(ObjectUtil.isEmpty(flowId)){
            throw WinExceptionUtil.winException(BpmExceptionEnum.ID_IS_NOTNULL);
        }
        DeleteEnum type =  paramFlowService.queryFlowByType(flowId);
        log. info(type.toString());
        return WinResponseData.handleSuccess(type);
    }

}
