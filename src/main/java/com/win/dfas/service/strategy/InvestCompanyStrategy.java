/****************************************************
 * 创建人: @author wanglei
 * 创建时间: 2019/8/20/12:15
 * 项目名称: dfas-common-bpm
 * 文件名称: InvestCompanyStrategy.java
 * 文件描述: @Description: 资产单元转化策略
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/

package com.win.dfas.service.strategy;

import com.alibaba.fastjson.JSONObject;
import com.win.dfas.common.enumeration.FormatEnum;
import com.win.dfas.common.util.RedisUtil;
import com.win.dfas.common.vo.WinResponseData;
import com.win.dfas.constant.InitDataConstant;
import com.win.dfas.dto.InvestCompanyDTO;
import com.win.dfas.vo.response.item.CommonItem;
import com.win.dfas.vo.response.item.InvestCompanyItem;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.*;

/**
 * 包名称：com.win.dfas.service.strategy
 * 类名称：InvestCompanyStrategy
 * 类描述：资产单元转化策略
 * 创建人：@author wanglei
 * 创建时间：2019/8/20/12:15
 */
@Slf4j
public class InvestCompanyStrategy extends BaseStrategy{

    @Override
    public List feignAndConverterVO(String param){
        List<InvestCompanyItem> list = new ArrayList();
        InvestCompanyDTO dto = new InvestCompanyDTO();
        dto.setFundNo(param);
        try {
            WinResponseData rtn = dicFeignClient.queryInvestCompanyList(dto);
            if (WinResponseData.WinRspType.SUCC.equals(rtn.getWinRspType())) {
                list = converterVO(rtn.getData(), CommonItem.class,
                        new String[]{"no", "assetUnitName"});
            }
        } catch (Throwable throwable) {
            log.error("feign接口异常", throwable);
        }
        return list;
    }

    @Override
    protected List converterVO(List queryRedis) {
        try {
            return  converterVO(queryRedis, CommonItem.class,
                    new String[]{"no", "assetUnitName"});
        } catch (Exception e) {
            log.error("转换异常", e);
        }
        return null;
    }

}
