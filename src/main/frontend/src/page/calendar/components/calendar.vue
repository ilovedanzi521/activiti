<style scoped>
@media screen and (min-width: 460px) {
    .wh_item_date:hover {
        background: #71c7a5;
        cursor: pointer;
    }
}
* {
    margin: 0;
    padding: 0;
}

.wh_container {
    /* width: 24%; */
    height: 210px;
    box-sizing: border-box;
    background: #2b3551;
    /* margin: auto; */
}

li {
    list-style-type: none;
}
.wh_top_changge {
    display: flex;
}

.wh_top_changge li {
    cursor: pointer;
    display: flex;
    color: #fff;
    font-size: 18px;
    flex: 1;
    justify-content: center;
    align-items: center;
    height: 30px;
}

.wh_top_changge .wh_content_li {
    display: flex;
    justify-content: start;
    padding-top: 5px;
    margin-left: 15px;
    font-size: 16px;
}
.wh_content_all {
    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC",
        "Helvetica Neue", STHeiti, "Microsoft Yahei", Tahoma, Simsun, sans-serif;
    background-color: #2b3551;
    width: 100%;
    overflow: hidden;
    padding-bottom: 8px;
}

.wh_content {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding: 0 5px;
    box-sizing: border-box;
}

.wh_content:first-child .wh_content_item_tag,
.wh_content:first-child .wh_content_item {
    color: #ddd;
    font-size: 16px;
}

.wh_content_item,
.wh_content_item_tag {
    font-size: 15px;
    width: 13.4%;
    text-align: center;
    color: black;
    position: relative;
    margin: 1px;
    background-color: white;
}
.wh_content_item {
    flex-grow: 1;
}

.wh_content_item.wh_content_itemHeight {
    height: 20px;
}
.wh_content_itemHeight:first-child > .wh_top_tag,
.wh_content_itemHeight:last-child > .wh_top_tag {
    background-color: #f58a0d;
}
/*.wh_content_item-date:nth-child(7n + 1),
.wh_content_item-date:nth-child(7n + 7) {
    background-color: #ffd3a0;
}*/
.wh_top_tag {
    height: 20px;
    line-height: 20px;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #68718e;
    color: white;
    font-size: 12px;
}

.wh_item_date {
    height: 22px;
    line-height: 22px;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
}

.wh_jiantou1 {
    width: 12px;
    height: 12px;
    border-top: 2px solid #ffffff;
    border-left: 2px solid #ffffff;
    transform: rotate(-45deg);
}

.wh_jiantou1:active,
.wh_jiantou2:active {
    border-color: #ddd;
}

.wh_jiantou2 {
    width: 12px;
    height: 12px;
    border-top: 2px solid #ffffff;
    border-right: 2px solid #ffffff;
    transform: rotate(45deg);
}
.wh_content_item > .wh_isMark {
    margin: auto;
    border-radius: 100px;
    background: blue;
    z-index: 2;
}
.wh_content_item .wh_other_dayhide {
    color: #bfbfbf;
}
.wh_content_item .wh_want_dayhide {
    color: #bfbfbf;
}
.wh_content_item .wh_isToday {
    background: yellow;
}
.wh_content_item .wh_chose_day {
    background: green;
}
.wh_other_dayhide {
    display: none;
}
.noTrade {
    background: rgba(255, 211, 160, 1);
}
.onlytrade {
    background: rgba(239, 243, 114, 1);
}
.tradeDay {
    background: rgba(242, 242, 242, 1);
}
</style>
<template>
    <section class="wh_container">
        <div class="wh_content_all">
            <div class="wh_top_changge">
                <li class="wh_content_li">{{dateTop}}</li>
            </div>
            <div class="wh_content">
                <div
                    class="wh_content_item wh_content_itemHeight"
                    v-for="(tag,index) in textTop"
                    :key="index"
                >
                    <div class="wh_top_tag">{{tag}}</div>
                </div>
            </div>
            <div class="wh_content">
                <div
                    class="wh_content_item wh_content_item-date"
                    v-for="(item,index) in list"
                    @click="clickDay(item,index)"
                    :key="index"
                >
                    <div
                        v-bind:class="['wh_item_date',item.markClassName,{wh_other_dayhide:item.otherMonth!=='nowMonth'},{wh_want_dayhide:item.dayHide},{wh_chose_day:item.chooseDay}]"
                    >{{item.id}}</div>
                </div>
            </div>
        </div>
    </section>
</template>


<script lang="ts">
import CalendarController from "../controller/CalendarController";
import Component from "vue-class-component";
@Component
export default class calendar extends CalendarController {}
</script>

