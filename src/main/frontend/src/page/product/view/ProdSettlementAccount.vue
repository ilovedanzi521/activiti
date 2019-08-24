<template>
  <div>
    <div class="col-md-12" style="margin-top:5px;">
      <el-button-group>
        <el-button type="info" style="color:#2B3551" icon="el-icon-plus" @click="operation('','ADD')" round>新增</el-button>
      </el-button-group>
    </div>
    <win-table :data="pageVO.list" :showSelection="false" style="margin-top:5px;" max-height="100px" @cell-dblclick="dblclick">
      <win-table-column prop="capitalAccountCode" label="资金账号" width="150"></win-table-column>
      <win-table-column prop="capitalAccountName" label="资金账户户名" width="150"></win-table-column>
      <win-table-column prop="capitalOpenBank" label="资金开户行" width="150"></win-table-column>
      <win-table-column prop="escrowAccountCode" label="托管账号" width="150"></win-table-column>
      <win-table-column prop="escrowAccountName" label="托管账户户名" width="150"></win-table-column>
      <win-table-column prop="escrowAgency" label="托管机构" :formatter="formatDic" width="150"></win-table-column>
      <win-table-column prop="createUserId" label="操作人" :formatter="formatDic" width="150"></win-table-column>
      <win-table-column prop="createTime" label="操作时间" width="200" :formatter="formatDic"></win-table-column>
      <win-table-column label="操作" width="250">
        <template slot-scope="scope">
          <win-button type="text" size="small" icon="el-icon-edit-outline" @click="operation(scope.row,'UPDATE')">修改</win-button>
          <win-button type="text" size="small" style="color:#FF4D4D" icon="el-icon-delete" @click="operation(scope.row,'DELETE')">删除</win-button>
        </template>
      </win-table-column>
    </win-table>
    <!-- 分页组件 -->
    <win-pagination v-bind:childMsg="pageVO" @callFather="pageQuery"></win-pagination>
    <!-- 创建/修改/删除 dialog -->
    <ProdSettlementAccountDialog :fromFatherMsg="cardNumber" @bindSend="toFatherMsg" v-if="dialogVisible">
    </ProdSettlementAccountDialog>
  </div>
</template>
<script lang="ts">
import ProdSettlementAccountController from "../controller/ProdSettlementAccountController";
import Component from "vue-class-component";
export default class ProdSettlementAccount extends ProdSettlementAccountController {}
</script>
<style lang="scss" scoped>
</style>
