/* @首页Home路口文件
 * @Author: mikey.zhaopeng 
 * @Date: 2019-05-31 01:44:49 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-07-17 10:35:15
 */


<template>
    <div class="home-content">
        <addPanel></addPanel>
        <!-- <div class="contanierTop8px">
            <span class="input_group_wrap">
                <label class="input_group_wrap_label">产品</label>
                <win_input type="text" class="input_group_wrap_input" />
            </span>
            <span class="input_group_wrap">
                <label class="input_group_wrap_label">组合</label>
                <win_input type="text" class="input_group_wrap_input" />
            </span>
            <span class="input_group_wrap">
                <label class="input_group_wrap_label">证券</label>
                <win_input type="text" class="input_group_wrap_input" />
            </span>
            <span class="input_group_wrap">
                <label class="input_group_wrap_label">股东代码</label>
                <win_input type="text" class="input_group_wrap_input" />
            </span>
            <span class="input_group_wrap">
                <label class="input_group_wrap_label">席位</label>
                <win_input type="text" class="input_group_wrap_input" />
            </span>
            <span class="input_group_more">
                <span>更多查询</span>
                <em class="el-icon-caret-bottom"></em>
            </span>
            <span class="input_group_botton">
                <win_button>查询</win_button>
                <win_button>重置</win_button>
            </span>
        </div>
        <div class="contanierTop8px">
            <div data-v-199a83fe="" class="el-button-group">
                <button data-v-199a83fe="" type="button" class="el-button el-button--info is-round">
                    <i class="el-icon-plus"></i><span>新增</span>
                </button>
                <button data-v-199a83fe="" disabled="disabled" type="button" class="el-button el-button--info is-disabled is-round">
                    <i class="el-icon-delete"></i><span>删除</span>
                </button>
                <button data-v-199a83fe="" disabled="disabled" type="button" class="el-button el-button--info is-disabled is-round">
                    <i class="el-icon-delete"></i><span>删除</span>
                </button>
            </div>
        </div>
        <div class="contanierTop8px">
            <win_table style="width: 100%">
                <win_table_column prop="用户编码" label="用户编码" width="120"></win_table_column>
                <win_table_column prop="用户名" label="用户名" width="120"></win_table_column>
                <win_table_column prop="联系方式" label="联系方式" width="140"></win_table_column>
                <win_table_column prop="手机号" label="手机号" width="140"></win_table_column>
                <win_table_column prop="邮箱" label="邮箱" width="180"></win_table_column>
                <win_table_column prop="所属部门" label="所属部门" width="160"></win_table_column>
            </win_table>
        </div> -->
    </div>
</template>

<script lang="ts">
import Vue from "vue";

import Panels from "./addPanel.vue";
import { Component, Prop, Emit } from "vue-property-decorator";
import { win_fdialog } from "@win-frond-frameworks/biz-common";
import { win_button } from "@win-frond-frameworks/biz-common";
import { win_form, win_form_item } from "@win-frond-frameworks/biz-common";
import { win_tabs, win_tab } from "@win-frond-frameworks/biz-common";
import { win_select, win_option } from "@win-frond-frameworks/biz-common";
import { win_input } from "@win-frond-frameworks/biz-common";
import { win_table, win_table_column } from "@win-frond-frameworks/biz-common";
import addPanel from "./addPanel.vue";

@Component({
    components: {
        addPanel,
        win_button,
        win_tabs,
        win_select,
        win_input,
        win_table
    }
})
export default class Index extends Vue {
    tabValue: number = 0;

    handleChangeTab(index) {
        this.tabValue = index;
    }
}
</script>
<style lang="scss" scoped>
.contanierTop8px {
    margin-top: 8px;
}
.input_group_wrap {
    margin-right: 18px;
    .input_group_wrap_label {
        padding-left: 4px;
        color: #909399;
    }
}
.input_group_more {
    display: inline-block;
    font-size: 14px;
    color: #ff900d;
    font-size: 0;
    cursor: pointer;
    span {
        display: inline-block;
        font-size: 14px;
        margin-right: 10px;
    }
    em {
        display: inline-block;
        font-size: 14px;
        margin-right: 11px;
    }
}
.el-input__inner {
    height: 28px;
    line-height: 28px;
}

.el-button--info {
    color: white;
    background-color: #2b3551;
    border-color: #2b3551;
}
</style>