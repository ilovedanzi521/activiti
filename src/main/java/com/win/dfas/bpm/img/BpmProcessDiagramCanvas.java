/****************************************************
 * 创建人: @author wanglei
 * 创建时间: 2019/9/20/14:05
 * 项目名称: dfas-common-bpm
 * 文件名称: BpmProcessDiagramCanvas.java
 * 文件描述: @Description: 画布
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/

package com.win.dfas.bpm.img;

import com.win.dfas.bpm.util.FontsUtil;
import org.activiti.bpmn.model.AssociationDirection;
import org.activiti.bpmn.model.FlowNode;
import org.activiti.bpmn.model.GraphicInfo;
import org.activiti.image.impl.DefaultProcessDiagramCanvas;
import org.activiti.image.util.ReflectUtil;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.geom.RoundRectangle2D;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.Map;

/**
 * 包名称：com.win.dfas.bpm.img
 * 类名称：BpmProcessDiagramCanvas
 * 类描述：画布
 * 创建人：@author wanglei
 * 创建时间：2019/9/20/14:05
 */
public class BpmProcessDiagramCanvas extends DefaultProcessDiagramCanvas {
    protected static Font LABEL_FONT;
    public BpmProcessDiagramCanvas(int width, int height, int minX, int minY, String imageType, String activityFontName, String labelFontName, String annotationFontName, ClassLoader customClassLoader) {
        super(width, height, minX, minY, imageType, activityFontName, labelFontName, annotationFontName, customClassLoader);
        LABEL_COLOR = Color.BLACK;
        LABEL_FONT = FontsUtil.getSimsun(FONT_SPACING,DEFAULT_INDICATOR_WIDTH);
    }

    @Override
    public void initialize(String imageType) {
        if ("png".equalsIgnoreCase(imageType)) {
            this.processDiagram = new BufferedImage(this.canvasWidth, this.canvasHeight, 2);
        } else {
            this.processDiagram = new BufferedImage(this.canvasWidth, this.canvasHeight, 1);
        }

        this.g = this.processDiagram.createGraphics();
        if (!"png".equalsIgnoreCase(imageType)) {
            this.g.setBackground(new Color(255, 255, 255, 0));
            this.g.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        }

        this.g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
        this.g.setPaint(Color.black);
        String file = this.getClass().getResource("/").getPath()+"simsun.ttc";
//        LABEL_FONT = new Font(file,FONT_SPACING,DEFAULT_INDICATOR_WIDTH);
//        Font font = new Font(this.activityFontName, 1, 11);
        Font font = FontsUtil.getSimsun(1,FONT_SIZE);
        this.g.setFont(font);
        this.fontMetrics = this.g.getFontMetrics();
//        LABEL_FONT = new Font(this.labelFontName, 2, 10);
        LABEL_FONT = FontsUtil.getSimsun(FONT_SPACING,DEFAULT_INDICATOR_WIDTH);
//        ANNOTATION_FONT = new Font(this.annotationFontName, 0, 11);
        ANNOTATION_FONT = FontsUtil.getSimsun(0,FONT_SIZE);
        try {
            USERTASK_IMAGE = ImageIO.read(ReflectUtil.getResource("org/activiti/icons/userTask.png", this.customClassLoader));
            SCRIPTTASK_IMAGE = ImageIO.read(ReflectUtil.getResource("org/activiti/icons/scriptTask.png", this.customClassLoader));
            SERVICETASK_IMAGE = ImageIO.read(ReflectUtil.getResource("org/activiti/icons/serviceTask.png", this.customClassLoader));
            RECEIVETASK_IMAGE = ImageIO.read(ReflectUtil.getResource("org/activiti/icons/receiveTask.png", this.customClassLoader));
            SENDTASK_IMAGE = ImageIO.read(ReflectUtil.getResource("org/activiti/icons/sendTask.png", this.customClassLoader));
            MANUALTASK_IMAGE = ImageIO.read(ReflectUtil.getResource("org/activiti/icons/manualTask.png", this.customClassLoader));
            BUSINESS_RULE_TASK_IMAGE = ImageIO.read(ReflectUtil.getResource("org/activiti/icons/businessRuleTask.png", this.customClassLoader));
            SHELL_TASK_IMAGE = ImageIO.read(ReflectUtil.getResource("org/activiti/icons/shellTask.png", this.customClassLoader));
            CAMEL_TASK_IMAGE = ImageIO.read(ReflectUtil.getResource("org/activiti/icons/camelTask.png", this.customClassLoader));
            MULE_TASK_IMAGE = ImageIO.read(ReflectUtil.getResource("org/activiti/icons/muleTask.png", this.customClassLoader));
            TIMER_IMAGE = ImageIO.read(ReflectUtil.getResource("org/activiti/icons/timer.png", this.customClassLoader));
            COMPENSATE_THROW_IMAGE = ImageIO.read(ReflectUtil.getResource("org/activiti/icons/compensate-throw.png", this.customClassLoader));
            COMPENSATE_CATCH_IMAGE = ImageIO.read(ReflectUtil.getResource("org/activiti/icons/compensate.png", this.customClassLoader));
            ERROR_THROW_IMAGE = ImageIO.read(ReflectUtil.getResource("org/activiti/icons/error-throw.png", this.customClassLoader));
            ERROR_CATCH_IMAGE = ImageIO.read(ReflectUtil.getResource("org/activiti/icons/error.png", this.customClassLoader));
            MESSAGE_THROW_IMAGE = ImageIO.read(ReflectUtil.getResource("org/activiti/icons/message-throw.png", this.customClassLoader));
            MESSAGE_CATCH_IMAGE = ImageIO.read(ReflectUtil.getResource("org/activiti/icons/message.png", this.customClassLoader));
            SIGNAL_THROW_IMAGE = ImageIO.read(ReflectUtil.getResource("org/activiti/icons/signal-throw.png", this.customClassLoader));
            SIGNAL_CATCH_IMAGE = ImageIO.read(ReflectUtil.getResource("org/activiti/icons/signal.png", this.customClassLoader));
        } catch (IOException var4) {
            LOGGER.warn("Could not load image for process diagram creation: {}", var4.getMessage());
        }

    }

