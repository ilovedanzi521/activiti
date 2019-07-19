package com.win.dfas;

import org.activiti.spring.boot.SecurityAutoConfiguration;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.RestController;

import springfox.documentation.swagger2.annotations.EnableSwagger2;


/**
 * 包名称：com.win.dfas
 * 类名称：ActivitiApplication
 * 类描述：ActivitiApplication
 * 创建人：@author wanglei
 *
 * 创建时间：2019/6/11/13:10
 */
@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
@EnableSwagger2
@ComponentScan(basePackages = {"com.win"})
@EnableFeignClients(basePackages = {"com.win"})
@RestController
public class ActivitiApplication {

    public static void main(String[] args) {
        SpringApplication.run(ActivitiApplication.class, args);
    }

}
