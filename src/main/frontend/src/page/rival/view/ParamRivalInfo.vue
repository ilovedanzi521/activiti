<template>
  <div class="container">
    <!--产品详情查询表单:Begin -->
    <div class="formInline" style="width:100%;height:50px;margin-top:5px;">
      <win-form v-model="reqVO" :inline="true">
        <win-row>
          <win-col :span="3">
            <el-button-group>
              <win-button type="info" style="color:#2B3551" icon="el-icon-plus" @click="operation('','ADD')" round>新增</win-button>
              <win-button type="info" style="color:#2B3551" icon="el-icon-delete" :disabled="multipleSelection.length == 0" @click="delBatch" round>删除</win-button>
            </el-button-group>
          </win-col>
          <win-col :span="5" class="left">
            <win-form-item label="对手方序号">
              <el-autocomplete v-model="reqVO.rivalNo" :fetch-suggestions="rivalNoSelect" clearable placeholder="请输入内容">
              </el-autocomplete>
            </win-form-item>
          </win-col>
          <win-col :span="5">
            <win-form-item label="对手方名称">
              <el-autocomplete v-model="reqVO.rivalName" :fetch-suggestions="rivalNameSelect" clearable placeholder="请输入内容">
              </el-autocomplete>
            </win-form-item>
          </win-col>
          <win-col :span="5">
            <win-form-item label="优质对手方">
              <win-select v-model="reqVO.golden" clearable placeholder="请选择">
                <win-option v-for="item in rivalInfoDicData.goldenDic" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
                  <span style="float: left">{{ item.dicCode }}</span>
                  <span>{{ "&nbsp;"+item.dicExplain }}</span>
                </win-option>
              </win-select>
            </win-form-item>
          </win-col>
          <win-col :span="3">
            <win-button type="primary" icon="el-icon-search" @click="query">查询</win-button>
            <win-button icon="el-icon-refresh" @click="reset">重置</win-button>
          </win-col>
        </win-row>
      </win-form>
    </div>
    <!--产品查询表单:End -->
    <!--产品表格数据:Begin -->
    <div class="rivalDataTable">
      <win-table :height="tableHeight" :data="pageVO.list" ref="rivalInfoTable" @cell-dblclick="dblclick" @select-change="tableSelectionChange" @select-all="tableSelectionChange" @cell-click="handleCurrentChange">
        <win-table-column prop="rivalNo" label="对手方序号" width="150"></win-table-column>
        <win-table-column prop="rivalName" label="对手方名称" width="200"></win-table-column>
        <win-table-column prop="rivalShortName" label="对手方简称" width="150"></win-table-column>
        <win-table-column prop="appraise" label="对手方评级" width="100" :formatter="formatDic"></win-table-column>
        <win-table-column prop="golden" label="优质对手方" width="100" :formatter="formatDic"></win-table-column>
        <win-table-column prop="firstSettleType" label="首期结算方式" width="100" :formatter="formatDic"></win-table-column>
        <win-table-column prop="secondSettleType" label="到期结算方式" width="100" :formatter="formatDic"></win-table-column>
        <win-table-column prop="remark" label="备注" width="200"></win-table-column>
        <win-table-column prop="createUserId" label="操作人" :formatter="formatDic" width="150"></win-table-column>
        <win-table-column prop="createTime" label="操作时间" width="180" :formatter="formatDic"></win-table-column>
        <win-table-column label="操作" width="200">
          <template slot-scope="scope">
            <win-button type="text" size="small" icon="el-icon-edit-outline" @click="operation(scope.row,'UPDATE')">修改</win-button>
            <win-button type="text" size="small" style="color:#FF4D4D" icon="el-icon-delete" @click="operation(scope.row,'DELETE')">删除</win-button>
          </template>
        </win-table-column>
      </win-table>
      <!-- 分页组件 -->
      <win-pagination v-bind:child-msg="pageVO" @callFather="pageQuery"></win-pagination>
      <!-- 创建/修改/删除 dialog -->
      <ParamRivalInfoDialog :fromFatherMsg="cardNumber" @bindSend="toFatherMsg" v-if="dialogVisible">
      </ParamRivalInfoDialog>
    </div>
  </div>
</template>
<script lang="ts">
import ParamRivalInfoController from "../controller/ParamRivalInfoController";
import Component from "vue-class-component";
export default class ParamRivalInfo extends ParamRivalInfoController {}
</script>
<style lang="scss" scoped>
.left {
  margin-left: 160px;
}
.rivalDataTable {
  margin-right: 10px;
}
</style>
