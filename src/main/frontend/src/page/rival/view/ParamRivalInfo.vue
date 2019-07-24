<template>
  <div class="container">
    <!--产品详情查询表单:Begin -->
    <div class="formInline" style="width:100%;height:38px;">
      <win_form v-model="reqVO" :inline="true">
        <win_row>
          <win_col :span="3">
            <el-button-group>
              <win_button type="info" style="color:#2B3551" icon="el-icon-plus" @click="operation('','ADD')" round>新增</win_button>
              <win_button type="info" style="color:#2B3551" icon="el-icon-delete" :disabled="multipleSelection.length == 0" @click="delBatch" round>删除</win_button>
            </el-button-group>
          </win_col>
          <win_col :span="5" class="left">
            <win_form_item label="对手方序号">
              <el-autocomplete v-model="reqVO.rivalNo" :fetch-suggestions="rivalNoSelect" clearable placeholder="请输入内容">
              </el-autocomplete>
            </win_form_item>
          </win_col>
          <win_col :span="5">
            <win_form_item label="对手方名称">
              <el-autocomplete v-model="reqVO.rivalName" :fetch-suggestions="rivalNameSelect" clearable placeholder="请输入内容">
              </el-autocomplete>
            </win_form_item>
          </win_col>
          <win_col :span="5">
            <win_form_item label="优质对手方">
              <win_select v-model="reqVO.golden" clearable placeholder="请选择">
                <win_option v-for="item in rivalInfoDicData.goldenDic" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
                  <span style="float: left">{{ item.dicCode }}</span>
                  <span>{{ "&nbsp;"+item.dicExplain }}</span>
                </win_option>
              </win_select>
            </win_form_item>
          </win_col>
          <win_col :span="3">
            <win_button type="primary" icon="el-icon-search" @click="query">查询</win_button>
            <win_button icon="el-icon-refresh" @click="reset">重置</win_button>
          </win_col>
        </win_row>
      </win_form>
    </div>
    <!--产品查询表单:End -->
    <!--产品表格数据:Begin -->
    <div class="rivalDataTable">
      <win_table :height="tableHeight" :data="pageVO.list" ref="rivalInfoTable" @cell-dblclick="dblclick" @select-change="tableSelectionChange" @select-all="tableSelectionChange" @cell-click="handleCurrentChange">
        <win_table_column prop="rivalNo" label="对手方序号" width="150"></win_table_column>
        <win_table_column prop="rivalName" label="对手方名称" width="150"></win_table_column>
        <win_table_column prop="rivalShortName" label="对手方简称" width="150"></win_table_column>
        <win_table_column prop="appraise" label="对手方评级" width="150" :formatter="formatDic"></win_table_column>
        <win_table_column prop="golden" label="优质对手方" width="150" :formatter="formatDic"></win_table_column>
        <win_table_column prop="firstSettleType" label="首期结算方式" width="150" :formatter="formatDic"></win_table_column>
        <win_table_column prop="secondSettleType" label="到期结算方式" width="150" :formatter="formatDic"></win_table_column>
        <win_table_column prop="remark" label="备注" width="150"></win_table_column>
        <win_table_column prop="createUserId" label="操作人" :formatter="formatDic" width="150"></win_table_column>
        <win_table_column prop="createTime" label="操作时间" width="200" :formatter="formatDic"></win_table_column>
        <win_table_column label="操作" width="180">
          <template slot-scope="scope">
            <win_button type="text" size="small" icon="el-icon-edit-outline" @click="operation(scope.row,'UPDATE')">修改</win_button>
            <win_button type="text" size="small" style="color:#FF4D4D" icon="el-icon-delete" @click="operation(scope.row,'DELETE')">删除</win_button>
          </template>
        </win_table_column>
      </win_table>
      <!-- 分页组件 -->
      <win_pagination v-bind:child-msg="pageVO" @callFather="pageQuery"></win_pagination>
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
</style>
