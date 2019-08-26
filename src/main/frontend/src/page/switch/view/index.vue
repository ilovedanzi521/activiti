<template>
    <div class="switch-contanier">
        <win-tabs v-model="activeName" @tab-click="handleTabClick">
            <win-tab-pane label="系统运行" name="SYSTEM_OPERATION">
                <SwitchTable :switchData="swtichList" :switchOpLogData="switchOpLogList" :switchPageData="switchPageVO" :opLogPageData="opLogPageVO" @swtichChange="switchChange" @swtichTableRowClick="swtichTableRowClick"
                    @switchPageQuery="switchPageQuery" @opLogPageQuery="opLogPageQuery"></SwitchTable>
            </win-tab-pane>
            <win-tab-pane label="初始化" name="INITIALIZATION">
                <SwitchTable :switchData="swtichList" :switchOpLogData="switchOpLogList" :switchPageData="switchPageVO" :opLogPageData="opLogPageVO" @swtichChange="switchChange" @swtichTableRowClick="swtichTableRowClick"
                    @switchPageQuery="switchPageQuery" @opLogPageQuery="opLogPageQuery"></SwitchTable>
            </win-tab-pane>
            <win-tab-pane label="密码策略" name="PASSWORD_POLICY">
                <SwitchTable :switchData="swtichList" :switchOpLogData="switchOpLogList" :switchPageData="switchPageVO" :opLogPageData="opLogPageVO" @swtichChange="switchChange" @swtichTableRowClick="swtichTableRowClick"
                    @switchPageQuery="switchPageQuery" @opLogPageQuery="opLogPageQuery"></SwitchTable>
            </win-tab-pane>
        </win-tabs>
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
.switch-contanier {
    padding: 0 10px;
}
</style>
