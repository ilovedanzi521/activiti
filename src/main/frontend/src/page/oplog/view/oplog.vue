<template>
    <div class="container">
        <win_form :inline="true" class="queryForm" ref="opLogForm">
            <div class="form_content">
                <win_form_item label="操作用户">
                    <win_select v-model="form.operateUserIds" multiple placeholder="请选择">
                        <win_option
                            v-for="item in downVO.userSelect"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        ></win_option>
                    </win_select>
                </win_form_item>
                <win_form_item label="日志类型">
                    <win_select v-model="form.logTypes" multiple placeholder="请选择">
                        <win_option
                            v-for="item in downVO.logTypeSelect"
                            :key="item.dicCode"
                            :label="item.dicExplain"
                            :value="item.dicCode"
                        ></win_option>
                    </win_select>
                </win_form_item>
                <win_form_item label="日志描述">
                    <el-input suffix-icon="xxxx" v-model="form.logDescrip"></el-input>
                </win_form_item>
                <win_form_item label="日志路径">
                    <el-input suffix-icon="xxxx" v-model="form.logPath"></el-input>
                </win_form_item>
            </div>
            <div class="form_content">
                <win_form_item label="操作页面">
                    <el-input suffix-icon="xxxx" v-model="form.operatePage"></el-input>
                </win_form_item>
                <win_form_item label="操作时间">
                    <win_date_picker
                        class="datePicker"
                        v-model="form.timeArray"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        v-on:change="setFormTime"
                        type="datetimerange"
                        :picker-options="pickerOptions"
                        range-separator="至"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        :default-time="['00:00:00', '23:59:59']"
                    ></win_date_picker>
                </win_form_item>
            </div>
        </win_form>
        <div class="form-button">
            <win_button @click="query()" class="yellowButton">查询</win_button>
            <win_button @click="reset()" class="defaultButton">重置</win_button>
        </div>

        <win_table :data="pageVO.list" style="width: 100%">
            <win_table_column align="center" type="index" label="序号" width="80"></win_table_column>
            <win_table_column
                prop="logType"
                :formatter="logTypeFormatter"
                label="日志类型"
                sortable
                width="180"
            ></win_table_column>
            <win_table_column prop="operatePage" label="操作页面" sortable></win_table_column>
            <win_table_column prop="logDescrip" sortable label="日志描述"></win_table_column>
            <win_table_column prop="operateUserId" sortable label="操作用户"></win_table_column>
            <win_table_column prop="logPath" sortable label="日志路径"></win_table_column>
            <win_table_column prop="operateTime" sortable label="操作时间"></win_table_column>
            <win_table_column label="操作" width="180">
                <template slot-scope="scope">
                    <div class="operate">
                        <span @click="detail(scope.row)" style="color:#FF900D">查看</span>
                    </div>
                </template>
            </win_table_column>
        </win_table>
        <!-- 分页组件 -->
        <Pagination v-bind:child-msg="pageVO" @callFather="pageQuery"></Pagination>
        <!--日志详情-->
        <win_dialog title="日志详情" :visible.sync="dialogVisible" width="40%">
            <win_form :inline="true" :disabled="true">
                <div class="form_content">
                    <win_form_item label="日志类型" label-width="100px">
                        <win_select v-model="details.logType">
                            <win_option
                                v-for="item in downVO.logTypeSelect"
                                :key="item.dicCode"
                                :label="item.dicExplain"
                                :value="item.dicCode"
                            ></win_option>
                        </win_select>
                    </win_form_item>
                    <win_form_item label="日志路径" label-width="100px">
                        <el-input suffix-icon="xxxx" v-model="details.logPath"></el-input>
                    </win_form_item>
                </div>
                <div class="form_content">
                    <win_form_item label="操作页面" label-width="100px">
                        <el-input suffix-icon="xxxx" v-model="details.operatePage"></el-input>
                    </win_form_item>
                    <win_form_item label="操作时间" label-width="100px">
                        <el-input suffix-icon="xxxx" v-model="details.operateTime"></el-input>
                    </win_form_item>
                </div>
                <div class="form_content">
                    <win_form_item label="日志描述" label-width="100px">
                        <el-input suffix-icon="xxxx" v-model="details.logDescrip"></el-input>
                    </win_form_item>
                    <win_form_item label="终端机器名" label-width="100px">
                        <el-input suffix-icon="xxxx" v-model="details.terminalName"></el-input>
                    </win_form_item>
                </div>
                <div class="form_content">
                    <win_form_item label="操作用户" label-width="100px">
                        <el-input suffix-icon="xxxx" v-model="details.operateUserId"></el-input>
                    </win_form_item>
                    <win_form_item label="请求IP" label-width="100px">
                        <el-input suffix-icon="xxxx" v-model="details.requestIp"></el-input>
                    </win_form_item>
                </div>
                <div class="form_content">
                    <win_form_item label="MAC地址" label-width="100px">
                        <el-input suffix-icon="xxxx" v-model="details.macAddress"></el-input>
                    </win_form_item>
                    <win_form_item label="微服务名" label-width="100px">
                        <el-input suffix-icon="xxxx" v-model="details.microServiceName"></el-input>
                    </win_form_item>
                </div>
                <div class="form_content">
                    <win_form_item label="请求路径" label-width="100px">
                        <el-input suffix-icon="xxxx" v-model="details.requestPath"></el-input>
                    </win_form_item>
                    <win_form_item label="请求参数" label-width="100px">
                        <el-input suffix-icon="xxxx" v-model="details.requestParam"></el-input>
                    </win_form_item>
                </div>
                <div class="form_content">
                    <win_form_item label="操作前数据" label-width="100px">
                        <el-input suffix-icon="xxxx" v-model="details.operatePreData"></el-input>
                    </win_form_item>
                    <win_form_item label="操作后数据" label-width="100px">
                        <el-input suffix-icon="xxxx" v-model="details.operateAfterData"></el-input>
                    </win_form_item>
                </div>
            </win_form>
            <div class="divCenter">
                <win_button @click="closeDialog()" class="yellowButton">确认</win_button>
            </div>
        </win_dialog>
    </div>
</template>
<script lang="ts">
import OplogController from "../controller/OplogController";
import Component from "vue-class-component";
import ElementUI from "element-ui";
@Component({ components: {} })
export default class OplogView extends OplogController {}
</script>
<style lang="scss" scoped>
@import "../../../assets/style/page.scss";

.queryForm .el-form-item {
    margin: 0px 50px;
}

.form-button {
    float: right;
    margin: 0px 170px 20px 0px;
}

.el-picker-panel .el-input {
    width: 145px;
}
</style>
