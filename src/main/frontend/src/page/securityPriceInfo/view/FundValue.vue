<template>
  <div class="fundValue">
    <div style="margin-left:-30px;margin-top:20px;">
      <win-form :model="form" :inline="true" ref="form">
        <win-form-item label="证券代码">
          <el-autocomplete v-model="form.securityCode" :fetch-suggestions="listAll" placeholder="请输入内容" @select="handleSelect" clearable></el-autocomplete>
        </win-form-item>
        <win-form-item label="交易市场">
          <win-select v-model="form.marketCode" clearable multiple placeholder="请选择">
            <win-option v-for="item in fundValueDicData['marketType']" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
              <span style="float: left">{{ item.dicCode }}</span>
              <span>{{ "&nbsp;"+item.dicExplain }}</span>
            </win-option>
          </win-select>
        </win-form-item>
        <win-form-item>
          <win-button type="warning" @click="query" icon="el-icon-search">查询</win-button>
          <win-button @click="resetForm" icon="el-icon-refresh">重置</win-button>
        </win-form-item>
      </win-form>
    </div>
    <div style="margin-top:20px;">
      <el-button-group>
        <win-button type="info" style="color:#2B3551" icon="el-icon-plus" @click="operation('','ADD')" round>新增</win-button>
        <win-button type="info" style="color:#2B3551" icon="el-icon-delete" :disabled="multipleSelection.length == 0" @click="delBatch" round>删除</win-button>
      </el-button-group>
    </div>
    <div style="margin-top:20px;">
      <win-table ref="multipleTable" highlight-current-row :data="pageVO.list" tooltip-effect="dark" @cell-dblclick="dblclick" style="width: 100%" @select-change="tableSelectionChange" @select-all="tableSelectionChange" max-height="440">
        <win-table-column prop="securityCode" label="证券代码" width="160" sortable></win-table-column>
        <win-table-column prop="securityName" label="证券名称" width="180" sortable></win-table-column>
        <win-table-column prop="marketCode" label="交易市场" width="140" :formatter="formatDic" sortable></win-table-column>
        <win-table-column prop="priceDate" label="净值日" width="160" :formatter="DateFormatter" sortable></win-table-column>
        <win-table-column prop="cleanPrice" label="净资产值" width="160"></win-table-column>
        <win-table-column prop="unitCleanPrice" label="单位净值" width="160"></win-table-column>
        <win-table-column prop="unitSumPrice" label="单位累计净值" width="160"></win-table-column>
        <win-table-column prop="intradayEarn" label="每万份基金单位当日收益（元）" width="200"></win-table-column>
        <win-table-column prop="sevenDayEarn" label="最近7日折算年收益率（%）" :formatter="couponRateFormatter" width="180"></win-table-column>
        <win-table-column fixed="right" label="操作" min-width="180" header-align="center" align="center">
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
    <fundValueDialog :toChildMsg="cardNumber" @bindSend="toFatherMsg" v-if="dialogVisible"></fundValueDialog>
    <!-- 创建/修改/删除 end-->
  </div>
</template>
<script lang="ts">
import FundValueController from "../controller/FundValueController";
import Component from "vue-class-component";

@Component
export default class fundValue extends FundValueController {}
</script>
<style lang="scss" scoped>
.el-button--warning {
  background-color: #ff900d;
}
span {
  display: inline-block;
  width: 80px;
  text-align: left;
  vertical-align: middle;
  color: #fff;
}
.el-pagination {
  width: 100%;
  padding-right: 10px;
  text-align: right;
  box-sizing: border-box;
}
</style>