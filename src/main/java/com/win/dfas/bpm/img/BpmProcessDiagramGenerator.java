/****************************************************
 * 创建人: @author wanglei
 * 创建时间: 2019/9/20/14:06
 * 项目名称: dfas-common-bpm
 * 文件名称: BpmProcessDiagramGenerator.java
 * 文件描述: @Description: 图片生成器
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/

package com.win.dfas.bpm.img;

import com.github.pagehelper.util.StringUtil;
import com.win.dfas.bpm.util.AppUtil;
import org.activiti.bpmn.model.*;
import org.activiti.bpmn.model.Process;
import org.activiti.engine.ProcessEngineConfiguration;
import org.activiti.image.impl.DefaultProcessDiagramGenerator;
import org.springframework.stereotype.Component;

import java.awt.*;
import java.io.InputStream;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 * 包名称：com.win.dfas.bpm.img
 * 类名称：BpmProcessDiagramGenerator
 * 类描述：图片生成器
 * 创建人：@author wanglei
 * 创建时间：2019/9/20/14:06
 */
@Component
public class BpmProcessDiagramGenerator extends DefaultProcessDiagramGenerator {
    private static ProcessEngineConfiguration processEngineConfiguration;

    public BpmProcessDiagramGenerator() {
    }

    public InputStream generateDiagram(BpmnModel bpmnModel, String imageType, Map<String, Paint> nodeMap, Map<String, Paint> flowMap) {
        this.prepareBpmnModel(bpmnModel);
        BpmProcessDiagramCanvas processDiagramCanvas = initProcessDiagramCanvas(bpmnModel, imageType, processEngineConfiguration().getActivityFontName(), processEngineConfiguration().getActivityFontName(), processEngineConfiguration().getAnnotationFontName(), processEngineConfiguration().getClassLoader());
        Iterator bpmnModels = bpmnModel.getPools().iterator();

        while(bpmnModels.hasNext()) {
            Pool pool = (Pool)bpmnModels.next();
            GraphicInfo graphicInfo = bpmnModel.getGraphicInfo(pool.getId());
            processDiagramCanvas.drawPoolOrLane(pool.getName(), graphicInfo);
        }

        bpmnModels = bpmnModel.getProcesses().iterator();

        Process process;
        Iterator lanes;
        while(bpmnModels.hasNext()) {
            process = (Process)bpmnModels.next();
            lanes = process.getLanes().iterator();

            while(lanes.hasNext()) {
                Lane lane = (Lane)lanes.next();
                GraphicInfo graphicInfo = bpmnModel.getGraphicInfo(lane.getId());
                processDiagramCanvas.drawPoolOrLane(lane.getName(), graphicInfo);
            }
        }

        bpmnModels = bpmnModel.getProcesses().iterator();

        while(bpmnModels.hasNext()) {
            process = (Process)bpmnModels.next();
            lanes = process.findFlowElementsOfType(FlowNode.class).iterator();

            while(lanes.hasNext()) {
                FlowNode flowNode = (FlowNode)lanes.next();
                this.drawActivity(processDiagramCanvas, bpmnModel, flowNode, nodeMap, flowMap, 1.0D);
            }
        }

        bpmnModels = bpmnModel.getProcesses().iterator();

        while(true) {
            java.util.List subProcesses;
            do {
                if (!bpmnModels.hasNext()) {
                    return processDiagramCanvas.generateImage(imageType);
                }

                process = (Process)bpmnModels.next();
                lanes = process.getArtifacts().iterator();

                while(lanes.hasNext()) {
                    Artifact artifact = (Artifact)lanes.next();
                    this.drawArtifact(processDiagramCanvas, bpmnModel, artifact);
                }

                subProcesses = process.findFlowElementsOfType(SubProcess.class, true);
            } while(subProcesses == null);

            Iterator subProcessesIterator = subProcesses.iterator();

            while(subProcessesIterator.hasNext()) {
                SubProcess subProcess = (SubProcess)subProcessesIterator.next();
                Iterator var11 = subProcess.getArtifacts().iterator();

                while(var11.hasNext()) {
                    Artifact subProcessArtifact = (Artifact)var11.next();
                    this.drawArtifact(processDiagramCanvas, bpmnModel, subProcessArtifact);
                }
            }
        }
    }

