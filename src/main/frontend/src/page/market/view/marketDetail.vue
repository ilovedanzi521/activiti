<template>
    <div class="ps1">
        <div class="fl">
            <li v-if="modifyFlag">
                <div class="fl">
                    <win_button type="primary" @click="modify">修改</win_button>
                </div>
            </li>
            <li v-if="!modifyFlag">
                <div class="fl">
                    <win_button type="primary" @click="update">确认</win_button>
                </div>
                <div class="fr">
                    <win_button type="primary" @click="cancel">取消</win_button>
                </div>
            </li>
        </div>
        <ul>
            <li>
                <div class="fl">
                    <span>市场编码:</span>
                    <win_input v-model="details.marketCode" :disabled="true"></win_input>
                </div>
                <div class="fr">
                    <span>交易日类型:</span>
                    <win_input v-model="details.tradeDayType" :disabled="true"></win_input>
                </div>
            </li>
            <li>
                <div class="fl">
                    <span>市场名称:</span>
                    <win_input v-model="details.marketName" :disabled="true"></win_input>
                </div>
                <div class="fr">
                    <span>市场全称:</span>
                    <win_input v-model="details.marketFullName" :disabled="true"></win_input>
                </div>
            </li>
            <li>
                <div class="fl">
                    <span>国家/地区:</span>
                    <win_input v-model="details.country" :disabled="true"></win_input>
                </div>
                <div class="fr">
                    <span>时区:</span>
                    <win_input v-model="details.timeZone" :disabled="true"></win_input>
                </div>
            </li>
            <li>
                <div class="fl">
                    <span>上午开市时间:</span>
                    <el-time-select
                        v-model="details.morningMarketOpen"
                        :disabled="modifyFlag"
                        :picker-options="{start: '08:30:00',step: '00:15:00', end: '18:30:00'}"
                        placeholder="选择时间"
                    ></el-time-select>
                </div>
                <div class="fr">
                    <span>上午闭市时间:</span>
                    <el-time-select
                        v-model="details.morningMarketClose"
                        :disabled="modifyFlag"
                        :picker-options="{start: '08:30',step: '00:15', end: '18:30'}"
                        placeholder="选择时间"
                    ></el-time-select>
                </div>
            </li>
            <li>
                <div class="fl">
                    <span>下午开市时间:</span>
                    <el-time-select
                        v-model="details.afternoonMarketOpen"
                        :disabled="modifyFlag"
                        :picker-options="{start: '08:30',step: '00:15', end: '18:30'}"
                        placeholder="选择时间"
                    ></el-time-select>
                </div>
                <div class="fr">
                    <span>下午闭市时间:</span>
                    <el-time-select
                        v-model="details.afternoonMarketClose"
                        :disabled="modifyFlag"
                        :picker-options="{start: '08:30',step: '00:15', end: '18:30'}"
                        placeholder="选择时间"
                    ></el-time-select>
                </div>
            </li>
            <li>
                <div class="fl">
                    <span>晚上开市时间:</span>
                    <el-time-select
                        v-model="details.nightMarketOpen"
                        :disabled="modifyFlag"
                        :picker-options="{start: '08:30',step: '00:15', end: '18:30'}"
                        placeholder="选择时间"
                    ></el-time-select>
                </div>
                <div class="fr">
                    <span>晚上闭市时间:</span>
                    <el-time-select
                        v-model="details.nightMarketClose"
                        :disabled="modifyFlag"
                        :picker-options="{start: '08:30',step: '00:15', end: '18:30'}"
                        placeholder="选择时间"
                    ></el-time-select>
                </div>
            </li>
            <li>
                <div class="fl">
                    <span>备注:</span>
                    <win_input v-model="details.remark" :disabled="modifyFlag"></win_input>
                </div>
            </li>
        </ul>
    </div>
</template>
<script lang="ts">
import MarketDetailController from "../controller/MarketDetailController";
import Component from "vue-class-component";
@Component
export default class Market extends MarketDetailController {}
</script>
<style lang="scss" scoped>
@import "../../../assets/style/element.scss";

.ps1 {
    input {
        @include iuputUi();
        display: inline-block;
        vertical-align: middle;
    }

    span {
        display: inline-block;
        width: 80px;
        text-align: left;
        vertical-align: middle;
        color: #fff;
    }
}

li {
    width: 80%;
    margin-bottom: 32px;
    overflow: hidden;
    .fl {
        float: left;
    }
    .fr {
        float: left;
        margin-left: 30px;
    }
}
</style>