package com.win.dfas.controller.feign;

import cn.hutool.core.util.ObjectUtil;
import com.alibaba.fastjson.JSONObject;
import com.win.dfas.common.constant.DicConstants;
import com.win.dfas.common.enumeration.FormatEnum;
import com.win.dfas.common.vo.WinResponseData;
import com.win.dfas.constant.InitDataConstant;
import com.win.dfas.dto.*;
import com.win.dfas.service.IFlowGroupService;
import com.win.dfas.service.ILoadDicService;
import com.win.dfas.service.strategy.StrategyFactory;
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
import java.util.Map;

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
        HashMap<String, List> map = new HashMap<>();
        List<FlowNameItem> list0 = queryFlow();
        //加载数据字典
        Map dicData=loadDicData();
        //获取流程类型
        List list = getDataDic(dicData,DicConstants.PDIC_1000297);
        //获取指令类型
        List list1 = getDataDic(dicData,DicConstants.PDIC_1000295);
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
        //控制类型
        List<ControlTypeItem> list8 = loadControlTypes();
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
        if(ObjectUtil.isEmpty(param)){
           return WinResponseData.handleSuccess("成功返回", list);
        }
        switch (EnumUtils.getEnum(SelectorItemEnum.class, loadItems)) {
            //产品
            case PRO:
//                list = loadDicService.queryInvestCompanyList(param);
                list = loadDicService.queryDataList(param, InitDataConstant.PRO_ASSET_RELA,
                        StrategyFactory.FeginKey.ASSET, FormatEnum.PROD_ASSET_UNIT);
                break;
            //单位
            case COM:
                list = loadDicService.queryDataList(param, InitDataConstant.PRO_PORTFOLIO_RELA,
                        StrategyFactory.FeginKey.PORTFOLIO, FormatEnum.PORTFOLIO_NO_T_NAME);
                break;
            //市场类型
            case MAK:
                HashMap<String, List> map = new HashMap<>(InitDataConstant.MAP_INIT_CAPACITY);
                list = loadDicService.queryDataList(param, InitDataConstant.MARK_SECURITY_RELA,
                        StrategyFactory.FeginKey.SECURITY, FormatEnum.SECURITY_CODE_T_NAME);
                map.put(SelectorItemEnum.SEC.getValue(), list);
                list = loadDicService.queryDataList(param, InitDataConstant.MARK_TRA_DIR_RELA,
                        StrategyFactory.FeginKey.TRA_DIR, FormatEnum.TRADEDIRECTION_CODE_T_NAME);
                map.put(SelectorItemEnum.TRN.getValue(), list);
                return WinResponseData.handleSuccess("成功返回", map);
            default:
                return WinResponseData.handleError("失败");
        }
        log.info("接口返回数据:{}",list);
        return WinResponseData.handleSuccess("成功返回", list);
    }

    /**
     * @Title: loadInstructionTypes
     * @Description: 加载数据字典
     * @return java.util.List<com.win.dfas.vo.response.item.InstructionTypeItem>
     * @throws
     * @author wanglei
     * @Date 2019/7/26/13:34
     */
    private Map loadDicData() {
        Map map = new HashMap(InitDataConstant.MAP_INIT_CAPACITY);
        DataDicDTO dto = new DataDicDTO();
        List<String> params = new ArrayList<>();
        params.add(DicConstants.PDIC_1000295);
        params.add(DicConstants.PDIC_1000297);
        dto.setParentDicCodeList(params);
        try {
            WinResponseData rtn = dicFeignClient.queryInstructionTypeList(dto);
            if (WinResponseData.WinRspType.SUCC.equals(rtn.getWinRspType())) {
                return JSONObject.parseObject(JSONObject.toJSONString(rtn.getData()),Map.class);
            } else {
                log.error("feign接口queryMarketList异常, 返回{}", rtn.getMsg());
            }
        } catch (Throwable throwable) {
            log.error("feign接口异常", throwable.getCause());
        }
        return map;
    }
    /**
     * @Title: loadInstructionTypes
     * @Description 从字典中获取指令类型
     * @param dicData
     * @param key
     * @return java.util.List<com.win.dfas.vo.response.item.FlowTypeItem>
     * @throws
     * @author wanglei
     * @Date 2019/8/19/13:43
     */
    private List<CommonItem> getDataDic(Map dicData, String key) {
        List<CommonItem> list = new ArrayList<>();
        try {
            Object object = dicData.get(key);
            if(object==null){
                log.error("dicData:{},get:{} is null",dicData,key);
                return list;
            }
            list=loadDicService.converterVO(object,
                    CommonItem.class,new String[]{"dicCode","dicExplain"});
        } catch (Exception e) {
            log.error("loadInstructionTypes异常{}", e);
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
     * @Description: 控制类型
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
