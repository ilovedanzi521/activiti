package com.win.dfas.controller.feign;

import com.win.dfas.common.vo.WinResponseData;
import com.win.dfas.entity.UserIno;
import com.win.dfas.vo.request.UserInoReq;
import com.win.dfas.vo.response.SelectorItemEnum;
import com.win.dfas.vo.response.item.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
    @RequestMapping("/feign/loadSelectsItems")
    public WinResponseData LoadSelectsItems(){
        HashMap<String,List> map = new HashMap<>();
        List<FlowTypeItem> list = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            FlowTypeItem info = new FlowTypeItem();
            info.setCode("11"+i);
            info.setName("11"+i+"资金审批流程");
            list.add(info);
        }
        List<InstructionTypeItem> list1 = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            InstructionTypeItem info = new InstructionTypeItem();
            info.setCode("12"+i);
            info.setName("指令"+i);
            list1.add(info);
        }
        List<InvestCompanyItem> list2 = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            InvestCompanyItem info = new InvestCompanyItem();
            info.setCode("11"+i);
            info.setName("投资单位"+i);
            list2.add(info);
        }
        List<InvestConstituteItem> list3 = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            InvestConstituteItem info = new InvestConstituteItem();
            info.setCode("11"+i);
            info.setName("组合资产"+i);
            list3.add(info);
        }
        List<MarketItem> list4 = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            MarketItem info = new MarketItem();
            info.setCode("11"+i);
            info.setName("交易市场"+i);
            list4.add(info);
        }
        List<ProductItem> list5 = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            ProductItem info = new ProductItem();
            info.setCode("11"+i);
            info.setName("产品"+i);
            list5.add(info);
        }
        List<SecurityTypeItem> list6 = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            SecurityTypeItem info = new SecurityTypeItem();
            info.setCode("11"+i);
            info.setName("证券类型"+i);
            list6.add(info);
        }
        List<TransactionDirectionItem> list7 = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            TransactionDirectionItem info = new TransactionDirectionItem();
            info.setCode("11"+i);
            info.setName("交易方向"+i);
            list7.add(info);
        }
        List<ControlTypeItem> list8 = new ArrayList<>();
        for (int i = 0; i < 1; i++) {
            ControlTypeItem info = new ControlTypeItem();
            info.setCode("11"+i);
            info.setName("指令金额");
            list8.add(info);
        }

        log.info(list.toString());
        map.put(SelectorItemEnum.FLW.getValue(),list);
        map.put(SelectorItemEnum.INS.getValue(),list1);
        map.put(SelectorItemEnum.COM.getValue(),list2);
        map.put(SelectorItemEnum.CON.getValue(),list3);
        map.put(SelectorItemEnum.MAK.getValue(),list4);
        map.put(SelectorItemEnum.PRO.getValue(),list5);
        map.put(SelectorItemEnum.SEC.getValue(),list6);
        map.put(SelectorItemEnum.TRN.getValue(),list7);
        map.put(SelectorItemEnum.CTR.getValue(),list8);
        return WinResponseData.handleSuccess(map);
    }



    @PostMapping("/param/searchUserinfo")
    public WinResponseData getSearchUserinfoList(@RequestBody UserInoReq userInoReq){
        List<UserIno> userList = new ArrayList<>();
        for (int i = 0; i <10; i++) {
            UserIno info = new UserIno();
            info.setAccount("888888888888"+i);
            info.setName("王雷");
            userList.add(info);
        }
        log.info(userList.toString());
        return WinResponseData.handleSuccess(userList);
    }
}
