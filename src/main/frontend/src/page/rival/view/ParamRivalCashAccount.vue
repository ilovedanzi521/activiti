<template>
  <div>

    <div class="col-md-12" style="margin-top:5px;">
      <el-button-group>
        <win-button type="info" style="color:#2B3551" icon="el-icon-plus" @click="operation('','ADD')" round>新增</win-button>
        <win-button type="info" style="color:#2B3551" icon="el-icon-delete" :disabled="multipleSelection.length == 0" @click="delBatch" round>删除</win-button>
      </el-button-group>
    </div>

    <win-table :data="pageVO.list" @select-change="tableSelectionChange" @select-all="tableSelectionChange" max-height="150px">
      <win-table-column prop="rivalNo" label="对手序号" width="260"></win-table-column>
      <win-table-column prop="bankAccount" label="资金账号" width="240"></win-table-column>
      <win-table-column prop="bankAccountName" label="资金账户名称" width="240"></win-table-column>
      <win-table-column prop="bankName" label="资金开户行" width="220"></win-table-column>
      <win-table-column prop="bankPayNo" label="资金支付系统行" width="200"></win-table-column>
      <win-table-column prop="stop" label="停用标志" :formatter="formatDic" width="200"></win-table-column>
      <win-table-column prop="remark" label="备注" width="200"></win-table-column>
      <win-table-column label="操作" width="180">
        <template slot-scope="scope">
          <win-button type="text" size="small" icon="el-icon-edit-outline" @click="operation(scope.row,'UPDATE')">修改</win-button>
          <win-button type="text" size="small" style="color:#FF4D4D" icon="el-icon-delete" @click="operation(scope.row,'DELETE')">删除</win-button>
        </template>
      </win-table-column>
    </win-table>
    <!-- 分页组件 -->
    <win-pagination v-bind:child-msg="pageVO" @callFather="pageQuery"></win-pagination>

    <ParamRivalCashAccountDialog :fromFatherMsg="cardNumber" @bindSend="toFatherMsg" v-if="dialogVisible">
    </ParamRivalCashAccountDialog>
  </div>
</template>
<script lang="ts">
import ParamRivalCashAccountController from "../controller/ParamRivalCashAccountController";
import Component from "vue-class-component";
export default class ParamRivalCashAccount extends ParamRivalCashAccountController {}
</script>
<style lang="scss" scoped>
</style>
