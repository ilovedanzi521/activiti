<template>
  <div style="margin-left:10px;">
    <!-- 回购查询表单 begin-->
    <div style="margin-left:-30px;margin-top:20px">
      <win_form :inline="true" :model="formInline" class="demo-form-inline">
        <win_form_item label="证券内码">
          <el-autocomplete v-model="formInline.securityCode" :fetch-suggestions="listAll" placeholder="请输入内容" @select="handleSelect" clearable></el-autocomplete>
        </win_form_item>
        <win_form_item>
          <win_button type="primary" @click="query" icon="el-icon-search">查询</win_button>
          <win_button @click="reset" icon="el-icon-refresh">重置</win_button>
        </win_form_item>
      </win_form>
    </div>
    <!-- 回购查询表单 end-->
    <div style="margin-top:20px">
      <ul class="btn-edit fr">
        <li>
          <el-button-group>
            <el-button type="info" style="color:#2B3551" icon="el-icon-plus" @click="operation('','ADD')" round>新增</el-button>
            <el-button type="info" style="color:#2B3551" icon="el-icon-delete" :disabled="selected.length == 0" @click="delBatch" round>删除</el-button>
          </el-button-group>
        </li>
      </ul>
    </div>
    <!-- 回购列表Table begin-->
    <div>
      <win_table :data="repoInfo.list" max-height="442px" v-loading="loading" highlight-current-row element-loading-text="拼命加载中..." @select-change="tableSelectionChange" @select-all="tableSelectionChange" @cell-dblclick="dblclick">
        <win_table_column prop="securityCode" label="证券内码" width="200"></win_table_column>
        <win_table_column prop="securityName" label="证券名称" width="200"></win_table_column>
        <win_table_column prop="repoDay" label="回购天数" width="200"></win_table_column>
        <win_table_column prop="createTime" label="新增时间" width="250"></win_table_column>
        <win_table_column prop="updateTime" label="修改时间" width="250"></win_table_column>
        <win_table_column prop="updateUserName" label="修改人" width="150"></win_table_column>
        <win_table_column width="200" label="操作">
          <template slot-scope="scope">
            <win_button type="text" size="small" icon="el-icon-edit-outline" @click="operation(scope.row,'UPDATE')">修改</win_button>
            <win_button type="text" size="small" style="color:#FF4D4D" icon="el-icon-delete" @click="operation(scope.row,'DELETE')">删除</win_button>
          </template>
        </win_table_column>
      </win_table>
    </div>
    <!-- 回购列表Table end-->
    <!--分页组件-->
    <win_pagination v-bind:childMsg="repoInfo" @callFather="pageQuery"></win_pagination>
    <!-- 新增、删除、修改dialog-->
    <RepoDialog :fromFatherMsg="cardNumber" @bindSend="fromDialogMsg" v-if="dialogVisible"></RepoDialog>
  </div>
</template>
<script lang="ts">
import ParamRepoController from "../controller/ParamRepoController";
export default class ParamRepo extends ParamRepoController {}
</script>
<style lang="css" scoped>
.el-button--warning {
  background-color: #ff900d;
}
.el-pagination {
  padding-right: 10px;
  text-align: right;
  box-sizing: border-box;
}
</style>
