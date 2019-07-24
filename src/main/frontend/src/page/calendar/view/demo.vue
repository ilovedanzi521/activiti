<template>
    <div class="content">
        <!-- agoDayHide='1517483961' -->
        <!-- futureDayHide="1526054400" -->
        <Calendar
            ref="Calendar"
            :markDateMore="arr"
            :markDate="arr2"
            v-on:isToday="clickToday"
            agoDayHide="1530115221"
            v-on:choseDay="clickDay"
            v-on:changeMonth="changeDate"
            :year="new Date('2019-01')"
        ></Calendar>
        <Calendar
            ref="Calendar"
            :markDateMore="arr"
            :markDate="arr2"
            v-on:isToday="clickToday"
            agoDayHide="1530115221"
            v-on:choseDay="clickDay"
            v-on:changeMonth="changeDate"
            :year="new Date('2019-02')"
        ></Calendar>
        <Calendar
            ref="Calendar"
            :markDateMore="arr"
            :markDate="arr2"
            v-on:isToday="clickToday"
            agoDayHide="1530115221"
            v-on:choseDay="clickDay"
            v-on:changeMonth="changeDate"
            :year="new Date('2019-03')"
        ></Calendar>
        <Calendar
            ref="Calendar"
            :markDateMore="arr"
            :markDate="arr2"
            v-on:isToday="clickToday"
            agoDayHide="1530115221"
            v-on:choseDay="clickDay"
            v-on:changeMonth="changeDate"
            :year="new Date('2019-04')"
        ></Calendar>
        <Calendar
            ref="Calendar"
            :markDateMore="arr"
            :markDate="arr2"
            v-on:isToday="clickToday"
            agoDayHide="1530115221"
            v-on:choseDay="clickDay"
            v-on:changeMonth="changeDate"
            :year="new Date('2019-05')"
        ></Calendar>
        <Calendar
            ref="Calendar"
            :markDateMore="arr"
            :markDate="arr2"
            v-on:isToday="clickToday"
            agoDayHide="1530115221"
            v-on:choseDay="clickDay"
            v-on:changeMonth="changeDate"
            :year="new Date('2019-06')"
        ></Calendar>
        <Calendar
            ref="Calendar"
            :markDateMore="arr"
            :markDate="arr2"
            v-on:isToday="clickToday"
            agoDayHide="1530115221"
            v-on:choseDay="clickDay"
            v-on:changeMonth="changeDate"
            :year="new Date('2019-07')"
        ></Calendar>
        <Calendar
            ref="Calendar"
            :markDateMore="arr"
            :markDate="arr2"
            v-on:isToday="clickToday"
            agoDayHide="1530115221"
            v-on:choseDay="clickDay"
            v-on:changeMonth="changeDate"
            :year="new Date('2019-08')"
        ></Calendar>
        <Calendar
            ref="Calendar"
            :markDateMore="arr"
            :markDate="arr2"
            v-on:isToday="clickToday"
            agoDayHide="1530115221"
            v-on:choseDay="clickDay"
            v-on:changeMonth="changeDate"
            :year="new Date('2019-09')"
        ></Calendar>
        <Calendar
            ref="Calendar"
            :markDateMore="arr"
            :markDate="arr2"
            v-on:isToday="clickToday"
            agoDayHide="1530115221"
            v-on:choseDay="clickDay"
            v-on:changeMonth="changeDate"
            :year="new Date('2019-10')"
        ></Calendar>
        <Calendar
            ref="Calendar"
            :markDateMore="arr"
            :markDate="arr2"
            v-on:isToday="clickToday"
            agoDayHide="1530115221"
            v-on:choseDay="clickDay"
            v-on:changeMonth="changeDate"
            :year="new Date('2019-11')"
        ></Calendar>
        <Calendar
            ref="Calendar"
            :markDateMore="arr"
            :markDate="arr2"
            v-on:isToday="clickToday"
            agoDayHide="1530115221"
            v-on:choseDay="clickDay"
            v-on:changeMonth="changeDate"
            :year="new Date('2019-12')"
        ></Calendar>
    </div>
</template>

<script>
import Calendar from "../components/index";
//import Calendar from "vue-calendar-component";
export default {
    data() {
        return {
            // arr2: ['2018/6/23'],
            arr2: [],
            arr: [
                {
                    date: "2019-6-3",
                    className: "mark2"
                },
                {
                    date: "2019-6-11",
                    className: "mark2"
                },
                {
                    date: "2019-6-20",
                    className: "mark1"
                }
            ]
        };
    },
    components: {
        Calendar
    },
    methods: {
        clickDay(data) {
            console.log("选中了", data); //选中某天
        },
        clickToday(data) {
            console.log("跳到了本月今天", data); //跳到了本月
        },
        changeDate(data) {
            console.log("左右点击切换月份", data); //左右点击切换月份
        }
    },
    created() {
        function format(date, index) {
            date = new Date(date);
            return `${date.getFullYear()}-${date.getMonth() + 1}-${index}`;
        }
    }
};
</script>

<!-- Add "scoped " attribute to limit CSS to this component only -->
<style scoped>
.content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    background-color: #1d2744;
}
h3 {
    text-align: center;
    width: 90%;
    margin: auto;
}

.div {
    margin: auto;
    width: 220px;
    height: 44px;
    line-height: 44px;
    background: #0fc37c;
    color: #fff;
    font-size: 17px;
    text-align: center;
    margin-top: 20px;
}
.wh_container >>> .wh_item_date {
    width: 40px;
    height: 24px;
    background: rgba(242, 242, 242, 1);
    opacity: 1;
    color: #363636;
}
.wh_container >>> .wh_chose_day {
    width: 53px;
    height: 32px;
    background: rgba(242, 242, 242, 1);
    opacity: 1;
    color: #363636;
}

.wh_container >>> .mark1 {
    width: 53px;
    height: 32px;
    background: rgba(255, 211, 160, 1);
    opacity: 1;
}

.wh_container >>> .mark2 {
    width: 53px;
    height: 32px;
    background: rgba(239, 243, 114, 1);
    opacity: 1;
}

.wh_content_item > .wh_isMark {
    background: orange;
}
.wh_container >>> .wh_content_all {
    background-color: #2b3551;
}
.wh_container >>> .wh_top_tag {
    width: 53px;
    height: 17px;
    background: rgba(104, 113, 142, 1);
    opacity: 1;
}
</style>