    private void drawActivity(BpmProcessDiagramCanvas processDiagramCanvas, BpmnModel bpmnModel, FlowNode flowNode, Map<String, Paint> nodes, Map<String, Paint> flows, double scaleFactor) {
        ThreadMapUtil.put("BpmProcessDiagramGenerator_flowNode", flowNode);
        DefaultProcessDiagramGenerator.ActivityDrawInstruction drawInstruction = (ActivityDrawInstruction)this.activityDrawInstructions.get(flowNode.getClass());
        boolean highLighted;
        if (drawInstruction != null) {
            drawInstruction.draw(processDiagramCanvas, bpmnModel, flowNode);
            boolean multiInstanceSequential = false;
            boolean multiInstanceParallel = false;
            highLighted = false;
            if (flowNode instanceof Activity) {
                Activity activity = (Activity)flowNode;
                MultiInstanceLoopCharacteristics multiInstanceLoopCharacteristics = activity.getLoopCharacteristics();
                if (multiInstanceLoopCharacteristics != null) {
                    multiInstanceSequential = multiInstanceLoopCharacteristics.isSequential();
                    multiInstanceParallel = !multiInstanceSequential;
                }
            }

            GraphicInfo graphicInfo = bpmnModel.getGraphicInfo(flowNode.getId());
            if (!(flowNode instanceof SubProcess)) {
                if (flowNode instanceof CallActivity) {
                    highLighted = true;
                }
            } else {
                highLighted = graphicInfo.getExpanded() != null && !graphicInfo.getExpanded();
            }

            if (scaleFactor == 1.0D) {
                processDiagramCanvas.drawActivityMarkers((int)graphicInfo.getX(), (int)graphicInfo.getY(), (int)graphicInfo.getWidth(), (int)graphicInfo.getHeight(), multiInstanceSequential, multiInstanceParallel, highLighted);
            }

            if (nodes.keySet().contains(flowNode.getId())) {
                this.drawHighLight(processDiagramCanvas, bpmnModel.getGraphicInfo(flowNode.getId()), (Paint)nodes.get(flowNode.getId()));
            }
        }

        Iterator outgoingFlows = flowNode.getOutgoingFlows().iterator();

        while(outgoingFlows.hasNext()) {
            SequenceFlow sequenceFlow = (SequenceFlow)outgoingFlows.next();
            highLighted = flows.keySet().contains(sequenceFlow.getId());
            String defaultFlow = null;
            if (flowNode instanceof Activity) {
                defaultFlow = ((Activity)flowNode).getDefaultFlow();
            } else if (flowNode instanceof Gateway) {
                defaultFlow = ((Gateway)flowNode).getDefaultFlow();
            }

            boolean isDefault = false;
            if (defaultFlow != null && defaultFlow.equalsIgnoreCase(sequenceFlow.getId())) {
                isDefault = true;
            }

            boolean drawConditionalIndicator = sequenceFlow.getConditionExpression() != null && !(flowNode instanceof Gateway);
            String sourceRef = sequenceFlow.getSourceRef();
            String targetRef = sequenceFlow.getTargetRef();
            FlowElement sourceElement = bpmnModel.getFlowElement(sourceRef);
            FlowElement targetElement = bpmnModel.getFlowElement(targetRef);
            java.util.List<GraphicInfo> graphicInfoList = bpmnModel.getFlowLocationGraphicInfo(sequenceFlow.getId());
            if (graphicInfoList != null && graphicInfoList.size() > 0) {
                graphicInfoList = connectionPerfectionizer(processDiagramCanvas, bpmnModel, sourceElement, targetElement, graphicInfoList);
                int[] xPoints = new int[graphicInfoList.size()];
                int[] yPoints = new int[graphicInfoList.size()];

                for(int i = 1; i < graphicInfoList.size(); ++i) {
                    GraphicInfo graphicInfo = (GraphicInfo)graphicInfoList.get(i);
                    GraphicInfo previousGraphicInfo = (GraphicInfo)graphicInfoList.get(i - 1);
                    if (i == 1) {
                        xPoints[0] = (int)previousGraphicInfo.getX();
                        yPoints[0] = (int)previousGraphicInfo.getY();
                    }

                    xPoints[i] = (int)graphicInfo.getX();
                    yPoints[i] = (int)graphicInfo.getY();
                }

                processDiagramCanvas.drawSequenceflow(xPoints, yPoints, drawConditionalIndicator, isDefault, highLighted, (Paint)flows.get(sequenceFlow.getId()), scaleFactor);
                GraphicInfo labelGraphicInfo;
                if (StringUtil.isNotEmpty(sequenceFlow.getName()) && !sequenceFlow.getName().startsWith("连线")) {
                    labelGraphicInfo = new GraphicInfo();
                    labelGraphicInfo.setX((double)((xPoints[0] + xPoints[1]) / 2));
                    labelGraphicInfo.setY((double)((yPoints[0] + yPoints[1]) / 2 - 15));
                    processDiagramCanvas.drawLabel(sequenceFlow.getName(), labelGraphicInfo, false);
                }

                labelGraphicInfo = bpmnModel.getLabelGraphicInfo(sequenceFlow.getId());
                if (labelGraphicInfo != null) {
                    processDiagramCanvas.drawLabel(sequenceFlow.getName(), labelGraphicInfo, false);
                }
            }
        }

        if (flowNode instanceof FlowElementsContainer) {
            outgoingFlows = ((FlowElementsContainer)flowNode).getFlowElements().iterator();

            while(outgoingFlows.hasNext()) {
                FlowElement nestedFlowElement = (FlowElement)outgoingFlows.next();
                if (nestedFlowElement instanceof FlowNode) {
                    this.drawActivity(processDiagramCanvas, bpmnModel, (FlowNode)nestedFlowElement, nodes, flows, scaleFactor);
                }
            }
        }

        if (flowNode instanceof ExclusiveGateway) {
            GraphicInfo graphicInfo = bpmnModel.getGraphicInfo(flowNode.getId());
            GraphicInfo info = new GraphicInfo();
            info.setX(graphicInfo.getX() + 40.0D);
            info.setY(graphicInfo.getY() + 40.0D);
            processDiagramCanvas.drawLabel(flowNode.getName(), info, true);
        }

    }

