package com.win.dfas.controller.feign;

import com.win.dfas.common.vo.WinResponseData;
import com.win.dfas.dto.*;
import com.win.dfas.vo.request.DepartmentInfoReqVO;
import com.win.dfas.vo.request.UserInfoReqVO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
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
    /**
     * @Title: queryDirectionList
     * @Description: 获取交易方向
     * @param o
     * @return com.win.dfas.common.vo.WinResponseData
     * @throws
     * @author wanglei
     * @Date 2019/7/25/15:34
     */
    @PostMapping("/api/direction/find/code")
    WinResponseData queryDirectionList(@RequestBody TransactionDirectionDTO o);
    /**
     * @Title: querySecurityTypeList
     * @Description: 证券类型
     * @param
     * @return com.win.dfas.common.vo.WinResponseData
     * @throws
     * @author wanglei
     * @Date 2019/7/26/11:40
     */
    @GetMapping("/api/param/securityBasicInfo/list")
    WinResponseData querySecurityTypeList(@RequestBody SecurityTypeDTO dto);
    /**
     * @Title: queryMarketList
     * @Description: 交易市场
     * @return com.win.dfas.common.vo.WinResponseData
     * @throws
     * @author wanglei
     * @Date 2019/7/26/11:54
     */
    @PostMapping("/api/market/find/market")
    WinResponseData queryMarketList(MarketDTO dto);
    /**
     * @Title: queryInvestCompanyList
     * @Description: 查询投资单元
     * @param investCompanyDTO
     * @return com.win.dfas.common.vo.WinResponseData
     * @throws
     * @author wanglei
     * @Date 2019/7/26/13:29
     */
    @PostMapping("/api/prod/assetUnit/list")
    WinResponseData queryInvestCompanyList(InvestCompanyDTO investCompanyDTO);
    /**
     * @Title: queryControlTypes
     * @Description 获取指令类型
     * @param dto
     * @return com.win.dfas.common.vo.WinResponseData
     * @throws
     * @author wanglei
     * @Date 2019/8/19/11:03
     */
    @PostMapping("/dics/listMultipleAllSub")
    WinResponseData queryInstructionTypeList(DataDicDTO dto);
}
