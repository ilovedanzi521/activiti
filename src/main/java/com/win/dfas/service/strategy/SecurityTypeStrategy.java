/****************************************************
 * 创建人: @author wanglei
 * 创建时间: 2019/8/20/13:48
 * 项目名称: dfas-common-bpm
 * 文件名称: SecurityTypeStrategy.java
 * 文件描述: @Description: 证券类型获取并转换
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/

package com.win.dfas.service.strategy;

import com.win.dfas.common.vo.WinResponseData;
import com.win.dfas.dto.InvestConstituteDTO;
import com.win.dfas.dto.SecurityTypeDTO;
import com.win.dfas.vo.response.SelectorItemEnum;
import com.win.dfas.vo.response.item.CommonItem;
import com.win.dfas.vo.response.item.InvestConstituteItem;
import com.win.dfas.vo.response.item.SecurityTypeItem;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * 包名称：com.win.dfas.service.strategy
 * 类名称：SecurityTypeStrategy
 * 类描述：证券类型获取并转换
 * 创建人：@author wanglei
 * 创建时间：2019/8/20/13:48
 */
@Slf4j
public class SecurityTypeStrategy extends BaseStrategy{
    @Override
    public List feignAndConverterVO(String param) {
        List list = new ArrayList();
        SecurityTypeDTO securityTypeDTO = new SecurityTypeDTO();
        securityTypeDTO.setMarketCode(param);
        try {
            WinResponseData rtn = dicFeignClient.querySecurityTypeList(securityTypeDTO);
            if (WinResponseData.WinRspType.SUCC.equals(rtn.getWinRspType())) {
                list = converterVO(rtn.getData(),
                        CommonItem.class,
                        new String[]{"securityType", "securityTypeName"});
            }
        } catch (Throwable throwable) {
            log.error("feign接口异常", throwable);
        }
        return list;
    }

    @Override
    protected List converterVO(List queryRedis) {
        try {
            return converterVO(queryRedis,
                    CommonItem.class,
                    new String[]{"securityCodeKey", "securityName"});
        } catch (Exception e) {
            log.error("转换异常", e);
        }
        return null;
    }

}
