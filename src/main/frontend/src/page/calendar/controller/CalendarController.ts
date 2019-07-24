import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import Calendar from "../../calendar/components/calendar.vue";
import timeUtil from "../controller/Calendar";
import { CalendarVO } from "../vo/calendarVO";

@Component({ components: { Calendar } })
export default class CalendarController extends Vue {
    myDate: any = [];
    list = [];
    historyChose = [];
    dateTop = "";
    @Prop({ default: [] })
    markDate;
    @Prop({ default: [] })
    markDateMore;
    @Prop({ default: 1530115221 })
    agoDayHide: number;
    @Prop({ default: true })
    onCheckDayHide: boolean;
    @Prop({ default: 0 })
    year: Date;
    @Prop({ default: true })
    sundayStart: boolean;
    @Prop({ default: false })
    weekendFlag: boolean;

    textTop: Array<string> = ["日", "一", "二", "三", "四", "五", "六"];

    mounted() {
        this.getList(null);
    }
    created() {
        this.intStart();
    }

    clickDay(item: CalendarVO, index: number) {
        if (item.otherMonth === "nowMonth" && !item.dayHide) {
            this.getList(item.date);
        }
    }

    setHistoryChose(historyChose: Array<any>, chooseDay: string) {
        console.log(historyChose);
        this.historyChose = historyChose;
    }

    forMatArgs() {
        let markDateMore = this.markDateMore;
        markDateMore = markDateMore.map(k => {
            k.date = timeUtil.dateFormat(k.date);
            return k;
        });
        return markDateMore;
    }

    intStart() {
        timeUtil.sundayStart = this.sundayStart;
        this.myDate = this.year;
    }

    setClass(data: CalendarVO) {
        let obj = {};
        obj["markClassName"] = data.markClassName;
        return obj;
    }

    getList(chooseDay: string) {
        const markDateMore = this.forMatArgs();
        this.dateTop = `${this.myDate.getFullYear()}年${this.myDate.getMonth() +
            1}月`;
        let arr = timeUtil.getMonthList(this.myDate);
        for (let i = 0; i < arr.length; i++) {
            let markClassName = "";
            let k = arr[i];
            k.chooseDay = false;
            const nowTime = k.date;
            const t = new Date(nowTime).getTime() / 1000;
            //看每一天的class
            for (const c of markDateMore) {
                if (c.date === nowTime) {
                    markClassName = c.className || "";
                }
            }
            //标记选中某些天 设置class
            k.markClassName = markClassName;
            //无法选中某天
            k.dayHide = t < this.agoDayHide || this.onCheckDayHide;
            let flag = !k.dayHide && k.otherMonth === "nowMonth";

            if (chooseDay && chooseDay === nowTime && flag) {
                this.$emit("choseDay", nowTime);
                if (this.historyChose.includes(nowTime)) {
                    this.historyChose.splice(
                        this.historyChose.indexOf(nowTime),
                        1
                    );
                } else {
                    this.historyChose.push(nowTime);
                }
            }
            //是否选中周末
            if ((k.week === 0 || k.week === 6) && chooseDay == "weekend") {
                if (this.weekendFlag && flag) {
                    this.historyChose.push(nowTime);
                } else {
                    if (this.historyChose.includes(nowTime)) {
                        this.historyChose.splice(
                            this.historyChose.indexOf(nowTime),
                            1
                        );
                    }
                }
                this.$emit("weekendays", nowTime);
            }
            if (this.historyChose.length > 0) {
                for (const c of this.historyChose) {
                    if (c === k.date) {
                        k.chooseDay = true;
                    }
                }
            }
        }
        this.list = arr;
    }

    @Watch("markDateMore", { deep: true })
    onMarkDateMoreChanged(val: string, oldVal: string) {
        this.getList(null);
    }
    @Watch("agoDayHide", { deep: true })
    onAgoDayHideChanged(val: string, oldVal: string) {
        this.getList(null);
    }
    @Watch("markDateMore", { deep: true })
    onSundayStartChanged(val: string, oldVal: string) {
        this.getList(null);
    }
    @Watch("year", { deep: true })
    onyearChanged(val: string, oldVal: string) {
        this.myDate = this.year;
        this.getList(null);
    }
    @Watch("weekendFlag", { deep: true })
    weekendFlagChanged(val: string, oldVal: string) {
        this.myDate = this.year;
        this.getList("weekend");
    }
}
