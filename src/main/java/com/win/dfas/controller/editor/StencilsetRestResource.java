package com.win.dfas.controller.editor;

import org.activiti.engine.ActivitiException;
import org.apache.commons.io.IOUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.InputStream;

/**
 * 包名称：com.win.dfas.controller.editor
 * 类名称：StencilsetRestResource
 * 类描述：获取编辑器组件及配置项信息
 * 创建人：@author wanglei
 * 创建时间：2019/8/6/10:20
 */
@RestController
@RequestMapping("service")
public class StencilsetRestResource {

/**
 * 获取流程json文件
 * @return
 */
  @RequestMapping(value="/editor/stencilset", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
  @ResponseBody
  public String getStencilset() {
    InputStream stencilsetStream = this.getClass().getClassLoader().getResourceAsStream("stencilset.json");
    try {
      return IOUtils.toString(stencilsetStream, "utf-8");
    } catch (Exception e) {
      throw new ActivitiException("Error while loading stencil set", e);
    }
  }
}
