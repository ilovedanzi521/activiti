/****************************************************
 * 创建人: @author wanglei
 * 创建时间: 2019/8/20/12:15
 * 项目名称: dfas-common-bpm
 * 文件名称: InvestCompanyStrategy.java
 * 文件描述: @Description: 组合转化策略
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/

package com.win.dfas.service.strategy;

import com.win.dfas.common.vo.WinResponseData;
import com.win.dfas.dto.InvestCompanyDTO;
import com.win.dfas.dto.InvestConstituteDTO;
import com.win.dfas.vo.response.SelectorItemEnum;
import com.win.dfas.vo.response.item.CommonItem;
import com.win.dfas.vo.response.item.InvestCompanyItem;
import com.win.dfas.vo.response.item.InvestConstituteItem;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * 包名称：com.win.dfas.service.strategy
 * 类名称：InvestCompanyStrategy
 * 类描述：组合转化策略
 * 创建人：@author wanglei
 * 创建时间：2019/8/20/12:15
 */
@Slf4j
public class InvestConstituteStrategy extends BaseStrategy{

    @Override
    public List feignAndConverterVO(String param){
        List list = new ArrayList();
        InvestConstituteDTO investConstituteDTO = new InvestConstituteDTO();
        String prefix = SelectorItemEnum.PRO.toString();
        String no = param.replace(prefix,"").replace(SelectorItemEnum.COM.toString(),"");
        if(param.startsWith(prefix)){
            investConstituteDTO.setFundNo(no);
        }else{
            investConstituteDTO.setAssetUnitNo(no);
        }

        try {
            WinResponseData rtn = dicFeignClient.queryInvestConstituteList(investConstituteDTO);
            if (WinResponseData.WinRspType.SUCC.equals(rtn.getWinRspType())) {
                list = converterVO(rtn.getData(), CommonItem.class,
                        new String[]{"no", "portfolioName"});
            }
        } catch (Throwable throwable) {
            log.error("feign接口异常", throwable);
        }
        return list;
    }

    @Override
    protected List converterVO(List queryRedis) {
        try {
            return converterVO(queryRedis, CommonItem.class,
                    new String[]{"portfolioNo", "portfolioName"});
        } catch (Exception e) {
            log.error("转换异常", e);
        }
        return null;
    }

}
