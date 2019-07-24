<template>
  <div class="container">
    <win_form :inline="true" class="queryForm" ref="opLogForm">
      <div class="form_content">
        <win_form_item label="操作用户">
          <win_select v-model="form.operateUserIds" filterable remote multiple placeholder="请选择" :remote-method="remoteUserList">
            <win_option v-for="item in compareVO.userSelect" :key="item.userId" :label="item.userId" :value="item.userId"></win_option>
          </win_select>
        </win_form_item>
        <win_form_item label="日志类型">
          <win_select v-model="form.logTypes" multiple placeholder="请选择">
            <win_option v-for="item in compareVO.logTypeSelect" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode"></win_option>
          </win_select>
        </win_form_item>
        <win_form_item label="日志描述">
          <win_input suffix-icon="xxxx" v-model="form.logDescrip"></win_input>
        </win_form_item>
        <win_form_item label="日志路径">
          <win_input suffix-icon="xxxx" v-model="form.logPath"></win_input>
        </win_form_item>
      </div>
      <div class="form_content">
        <win_form_item label="操作页面">
          <win_input suffix-icon="xxxx" v-model="form.operatePage"></win_input>
        </win_form_item>
        <win_form_item label="操作时间">
          <win_date_picker class="datePicker" v-model="timeArray" type="datetimerange" :picker-options="compareVO.pickerOptions" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" :default-time="['00:00:00', '23:59:59']">
          </win_date_picker>
        </win_form_item>
        <div class="form-button">
          <win_button @click="query()" type="primary">查询</win_button>
          <win_button @click="reset()" type="default">重置</win_button>
        </div>
      </div>
    </win_form>

    <win_table :data="pageVO.list" style="width: 100%" max-height="600px" :showSelection="false" :showIndex="false">
      <win_table_column width="180" prop="logType" :formatter="logTypeFormatter" label="日志类型" sortable></win_table_column>
      <win_table_column width="260" prop="operatePage" show-overflow-tooltip label="操作页面" sortable></win_table_column>
      <win_table_column width="460" prop="logDescrip" show-overflow-tooltip sortable label="日志描述"></win_table_column>
      <win_table_column width="180" prop="operateUserId" sortable label="操作用户"></win_table_column>
      <win_table_column width="400" prop="logPath" show-overflow-tooltip sortable label="日志路径"></win_table_column>
      <win_table_column width="180" prop="operateTime" sortable label="操作时间"></win_table_column>
      <win_table_column width="180" label="操作">
        <template slot-scope="scope">
          <div class="operate">
            <span @click="detail(scope.row)">查看</span>
          </div>
        </template>
      </win_table_column>
    </win_table>
    <!-- 分页组件 -->
    <win_pagination v-bind:child-msg="pageVO" @callFather="pageQuery"></win_pagination>
    <!--日志详情-->
    <OplogDialog :dialogVO="dialogVO" :details="details" @query="query"></OplogDialog>
  </div>
</template>
<script lang="ts">
import OplogController from "../controller/OplogController";
import Component from "vue-class-component";
export default class OplogView extends OplogController {}
</script>
<style lang="scss" scoped>
.queryForm .el-form-item {
  margin: 0px 50px;
}

.form-button {
  float: right;
  margin: 0px 170px 20px 0px;
}

.el-picker-panel .win_input {
  width: 145px;
}
</style>
