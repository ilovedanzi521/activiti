<template>
  <div style="margin-left:10px;">
    <!-- 投资基金查询表单 begin-->
    <div class="formInline">
      <win_form :inline="true" :model="formInline" class="demo-form-inline">
        <win_row>
          <win_col class="fcol">
            <win_form_item label="证券代码">
              <el-autocomplete v-model="formInline.securityCode" :fetch-suggestions="listAll" placeholder="请输入内容" @select="handleSelect" clearable></el-autocomplete>
            </win_form_item>
          </win_col>
          <win_col class="fcol">
            <win_form_item label="交易市场">
              <win_select v-model="formInline.marketCode" filterable multiple placeholder="请选择" clearable>
                <win_option v-for="item in fundDicVO.marketTypes" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
                  <span style="float: left">{{ item.dicCode }}</span>
                  <span>{{ "&nbsp;"+item.dicExplain }}</span>
                </win_option>
              </win_select>
            </win_form_item>
          </win_col>
          <win_col class="fcol">
            <win_form_item label="基金类型">
              <win_select v-model="formInline.fundTypeList" filterable multiple placeholder="请选择" clearable>
                <win_option v-for="item in fundDicVO.fundTypes" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode"></win_option>
              </win_select>
            </win_form_item>
          </win_col>
          <win_col class="fcol">
            <win_form_item label="投资分类">
              <win_select v-model="formInline.investmentClassificationList" multiple filterable placeholder="请选择" clearable>
                <win_option v-for="item in fundDicVO.investmentClassifications" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode"></win_option>
              </win_select>
            </win_form_item>
          </win_col>

          <win_col class="bcol" style="margin-left:10px;">
            <win_form_item>
              <win_button type="primary" @click="query" icon="el-icon-search">查询</win_button>
              <win_button @click="reset" icon="el-icon-refresh">重置</win_button>
            </win_form_item>
          </win_col>
        </win_row>
        <div v-if="isShow">
          <win_row>
            <win_col class="fcol">
              <win_form_item label="收费方式">
                <win_select v-model="formInline.chargingMethod" filterable placeholder="请选择" clearable>
                  <win_option v-for="item in fundDicVO.chargingMethods" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode"></win_option>
                </win_select>
              </win_form_item>
            </win_col>
            <win_col :span="6">
              <win_form_item label="申赎状态">
                <win_select v-model="formInline.foreclosureStatusList" filterable multiple placeholder="请选择" clearable>
                  <win_option v-for="item in fundDicVO.foreclosureStatuss" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode"></win_option>
                </win_select>
              </win_form_item>
            </win_col>
          </win_row>
        </div>
      </win_form>
    </div>
    <!-- 投资基金查询表单 end-->
    <div class="col-md-12" style="margin-top:20px;">
      <div style="float:left">
        <ul class="btn-edit fr">
          <li>
            <el-button-group>
              <el-button type="info" style="color:#2B3551" icon="el-icon-plus" @click="operation('','ADD')" round>新增</el-button>
              <el-button type="info" style="color:#2B3551" icon="el-icon-delete" :disabled="multipleSelection.length == 0" @click="delBatch" round>删除</el-button>
            </el-button-group>
          </li>
        </ul>
      </div>
      <div style="margin-left:1200px;">
        <el-button type="text" style="color:#FF900D" :icon="isShowClass" @click="showMore" round>{{showMoreText}}</el-button>
      </div>
    </div>
    <!-- 投资基金列表Table begin-->
    <div>
      <win_table :data="fundInfo.list" :fit="false" @cell-dblclick="dblclick" max-height="442px" highlight-current-row v-loading="loading" element-loading-text="拼命加载中..." @select-change="tableSelectionChange"
        @select-all="tableSelectionChange">
        <win_table_column prop="securityCode" label="证券代码" width="150"></win_table_column>
        <win_table_column prop="securityName" label="证券名称" width="200"></win_table_column>
        <win_table_column prop="marketCode" label="交易市场" width="200" :formatter="formatDic"></win_table_column>
        <win_table_column prop="fundType" label="基金类型" width="200" :formatter="formatDic"></win_table_column>
        <win_table_column prop="investmentClassification" label="投资分类" width="200" :formatter="formatDic"></win_table_column>
        <win_table_column prop="establishmentDate" label="成立日期" width="150"></win_table_column>
        <win_table_column prop="chargingMethod" label="收费方式" width="200" :formatter="formatDic"></win_table_column>
        <win_table_column prop="foreclosureStatus" label="申赎状态" width="150" :formatter="formatDic"></win_table_column>
        <win_table_column width="200" label="操作">
          <template slot-scope="scope">
            <win_button type="text" size="small" icon="el-icon-edit-outline" @click="operation(scope.row,'UPDATE')">修改</win_button>
            <win_button type="text" size="small" style="color:#FF4D4D" icon="el-icon-delete" @click="operation(scope.row,'DELETE')">删除</win_button>
          </template>
        </win_table_column>
      </win_table>
    </div>
    <!-- 投资基金列表Table end-->
    <!--分页组件-->
    <win_pagination v-bind:childMsg="fundInfo" @callFather="pageQuery"></win_pagination>
    <!-- 创建/修改/删除 -->
    <FundDialog :toChildMsg="cardNumber" @bindSend="toFatherMsg" v-if="dialogVisible"></FundDialog>
  </div>
</template>
<script lang="ts">
import ParamFundController from "../controller/ParamFundController";
export default class ParamFund extends ParamFundController {}
</script>
<style lang="css" scoped>
.el-form--inline .el-form-item__label {
  width: 96px !important;
}
.el-form--inline .el-form-item {
  margin-right: 2px;
}

.formInline {
  margin-left: -30px;
  margin-top: 20px;
}
.fcol {
  width: 21%;
}
.bcol {
  width: 15%;
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

