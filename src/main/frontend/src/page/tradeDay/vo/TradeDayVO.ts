import { BaseReqVO, BaseRepVO } from "../../common/vo/BaseVO";
export class TradeDayTypeRepVO extends BaseRepVO {
    /**
     *  trading_day_code
     */
    public tradeDayCode: string;

    /**
     *  trading_day_name
     */
    public tradeDayName: String;

    /**
     *  market_code
     */
    public marketCode: String;

    /**
     *  state
     */
    public state: Boolean;
}

export class TradeDayReqVO {
    /**
     *  交易日编码
     */
    public tradeDayCode: string;

    /**
     *  交易日
     */
    public tradeDay: string;

    /**
     *  交易日类型
     */
    public dayType: string;

    /**
     *  状态
     */
    public sate: number;

    /**
     *  年份
     */
    public tradeYear: string;
}
export class TradeDayListReqVO extends BaseReqVO {
    /**
     *  交易日编码
     */
    public tradeDayCode: string;
    /**
     *  选中日期
     */
    public tradeDayList: Array<TradeDayReqVO>;
}

export class TradeDayRepVO extends BaseRepVO {
    /**
     * 交易日编号
     */
    public tradeDayCode: number;
    /**
     * 交易日
     */
    public tradeDay: string;
    /**
     * 交易日类型
     */
    public dayType: number;
}

export class DataDay {
    /**
     * 交易方向
     */
    public id: number;
    /**
     * 交易日
     */
    public date: string;
    /**
     * 交易日类型
     */
    public className: string;
}
