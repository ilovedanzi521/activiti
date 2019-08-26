<template>
  <div class="BondRateDetail">
    <!--债券折算率详情对话框:Begin -->
    <win-fdialog :title="myTitle" :visible.sync="dialogFormVisible" :close-on-press-escape="false" :close-on-click-modal="false" width="42%" :before-close="handleClose">
      <!--债券折算率表单:Begin -->
      <win-form :model="form" ref="ruleForm" :rules="rateDetailRules" :disabled="allDisabled" :inline="true">
        <div class="form_content">
          <win-form-item label="证券代码" prop="securityCode">
            <win-select v-model="form.securityCode" filterable clearable :filter-method="outCodeSelectFun" @visible-change="visibleChangeTrigger" :disabled="isCodeDisabled" placeholder="请选择">
              <win-option v-for="item in securitySelect" :key="item.securityCode" :label="item.securityCode" :value="item.securityCode">
                <span style="float: left">{{ item.securityCode }}</span>
                <span>{{ "&nbsp;"+item.securityName }}</span>
              </win-option>
            </win-select>
          </win-form-item>
          <win-form-item label="折算率" prop="conversionRate">
            <win-input v-model="conversionRate" :num="[5,3]" :ratio="0.01" :real.sync="form.conversionRate" :negative="false" unit="%" style="width:224px;"></win-input>
          </win-form-item>
        </div>
        <div class="form_content">
          <win-form-item label="开始日期" prop="beginDate">
            <el-date-picker v-model="form.beginDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
          </win-form-item>
          <win-form-item label="结束日期" prop="endDate">
            <el-date-picker v-model="form.endDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
          </win-form-item>
        </div>
        <div class="form_content">
          <win-form-item label="数据来源" prop="dataSource">
            <win-select v-model="form.dataSource" clearable placeholder="请选择">
              <win-option v-for="item in bondDicData.dataSource" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
                <span style="float: left">{{ item.dicCode }}</span>
                <span>{{ "&nbsp;"+item.dicExplain }}</span>
              </win-option>
            </win-select>
          </win-form-item>

        </div>
      </win-form>
      <!--债券折算率表单:End -->
      <!--债券折算率提交:Begin -->
      <div slot="footer" class="dialog-footer" v-show="isSubmitDisabled">
        <el-button @click="undoForm('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="dialogFormSubmit('ruleForm')">{{dialogSumbitText}}</el-button>
      </div>
      <!--债券折算率提交:End -->
    </win-fdialog>
    <!--债券折算率详情对话框:End -->
  </div>
</template>
<script lang="ts">
import BondRateDialogController from "../controller/BondRateDialogController";
import Component from "vue-class-component";

@Component
export default class BondRateDetail extends BondRateDialogController {}
</script>
<style lang="scss" scoped>
.form_content /deep/ .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 224px;
}
</style>