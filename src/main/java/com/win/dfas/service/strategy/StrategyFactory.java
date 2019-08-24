/****************************************************
 * 创建人: @author wanglei
 * 创建时间: 2019/8/20/13:15
 * 项目名称: dfas-common-bpm
 * 文件名称: FeginStrategyFactory.java
 * 文件描述: @Description: 策略工厂类
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/

package com.win.dfas.service.strategy;

import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

/**
 * 包名称：com.win.dfas.service.strategy
 * 类名称：FeginStrategyFactory
 * 类描述：策略工厂类
 * 创建人：@author wanglei
 * 创建时间：2019/8/20/13:15
 */
public class StrategyFactory {
    private static Map<String,BaseStrategy> STRATEGY_MAP = new HashMap<String, BaseStrategy>();
    static {
        //获取资产单元
        STRATEGY_MAP.put(FeginKey.ASSET,new InvestCompanyStrategy());
        //获取投资组合
        STRATEGY_MAP.put(FeginKey.PORTFOLIO,new InvestConstituteStrategy());
        STRATEGY_MAP.put(FeginKey.SECURITY,new SecurityTypeStrategy());
        STRATEGY_MAP.put(FeginKey.TRA_DIR,new TransactionDirectionStrategy());
    }

    private StrategyFactory(){}

    public static BaseStrategy getPromotionStrategy(String promotionKey){
        return STRATEGY_MAP.get(promotionKey);
    }

    public interface FeginKey{
        String ASSET = "ASSET";
        String PORTFOLIO = "PORTFOLIO";
        String SECURITY = "SECURITY";
        String TRA_DIR = "TRA_DIR";
    }
}
