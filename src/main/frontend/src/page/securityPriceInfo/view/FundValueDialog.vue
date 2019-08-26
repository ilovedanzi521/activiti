<template>
  <win-fdialog :title="dialogTitle" :before-close="closeDia" :visible.sync="dialogVisible" :close-on-click-modal="false" :close-on-press-escape="false" width="50%">
    <win-form id="#create" :model="createFundValue" ref="create" :rules="rules" label-width="170px" size="small" :inline="true" :disabled="formDisabled">
      <div class="form_content">

        <win-form-item label="证券代码" prop="securityCode" class="dialogItem">
          <el-autocomplete v-model="createFundValue.securityCode" :fetch-suggestions="listAll" placeholder="请输入内容" @select="handleSelect" :disabled="securityCodeDisabaled" clearable></el-autocomplete>
        </win-form-item>
        <win-form-item label="净值日" prop="priceDate" class="dialogItem">
          <win-date-picker v-model="createFundValue.priceDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></win-date-picker>
        </win-form-item>

      </div>
      <div class="form_content">
        <win-form-item label="净资产值" prop="cleanPrice" class="dialogItem">
          <win-input v-model="createFundValue.cleanPrice"></win-input>
        </win-form-item>

        <win-form-item label="单位净值" prop="unitCleanPrice" class="dialogItem">
          <win-input v-model="createFundValue.unitCleanPrice"></win-input>
        </win-form-item>

      </div>
      <div class="form_content">
        <win-form-item label="单位累计净值" prop="unitSumPrice" class="dialogItem">
          <win-input v-model="createFundValue.unitSumPrice"></win-input>
        </win-form-item>
        <win-form-item label="每万份基金单位当日收益" prop="intradayEarn" class="dialogItem">
          <win-input v-model="createFundValue.intradayEarn" style="width:210px;"></win-input>元
        </win-form-item>

      </div>
      <div class="form_content">
        <win-form-item label="最近7日折算年收益率" prop="sevenDayEarn" class="dialogItem">
          <win-input v-model="sevenDayEarn" :num="[5,3]" :ratio="0.01" :real.sync="createFundValue.sevenDayEarn" :negative="false" unit="%" style="width:224px;"></win-input>

        </win-form-item>

      </div>
    </win-form>

    <div slot="footer" class="dialog-footer" v-show="buttonShow">
      <win-button @click="dialogCancel">取消</win-button>
      <win-button type="primary" :loading="createLoading" @click="submitDialog">{{dialogSumbitText}}</win-button>
    </div>
  </win-fdialog>
</template>
<script lang="ts">
import FundValueDialogController from "../controller/FundValueDialogController";
export default class fundValueDialog extends FundValueDialogController {
  formLabelWidth: "30px";
}
</script>
<style lang="scss" scoped>
.form_content /deep/ .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 224px;
}
.BondInfoDialog /deep/ .el-dialog--center .el-dialog__body {
  padding: 30px 20px;
  color: #fff;
  font-size: 14px;
  word-break: break-all;
  text-align: center;
  width: 1160px;
  height: 600px;
  box-sizing: border-box;
  overflow: auto;
}
</style>