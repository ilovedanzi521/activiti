package com.win.dfas.config;

import com.win.dfas.bpm.ExtensionSequenceFlowParseHandler;
import com.win.dfas.bpm.ExtensionUserTaskParseHandler;
import org.activiti.engine.ProcessEngineConfiguration;
import org.activiti.engine.impl.history.HistoryLevel;
import org.activiti.engine.parse.BpmnParseHandler;
import org.activiti.spring.SpringProcessEngineConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.PlatformTransactionManager;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.List;

/**
 * activiti 配置类
 * WANGLEI 2019年6月27日下午3:26:56
 */
@Configuration
public class ActivitiConfig {
    @Autowired
    private DataSource dataSource;
    @Autowired
    private PlatformTransactionManager transactionManager;

    @Autowired
    private ExtensionUserTaskParseHandler handler;

    @Autowired
    private ExtensionSequenceFlowParseHandler sequenceFlowParseHandler;
    /**
     * 初始化配置
     *
     * @return
     */
    @Bean
    public SpringProcessEngineConfiguration processEngineConfiguration() {
        SpringProcessEngineConfiguration configuration = new SpringProcessEngineConfiguration();
        // 执行工作流对应的数据源
        configuration.setDataSource(dataSource);
        // 是否自动创建流程引擎表
        configuration.setDatabaseSchemaUpdate(ProcessEngineConfiguration.DB_SCHEMA_UPDATE_TRUE);
        configuration.setAsyncExecutorActivate(false);
        // 流程历史等级
        configuration.setHistoryLevel(HistoryLevel.FULL);
        // 流程图字体
        configuration.setActivityFontName("宋体");
        configuration.setAnnotationFontName("宋体");
        configuration.setLabelFontName("宋体");
        configuration.setTransactionManager(transactionManager);

        List<BpmnParseHandler> customDefaultBpmnParseHandlers= new ArrayList<>();
        customDefaultBpmnParseHandlers.add(handler);
        customDefaultBpmnParseHandlers.add(sequenceFlowParseHandler);
        configuration.setCustomDefaultBpmnParseHandlers(customDefaultBpmnParseHandlers);
        return configuration;

    }
}
