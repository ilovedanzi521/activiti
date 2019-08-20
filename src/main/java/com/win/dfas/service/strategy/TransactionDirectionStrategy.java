/****************************************************
 * 创建人: @author wanglei
 * 创建时间: 2019/8/20/13:48
 * 项目名称: dfas-common-bpm
 * 文件名称: TransactionDirectionStrategy.java
 * 文件描述: @Description: 交易方向获取并转换
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/

package com.win.dfas.service.strategy;

import com.win.dfas.common.vo.WinResponseData;
import com.win.dfas.dto.SecurityTypeDTO;
import com.win.dfas.dto.TransactionDirectionDTO;
import com.win.dfas.vo.response.SelectorItemEnum;
import com.win.dfas.vo.response.item.CommonItem;
import com.win.dfas.vo.response.item.SecurityTypeItem;
import com.win.dfas.vo.response.item.TransactionDirectionItem;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * 包名称：com.win.dfas.service.strategy
 * 类名称：TransactionDirectionStrategy
 * 类描述：交易方向获取并转换
 * 创建人：@author wanglei
 * 创建时间：2019/8/20/13:48
 */
@Slf4j
public class TransactionDirectionStrategy extends BaseStrategy {
    @Override
    public List feignAndConverterVO(String param) {
        List list = new ArrayList();
        TransactionDirectionDTO transactionDirectionDTO = new TransactionDirectionDTO();
        transactionDirectionDTO.setMarketCode(param);
        try {
            WinResponseData rtn = dicFeignClient.queryDirectionList(transactionDirectionDTO);
            if (WinResponseData.WinRspType.SUCC.equals(rtn.getWinRspType())) {
                list=converterVO(rtn.getData(),
                        CommonItem.class,
                        new String[]{"transactionDirection","transactionDirectionName"});
            }
        } catch (Throwable throwable) {
            log.error("feign接口异常", throwable);
        }
        return list;
    }

    @Override
    protected List converterVO(List queryRedis) {
        try {
            return converterVO(queryRedis,CommonItem.class,
                    new String[]{"transactionDirection","transactionDirectionName"});
        } catch (Exception e) {
            log.error("转换异常", e);
        }
        return null;
    }
}
