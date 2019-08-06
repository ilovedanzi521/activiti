package com.win.dfas.controller.feign;

import com.alibaba.fastjson.JSONObject;
import com.win.dfas.common.vo.WinResponseData;
import com.win.dfas.constant.InitDataConstant;
import com.win.dfas.dto.*;
import com.win.dfas.service.IFlowGroupService;
import com.win.dfas.service.ILoadDicService;
import com.win.dfas.vo.response.SelectorItemEnum;
import com.win.dfas.vo.response.item.*;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.EnumUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * 包名称：com.win.dfas.controller
 * 类名称：UserRoleController
 * 类描述：第三方feign接口
 * 创建人：@author wanglei
 * 创建时间：2019/6/19/16:16
 */
@RequestMapping("/param")
@RestController
@Slf4j
public class ThirdFeignInterfaceController {
    @Autowired
    private IDicFeignClient dicFeignClient;
    @Autowired
    private IFlowGroupService paramFlowService;
    @Autowired
    private ILoadDicService loadDicService;

    @RequestMapping("/feign/loadSelectsItems")
    public WinResponseData loadSelectsItems() {
        HashMap<String, List> map = new HashMap<>(InitDataConstant.MAP_INIT_CAPACITY);
        List<FlowNameItem> list0 = queryFlow();
        //获取流程类型
        List<FlowTypeItem> list = loadFlowTypes();
        //获取执行类型
        List<InstructionTypeItem> list1 = loadInstructionTypes();
//        //获取投资单位
//        List<InvestCompanyItem> list2 = loadInvestCompanys();
//        //获取投资组合
//        List<InvestConstituteItem> list3 = loadInvestConstitutes();
        //交易市场
        List<MarketItem> list4 = loadMarkets();
        //获取产品
        List<ProductItem> list5 = loadProds();
//        //证券类型
//        List<SecurityTypeItem> list6 = loadSecurityTypes();
        //获取交易方向
//        List<TransactionDirectionItem> list7 = loadTransactionDirections();
        //指令类型
        List<ControlTypeItem> list8 = loadControlTypes();
        log.info(list.toString());
        map.put(SelectorItemEnum.NAM.getValue(), list0);

        map.put(SelectorItemEnum.FLW.getValue(), list);
        map.put(SelectorItemEnum.INS.getValue(), list1);
        map.put(SelectorItemEnum.MAK.getValue(), list4);
        map.put(SelectorItemEnum.PRO.getValue(), list5);
        map.put(SelectorItemEnum.CTR.getValue(), list8);
        return WinResponseData.handleSuccess(map);
    }

    private List<FlowNameItem> queryFlow() {
        try {
            return loadDicService.queryFlow();
        } catch (Exception e) {
            log.error("feign接口异常:{}", e);
        }
        return null;
    }

    @RequestMapping("/feign/{loadItems}")
    public WinResponseData loadSelectsItems(@PathVariable("loadItems") String loadItems, @RequestParam("param") String param) {
        List list = new ArrayList<>();
        switch (EnumUtils.getEnum(SelectorItemEnum.class, loadItems)) {
            //产品
            case PRO:
                InvestCompanyDTO dto = new InvestCompanyDTO();
                dto.setFundNo(param);
                try {
                    WinResponseData rtn = dicFeignClient.queryInvestCompanyList(dto);
                    if (WinResponseData.WinRspType.SUCC.equals(rtn.getWinRspType())) {
                        list = loadDicService.converterVO(rtn.getData(), InvestCompanyDTO.class, InvestCompanyItem.class, new String[]{"no", "assetUnitName"});
                    }
                } catch (Throwable throwable) {
                    log.error("feign接口异常", throwable);
                }
                break;
            //单位
            case COM:
                InvestConstituteDTO investConstituteDTO = new InvestConstituteDTO();
                investConstituteDTO.setAssetUnitNo(param);
                try {
                    WinResponseData rtn = dicFeignClient.queryInvestConstituteList(investConstituteDTO);
                    if (WinResponseData.WinRspType.SUCC.equals(rtn.getWinRspType())) {
                        list = loadDicService.converterVO(rtn.getData(), InvestConstituteDTO.class, InvestConstituteItem.class, new String[]{"no", "portfolioName"});
                    }
                } catch (Throwable throwable) {
                    log.error("feign接口异常", throwable);
                }
                break;
            //市场类型
            case MAK:
                HashMap<String, List> map = new HashMap<>(InitDataConstant.MAP_INIT_CAPACITY);
                SecurityTypeDTO securityTypeDTO = new SecurityTypeDTO();
                securityTypeDTO.setMarketCode(param);
                try {
                    WinResponseData rtn = dicFeignClient.querySecurityTypeList(securityTypeDTO);
                    if (WinResponseData.WinRspType.SUCC.equals(rtn.getWinRspType())) {
                        list = loadDicService.converterVO(rtn.getData(), SecurityTypeDTO.class, SecurityTypeItem.class, new String[]{"securityCode", "securityName"});
                        map.put(SelectorItemEnum.SEC.getValue(), list);
                    }
                } catch (Throwable throwable) {
                    log.error("feign接口异常", throwable);
                }
                //获取交易方向
                TransactionDirectionDTO transactionDirectionDTO = new TransactionDirectionDTO();
                transactionDirectionDTO.setMarketCode(param);
                try {
                    WinResponseData rtn = dicFeignClient.queryDirectionList(transactionDirectionDTO);
                    if (WinResponseData.WinRspType.SUCC.equals(rtn.getWinRspType())) {
                        list=loadDicService.converterVO(rtn.getData(),TransactionDirectionDTO.class,TransactionDirectionItem.class,new String[]{"transactionDirection","transactionDirectionName"});
                        map.put(SelectorItemEnum.TRN.getValue(), list);
                    }
                } catch (Throwable throwable) {
                    log.error("feign接口异常", throwable);
                }
                return WinResponseData.handleSuccess("成功返回", map);
            default:
                return WinResponseData.handleError("失败");

        }
        log.info("feign接口返回数据:{}",list);
        return WinResponseData.handleSuccess("成功返回", list);
    }

