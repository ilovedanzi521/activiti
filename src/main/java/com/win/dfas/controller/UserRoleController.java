package com.win.dfas.controller;

import cn.hutool.core.bean.BeanUtil;
import com.win.dfas.common.vo.WinResponseData;
import com.win.dfas.controller.feign.IuserFeignClient;
import com.win.dfas.vo.request.DepartmentInfoReqVO;
import com.win.dfas.vo.request.UserInfoReqVO;
import com.win.dfas.vo.response.DepartmentInfoRepVO;
import com.win.dfas.vo.response.RoleInfoRepVO;
import com.win.dfas.vo.response.UserInfoRepVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * 包名称：com.win.dfas.controller
 * 类名称：UserRoleController
 * 类描述：ACTIVITI流程代理人选择用户信息和用户组信息
 * 创建人：@author wanglei
 * 创建时间：2019/6/19/16:16
 */
@RequestMapping("service")
@RestController
@Slf4j
public class UserRoleController {
    //fegin接口
    private IuserFeignClient userFeignClient;
    /**
     * @Title: getUserInfoList
     * @Description: activiti选择人员信息时，获取fegin第三方数据，并解析返回
     * @return com.win.dfas.common.vo.WinResponseData
     * @throws
     * @author wanglei
     * @Date 2019/7/10/16:44
     */
    @RequestMapping("/param/userList")
    public WinResponseData getUserInfoList(){
        UserInfoReqVO userInoReq = new UserInfoReqVO();
        userInoReq.setUserState("1"); //用户正常状态
        WinResponseData rtn = userFeignClient.queryUserInfoList(userInoReq);
        if(WinResponseData.WinRspType.SUCC.equals(rtn.getWinRspType())){
            log.info("fegin接口返回===="+rtn.getData().toString());
           List<Map<String,String>> repVOS = (List) rtn.getData();
            List<RoleInfoRepVO> userList = new ArrayList<>();
            for (int i = 0; i < repVOS.size(); i++) {
                UserInfoRepVO repVO= (UserInfoRepVO) BeanUtil.mapToBean(repVOS.get(i), UserInfoRepVO.class,false);
                RoleInfoRepVO roleInfoRepVO = new RoleInfoRepVO();
                roleInfoRepVO.setAccount(repVO.getUserId());
                roleInfoRepVO.setName(repVO.getUserName());
                userList.add(roleInfoRepVO);
            }
            log.info("用户信息========"+userList.toString());
            return WinResponseData.handleSuccess(userList);
        }
        return WinResponseData.handleError("无信息");
    }


    /**
     * @Title: getDepartmentinfoList
     * @Description: activiti选择部门时，获取fegin第三方数据，并解析返回
     * @param type
     * @return com.win.dfas.common.vo.WinResponseData
     * @throws
     * @author wanglei
     * @Date 2019/7/10/16:39
     */
    @RequestMapping("/param/groupList/{type}")
    public WinResponseData getDepartmentinfoList(@PathVariable("type") String type){
        DepartmentInfoReqVO reqVO = new DepartmentInfoReqVO();
        WinResponseData rtn = userFeignClient.queryDepartmentList(reqVO);
        if(WinResponseData.WinRspType.SUCC.equals(rtn.getWinRspType())){
//            List<DepartmentInfoRepVO> repVOS = (List<DepartmentInfoRepVO>) rtn.getData();
            List<Map<String,String>> repVOS = (List) rtn.getData();
            List<RoleInfoRepVO> departmentList = new ArrayList<>();
//            for (DepartmentInfoRepVO repVO : repVOS) {
//                RoleInfoRepVO roleInfoRepVO = new RoleInfoRepVO();
//                roleInfoRepVO.setAccount(repVO.getDepartmentId());
//                roleInfoRepVO.setName(repVO.getDepartmentName());
//                departmentList.add(roleInfoRepVO);
//            }
            for (int i = 0; i < repVOS.size(); i++) {
                DepartmentInfoRepVO departmentInfoRepVO= (DepartmentInfoRepVO) BeanUtil.mapToBean(repVOS.get(i), DepartmentInfoRepVO.class,false);
                RoleInfoRepVO roleInfoRepVO = new RoleInfoRepVO();
                roleInfoRepVO.setAccount(departmentInfoRepVO.getDepartmentId());
                roleInfoRepVO.setName(departmentInfoRepVO.getDepartmentName());
                departmentList.add(roleInfoRepVO);
            }
            log.info("部门信息========"+departmentList.toString());
            return WinResponseData.handleSuccess(departmentList);
        }
        return WinResponseData.handleError("无信息");
    }
}
