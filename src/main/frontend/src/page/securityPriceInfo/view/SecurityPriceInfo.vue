<template>
  <div>

    <div style="margin-left:-30px;margin-top:20px;">

      <win-form :model="form" :inline="true" ref="form">
        <win-form-item label="交易市场">
          <win-select v-model="form.marketCode" filterable clearable multiple placeholder="请选择">
            <win-option v-for="item in priceInfoDicData['marketType']" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
              <span style="float: left">{{ item.dicCode }}</span>
              <span>{{ "&nbsp;"+item.dicExplain }}</span>
            </win-option>
          </win-select>
        </win-form-item>

        <win-form-item label="证券代码">
          <el-autocomplete v-model="form.securityCode" :fetch-suggestions="listAll" placeholder="请输入内容" @select="handleSelect" clearable></el-autocomplete>
        </win-form-item>

        <win-form-item label="资产类别">
          <win-select v-model="form.assetType" filterable clearable multiple placeholder="请选择">
            <win-option v-for="item in priceInfoDicData['assetType']" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
              <span style="float: left">{{ item.dicCode }}</span>
              <span>{{ "&nbsp;"+item.dicExplain }}</span>
            </win-option>
          </win-select>
        </win-form-item>

        <win-form-item label="证券类别">
          <win-select v-model="form.securityType" filterable clearable multiple placeholder="请选择">
            <win-option v-for="item in priceInfoDicData['securityType']" :key="item.securityType" :label="item.securityTypeName" :value="item.securityType">
              <span style="float: left">{{ item.securityType }}</span>
              <span>{{ "&nbsp;"+item.securityTypeName }}</span>
            </win-option>
          </win-select>
        </win-form-item>
        <win-form-item>
          <win-button @click="query" type="primary" icon="el-icon-search">查询</win-button>
          <win-button @click="resetForm">重置</win-button>
        </win-form-item>
      </win-form>
    </div>

    <div class="col-md-12" style="margin-top:20px;">
      <el-button-group>
        <el-button type="info" style="color:#2B3551" icon="el-icon-plus" @click="operation('','ADD')" round>新增</el-button>
        <el-button type="info" style="color:#2B3551" icon="el-icon-delete" :disabled="multipleSelection.length == 0" @click="delBatch" round>删除</el-button>
      </el-button-group>
    </div>

    <div style="margin-top:20px;">
      <win-table ref="multipleTable" :data="pageVO.list" tooltip-effect="dark" @cell-dblclick="dblclick" @select-change="tableSelectionChange" @select-all="tableSelectionChange" indexFixed selectionFixed max-height="440"
        :row-class-name="isRedRow">

        <win-table-column prop="securityCode" label="证券代码" width="100" fixed="left" sortable></win-table-column>
        <win-table-column prop="securityName" label="证券名称" width="160" fixed="left" sortable></win-table-column>
        <win-table-column prop="marketCode" label="交易市场" width="100" fixed="left" :formatter="formatDic" sortable></win-table-column>
        <win-table-column prop="infoDate" label="行情日" width="90" fixed="left" :formatter="DateFormatter" sortable></win-table-column>
        <win-table-column prop="delistStatus" label="停牌标志" width="100" :formatter="formatDic" sortable></win-table-column>
        <win-table-column prop="yesterdayClosePrice" label="昨收盘" width="80"></win-table-column>
        <win-table-column prop="todayOpenPrice" label="今开盘" width="80"></win-table-column>
        <win-table-column prop="highPrice" label="最高价" width="80"></win-table-column>
        <win-table-column prop="lowPrice" label="最低价" width="80"></win-table-column>
        <win-table-column prop="newPrice" label="最新价" width="80"></win-table-column>
        <win-table-column prop="averagePrice" label="平均价" width="80"></win-table-column>
        <win-table-column prop="limitUpPrice" label="涨停价" width="80"></win-table-column>
        <win-table-column prop="limitDownPrice" label="跌停价" width="80"></win-table-column>
        <win-table-column prop="tradeCount" label="成交量" width="80" :formatter="CountFormatter"></win-table-column>
        <win-table-column prop="tradePrice" label="成交额" width="80" :formatter="CountFormatter"></win-table-column>
        <win-table-column prop="fullPriceClosedYesterday" label="全价昨收盘" width="90"></win-table-column>
        <win-table-column prop="accruedInterest" label="应计利息" width="80"></win-table-column>
        <win-table-column fixed="right" label="操作" min-width="160" header-align="center" align="center">
          <template slot-scope="scope">
            <win-button @click="operation(scope.row,'UPDATE')" type="text" size="small" icon="el-icon-edit-outline">修改</win-button>
            <win-button @click="operation(scope.row,'DELETE')" type="text" size="small" icon="el-icon-delete" style="color:#FF4D4D">删除</win-button>
          </template>
        </win-table-column>
      </win-table>

    </div>
    <!--分页组件-->
    <!-- <Pagination v-bind:childMsg="tableData" @callFather="pageQuery"></Pagination> -->
    <win-pagination v-bind:childMsg="pageVO" @callFather="pageQuery"></win-pagination>

    <!-- 创建/修改/删除 begin-->
    <priceInfoDialog :toChildMsg="cardNumber" @bindSend="toFatherMsg" v-if="dialogVisible" @getFormData="formDataSubmit"></priceInfoDialog>
    <!-- 创建/修改/删除 end-->
  </div>
</template>
<script lang="ts">
import PriceInfoController from "../controller/SecurityPriceInfoController";
import Component from "vue-class-component";

@Component
export default class priceInfo extends PriceInfoController {
  //   handleClick: {};
}
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