    /**
     * @Title: loadInstructionTypes
     * @Description: 加载指令类型
     * @return java.util.List<com.win.dfas.vo.response.item.InstructionTypeItem>
     * @throws
     * @author wanglei
     * @Date 2019/7/26/13:34
     */
    private List<InstructionTypeItem> loadInstructionTypes() {
        List<InstructionTypeItem> list1 = new ArrayList<>();
        for (int i = 0; i < InitDataConstant.FOR_INIT_CAPACITY; i++) {
            InstructionTypeItem info = new InstructionTypeItem();
            info.setCode("12" + i);
            info.setName("指令" + i);
            list1.add(info);
        }
        return list1;
    }

    /**
     * @Title: loadFlowTypes
     * @Description: 获取流程类型
     * @return java.util.List<com.win.dfas.vo.response.item.FlowTypeItem>
     * @throws
     * @author wanglei
     * @Date 2019/7/26/13:33
     */
    private List<FlowTypeItem> loadFlowTypes() {
        List<FlowTypeItem> list = new ArrayList<>();
        for (int i = 0; i < InitDataConstant.FOR_INIT_CAPACITY; i++) {
            FlowTypeItem info = new FlowTypeItem();
            info.setCode("12" + i);
            info.setName("流程类型" + i);
            list.add(info);
        }
        return list;
    }

    /**
     * @Title: loadInvestCompanys
     * @Description: 投资单元
     * @return java.util.List<com.win.dfas.vo.response.item.InvestCompanyItem>
     * @throws
     * @author wanglei
     * @Date 2019/7/26/13:25
     */
    private List<InvestCompanyItem> loadInvestCompanys() {
        List<InvestCompanyItem> list = new ArrayList<>();
        try {
            List<InvestCompanyDTO> rtnList = new ArrayList<>();
            WinResponseData rtn = dicFeignClient.queryInvestCompanyList(new InvestCompanyDTO());
            if (WinResponseData.WinRspType.SUCC.equals(rtn.getWinRspType())) {
                rtnList = JSONObject.parseArray(JSONObject.toJSONString(rtn.getData())).toJavaList(InvestCompanyDTO.class);
                for (InvestCompanyDTO dto : rtnList) {
                    InvestCompanyItem info = new InvestCompanyItem();
                    info.setCode(dto.getNo());
                    info.setName(dto.getAssetUnitName());
                    list.add(info);
                }
            } else{
                log.error("feign接口queryInvestCompanyList异常, 返回{}", rtn.getMsg());
            }
            return list;
        } catch (Throwable throwable) {
            log.error("feign接口异常", throwable);
        }
        return list;

    }

    /**
     * @Title: loadControlTypes
     * @Description: 指令类型
     * @return java.util.List<com.win.dfas.vo.response.item.ControlTypeItem>
     * @throws
     * @author wanglei
     * @Date 2019/7/26/13:21
     */
    private List<ControlTypeItem> loadControlTypes() {
        List<ControlTypeItem> list = new ArrayList<>();
        for (int i = 0; i < 1; i++) {
            ControlTypeItem info = new ControlTypeItem();
            info.setCode("11" + i);
            info.setName("指令金额");
            list.add(info);
        }
        return list;
    }