    /**
     * @Title: drawHighLight
     * @Description:  绘制高亮
     * @param
     * @return:
     * @throws:
     * @author: malianh
     * @Date: 2019/5/10
     */
    public void drawHighLight(int x, int y, int width, int height, Paint paint) {
        Paint originalPaint = this.g.getPaint();
        Stroke originalStroke = this.g.getStroke();
        this.g.setPaint(paint);
        this.g.setStroke(THICK_TASK_BORDER_STROKE);
        RoundRectangle2D rect = new RoundRectangle2D.Double((double)x, (double)y, (double)width, (double)height, 20.0D, 20.0D);
        this.g.draw(rect);
        this.g.setPaint(originalPaint);
        this.g.setStroke(originalStroke);
    }

    /**
     * @Title: drawSequenceflow
     * @Description: 绘制序列流
     * @param
     * @return:
     * @throws:
     * @author: maliang
     * @Date: 2019/5/10
     */
    public void drawSequenceflow(int[] xPoints, int[] yPoints, boolean drawConditionalIndicator, boolean isDefault, boolean highLighted, Paint paint, double scaleFactor) {
        String connectionType = "sequenceFlow";
        AssociationDirection associationDirection = AssociationDirection.ONE;
        Paint originalPaint = this.g.getPaint();
        Stroke originalStroke = this.g.getStroke();
        this.g.setPaint(CONNECTION_COLOR);
        if (connectionType.equals("association")) {
            this.g.setStroke(ASSOCIATION_STROKE);
        } else if (highLighted) {
            this.g.setPaint(paint);
            this.g.setStroke(HIGHLIGHT_FLOW_STROKE);
        }

        for(int i = 1; i < xPoints.length; ++i) {
            Integer sourceX = xPoints[i - 1];
            Integer sourceY = yPoints[i - 1];
            Integer targetX = xPoints[i];
            Integer targetY = yPoints[i];
            java.awt.geom.Line2D.Double line = new java.awt.geom.Line2D.Double((double)sourceX, (double)sourceY, (double)targetX, (double)targetY);
            this.g.draw(line);
        }

        java.awt.geom.Line2D.Double line;
        if (isDefault) {
            line = new java.awt.geom.Line2D.Double((double)xPoints[0], (double)yPoints[0], (double)xPoints[1], (double)yPoints[1]);
            this.drawDefaultSequenceFlowIndicator(line, scaleFactor);
        }

        if (drawConditionalIndicator) {
            line = new java.awt.geom.Line2D.Double((double)xPoints[0], (double)yPoints[0], (double)xPoints[1], (double)yPoints[1]);
            this.drawConditionalSequenceFlowIndicator(line, scaleFactor);
        }

        if (associationDirection.equals(AssociationDirection.ONE) || associationDirection.equals(AssociationDirection.BOTH)) {
            line = new java.awt.geom.Line2D.Double((double)xPoints[xPoints.length - 2], (double)yPoints[xPoints.length - 2], (double)xPoints[xPoints.length - 1], (double)yPoints[xPoints.length - 1]);
            this.drawArrowHead(line, scaleFactor);
        }

        if (associationDirection.equals(AssociationDirection.BOTH)) {
            line = new java.awt.geom.Line2D.Double((double)xPoints[1], (double)yPoints[1], (double)xPoints[0], (double)yPoints[0]);
            this.drawArrowHead(line, scaleFactor);
        }

        this.g.setPaint(originalPaint);
        this.g.setStroke(originalStroke);
    }

    /**
     * @Title: drawExclusiveGateway
     * @Description: 绘制路由
     * @param
     * @return:
     * @throws:
     * @author: maliang
     * @Date: 2019/5/10
     */
    @Override
    public void drawExclusiveGateway(GraphicInfo graphicInfo, double scaleFactor) {
        Paint paint = this.g.getPaint();
        Map<String, Paint> gateMap = (Map) ThreadMapUtil.get("DefaultInstHistImgService_gateMap");
        FlowNode flowNode = (FlowNode)ThreadMapUtil.get("BpmProcessDiagramGenerator_flowNode");
        this.g.setPaint((Paint)gateMap.getOrDefault(flowNode.getId(), paint));
        super.drawExclusiveGateway(graphicInfo, scaleFactor);
        this.g.setPaint(paint);
    }

}
