<template>
    <div class="container">
        <div class="content-fr">
            <span class="zdx">字典项</span>
            <div :style="{ float: 'right' }">
                <win_input type="text" placeholder="请输入查询条件" maxlength="64" v-model="dicReqVO.commonParam"></win_input>
                <win_button type="primary" @click="search()">搜索</win_button>
            </div>
            <div class="content-fr-warp">
                <win_table :data="dicList" ref="dicTable" stripe :showSelection="false" height="600" style="width: 100%" @cell-click="handleDicRow">
                    <win_table_column prop="dicCode" min-width="200" label="字典项编码" sortable></win_table_column>
                    <win_table_column prop="dicExplain" min-width="250" label="字典项说明" sortable></win_table_column>
                </win_table>
                <win_pagination name="dic" :isEasy="true" v-bind:childMsg="dicPageVO" @callFather="dicPageQuery"></win_pagination>
            </div>
        </div>
        <div class="content-fl">
            <span class="zdzz">字典子项</span>
            <div class="content-fl-warp">
                <win_table :data="dicSubList" stripe :highlight-current-row="true" :showSelection="false" height="600" style="width: 100%">
                    <win_table_column prop="dicCode" min-width="150" label="字典子项编码" sortable></win_table_column>
                    <win_table_column prop="dicExplain" min-width="150" label="字典子项说明"></win_table_column>
                    <win_table_column prop="param1" min-width="150" label="字典子项参数1"></win_table_column>
                    <win_table_column prop="param2" min-width="150" label="字典子项参数2"></win_table_column>
                    <win_table_column prop="param3" min-width="150" label="字典子项参数3"></win_table_column>
                    <win_table_column prop="paramExplain" min-width="200" label="字典子项参数说明"></win_table_column>
                </win_table>
                <win_pagination name="subDic" v-bind:childMsg="dicSubPageVO" @callFather="dicSubPageQuery"></win_pagination>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import DicController from "../controller/DicController";

@Component({})
export default class Index extends DicController {}
</script>

<style lang="scss" scoped>
.container {
    overflow: hidden;
    .content-fr {
        position: relative;
        width: 30%;
        height: 800px;
        padding: 20px;
        box-sizing: border-box;
        float: left;
        .content-fr-warp {
            border: 1px solid #666;
            height: 90%;
            margin-top: 60px;
        }
        span.zdx {
            float: left;
            margin-top: 24px;
            border: 1px solid #303133;
            background: #303133;
            text-align: center;
            color: #ff900d;
            padding: 6px 8px;
            font-size: 14px;
        }
    }
    .content-fl {
        position: relative;
        width: 70%;
        height: 800px;
        padding: 20px;
        box-sizing: border-box;
        float: left;
        .content-fl-warp {
            border: 1px solid #666;
            height: 90%;
            margin-top: 60px;
        }
        span.zdzz {
            float: left;
            margin-top: 24px;
            border: 1px solid #303133;
            background: #303133;
            text-align: center;
            color: #ff900d;
            padding: 6px 8px;
            font-size: 14px;
        }
    }
}
</style>
