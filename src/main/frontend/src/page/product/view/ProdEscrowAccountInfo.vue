<template>
  <div>
    <div class="col-md-12" style="margin-top:5px;">
      <el-button-group>
        <el-button type="info" style="color:#2B3551" icon="el-icon-plus" @click="operation('','ADD')" round>新增</el-button>
      </el-button-group>
    </div>
    <!-- 托管账户列表Table begin-->
    <div style="margin-top:5px;">
      <win_table :data="pageVO.list" :showSelection="false" :fit="false" @cell-dblclick="dblclick" max-height="100px" highlight-current-row v-loading="loading" element-loading-text="拼命加载中...">
        <win_table_column prop="assetUnitName" label="所属资产单元" width="150"></win_table_column>
        <win_table_column prop="accountCode" label="银行账号" width="150"></win_table_column>
        <win_table_column prop="accountName" label="账户名称" width="150"></win_table_column>
        <win_table_column prop="openBank" label="开户行" width="150"></win_table_column>
        <win_table_column prop="accountType" label="账户类型" width="150" :formatter="formatDic"></win_table_column>
        <win_table_column prop="paymentSystemNumber" label="支付系统行号" width="100"></win_table_column>
        <win_table_column prop="currencyCode" label="账户币种" width="100" :formatter="formatDic"></win_table_column>
        <win_table_column prop="openDate" label="开户日期" width="120"></win_table_column>
        <win_table_column prop="createUserId" label="操作人" :formatter="formatDic" width="100"></win_table_column>
        <win_table_column prop="createTime" label="操作时间" width="150" :formatter="formatDic"></win_table_column>
        <win_table_column width="200" label="操作">
          <template slot-scope="scope">
            <win_button type="text" size="small" icon="el-icon-edit-outline" @click="operation(scope.row,'UPDATE')">修改</win_button>
            <win_button type="text" size="small" style="color:#FF4D4D" icon="el-icon-delete" @click="operation(scope.row,'DELETE')">删除</win_button>
          </template>
        </win_table_column>
      </win_table>
    </div>
    <!-- 托管账户列表Table end-->
    <!--分页组件-->
    <win_pagination v-bind:childMsg="pageVO" @callFather="pageQuery"></win_pagination>
    <!-- 创建/修改/删除 -->
    <ProdEscrowAccountInfoDialog :toChildMsg="cardNumber" @bindSend="toFatherMsg" v-if="dialogVisible">
    </ProdEscrowAccountInfoDialog>
  </div>
</template>
<script lang="ts">
import ProdEscrowAccountInfoController from "../controller/ProdEscrowAccountInfoController";
export default class ProdEscrowAccountInfo extends ProdEscrowAccountInfoController {}
</script>
<style lang="css" scoped>
.el-form--inline .el-form-item__label {
  width: 96px !important;
}
.el-form--inline .el-form-item {
  margin-right: 2px;
}
.el-row {
  margin-top: 10px;
  margin-bottom: 10px;
}
.el-button--warning {
  background-color: #ff900d;
}
.el-pagination {
  padding-right: 10px;
  text-align: right;
  box-sizing: border-box;
}
</style>

