<template>
  <div class="BondSerial">
    <!--债券分期还本详情信息子组件:Begin -->
    <BondSerialDialog v-if="isDetailAble" ref="bondSerialDetail" @getFormData="formDataSubmit"></BondSerialDialog>
    <!--债券分期还本详情信息子组件:End -->
    <!--债券分期还本信息查询筛选框:Begin -->
    <div class="formInline">
      <win_form v-model="bondInfoForm" :inline="true" class="demo-form-inline">
        <win_row>
          <win_col class="fcol">
            <win_form_item label="证券代码">
              <el-autocomplete v-model="bondInfoForm.securityCode" clearable placeholder="请输入内容" :fetch-suggestions="inCodeSelectFun" @select="handleCodeSelect">
              </el-autocomplete>
            </win_form_item>
          </win_col>
          <win_col class="fcol">
            <win_form_item label="交易市场">
              <win_select v-model="bondInfoForm.marketType" clearable multiple placeholder="请选择">
                <win_option v-for="item in bondSerialDicEntity.marketType" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
                  <span style="float: left">{{ item.dicCode }}</span>
                  <span>{{ "&nbsp;"+item.dicExplain }}</span>
                </win_option>
              </win_select>
            </win_form_item>
          </win_col>
          <win_col :span="4" style="margin-top:5px;">
            <win_button type="primary" icon="el-icon-search" @click="onFindSubmit">查询</win_button>
            <win_button icon="el-icon-refresh" @click="reset">重置</win_button>
          </win_col>
        </win_row>
      </win_form>
    </div>
    <div class="col-md-12" style="margin-top:5px;">
      <ul class="btn-edit fr">
        <el-button-group>
          <win_button type="info" icon="el-icon-plus" round @click="onAddSubmit">新增</win_button>
          <win_button type="info" icon="el-icon-delete" :disabled="multipleSelection.length == 0" round @click="onBatchDeleteSubmit">删除</win_button>
        </el-button-group>
      </ul>
    </div>
    <!--债券分期还本信息查询筛选框:End -->
    <!--债券分期还本信息表格数据:Begin -->
    <div class="bondTateTable" style="width:100%; ">
      <win_table max-height="440" highlight-current-row @select-change="handleSelectionChange" @select-all="handleSelectAll" @cell-dblclick="handleRowDBClick" :data="pageVO.list">
        <win_table_column sortable prop="securityCode" label="证券代码" align="left" min-width="120"></win_table_column>
        <win_table_column sortable prop="securityName" label="证券名称" align="left" min-width="280"></win_table_column>
        <win_table_column :formatter="marketTypeFormatter" sortable prop="marketType" label="交易市场" align="left" min-width="280"></win_table_column>
        <win_table_column :formatter="amortizeTypeFormatter" prop="amortizeType" label="分期偿还类型" align="left" min-width="200"></win_table_column>
        <win_table_column prop="repayDate" label="偿还日期" align="center" min-width="200" :formatter="DateFormatter"></win_table_column>
        <win_table_column :formatter="repayRateFormatter" prop="repayRate" label="偿还比例(%)" align="right" min-width="180"></win_table_column>
        <win_table_column align="center" label="操作" min-width="200">
          <template slot-scope="scope">
            <win_button @click="onEditClick(scope.row)" size="small" type="text" icon="el-icon-edit-outline">修改</win_button>
            <win_button @click="onDeleteClick(scope.row)" size="small" style="color:#FF4D4D" type="text" icon="el-icon-delete">删除</win_button>
          </template>
        </win_table_column>
      </win_table>
      <win_pagination v-bind:childMsg="pageVO" @callFather="pageFindSubmit"></win_pagination>
    </div>
    <!--债券分期还本信息表格数据:End -->
  </div>
</template>
<script lang="ts">
import BondSerialController from "../controller/BondSerialController";
import Component from "vue-class-component";

@Component
export default class BondSerial extends BondSerialController {}
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