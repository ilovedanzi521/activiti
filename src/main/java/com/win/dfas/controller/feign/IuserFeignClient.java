package com.win.dfas.controller.feign;

import com.win.dfas.common.vo.WinResponseData;
import com.win.dfas.vo.request.DepartmentInfoReqVO;
import com.win.dfas.vo.request.UserInfoReqVO;
import com.win.dfas.vo.response.DepartmentInfoRepVO;
import com.win.dfas.vo.response.UserInfoRepVO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

/**
 * 包名称：com.win.dfas.controller.feign
 * 类名称：IuserFeignClient
 * 类描述：用户信息第三方调用
 * 创建人：@author wanglei
 * 创建时间：2019/7/10/11:49
 */
@FeignClient("dfas-auth-center")
public interface IuserFeignClient {
    /**
     * @Title: queryUserInfoList
     * @Description: fegin接口-获取用户信息
     * @param userInoReq
     * @return java.util.List<java.lang.String>
     * @throws
     * @author wanglei
     * @Date 2019/7/10/15:35
     */
    @PostMapping("/api/feign/user/userList")
    WinResponseData queryUserInfoList(@RequestBody UserInfoReqVO userInoReq);
    /**
     * @Title: queryUserFromDepartmentList
     * @Description: fegin接口-获取部门信息
     * @param
     * @return java.util.List<java.lang.String>
     * @throws
     * @author wanglei
     * @Date 2019/7/10/15:36
     */
    @PostMapping("/api/feign/department/list")
    WinResponseData queryDepartmentList(@RequestBody DepartmentInfoReqVO reqVO);
}
