<template>
    <div class="calendar">
        <win_dialog :show-close="false" :visible.sync="dialogFormVisible" top="0px" custom-class="dialog" :close-on-click-modal="false" center width="70%" ref="dialog" @close="close">
            <template #title>
                <win_row type="flex" align="middle" justify="space-between">
                    <win_col :span="6">
                        <span class="jyr">{{titleName}}</span>
                    </win_col>
                    <win_col :span="10" style="text-align:right;">
                        <div style="display:inline-block;text-align:right;margin-right:20px;">
                            <i class="el-icon-arrow-left" @click="subYear" />
                            <span class="year">年份</span>
                            <win_select class="select" v-model="year" placeholder="请选择" size="mini">
                                <el-option v-for="item in options" :key="item.year" :label="item.label" :value="item.year"></el-option>
                            </win_select>
                            <i class="el-icon-arrow-right" @click="addYear" />
                        </div>
                        <i class="el-icon-close" @click="handleClose"></i>
                    </win_col>
                </win_row>
            </template>
            <win_row style="height:60px" type="flex" align="middle">
                <win_col v-show="checkFlag" style="text-align:left">
                    <span class="radius"></span>
                    <span class="radius-title">交易/交收日</span>
                    <span class="radius se"></span>
                    <span class="radius-title">非交易/交收日</span>
                    <span v-show="hongkongflag" class="radius only"></span>
                    <span v-show="hongkongflag" class="radius-title">仅交易日</span>
                </win_col>
                <win_col v-show="!checkFlag" style="text-align:left">
                    <win_button size="mini" :class="['button',buttonIndex===1?'button-actived':'']" @click="setTradeDay(1)">置交易/交收日</win_button>
                    <win_button size="mini" :class="['button',buttonIndex===0?'button-actived':'']" @click="setTradeDay(0)">置非交易/交收日</win_button>
                    <win_button v-show="hongkongflag" size="mini" :class="['button',buttonIndex===2?'button-actived':'']" @click="setTradeDay(2)">置仅交易日</win_button>
                    <win_checkbox v-model="weekendFlag" :disabled="!buttonFlag" class="checkbox">双休日批量设置</win_checkbox>
                </win_col>
                <win_col v-show="buttonFlag" style="text-align:right">
                    <win_button type="primary" @click="confirm">确认</win_button>
                    <win_button type="primary" @click="cancel">取消</win_button>
                </win_col>
            </win_row>

            <!-- agoDayHide='1517483961' -->
            <!-- futureDayHide="1526054400" -->
            <div>
                <win_row :gutter="5" class="calendar_row" v-for="(r,i) of 3" :key="r">
                    <win_col :span="6" v-for="c of 4" :key="c">
                        <Calendar ref="Calendar" :markDateMore="days" :markDate="chooseDays" :weekendFlag="weekendFlag" :onCheckDayHide="!buttonFlag" agoDayHide="1530115221" v-on:weekendays="getWeekendays" v-on:choseDay="clickDay"
                            :year="new Date(`${year}-${i*4+c}`)"></Calendar>
                    </win_col>
                </win_row>
            </div>
        </win_dialog>
    </div>
</template>
<script lang="ts">
import TradeDayController from "../controller/TradeDayController";
import Component from "vue-class-component";

@Component({
    components: {}
})
export default class TradeDay extends TradeDayController {}
</script>
<style lang="scss" scoped>
@import "../../../assets/style/element.scss";
.top {
    width: 100%;
    height: 48px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: rgba(104, 113, 142, 1);
    opacity: 1;
    padding: 0 20px;
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
}
.jyr {
    width: 119px;
    height: 21px;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 21px;
    color: rgba(255, 255, 255, 1);
    opacity: 1;
    text-align: right;
}

.ps1 {
    position: absolute;
    left: 5%;
    top: 0px;
    width: 100%;

    span {
        display: inline-block;
        width: 80px;
        text-align: left;
        vertical-align: middle;
        color: #fff;
    }
}
.radius {
    display: inline-block;
    vertical-align: middle;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #f2f2f2;
    margin-right: 4px;
}

.se {
    background: #ffd3a0;
    margin-left: 56px;
}
.only {
    background-color: #eff372;
    margin-left: 56px;
}
.radius-title {
    display: inline-block;
    vertical-align: middle;
    color: #8d959a;
}

.buttons button {
    margin: 0px 20px;
}
.el-icon-arrow-left {
    &::before {
        color: #fff;
        font-size: 24px;
        padding-right: 15px;
        cursor: pointer;
    }
}

.el-icon-arrow-right {
    &::before {
        color: #fff;
        font-size: 24px;
        padding-left: 15px;
        cursor: pointer;
    }
}
.el-icon-close {
    &::before {
        color: #fff;
        font-size: 24px;
        padding-left: 15px;
        cursor: pointer;
    }
}
.year,
.el-icon-close,
.el-icon-arrow-left,
.el-icon-arrow-right {
    display: inline-block;
    vertical-align: middle;
}
.year {
    color: #fff;
    font-size: 16px;
    margin-right: 10px;
}

.content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    background-color: #1d2744;
}

.wh_container >>> .wh_item_date {
    width: 53px;
    height: 32px;
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

.wh_container >>> .wh_content_all {
    background-color: #2b3551;
}
.wh_container >>> .wh_top_tag {
    width: 53px;
    height: 17px;
    background: rgba(104, 113, 142, 1);
    opacity: 1;
}
.calendar_row {
    margin-bottom: 5px;
}
.el-dialog {
    position: absolute;
    margin: 0;
    background-color: white;
}
.calendar /deep/ .el-dialog {
    position: absolute;
    margin: 0;
}
.calendar /deep/ .el-dialog--center .el-dialog__body {
    padding-top: 0;
}
.calendar /deep/ .dialog .el-dialog__header {
    padding: 10px 0;
}
.select /deep/ .el-input {
    height: auto;
}
.select /deep/ .el-input .el-select__caret {
    margin-top: 0;
}
.button {
    margin-right: 20px;
    background-color: #1b2441;
    color: white;
}
.button:hover {
    border-color: #ff900d;
    color: #ff900d;
}
.checkbox /deep/ .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #ff900d;
}
.checkbox /deep/ .el-checkbox__input {
    vertical-align: -2px;
}
.button-actived {
    color: #ff900d;
    border-color: #ff900d;
}
</style>