<!--<script>
import timeUtil from "./calendar";
export default {
    data() {
        return {
            myDate: [],
            list: [],
            historyChose: [],
            dateTop: ""
        };
    },
    props: {
        markDate: {
            type: Array,
            default: () => []
        },
        markDateMore: {
            type: Array,
            default: () => []
        },
        textTop: {
            type: Array,
            default: () => ["一", "二", "三", "四", "五", "六", "日"]
        },
        sundayStart: {
            type: Boolean,
            default: () => false
        },
        agoDayHide: {
            type: String,
            default: `0`
        },
        futureDayHide: {
            type: String,
            default: `2554387200`
        },
        year: {
            type: Date,
            default: () => new Date("2018-08-01")
        }
    },
    created() {
        this.intStart();
        //this.myDate = new Date();
    },
    methods: {
        intStart() {
            timeUtil.sundayStart = this.sundayStart;
            this.myDate = this.year;
        },
        setClass(data) {
            let obj = {};
            obj[data.markClassName] = data.markClassName;
            return obj;
        },
        clickDay: function(item, index) {
            if (item.otherMonth === "nowMonth" && !item.dayHide) {
                this.getList(this.myDate, item.date);
            }

            if (item.otherMonth !== "nowMonth") {
                item.otherMonth === "preMonth"
                    ? this.PreMonth(item.date)
                    : this.NextMonth(item.date);
            }
        },
        ChoseMonth: function(date, isChosedDay = true) {
            date = timeUtil.dateFormat(date);
            this.myDate = new Date(date);
            this.$emit("changeMonth", timeUtil.dateFormat(this.myDate));
            if (isChosedDay) {
                this.getList(this.myDate, date, isChosedDay);
            } else {
                this.getList(this.myDate);
            }
        },
        PreMonth: function(date, isChosedDay = true) {
            date = timeUtil.dateFormat(date);
            this.myDate = timeUtil.getOtherMonth(this.myDate, "preMonth");
            this.$emit("changeMonth", timeUtil.dateFormat(this.myDate));
            if (isChosedDay) {
                this.getList(this.myDate, date, isChosedDay);
            } else {
                this.getList(this.myDate);
            }
        },
        NextMonth: function(date, isChosedDay = true) {
            date = timeUtil.dateFormat(date);
            this.myDate = timeUtil.getOtherMonth(this.myDate, "nextMonth");
            this.$emit("changeMonth", timeUtil.dateFormat(this.myDate));
            if (isChosedDay) {
                this.getList(this.myDate, date, isChosedDay);
            } else {
                this.getList(this.myDate);
            }
        },
        forMatArgs: function() {
            let markDate = this.markDate;
            let markDateMore = this.markDateMore;
            markDate = markDate.map(k => {
                return timeUtil.dateFormat(k);
            });
            markDateMore = markDateMore.map(k => {
                k.date = timeUtil.dateFormat(k.date);
                return k;
            });
            return [markDate, markDateMore];
        },
        getList: function(date, chooseDay, isChosedDay = true) {
            const [markDate, markDateMore] = this.forMatArgs();
            this.dateTop = `${date.getMonth() + 1}月/${date.getFullYear()}`;
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
                k.isMark = markDate.indexOf(nowTime) > -1;

                //无法选中某天
                k.dayHide = t < this.agoDayHide || t > this.futureDayHide;
                if (k.isToday) {
                    this.$emit("isToday", nowTime);
                }

                let flag = !k.dayHide && k.otherMonth === "nowMonth";

                if (chooseDay && chooseDay === nowTime && flag) {
                    this.$emit("choseDay", nowTime);
                    this.historyChose.push(nowTime);
                    k.chooseDay = true;
                } else if (
                    this.historyChose[this.historyChose.length - 1] ===
                        nowTime &&
                    !chooseDay &&
                    flag
                ) {
                    k.chooseDay = true;
                }
            }
            this.list = arr;
        }
    },

    watch: {
        "markDate": {
            handler(val, oldVal) {
                this.getList(this.myDate);
            },
            deep: true
        },
        markDateMore: {
            handler(val, oldVal) {
                this.getList(this.myDate);
            },
            deep: true
        },
        agoDayHide: {
            handler(val, oldVal) {
                this.getList(this.myDate);
            },
            deep: true
        },
        futureDayHide: {
            handler(val, oldVal) {
                this.getList(this.myDate);
            },
            deep: true
        },
        sundayStart: {
            handler(val, oldVal) {
                this.intStart();
                this.getList(this.myDate);
            },
            deep: true
        }
    }
};
</script>
-->