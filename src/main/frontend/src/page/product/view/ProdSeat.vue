<template>
  <div>
    <div style="margin-left:-30px;margin-top:5px;">
    </div>
    <div class="col-md-12">

      <el-button-group>
        <el-button type="info" style="color:#2B3551" icon="el-icon-plus" @click="operation('','ADD')" round>新增</el-button>
      </el-button-group>

    </div>
    <div style="margin-top:5px;">
      <win_table ref="multipleTable" :showSelection="false" highlight-current-row :data="pageVO.list" tooltip-effect="dark" @cell-dblclick="dblclick" @selection-change="tableSelectionChange" max-height="180">
        <!-- <win_table :data="prodAssetUnit.list" :showSelection="false" max-height="159px" highlight-current-row v-loading="loading" @row-dblclick="view" element-loading-text="拼命加载中..." @selection-change="tableSelectionChange"> -->

        <win_table_column prop="code" label="席位代码" width="140" sortable></win_table_column>
        <win_table_column prop="name" label="席位名称" width="180" sortable></win_table_column>
        <win_table_column prop="marketNo" label="交易市场" width="180" :formatter="formatDic" sortable></win_table_column>
        <win_table_column prop="brokerCode" label="所属券商" width="180" sortable></win_table_column>
        <win_table_column prop="mainCode" label="主席位" width="160" sortable></win_table_column>
        <win_table_column prop="trade" label="当天是否交易" width="160" :formatter="formatDic" sortable></win_table_column>
        <win_table_column prop="createUserId" label="操作人" width="160" :formatter="formatDic" sortable></win_table_column>
        <win_table_column prop="createTime" label="操作时间" width="180" :formatter="formatDic" sortable></win_table_column>
        <win_table_column label="操作" header-align="center" align="center" width="220">
          <template slot-scope="scope">
            <win_button @click="operation(scope.row,'UPDATE')" type="text" size="small" icon="el-icon-edit-outline">修改</win_button>
            <win_button @click="operation(scope.row,'DELETE')" type="text" size="small" icon="el-icon-delete" style="color:#FF4D4D">删除</win_button>
          </template>
        </win_table_column>
      </win_table>
    </div>
    <!--分页组件-->

    <win_pagination v-bind:childMsg="pageVO" @callFather="pageQuery"></win_pagination>

    <!-- 创建/修改/删除 begin-->
    <ProdSeatDialog :toChildMsg="cardNumber" @bindSend="toFatherMsg" v-if="dialogVisible" @getFormData="formDataSubmit"></ProdSeatDialog>
    <!-- 创建/修改/删除 end-->
  </div>
</template>
<script lang="ts">
import ProdSeatController from "../controller/ProdSeatController";
import Component from "vue-class-component";

@Component
export default class ProdSeat extends ProdSeatController {}
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