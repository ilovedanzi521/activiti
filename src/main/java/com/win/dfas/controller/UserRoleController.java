package com.win.dfas.controller;

import com.win.dfas.common.vo.WinResponseData;
import com.win.dfas.entity.UserIno;
import com.win.dfas.vo.request.ParamFlowGroupReqVO;
import com.win.dfas.vo.request.UserInoReq;
import com.win.dfas.vo.response.ParamFlowGroupRepVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

/**
 * 包名称：com.win.dfas.controller
 * 类名称：UserRoleController
 * 类描述：${TODO}
 * 创建人：@author wanglei
 * 创建时间：2019/6/19/16:16
 */
@RequestMapping("service")
@RestController
@Slf4j
public class UserRoleController {
    @RequestMapping("/param/userList")
    public WinResponseData getUserInfoList(){
        UserIno info = new UserIno();
        info.setCompany("赢时胜");
        info.setDepartment("开发");
        info.setUserId("1201");
        info.setOperation("增删");
        info.setRole("管理员");
        info.setUserName("王雷");

        List<UserIno> userList = new ArrayList<>();
        userList.add(info);
        userList.add(info);
        userList.add(info);
        userList.add(info);
        log.info(userList.toString());
        return WinResponseData.handleSuccess(userList);
    }



    @PostMapping("/param/searchUserinfo")
    public WinResponseData getSearchUserinfoList(@RequestBody UserInoReq userInoReq){
        UserIno info = new UserIno();
        info.setCompany("赢时胜");
        info.setDepartment("开发");
        info.setUserId("1201");
        info.setOperation("增删");
        info.setRole("管理员");
        info.setUserName("王雷");

        List<UserIno> userList = new ArrayList<>();
        userList.add(info);
        userList.add(info);
        userList.add(info);
        userList.add(info);
        return WinResponseData.handleSuccess(userList);
    }
}
