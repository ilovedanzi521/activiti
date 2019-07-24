package com.win.dfas.controller.feign;

import com.alibaba.fastjson.JSONObject;
import com.win.dfas.common.vo.WinResponseData;
import com.win.dfas.dto.InvestConstituteDTO;
import com.win.dfas.vo.response.SelectorItemEnum;
import com.win.dfas.vo.response.item.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @RequestMapping("/feign/loadSelectsItems")
    public WinResponseData LoadSelectsItems() {
        HashMap<String, List> map = new HashMap<>();
        List<FlowTypeItem> list = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            FlowTypeItem info = new FlowTypeItem();
            info.setCode("11" + i);
            info.setName("11" + i + "资金审批流程");
            list.add(info);
        }
        List<InstructionTypeItem> list1 = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            InstructionTypeItem info = new InstructionTypeItem();
            info.setCode("12" + i);
            info.setName("指令" + i);
            list1.add(info);
        }
        List<InvestCompanyItem> list2 = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            InvestCompanyItem info = new InvestCompanyItem();
            info.setCode("11" + i);
            info.setName("投资单位" + i);
            list2.add(info);
        }
        List<InvestConstituteItem> list3 = loadInvestConstitutes();
        List<MarketItem> list4 = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            MarketItem info = new MarketItem();
            info.setCode("11" + i);
            info.setName("交易市场" + i);
            list4.add(info);
        }
        List<ProductItem> list5 = loadProds();
        List<SecurityTypeItem> list6 = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            SecurityTypeItem info = new SecurityTypeItem();
            info.setCode("11" + i);
            info.setName("证券类型" + i);
            list6.add(info);
        }
        List<TransactionDirectionItem> list7 = loadTransactionDirections();

        List<ControlTypeItem> list8 = new ArrayList<>();
        for (int i = 0; i < 1; i++) {
            ControlTypeItem info = new ControlTypeItem();
            info.setCode("11" + i);
            info.setName("指令金额");
            list8.add(info);
        }

        log.info(list.toString());
        map.put(SelectorItemEnum.FLW.getValue(), list);
        map.put(SelectorItemEnum.INS.getValue(), list1);
        map.put(SelectorItemEnum.COM.getValue(), list2);
        map.put(SelectorItemEnum.CON.getValue(), list3);
        map.put(SelectorItemEnum.MAK.getValue(), list4);
        map.put(SelectorItemEnum.PRO.getValue(), list5);
        map.put(SelectorItemEnum.SEC.getValue(), list6);
        map.put(SelectorItemEnum.TRN.getValue(), list7);
        map.put(SelectorItemEnum.CTR.getValue(), list8);
        return WinResponseData.handleSuccess(map);
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
            for (int i = 0; i < 5; i++) {
                TransactionDirectionItem info = new TransactionDirectionItem();
                info.setCode("11" + i);
                info.setName("交易方向" + i);
                list.add(info);
            }
            return list;
        } catch (Throwable throwable) {
            log.error("feign接口异常", throwable);
        }
        return null;

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
        try {
            List<InvestConstituteItem> list3 = new ArrayList<>();
            List<InvestConstituteDTO> rtnList = new ArrayList<>();
            WinResponseData rtn = dicFeignClient.queryInvestConstituteList(new InvestConstituteDTO());
            if (WinResponseData.WinRspType.SUCC.equals(rtn.getWinRspType())) {
                rtnList = JSONObject.parseArray(JSONObject.toJSONString(rtn.getData())).toJavaList(InvestConstituteDTO.class);
                for (InvestConstituteDTO investConstituteDTO : rtnList) {
                    InvestConstituteItem info = new InvestConstituteItem();
                    info.setCode(investConstituteDTO.getNo() + "");
                    info.setName(investConstituteDTO.getPortfolioName());
                    list3.add(info);
                }
            } else {
                for (int i = 0; i < 5; i++) {
                    InvestConstituteItem info = new InvestConstituteItem();
                    info.setCode("11" + i);
                    info.setName("组合资产" + i);
                    list3.add(info);
                }
            }
            return list3;
        } catch (Throwable throwable) {
            log.error("feign接口异常", throwable);
        }
        return null;
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
        List<ProductItem> list5 = new ArrayList<>();
        WinResponseData rtn5 = dicFeignClient.queryProdList();
        ;
        if (WinResponseData.WinRspType.SUCC.equals(rtn5.getWinRspType())) {
            log.info("{}", rtn5.getData());
            list5 = (List<ProductItem>) rtn5.getData();
        } else {
            for (int i = 0; i < 5; i++) {
                ProductItem info = new ProductItem();
                info.setCode("11" + i);
                info.setName("产品" + i);
                list5.add(info);
            }
        }
        return list5;
    }

}