    /**
     * @Title: loadMarkets
     * @Description: load交易市场
     * @return java.util.List<com.win.dfas.vo.response.item.MarketItem>
     * @throws
     * @author wanglei
     * @Date 2019/7/26/11:53
     */
    private List<MarketItem> loadMarkets() {
        List<MarketItem> list = new ArrayList<>();
        try {
            List<MarketDTO> rtnList = new ArrayList<>();
            WinResponseData rtn = dicFeignClient.queryMarketList(new MarketDTO());
            if (WinResponseData.WinRspType.SUCC.equals(rtn.getWinRspType())) {
                rtnList = JSONObject.parseArray(JSONObject.toJSONString(rtn.getData())).toJavaList(MarketDTO.class);
                for (MarketDTO dto : rtnList) {
                    MarketItem info = new MarketItem();
                    info.setCode(dto.getCode());
                    info.setName(dto.getName());
                    list.add(info);
                }
            } else {
                log.error("feign接口queryMarketList异常, 返回{}", rtn.getMsg());
            }
        } catch (Throwable throwable) {
            log.error("feign接口异常", throwable);
        }
        return list;
    }
    /**
     * @Title: loadSecurityTypes
     * @Description: load证券类型
     * @return java.util.List<com.win.dfas.vo.response.item.SecurityTypeItem>
     * @throws
     * @author wanglei
     * @Date 2019/7/26/11:53
     */
    private List<SecurityTypeItem> loadSecurityTypes() {
        List<SecurityTypeItem> list = new ArrayList<>();
        try {
            List<SecurityTypeDTO> rtnList = new ArrayList<>();
            WinResponseData rtn = dicFeignClient.querySecurityTypeList(new SecurityTypeDTO());
            if (WinResponseData.WinRspType.SUCC.equals(rtn.getWinRspType())) {
                rtnList = JSONObject.parseArray(JSONObject.toJSONString(rtn.getData())).toJavaList(SecurityTypeDTO.class);
                for (SecurityTypeDTO dto : rtnList) {
                    SecurityTypeItem info = new SecurityTypeItem();
                    info.setCode(dto.getSecurityCode());
                    info.setName(dto.getSecurityName());
                    list.add(info);
                }
            } else {
                log.error("feign接口querySecurityTypeList异常, 返回{}", rtn.getMsg());
            }
        } catch (Throwable throwable) {
            log.error("feign接口异常", throwable);
        }
        return list;
    }

    /**
     * @Title: loadTransactionDirections
     * @Description: load交易方向
     * @return java.util.List<com.win.dfas.vo.response.item.TransactionDirectionItem>
     * @throws
     * @author wanglei
     * @Date 2019/7/24/16:30
     */
    private List<TransactionDirectionItem> loadTransactionDirections() {
        List<TransactionDirectionItem> list = new ArrayList<>();
        try {

            List<TransactionDirectionDTO> rtnList = new ArrayList<>();
            WinResponseData rtn = dicFeignClient.queryDirectionList(new TransactionDirectionDTO());
            if (WinResponseData.WinRspType.SUCC.equals(rtn.getWinRspType())) {
                rtnList = JSONObject.parseArray(JSONObject.toJSONString(rtn.getData())).toJavaList(TransactionDirectionDTO.class);
                for (TransactionDirectionDTO transactionDirectionDTO : rtnList) {
                    TransactionDirectionItem info = new TransactionDirectionItem();
                    info.setCode(transactionDirectionDTO.getTransactionDirection());
                    info.setName(transactionDirectionDTO.getTransactionDirectionName());
                    list.add(info);
                }
            }
        } catch (Throwable throwable) {
            log.error("feign接口异常", throwable);
        }
        return list;

    }

    /**
     * @return java.util.List<com.win.dfas.vo.response.item.InvestConstituteItem>
     * @throws
     * @Title: loadInvestConstitutes
     * @Description: load 投资组合信息
     * @author wanglei
     * @Date 2019/7/24/14:59
     */
    private List<InvestConstituteItem> loadInvestConstitutes() {
        List<InvestConstituteItem> list = new ArrayList<>();
        try {
            List<InvestConstituteDTO> rtnList = new ArrayList<>();
            WinResponseData rtn = dicFeignClient.queryInvestConstituteList(new InvestConstituteDTO());
            if (WinResponseData.WinRspType.SUCC.equals(rtn.getWinRspType())) {
                rtnList = JSONObject.parseArray(JSONObject.toJSONString(rtn.getData())).toJavaList(InvestConstituteDTO.class);
                for (InvestConstituteDTO investConstituteDTO : rtnList) {
                    InvestConstituteItem info = new InvestConstituteItem();
                    info.setCode(investConstituteDTO.getNo() + "");
                    info.setName(investConstituteDTO.getPortfolioName());
                    list.add(info);
                }
            }
        } catch (Throwable throwable) {
            log.error("feign接口异常", throwable);
        }
        return list;
    }

    /**
     * @param
     * @return java.util.List<com.win.dfas.vo.response.item.ProductItem>
     * @throws
     * @Title: loadProds
     * @Description: load 产品信息
     * @author wanglei
     * @Date 2019/7/24/14:57
     */
    private List<ProductItem> loadProds() {
        List<ProductItem> list = new ArrayList<>();
        try {
            WinResponseData rtn = dicFeignClient.queryProdList();
            List<ProdDTO> rtnList = new ArrayList<>();
            if (WinResponseData.WinRspType.SUCC.equals(rtn.getWinRspType())) {
                rtnList = JSONObject.parseArray(JSONObject.toJSONString(rtn.getData())).toJavaList(ProdDTO.class);
                for (ProdDTO dto : rtnList) {
                    ProductItem info = new ProductItem();
                    info.setCode(dto.getNo() + "");
                    info.setName(dto.getName());
                    list.add(info);
                }
            }
        } catch (Throwable throwable) {
            log.error("feign接口异常", throwable);
        }
        return list;
    }


}
