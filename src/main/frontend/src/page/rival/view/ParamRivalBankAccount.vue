<template>
  <div>

    <div class="col-md-12" style="margin-top:5px;">
      <el-button-group>
        <win_button type="info" style="color:#2B3551" icon="el-icon-plus" @click="operation('','ADD')" round>新增</win_button>
        <win_button type="info" style="color:#2B3551" icon="el-icon-delete" :disabled="multipleSelection.length == 0" @click="delBatch" round>删除</win_button>
      </el-button-group>
    </div>

    <win_table ref="multipleTable" :data="pageVO.list" @cell-dblclick="dblclick" highlight-current-row tooltip-effect="dark" indexFixed selectionFixed max-height="440">
      <win_table_column prop="escrowAccount" label="托管账号" width="260"></win_table_column>
      <win_table_column prop="escrowName" label="托管账户名称" width="260"></win_table_column>
      <win_table_column prop="escrowParty" label="托管机构" width="240"></win_table_column>
      <win_table_column prop="stop" label="停用标志" :formatter="formatDic" width="240"></win_table_column>
      <win_table_column prop="createUserId" label="操作人" :formatter="formatDic" width="240"></win_table_column>
      <win_table_column prop="createTime" label="操作时间" :formatter="formatDic" width="240"></win_table_column>
      <win_table_column label="操作" width="240">
        <template slot-scope="scope">
          <win_button @click="operation(scope.row,'UPDATE')" type="text" size="small" icon="el-icon-edit-outline">修改</win_button>
          <win_button @click="operation(scope.row,'DELETE')" type="text" size="small" icon="el-icon-delete" style="color:#FF4D4D">删除</win_button>
        </template>
      </win_table_column>
    </win_table>
    <!-- 分页组件 -->
    <!-- <win_pagination v-bind:child-msg="pageVO" @callFather="pageQuery"></win_pagination> -->
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
