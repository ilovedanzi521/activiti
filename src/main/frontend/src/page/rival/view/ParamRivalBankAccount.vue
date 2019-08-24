<template>
  <div>

    <div class="col-md-12" style="margin-top:5px;">
      <el-button-group>
        <win-button type="info" style="color:#2B3551" icon="el-icon-plus" @click="operation('','ADD')" round>新增</win-button>
        <win-button type="info" style="color:#2B3551" icon="el-icon-delete" :disabled="multipleSelection.length == 0" @click="delBatch" round>删除</win-button>
      </el-button-group>
    </div>

    <win-table ref="multipleTable" :data="pageVO.list" @cell-dblclick="dblclick" @select-change="tableSelectionChange" @select-all="tableSelectionChange" max-height="150px">
      <win-table-column prop="escrowAccount" label="托管账号" width="260"></win-table-column>
      <win-table-column prop="escrowName" label="托管账户名称" width="260"></win-table-column>
      <win-table-column prop="escrowParty" label="托管机构" :formatter="formatDic" width="240"></win-table-column>
      <win-table-column prop="stop" label="停用标志" :formatter="formatDic" width="240"></win-table-column>
      <win-table-column prop="createUserId" label="操作人" :formatter="formatDic" width="240"></win-table-column>
      <win-table-column prop="createTime" label="操作时间" :formatter="formatDic" width="240"></win-table-column>
      <win-table-column label="操作" width="240">
        <template slot-scope="scope">
          <win-button @click="operation(scope.row,'UPDATE')" type="text" size="small" icon="el-icon-edit-outline">修改</win-button>
          <win-button @click="operation(scope.row,'DELETE')" type="text" size="small" icon="el-icon-delete" style="color:#FF4D4D">删除</win-button>
        </template>
      </win-table-column>
    </win-table>
    <!-- 分页组件 -->
    <win-pagination v-bind:child-msg="pageVO" @callFather="pageQuery"></win-pagination>
    <!-- 创建/修改/删除 dialog -->
    <ParamRivalBankAccountDialog :fromFatherMsg="cardNumber" @bindSend="toFatherMsg" v-if="dialogVisible">
    </ParamRivalBankAccountDialog>
  </div>
</template>
<script lang="ts">
import ParamRivalBankAccountController from "../controller/ParamRivalBankAccountController";
import Component from "vue-class-component";

export default class ParamRivalBankAccount extends ParamRivalBankAccountController {}
</script>
<style lang="scss" scoped>
</style>
