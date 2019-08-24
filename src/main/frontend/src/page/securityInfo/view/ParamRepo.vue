<template>
  <div style="margin-left:10px;">
    <!-- 回购查询表单 begin-->
    <div style="margin-left:-30px;margin-top:20px">
      <win-form :inline="true" :model="formInline" class="demo-form-inline">
        <win-form-item label="证券代码">
          <el-autocomplete v-model="formInline.securityCode" :fetch-suggestions="listAll" placeholder="请输入内容" @select="handleSelect" clearable></el-autocomplete>
        </win-form-item>
        <win-form-item label="交易市场">
          <win-select v-model="formInline.marketCode" filterable multiple placeholder="请选择" clearable>
            <win-option v-for="item in marketType" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
              <span style="float: left">{{ item.dicCode }}</span>
              <span>{{ "&nbsp;"+item.dicExplain }}</span>
            </win-option>
          </win-select>
        </win-form-item>

        <win-form-item>
          <win-button type="primary" @click="query" icon="el-icon-search">查询</win-button>
          <win-button @click="reset" icon="el-icon-refresh">重置</win-button>
        </win-form-item>
      </win-form>
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
      <win-table :data="repoInfo.list" max-height="442px" v-loading="loading" highlight-current-row element-loading-text="拼命加载中..." @select-change="tableSelectionChange" @select-all="tableSelectionChange" @cell-dblclick="dblclick">
        <win-table-column prop="securityCode" label="证券代码" width="200"></win-table-column>
        <win-table-column prop="securityName" label="证券名称" width="200"></win-table-column>
        <win-table-column prop="marketCode" label="交易市场" :formatter="formatDic" width="200"></win-table-column>
        <win-table-column prop="repoDay" label="回购天数" width="200"></win-table-column>
        <win-table-column prop="createTime" label="新增时间" width="250"></win-table-column>
        <win-table-column prop="updateTime" label="修改时间" width="250"></win-table-column>
        <win-table-column prop="updateUserName" label="修改人" width="150"></win-table-column>
        <win-table-column width="200" label="操作">
          <template slot-scope="scope">
            <win-button type="text" size="small" icon="el-icon-edit-outline" @click="operation(scope.row,'UPDATE')">修改</win-button>
            <win-button type="text" size="small" style="color:#FF4D4D" icon="el-icon-delete" @click="operation(scope.row,'DELETE')">删除</win-button>
          </template>
        </win-table-column>
      </win-table>
    </div>
    <!-- 回购列表Table end-->
    <!--分页组件-->
    <win-pagination v-bind:childMsg="repoInfo" @callFather="pageQuery"></win-pagination>
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
