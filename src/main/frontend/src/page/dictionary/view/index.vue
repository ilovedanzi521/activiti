<template>
    <div class="container">
        <div class="content-fr">
            <!-- <span class="zdx">字典项</span> -->
            <!-- <div :style="{ float: 'right' }">
                <win-input type="text" placeholder="请输入查询条件" maxlength="64" v-model="dicReqVO.commonParam"></win-input>
                <win-button type="primary" @click="search()">搜索</win-button>
            </div> -->
            <div class="search-contanier">
                <win-input type="text" placeholder="请输入查询条件" maxlength="64" v-model="dicReqVO.commonParam" @input="search()"></win-input>
                <!-- <lable class="add-botton">
                    <i class="el-icon-plus"></i>
                    <label>新增字典项</label>
                </lable> -->
            </div>
            <div class="content-fr-warp">
                <win-table :data="dicList" ref="dicTable" stripe :showSelection="false" max-height="640" :style="{'width': '100%'}" @cell-click="handleDicRow">
                    <win-table-column prop="dicCode" :min-width="220" label="字典项编码" sortable></win-table-column>
                    <win-table-column prop="dicExplain" :min-width="240" label="字典项说明" sortable></win-table-column>
                </win-table>
                <div class="paginatio-contanier">
                    <win-pagination name="dic" :isEasy="true" v-bind:childMsg="dicPageVO" @callFather="dicPageQuery"></win-pagination>
                </div>
            </div>
        </div>

        <div class="content-fl">
            <div class="search-contanier">
                <!-- <lable class="add-botton">
                    <i class="el-icon-plus"></i>
                    <label>新增字典项</label>
                </lable> -->
            </div>
            <!-- <span class="zdzz">字典子项</span> -->
            <div class="content-fl-warp">
                <win-table :data="dicSubList" :highlight-current-row="true" :showSelection="false" max-height="640" :style="{'width': '100%'}">
                    <win-table-column prop="dicCode" :min-width="100" label="字典子项编码" sortable></win-table-column>
                    <win-table-column prop="dicExplain" :min-width="150" label="字典子项说明"></win-table-column>
                    <win-table-column prop="param1" :min-width="150" label="字典子项参数1"></win-table-column>
                    <win-table-column prop="param2" :min-width="150" label="字典子项参数2"></win-table-column>
                    <win-table-column prop="param3" :min-width="150" label="字典子项参数3"></win-table-column>
                    <win-table-column prop="paramExplain" :min-width="155" label="字典子项参数说明"></win-table-column>
                </win-table>
                <div class="paginatio-contanier">
                    <win-pagination name="subDic" v-bind:childMsg="dicSubPageVO" @callFather="dicSubPageQuery"></win-pagination>
                </div>
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
    padding: 16px 18px;
    overflow: hidden;
    .content-fr {
        position: relative;
        box-sizing: border-box;

        float: left;
        .content-fr-warp {
            background: #0b1431ff;
            height: 740px;
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
        width: 1360px;
        box-sizing: border-box;
        top: 28px;
        float: right;
        .content-fl-warp {
            border: 1px solid #f58b0eff;
            padding: 20px;
            background: #38415bff;
            box-sizing: border-box;
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
    .page-contanier {
        position: absolute;
        width: 100%;
        right: 10px;
    }

    .search-contanier {
        margin-bottom: 14px;
        overflow: hidden;
        .add-botton {
            display: inline-block;
            float: right;
            width: 132px;
            height: 36px;
            font-size: 14px;
            line-height: 36px;
            border-radius: 20px;
            background: #2b3551ff;
            color: #fff;
            text-align: center;
        }
    }
    .paginatio-contanier {
        margin-top: 10px;
    }
}
</style>
