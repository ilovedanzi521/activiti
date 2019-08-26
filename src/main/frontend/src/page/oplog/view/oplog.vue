<template>
  <div class="container">
    <win-form :inline="true" class="queryForm" ref="opLogForm">
      <div class="form_content">
        <win-form-item label="操作用户">
          <win-select v-model="form.operateUserIds" filterable remote multiple placeholder="请选择" :remote-method="remoteUserList">
            <win-option v-for="item in compareVO.userSelect" :key="item.userId" :label="item.userId" :value="item.userId"></win-option>
          </win-select>
        </win-form-item>
        <win-form-item label="日志类型">
          <win-select v-model="form.logTypes" multiple placeholder="请选择">
            <win-option v-for="item in compareVO.logTypeSelect" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode"></win-option>
          </win-select>
        </win-form-item>
        <win-form-item label="日志描述">
          <win-input suffix-icon="xxxx" v-model="form.logDescrip"></win-input>
        </win-form-item>
        <win-form-item label="日志路径">
          <win-input suffix-icon="xxxx" v-model="form.logPath"></win-input>
        </win-form-item>
      </div>
      <div class="form_content">
        <win-form-item label="操作页面">
          <win-input suffix-icon="xxxx" v-model="form.operatePage"></win-input>
        </win-form-item>
        <win-form-item label="操作时间">
          <win-date-picker class="datePicker" v-model="timeArray" type="datetimerange" :picker-options="compareVO.pickerOptions" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" :default-time="['00:00:00', '23:59:59']">
          </win-date-picker>
        </win-form-item>
        <div class="form-button">
          <win-button @click="query()" type="primary">查询</win-button>
          <win-button @click="reset()" type="default">重置</win-button>
        </div>
      </div>
    </win-form>

    <win-table :data="pageVO.list" style="width: 100%" max-height="600px" :showSelection="false" :showIndex="false">
      <win-table-column width="180" prop="logType" :formatter="logTypeFormatter" label="日志类型" sortable></win-table-column>
      <win-table-column width="260" prop="operatePage" show-overflow-tooltip label="操作页面" sortable></win-table-column>
      <win-table-column width="460" prop="logDescrip" show-overflow-tooltip sortable label="日志描述"></win-table-column>
      <win-table-column width="180" prop="operateUserId" sortable label="操作用户"></win-table-column>
      <win-table-column width="400" prop="logPath" show-overflow-tooltip sortable label="日志路径"></win-table-column>
      <win-table-column width="180" prop="operateTime" sortable label="操作时间"></win-table-column>
      <win-table-column width="180" label="操作">
        <template slot-scope="scope">
          <div class="operate">
            <span @click="detail(scope.row)">查看</span>
          </div>
        </template>
      </win-table-column>
    </win-table>
    <!-- 分页组件 -->
    <win-pagination v-bind:child-msg="pageVO" @callFather="pageQuery"></win-pagination>
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

.el-picker-panel .win-input {
  width: 145px;
}
</style>
