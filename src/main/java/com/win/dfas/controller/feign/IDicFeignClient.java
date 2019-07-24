package com.win.dfas.controller.feign;

import com.win.dfas.common.vo.WinResponseData;
import com.win.dfas.dto.InvestConstituteDTO;
import com.win.dfas.vo.request.DepartmentInfoReqVO;
import com.win.dfas.vo.request.UserInfoReqVO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 包名称：com.win.dfas.controller.feign
 * 类名称：IuserFeignClient
 * 类描述：数据字典下拉框
 * 创建人：@author wanglei
 * 创建时间：2019/7/10/11:49
 */
@FeignClient("dfbp-common-basicparameter")
public interface IDicFeignClient {
    /**
     * @Title: queryUserInfoList
     * @Description: 产品管理操作对外feign接口
     * @param
     * @return java.util.List<Object>
     * @throws
     * @author wanglei
     * @Date 2019/7/10/15:35
     */
    @PostMapping("/api/prod/list")
    WinResponseData queryProdList();
    /**
     * @Title: queryInvestConstituteList
     * @Description: 投资组合操作对外feign接口
     * @param
     * @return java.util.List<Object>
     * @throws
     * @author wanglei
     * @Date 2019/7/10/15:35
     */
    @PostMapping("/api/prod/portfolio/list")
    WinResponseData queryInvestConstituteList(@RequestBody InvestConstituteDTO o);

    @PostMapping("/direction/find/code")
    WinResponseData queryDirectionList(@RequestBody InvestConstituteDTO o);
}
