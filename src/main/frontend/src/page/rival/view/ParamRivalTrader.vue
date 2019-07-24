<template>
  <div>
    <div class="col-md-12" style="margin-top:5px;">
      <el-button-group>
        <win_button type="info" style="color:#2B3551" icon="el-icon-plus" @click="operation('','ADD')" round>新增</win_button>
        <win_button type="info" style="color:#2B3551" icon="el-icon-delete" :disabled="multipleSelection.length == 0" @click="delBatch" round>删除</win_button>
      </el-button-group>
    </div>
    <win_table :data="pageVO.list" @cell-dblclick="dblclick" @select-change="tableSelectionChange" @select-all="tableSelectionChange" max-height="150px">
      <win_table_column prop="traderName" label="交易员" min-width="170"></win_table_column>
      <win_table_column prop="phone" label="联系方式" min-width="200"></win_table_column>
      <win_table_column prop="qq" label="QQ" min-width="200"></win_table_column>
      <win_table_column prop="email" label="邮箱" min-width="200"></win_table_column>
      <win_table_column prop="remark" label="备注" min-width="250"></win_table_column>
      <win_table_column prop="stop" label="停用标志" min-width="150" :formatter="formatDic"></win_table_column>
      <win_table_column prop="createUserId" label="操作人" :formatter="formatDic" min-width="150"></win_table_column>
      <win_table_column prop="createTime" label="操作时间" min-width="200" :formatter="formatDic"></win_table_column>
      <win_table_column label="操作" min-width="200">
        <template slot-scope="scope">
          <win_button type="text" size="small" icon="el-icon-edit-outline" @click="operation(scope.row,'UPDATE')">修改</win_button>
          <win_button type="text" size="small" style="color:#FF4D4D" icon="el-icon-delete" @click="operation(scope.row,'DELETE')">删除</win_button>
        </template>
      </win_table_column>
    </win_table>
    <!-- 分页组件 -->
    <win_pagination v-bind:child-msg="pageVO" @callFather="pageQuery"></win_pagination>
    <!-- 创建/修改/删除 dialog -->
    <ParamRivalTraderDialog :fromFatherMsg="cardNumber" @bindSend="toFatherMsg" v-if="dialogVisible">
    </ParamRivalTraderDialog>
  </div>
</template>
<script lang="ts">
import ParamRivalTraderController from "../controller/ParamRivalTraderController";
import Component from "vue-class-component";
export default class ParamRivalTrader extends ParamRivalTraderController {}
</script>
<style lang="scss" scoped>
</style>