    private void drawHighLight(BpmProcessDiagramCanvas processDiagramCanvas, GraphicInfo graphicInfo, Paint paint) {
        processDiagramCanvas.drawHighLight((int)graphicInfo.getX(), (int)graphicInfo.getY(), (int)graphicInfo.getWidth(), (int)graphicInfo.getHeight(), paint);
    }

    protected static BpmProcessDiagramCanvas initProcessDiagramCanvas(BpmnModel bpmnModel, String imageType, String activityFontName, String labelFontName, String annotationFontName, ClassLoader customClassLoader) {
        double minX = 1.7976931348623157E308D;
        double maxX = 0.0D;
        double minY = 1.7976931348623157E308D;
        double maxY = 0.0D;

        GraphicInfo graphicInfo;
        for(Iterator var14 = bpmnModel.getPools().iterator(); var14.hasNext(); maxY = graphicInfo.getY() + graphicInfo.getHeight()) {
            Pool pool = (Pool)var14.next();
            graphicInfo = bpmnModel.getGraphicInfo(pool.getId());
            minX = graphicInfo.getX();
            maxX = graphicInfo.getX() + graphicInfo.getWidth();
            minY = graphicInfo.getY();
        }

        java.util.List<FlowNode> flowNodes = gatherAllFlowNodes(bpmnModel);
        Iterator flowNodesIterator = flowNodes.iterator();

        label155:
        while(flowNodesIterator.hasNext()) {
            FlowNode flowNode = (FlowNode)flowNodesIterator.next();
            GraphicInfo flowNodeGraphicInfo = bpmnModel.getGraphicInfo(flowNode.getId());
            if (flowNodeGraphicInfo.getX() + flowNodeGraphicInfo.getWidth() > maxX) {
                maxX = flowNodeGraphicInfo.getX() + flowNodeGraphicInfo.getWidth();
            }

            if (flowNodeGraphicInfo.getX() < minX) {
                minX = flowNodeGraphicInfo.getX();
            }

            if (flowNodeGraphicInfo.getY() + flowNodeGraphicInfo.getHeight() > maxY) {
                maxY = flowNodeGraphicInfo.getY() + flowNodeGraphicInfo.getHeight();
            }

            if (flowNodeGraphicInfo.getY() < minY) {
                minY = flowNodeGraphicInfo.getY();
            }

            Iterator var18 = flowNode.getOutgoingFlows().iterator();

            while(true) {
                java.util.List graphicInfoList;
                do {
                    if (!var18.hasNext()) {
                        continue label155;
                    }

                    SequenceFlow sequenceFlow = (SequenceFlow)var18.next();
                    graphicInfoList = bpmnModel.getFlowLocationGraphicInfo(sequenceFlow.getId());
                } while(graphicInfoList == null);

                Iterator var21 = graphicInfoList.iterator();

                while(var21.hasNext()) {
//                    GraphicInfo graphicInfo = (GraphicInfo)var21.next();
                    graphicInfo = (GraphicInfo)var21.next();
                    if (graphicInfo.getX() > maxX) {
                        maxX = graphicInfo.getX();
                    }

                    if (graphicInfo.getX() < minX) {
                        minX = graphicInfo.getX();
                    }

                    if (graphicInfo.getY() > maxY) {
                        maxY = graphicInfo.getY();
                    }

                    if (graphicInfo.getY() < minY) {
                        minY = graphicInfo.getY();
                    }
                }
            }
        }

        java.util.List<Artifact> artifacts = gatherAllArtifacts(bpmnModel);
        Iterator var27 = artifacts.iterator();

//        GraphicInfo graphicInfo;
        while(var27.hasNext()) {
            Artifact artifact = (Artifact)var27.next();
            GraphicInfo artifactGraphicInfo = bpmnModel.getGraphicInfo(artifact.getId());
            if (artifactGraphicInfo != null) {
                if (artifactGraphicInfo.getX() + artifactGraphicInfo.getWidth() > maxX) {
                    maxX = artifactGraphicInfo.getX() + artifactGraphicInfo.getWidth();
                }

                if (artifactGraphicInfo.getX() < minX) {
                    minX = artifactGraphicInfo.getX();
                }

                if (artifactGraphicInfo.getY() + artifactGraphicInfo.getHeight() > maxY) {
                    maxY = artifactGraphicInfo.getY() + artifactGraphicInfo.getHeight();
                }

                if (artifactGraphicInfo.getY() < minY) {
                    minY = artifactGraphicInfo.getY();
                }
            }

            List<GraphicInfo> graphicInfoList = bpmnModel.getFlowLocationGraphicInfo(artifact.getId());
            if (graphicInfoList != null) {
                Iterator var35 = graphicInfoList.iterator();

                while(var35.hasNext()) {
                    graphicInfo = (GraphicInfo)var35.next();
                    if (graphicInfo.getX() > maxX) {
                        maxX = graphicInfo.getX();
                    }

                    if (graphicInfo.getX() < minX) {
                        minX = graphicInfo.getX();
                    }

                    if (graphicInfo.getY() > maxY) {
                        maxY = graphicInfo.getY();
                    }

                    if (graphicInfo.getY() < minY) {
                        minY = graphicInfo.getY();
                    }
                }
            }
        }

        int nrOfLanes = 0;
        Iterator processess = bpmnModel.getProcesses().iterator();

        while(processess.hasNext()) {
            Process process = (Process)processess.next();
            Iterator processLane = process.getLanes().iterator();

            while(processLane.hasNext()) {
                Lane l = (Lane)processLane.next();
                ++nrOfLanes;
                graphicInfo = bpmnModel.getGraphicInfo(l.getId());
                if (graphicInfo.getX() + graphicInfo.getWidth() > maxX) {
                    maxX = graphicInfo.getX() + graphicInfo.getWidth();
                }

                if (graphicInfo.getX() < minX) {
                    minX = graphicInfo.getX();
                }

                if (graphicInfo.getY() + graphicInfo.getHeight() > maxY) {
                    maxY = graphicInfo.getY() + graphicInfo.getHeight();
                }

                if (graphicInfo.getY() < minY) {
                    minY = graphicInfo.getY();
                }
            }
        }

        if (flowNodes.isEmpty() && bpmnModel.getPools().isEmpty() && nrOfLanes == 0) {
            minX = 0.0D;
            minY = 0.0D;
        }

        return new BpmProcessDiagramCanvas((int)maxX + 10, (int)maxY + 10, (int)minX, (int)minY, imageType, activityFontName, labelFontName, annotationFontName, customClassLoader);
    }

    private static ProcessEngineConfiguration processEngineConfiguration() {
        if (processEngineConfiguration == null) {
            processEngineConfiguration = (ProcessEngineConfiguration) AppUtil.getBean(ProcessEngineConfiguration.class);
        }

        return processEngineConfiguration;
    }
}
