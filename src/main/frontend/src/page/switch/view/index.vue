<template>
    <div>
        <win_tabs v-model="activeName" @tab-click="handleTabClick">
            <win_tab label="系统运行" name="SYSTEM_OPERATION">
                <SwitchTable
                    :switchData="swtichList"
                    :switchOpLogData="switchOpLogList"
                    :opLogPageData="opLogPageVO"
                    @swtichChange="switchChange"
                    @swtichTableRowClick="swtichTableRowClick"
                    @opLogPageQuery="opLogPageQuery"
                ></SwitchTable>
            </win_tab>
            <win_tab label="初始化" name="INITIALIZATION">
                <SwitchTable
                    :switchData="swtichList"
                    :switchOpLogData="switchOpLogList"
                    :opLogPageData="opLogPageVO"
                    @swtichChange="switchChange"
                    @swtichTableRowClick="swtichTableRowClick"
                    @opLogPageQuery="opLogPageQuery"
                ></SwitchTable>
            </win_tab>
            <win_tab label="密码策略" name="PASSWORD_POLICY">
                <SwitchTable
                    :switchData="swtichList"
                    :switchOpLogData="switchOpLogList"
                    :opLogPageData="opLogPageVO"
                    @swtichChange="switchChange"
                    @swtichTableRowClick="swtichTableRowClick"
                    @opLogPageQuery="opLogPageQuery"
                ></SwitchTable>
            </win_tab>
        </win_tabs>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import SwitchController from "../controller/SwitchController";

@Component({})
export default class Index extends SwitchController {}
</script>

<style lang="scss" scoped>
</style>
