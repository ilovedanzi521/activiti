<template>
  <div>
    <div class="formInline">
      <win_form :inline="true" :model="formInline" class="demo-form-inline">
        <win_row>
          <win_col class="fcol">
            <win_form_item label="证券代码">
              <el-autocomplete v-model="formInline.securityCode" :fetch-suggestions="listAll" clearable placeholder="请输入内容" @select="handleSelect"></el-autocomplete>
            </win_form_item>
          </win_col>
          <win_col class="fcol">
            <win_form_item label="交易市场">
              <win_select v-model="formInline.marketCode" filterable clearable multiple placeholder="请选择">
                <win_option v-for="item in securityBasicInfoDicData['marketCode']" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
                  <span style="float: left">{{ item.dicCode }}</span>
                  <span>{{ "&nbsp;"+item.dicExplain }}</span>
                </win_option>
              </win_select>
            </win_form_item>
          </win_col>
          <win_col class="fcol">
            <win_form_item label="证券类别">
              <win_select v-model="formInline.securityType" filterable clearable multiple placeholder="请选择">
                <win_option v-for="item in securityBasicInfoDicData['securityType']" :key="item.securityType" :label="item.securityTypeName" :value="item.securityType">
                  <span style="float: left">{{ item.securityType }}</span>
                  <span>{{ "&nbsp;"+item.securityTypeName }}</span>
                </win_option>
              </win_select>
            </win_form_item>
          </win_col>
          <win_col class="fcol">
            <win_form_item label="资产类别">
              <win_select v-model="formInline.assetType" filterable clearable multiple placeholder="请选择">
                <win_option v-for="item in securityBasicInfoDicData['assetType']" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
                  <span style="float: left">{{ item.dicCode }}</span>
                  <span>{{ "&nbsp;"+item.dicExplain }}</span>
                </win_option>
              </win_select>
            </win_form_item>
          </win_col>

          <win_col class="bcol">
            <win_form_item>
              <win_button style=" background: #ff900d; width: 90px;" type="primary" icon="el-icon-search" @click="list">查询</win_button>
              <win_button @click="reset" style="width: 90px;" icon="el-icon-refresh">重置</win_button>
            </win_form_item>
          </win_col>
        </win_row>
        <win_row>
          <win_col class="fcol">
            <win_form_item label="杂项分类">
              <win_select v-model="formInline.otherClassification" filterable clearable multiple placeholder="请选择">
                <win_option v-for="item in securityBasicInfoDicData['otherClassification']" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
                  <span style="float: left">{{ item.dicCode }}</span>
                  <span>{{ "&nbsp;"+item.dicExplain }}</span>
                </win_option>
              </win_select>
            </win_form_item>
          </win_col>
        </win_row>
      </win_form>
    </div>
    <div class="col-md-12">
      <ul class="btn-edit fr">
        <li>
          <el-button-group>
            <win_button type="info" icon="el-icon-plus" @click="operation('','ADD')" round>新增</win_button>
            <win_button v-popover:popover1 type="info" icon="el-icon-delete" round :disabled="selected.length == 0" @click="delBatch">删除</win_button>
          </el-button-group>
        </li>
      </ul>
    </div>
    <div>
      <win_table ref="table" :data="securityBasicInfo.list" @cell-dblclick="view" @select-all="handleSelectAll" @select-change="handleSelectChange" v-loading="loading" element-loading-text="拼命加载中..." indexFixed selectionFixed
        :row-class-name="isRedRow" max-height="440px">
        <win_table_column prop="securityCode" label="证券代码" header-align="center" align="left" sortable fixed="left" min-width="110"></win_table_column>
        <win_table_column prop="securityName" label="证券名称" header-align="center" align="left" sortable fixed="left" min-width="150"></win_table_column>
        <win_table_column prop="securityType" label="证券类别" header-align="center" align="left" sortable fixed="left" :formatter="formatExternalTable" min-width="150"></win_table_column>
        <win_table_column prop="marketCode" label="交易市场" header-align="center" align="left" min-width="100" :formatter="formatDic"></win_table_column>
        <win_table_column prop="reportCode" label="申报代码" header-align="center" align="left" min-width="100"></win_table_column>
        <win_table_column prop="assetSecurity" label="资产证券" header-align="center" align="left" min-width="100"></win_table_column>
        <win_table_column prop="relatedSecurity" label="关联证券" header-align="center" align="left" min-width="100"></win_table_column>
        <win_table_column prop="productCode" label="产品代码" header-align="center" align="left" min-width="100"></win_table_column>
        <win_table_column prop="issueType" label="发行方式" header-align="center" align="left" min-width="100" :formatter="formatDic"></win_table_column>
        <win_table_column prop="issuer" label="发行人" header-align="center" align="left" min-width="100" :formatter="formatExternalTable"></win_table_column>
        <win_table_column prop="issueDate" label="发行日期" header-align="center" align="center" sortable :formatter="DateFormatter" min-width="110"></win_table_column>
        <win_table_column prop="listDate" label="上市日期" header-align="center" align="center" sortable :formatter="DateFormatter" min-width="110"></win_table_column>
        <win_table_column prop="sharesOutstanding" label="总股本" :formatter="CurrencyFormatter" header-align="center" align="right" sortable min-width="150"></win_table_column>
        <win_table_column prop="negotiableCapital" label="流通股本" :formatter="CurrencyFormatter" header-align="center" align="right" sortable min-width="150"></win_table_column>
        <win_table_column prop="totalIssueAmount" label="发行总金额" :formatter="CurrencyFormatter" header-align="center" align="right" sortable min-width="150"></win_table_column>
        <win_table_column prop="faceValue" label="面值" sortable :formatter="CurrencyFormatter" header-align="center" align="right" min-width="100"></win_table_column>
        <win_table_column label="操作" min-width="160" header-align="center" align="center" fixed="right">
          <template slot-scope="scope">
            <win_button type="text" size="small" icon="el-icon-edit-outline" @click="operation(scope.row,'UPDATE')">修改</win_button>
            <win_button type="text" size="small" icon="el-icon-delete" style="color:#FF4D4D" @click="operation(scope.row,'DELETE')">删除</win_button>
          </template>
        </win_table_column>
      </win_table>
    </div>
    <!--分页组件-->
    <win_pagination v-bind:childMsg="securityBasicInfo" @callFather="pageQuery"></win_pagination>
    <!-- 创建/修改/删除 begin-->
    <SecurityBasicInfoDialog :toChildMsg="cardNumber" @bindSend="toFatherMsg" v-if="dialogVisible"></SecurityBasicInfoDialog>
    <!-- 创建/修改/删除 end-->
  </div>
</template>
<script lang="ts">
import SecurityBasicInfoController from "../controller/SecurityBasicInfoController";
import Component from "vue-class-component";

export default class SecurityBasicInfo extends SecurityBasicInfoController {}
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
.bcol {
  width: 15%;
}
.el-pagination {
  padding-right: 10px;
  text-align: right;
  box-sizing: border-box;
}
</style>