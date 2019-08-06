package com.win.dfas.controller.editor;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.extern.slf4j.Slf4j;
import org.activiti.editor.constants.ModelDataJsonConstants;
import org.activiti.engine.ActivitiException;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.repository.Model;
import org.apache.batik.transcoder.TranscoderInput;
import org.apache.batik.transcoder.TranscoderOutput;
import org.apache.batik.transcoder.image.PNGTranscoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;


/**
 * 包名称：com.win.dfas.controller.editor
 * 类名称：ModelSaveRestResource
 * 类描述：流程信息入库
 * 创建人：@author wanglei
 * 创建时间：2019/8/6/10:20
 */
@RestController
@RequestMapping("service")
@Slf4j
public class ModelSaveRestResource implements ModelDataJsonConstants {


  @Autowired
  private RepositoryService repositoryService;

  @Autowired
  private ObjectMapper objectMapper;

  /**
   * 保存流程
   * @param modelId 模型ID
   * @param name 流程模型名称
   * @param description
   * @param jsonXml 流程文件
   * @param svgXml 图片
   */
  @RequestMapping(value="/model/{modelId}/save", method = RequestMethod.PUT)
  @ResponseStatus(value = HttpStatus.OK)
  public void saveModel(@PathVariable String modelId
          , String name, String description
          , String jsonXml, String svgXml) {
    try {

      Model model = repositoryService.getModel(modelId);

      ObjectNode modelJson = (ObjectNode) objectMapper.readTree(model.getMetaInfo());

      modelJson.put(MODEL_NAME, name);
      modelJson.put(MODEL_DESCRIPTION, description);
      model.setMetaInfo(modelJson.toString());
      model.setName(name);
      repositoryService.saveModel(model);

      repositoryService.addModelEditorSource(model.getId(), jsonXml.getBytes("utf-8"));

      InputStream svgStream = new ByteArrayInputStream(svgXml.getBytes("utf-8"));
      TranscoderInput input = new TranscoderInput(svgStream);

      PNGTranscoder transcoder = new PNGTranscoder();
      // Setup output
      ByteArrayOutputStream outStream = new ByteArrayOutputStream();
      TranscoderOutput output = new TranscoderOutput(outStream);

      // Do the transformation
      transcoder.transcode(input, output);
      final byte[] result = outStream.toByteArray();
      repositoryService.addModelEditorSourceExtra(model.getId(), result);
      outStream.close();

    } catch (Exception e) {
      log.error("Error saving model", e);
      throw new ActivitiException("Error saving model", e);
    }
  }

}
