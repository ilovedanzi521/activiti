<template>
  <div class="BondRate" style="width:100%;">
    <!--债券折算率详情子组件:Begin -->
    <BondRateDialog v-if="isDetailAble" ref="bondRateDetail" @getFormData="formDataSubmit"></BondRateDialog>
    <!--债券折算率详情子组件:End -->
    <!--债券折算率查询表单:Begin -->
    <div class="formInline">
      <win-form v-model="bondInfoForm" :inline="true" class="demo-form-inline">
        <win-row>
          <win-col class="fcol">
            <win-form-item label="证券代码">
              <el-autocomplete v-model="bondInfoForm.securityCode" clearable placeholder="请输入内容" :fetch-suggestions="inCodeSelectFun" @select="handleCodeSelect">
              </el-autocomplete>
            </win-form-item>
          </win-col>
          <win-col class="fcol">
            <win-form-item label="交易市场">
              <win-select v-model="bondInfoForm.marketType" clearable multiple placeholder="请选择">
                <win-option v-for="item in bondDicData.marketType" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
                  <span style="float: left">{{ item.dicCode }}</span>
                  <span>{{ "&nbsp;"+item.dicExplain }}</span>
                </win-option>
              </win-select>
            </win-form-item>
          </win-col>
          <win-col class="fcol">
            <win-form-item label="数据来源">
              <win-select v-model="bondInfoForm.dataSource" clearable multiple placeholder="请选择">
                <win-option v-for="item in bondDicData.dataSource" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
                  <span style="float: left">{{ item.dicCode }}</span>
                  <span>{{ "&nbsp;"+item.dicExplain }}</span>
                </win-option>
              </win-select>
            </win-form-item>
          </win-col>
          <win-col class="fcol">
            <win-form-item label="开始日期">
              <el-date-picker v-model="bondInfoForm.beginDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
            </win-form-item>
          </win-col>
          <win-col :span="3" style="margin-top: 5px;">
            <win-button type="primary" icon="el-icon-search" @click="onFindSubmit">查询</win-button>
            <win-button icon="el-icon-refresh" @click="reset">重置</win-button>
          </win-col>
        </win-row>
        <win-row>
          <win-col class="fcol">
            <win-form-item label="结束日期">
              <el-date-picker v-model="bondInfoForm.endDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
            </win-form-item>
          </win-col>
        </win-row>
      </win-form>
    </div>
    <div class="col-md-12" style="margin-top:5px;">
      <ul class="btn-edit fr">
        <el-button-group>
          <win-button type="info" icon="el-icon-plus" round @click="onAddSubmit">新增</win-button>
          <win-button type="info" icon="el-icon-delete" :disabled="multipleSelection.length == 0" round @click="onBatchDeleteSubmit">删除</win-button>
        </el-button-group>
      </ul>
    </div>
    <!--债券折算率查询表单:End -->
    <!--债券折算率表格数据:Begin -->
    <div class="bondTateTable" style="width:100%;">
      <win-table max-height="440" highlight-current-row @select-change="handleSelectionChange" @select-all="handleSelectAll" @cell-dblclick="handleRowDBClick" :data="pageVO.list">
        <win-table-column sortable prop="securityCode" label="证券代码" align="left" min-width="120"></win-table-column>
        <win-table-column sortable prop="securityName" label="证券名称" align="left" min-width="150"></win-table-column>
        <win-table-column :formatter="bondDicFormatter" sortable prop="marketType" label="交易市场" align="left" min-width="150"></win-table-column>
        <win-table-column :formatter="conversionRateFormatter" prop="conversionRate" label="折算率(%)" align="right" min-width="150"></win-table-column>
        <win-table-column prop="beginDate" label="开始日期" min-width="180" align="center" :formatter="DateFormatter"></win-table-column>
        <win-table-column prop="endDate" label="结束日期" min-width="180" align="center" :formatter="DateFormatter"></win-table-column>
        <win-table-column :formatter="bondDicFormatter" prop="dataSource" label="数据来源" min-width="180" align="center"></win-table-column>
        <win-table-column align="center" label="操作" min-width="200">
          <template slot-scope="scope">
            <win-button @click="onEditClick(scope.row)" size="small" type="text" icon="el-icon-edit-outline">修改</win-button>
            <win-button @click="onDeleteClick(scope.row)" size="small" style="color:#FF4D4D" type="text" icon="el-icon-delete">删除</win-button>
          </template>
        </win-table-column>
      </win-table>
      <!--债券折算率表格分页:Begin -->
      <win-pagination v-bind:childMsg="pageVO" @callFather="pageFindSubmit"></win-pagination>
      <!--债券折算率表格分页:End -->
    </div>
    <!--债券折算率表格数据:End -->
  </div>
</template>
<script lang="ts">
import BondRateController from "../controller/BondRateController";
import Component from "vue-class-component";

@Component
export default class BondRate extends BondRateController {}
</script>
<style lang="scss" scoped>
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
.formInline {
  margin-left: -30px;
  margin-top: 20px;
}
.fcol {
  width: 21%;
}
</style>