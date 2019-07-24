<template>
    <div class=".ps2">
        <TradeDay v-show="isDetailAble" ref="tradeDay"></TradeDay>
        <win_table :data="tradeDayTypeRepList" style="width: 100%" :show-selection="false" :show-index="false">
            <win_table_column prop="tradeDayCode" label="交易日类型" width="280"></win_table_column>
            <win_table_column prop="tradeDayName" label="交易日名称" width="320"></win_table_column>
            <win_table_column prop="updateUserId" label="最近操作人员" width="300"></win_table_column>
            <win_table_column prop="updateTime" label="最近操作时间" width="650"></win_table_column>
            <win_table_column label="操作" width="300">
                <template slot-scope="scope">
                    <div class="operate">
                        <span @click="onCheck(scope.row)">
                            <i class="el-icon-tickets"></i>查看
                        </span>
                        <span @click="onEdit(scope.row)">
                            <i class="el-icon-edit"></i>编辑
                        </span>
                    </div>
                </template>
            </win_table_column>
            <div class="ds"></div>
        </win_table>
    </div>
</template>
<script lang="ts">
import TradeDayTypeController from "../controller/TradeDayTypeController";
import Component from "vue-class-component";
@Component
export default class TradeDayType extends TradeDayTypeController {}
</script>
<style lang="scss" scoped>
@import "../../../assets/style/element.scss";

.ps1 {
    position: absolute;
    left: 5%;
    top: 0px;
    width: 100%;
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

.buttons button {
    margin: 0px 20px;
}
</style>