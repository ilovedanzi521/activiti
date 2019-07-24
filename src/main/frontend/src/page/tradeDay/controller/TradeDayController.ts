import { Component } from "vue-property-decorator";
import BaseController from "../../common/controller/BaseController";
import TradeDayService from "../service/TradeDayService";
import { WinRspType } from "../../common/enum/BaseEnum";
import {
    TradeDayReqVO,
    TradeDayRepVO,
    DataDay,
    TradeDayListReqVO
} from "../vo/TradeDayVO";
import Calendar from "../../calendar/components/calendar.vue";
import { WinResponseData } from "../../common/vo/BaseVO";
import {} from "../../common/enum/BaseEnum";
import { win_checkbox } from "@win-frond-frameworks/biz-common";
import TradeDayTypeController from "../controller/TradeDayTypeController";

@Component({ components: { Calendar, win_checkbox } })
export default class TradeDayController extends BaseController {
    public tradeDayservice: TradeDayService = new TradeDayService();
    public tradeDayRepVO: Array<TradeDayRepVO> = [];
    public checkFlag: boolean = true;
    public dialogFormVisible: boolean = false;
    public buttonFlag: boolean = false;
    public hongkongflag: boolean = false;
    public weekendFlag: boolean = false;
    public tradeDayType: number = 0;
    public titleName: string = "";
    public buttonIndex: number = -1;
    public tradeDayCode: string = "";
    public days: Array<DataDay> = new Array<DataDay>();
    public chooseDays: Array<string> = [];
    public options: any = [];
    public year: number = 2000;
    public currentYear: number = Number.parseInt(`${new Date().getFullYear()}`);

    mounted() {
        this.init();
    }
    init() {
        this.year = this.currentYear;
        for (let i: number = 0; i < 11; i++) {
            this.options.push({
                year: 2019 + i - 5,
                label: 2019 + i - 5 + ""
            });
        }
    }

    addYear() {
        if (this.year < this.currentYear + 5) {
            this.year++;
            this.queryTradeDay();
        }
    }
    subYear() {
        if (this.year > this.currentYear - 5) {
            this.year--;
            this.queryTradeDay();
        }
    }
    onCheck(row: any) {
        this.dialogFormVisible = true;
        this.titleName = row.tradeDayName + "-查看";
        this.checkFlag = true;
        this.isHongkong(row.tradeDayCode);
        this.queryTradeDay();
    }
    onEdit(row: any) {
        this.dialogFormVisible = true;
        this.titleName = row.tradeDayName + "-编辑";
        this.checkFlag = false;
        this.isHongkong(row.tradeDayCode);
        this.queryTradeDay();
    }

    /**港通判断 */
    isHongkong(tradeDayCode: string) {
        this.tradeDayCode = tradeDayCode;
        if (tradeDayCode === "3" || tradeDayCode == "4") {
            this.hongkongflag = true;
        } else {
            this.hongkongflag = false;
        }
    }

    /**设置交易日类型 */
    setTradeDay(tradeDayType: number) {
        this.setButtonFlag(true);
        this.tradeDayType = tradeDayType;
        this.buttonIndex = tradeDayType;
    }

    queryTradeDay() {
        let tradeDayReqVO: TradeDayReqVO = new TradeDayReqVO();
        tradeDayReqVO.tradeYear = this.year + "";
        tradeDayReqVO.tradeDayCode = this.tradeDayCode;
        this.tradeDayservice
            .queryTradeDay(tradeDayReqVO)
            .then((winResponseData: WinResponseData) => {
                if (WinRspType.SUCC === winResponseData.winRspType) {
                    this.tradeDayRepVO = winResponseData.data;
                    if (this.tradeDayRepVO && this.tradeDayRepVO.length > 0)
                        for (let item of this.tradeDayRepVO) {
                            let dataDay = new DataDay();
                            dataDay.id = item.id;
                            dataDay.date = item.tradeDay;
                            dataDay.className = this.getClassName(
                                item.dayType + ""
                            );
                            this.days.push(dataDay);
                        }
                }
            });
    }

    /**确认按钮 */
    confirm(title: string) {
        this.setButtonFlag(false);
        this.setTradeDayReq();
    }
    /**获取周末的日期 */
    getWeekendays(data) {
        if (this.weekendFlag) {
            this.chooseDays.push(data);
        } else {
            this.chooseDays.splice(this.chooseDays.indexOf(data), 1);
        }
    }

    /**构建交易日更新请求集合 */
    setTradeDayReq() {
        let editDays: Array<TradeDayReqVO> = [];
        for (let item of this.chooseDays) {
            let tradeDayReqVO = new TradeDayReqVO();
            tradeDayReqVO.tradeDayCode = this.tradeDayCode;
            tradeDayReqVO.dayType = this.tradeDayType + "";
            tradeDayReqVO.tradeDay = item;
            tradeDayReqVO.tradeYear = this.year + "";
            tradeDayReqVO.sate = 1;
            editDays.push(tradeDayReqVO);
        }
        let tradeDayList: TradeDayListReqVO = new TradeDayListReqVO();
        tradeDayList.tradeDayList = editDays;
        tradeDayList.tradeDayCode = this.tradeDayCode;
        this.updateTradeDay(tradeDayList);
    }

    /**更新交易日 */
    updateTradeDay(tradeDayList: TradeDayListReqVO) {
        this.tradeDayservice
            .updateTradeDay(tradeDayList)
            .then((winResponseData: WinResponseData) => {
                if (winResponseData.winRspType === WinRspType.ERROR) {
                    this.errorMessage(winResponseData.msg);
                } else {
                    this.successMessage("编辑成功");
                    this.$parent.queryTradeDayManager();
                }
            });
        this.handleClose();
    }

    cancel(title: string) {
        this.setButtonFlag(false);
        this.cancelButtonStyle();
        this.handleClose();
    }
    setButtonFlag(flag: boolean) {
        this.buttonFlag = flag;
    }
    cancelButtonStyle() {
        this.buttonIndex = -1;
    }

    clickDay(data) {
        if (this.chooseDays.includes(data)) {
            this.chooseDays.splice(this.chooseDays.indexOf(data), 1);
        } else {
            this.chooseDays.push(data);
        }
    }

    getClassName(key: string) {
        switch (key) {
            case "0":
                return "noTrade";
            case "1":
                return "tradeDay";
            case "2":
                return "onlytrade";
            default:
                return "tradeDay";
        }
    }

    // 右上角关闭点击事件监听
    handleClose() {
        this.dialogFormVisible = false;
    }

    close() {
        this.restCalendar();
        this.cancelButtonStyle();
        this.chooseDays = [];
        this.days = [];
        this.setButtonFlag(false);
        this.weekendFlag = false;
        this.year = this.currentYear;
    }

    /*日历控件重置*/
    restCalendar() {
        for (let i in this.$refs.Calendar) {
            this.$refs.Calendar[i].historyChose = [];
            this.$refs.Calendar[i].getList();
        }
    }
}
