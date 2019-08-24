<template>
    <win-fdialog :title="dialogVO.title" :visible.sync="dialogVO.visible" width="760px">
        <win-form :inline="true" :disabled="dialogVO.disableFlag" ref="oplogForm">
            <div class="form_content">
                <win-form-item label="日志类型" label-width="100px">
                    <win-select v-model="details.logType">
                        <win-option v-for="item in compareVO.logTypeSelect" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode"></win-option>
                    </win-select>
                </win-form-item>
                <win-form-item label="日志路径" label-width="100px">
                    <el-input suffix-icon="xxxx" v-model="details.logPath"></el-input>
                </win-form-item>
            </div>
            <div class="form_content">
                <win-form-item label="操作页面" label-width="100px">
                    <el-input suffix-icon="xxxx" v-model="details.operatePage"></el-input>
                </win-form-item>
                <win-form-item label="操作时间" label-width="100px">
                    <el-input suffix-icon="xxxx" v-model="details.operateTime"></el-input>
                </win-form-item>
            </div>
            <div class="form_content">
                <win-form-item label="日志描述" label-width="100px">
                    <el-input suffix-icon="xxxx" v-model="details.logDescrip"></el-input>
                </win-form-item>
                <win-form-item label="终端机器名" label-width="100px">
                    <el-input suffix-icon="xxxx" v-model="details.terminalName"></el-input>
                </win-form-item>
            </div>
            <div class="form_content">
                <win-form-item label="操作用户" label-width="100px">
                    <el-input suffix-icon="xxxx" v-model="details.operateUserId"></el-input>
                </win-form-item>
                <win-form-item label="请求IP" label-width="100px">
                    <el-input suffix-icon="xxxx" v-model="details.requestIp"></el-input>
                </win-form-item>
            </div>
            <div class="form_content">
                <win-form-item label="MAC地址" label-width="100px">
                    <el-input suffix-icon="xxxx" v-model="details.macAddress"></el-input>
                </win-form-item>
                <win-form-item label="微服务名" label-width="100px">
                    <el-input suffix-icon="xxxx" v-model="details.microServiceName"></el-input>
                </win-form-item>
            </div>
            <div class="form_content">
                <win-form-item label="请求路径" label-width="100px">
                    <el-input suffix-icon="xxxx" v-model="details.requestPath"></el-input>
                </win-form-item>
                <win-form-item label="请求参数" label-width="100px">
                    <el-input suffix-icon="xxxx" v-model="details.requestParam"></el-input>
                </win-form-item>
            </div>
            <div class="form_content">
                <win-form-item label="操作前数据" label-width="100px">
                    <el-input suffix-icon="xxxx" v-model="details.operatePreData"></el-input>
                </win-form-item>
                <win-form-item label="操作后数据" label-width="100px">
                    <el-input suffix-icon="xxxx" v-model="details.operateAfterData"></el-input>
                </win-form-item>
            </div>
        </win-form>
        <span slot="footer" class="dialog-footer">
            <win-button @click="closeFormDialog('oplogForm')" type="primary">确认</win-button>
        </span>
    </win-fdialog>
</template>
<script lang="ts">
import Component from "vue-class-component";
import OplogDialogController from "../controller/OplogDialogController";
export default class OplogDialogView extends OplogDialogController {}
</script>
<style lang="scss" scoped>
</style>

