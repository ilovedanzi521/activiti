<template>
  <div>
    <div style="margin-left:-30px;margin-top:5px;">
      <!-- <win-form :model="form" :inline="true" ref="form">
        <win-form-item label="证券代码">
          <el-autocomplete v-model="form.securityCode" :fetch-suggestions="listAll" placeholder="请输入内容" @select="handleSelect" clearable></el-autocomplete>
        </win-form-item>
        <win-form-item label="资产类别">
          <win-select v-model="form.assetType" filterable placeholder="请选择" clearable>
            <win-option v-for="item in assetTypes" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode"></win-option>
          </win-select>
        </win-form-item>
        <win-form-item label="证券类别">
          <win-select v-model="form.securityType" filterable clearable placeholder="请选择">
            <win-option v-for="item in securityTypeRepVOs" :key="item.securityType" :label="item.securityTypeName" :value="item.securityType">
            </win-option>
          </win-select>
        </win-form-item>

        <win-button @click="query" type="warning" icon="el-icon-search">查询</win-button>
        <win-button @click="resetForm">重置</win-button>
        <span></span>
      </win-form> -->
    </div>
    <div class="col-md-12">

      <el-button-group>
        <el-button type="info" style="color:#2B3551" icon="el-icon-plus" @click="operation('','ADD')" round>新增</el-button>
      </el-button-group>

    </div>
    <div style="margin-top:5px;">
      <win-table ref="multipleTable" :showSelection="false" highlight-current-row :data="pageVO.list" tooltip-effect="dark" @cell-dblclick="dblclick" @selection-change="tableSelectionChange" max-height="160">
        <win-table-column prop="code" label="股东账号" width="140" sortable></win-table-column>
        <win-table-column prop="name" label="股东名称" width="180" sortable></win-table-column>
        <win-table-column prop="marketNo" label="交易市场" width="140" :formatter="formatDic" sortable></win-table-column>
        <win-table-column prop="seat" label="指定席位" width="140" sortable></win-table-column>
        <win-table-column prop="registration" label="登记公司" width="160" :formatter="formatDic" sortable></win-table-column>
        <win-table-column prop="ownerType" label="股东属性" width="140" :formatter="formatDic" sortable></win-table-column>
        <win-table-column prop="registerStatus" label="账户状态" width="140" :formatter="formatDic" sortable></win-table-column>
        <win-table-column prop="createUserId" label="操作人" width="140" :formatter="formatDic" sortable></win-table-column>
        <win-table-column prop="createTime" label="操作时间" width="180" :formatter="formatDic" sortable></win-table-column>
        <win-table-column label="操作" header-align="center" align="center" width="220">
          <template slot-scope="scope">
            <win-button @click="operation(scope.row,'UPDATE')" type="text" size="small" icon="el-icon-edit-outline">修改</win-button>
            <win-button @click="operation(scope.row,'DELETE')" type="text" size="small" icon="el-icon-delete" style="color:#FF4D4D">删除</win-button>
          </template>
        </win-table-column>
      </win-table>
    </div>
    <!--分页组件-->

    <win-pagination v-bind:childMsg="pageVO" @callFather="pageQuery"></win-pagination>

    <!-- 创建/修改/删除 begin-->
    <ProdStockholderDialog :toChildMsg="cardNumber" @bindSend="toFatherMsg" v-if="dialogVisible" @getFormData="formDataSubmit"></ProdStockholderDialog>
    <!-- 创建/修改/删除 end-->
  </div>
</template>
<script lang="ts">
import ProdStockholderController from "../controller/ProdStockholderController";
import Component from "vue-class-component";

@Component
export default class ProdStockholder extends ProdStockholderController {}
</script>
<style lang="scss" scoped>
span {
  display: inline-block;
  width: 80px;
  text-align: left;
  vertical-align: middle;
  color: #fff;
}
.el-button--warning {
  background-color: #ff900d;
}
.el-pagination {
  width: 100%;
  padding-right: 10px;
  text-align: right;
  box-sizing: border-box;
}
</style>