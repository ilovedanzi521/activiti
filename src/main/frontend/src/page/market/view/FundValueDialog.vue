<template>
  <win_dialog :title="dialogTitle" :before-close="closeDia" :visible.sync="dialogVisible" :close-on-click-modal="false" :close-on-press-escape="false" width="50%">
    <win_form id="#create" :model="createFundValue" ref="create" :rules="rules" label-width="170px" size="small" :inline="true" :disabled="formDisabled">
      <div class="form_content">

        <win_form_item label="证券内码" prop="securityCode" class="dialogItem">
          <el-autocomplete v-model="createFundValue.securityCode" :fetch-suggestions="listAll" placeholder="请输入内容" @select="handleSelect" :disabled="securityCodeDisabaled" clearable></el-autocomplete>
        </win_form_item>
        <win_form_item label="净值日" prop="priceDate" class="dialogItem">
          <win_date_picker v-model="createFundValue.priceDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></win_date_picker>
        </win_form_item>

      </div>
      <div class="form_content">
        <win_form_item label="净资产值" prop="cleanPrice" class="dialogItem">
          <win_input v-model="createFundValue.cleanPrice"></win_input>
        </win_form_item>

        <win_form_item label="单位净值" prop="unitCleanPrice" class="dialogItem">
          <win_input v-model="createFundValue.unitCleanPrice"></win_input>
        </win_form_item>

      </div>
      <div class="form_content">
        <win_form_item label="单位累计净值" prop="unitSumPrice" class="dialogItem">
          <win_input v-model="createFundValue.unitSumPrice"></win_input>
        </win_form_item>
        <win_form_item label="每万份基金单位当日收益" prop="intradayEarn" class="dialogItem">
          <win_input v-model="createFundValue.intradayEarn" style="width:210px;"></win_input>元
        </win_form_item>

      </div>
      <div class="form_content">
        <win_form_item label="最近7日折算年收益率" prop="sevenDayEarn" class="dialogItem">
          <win_input v-model="sevenDayEarn" :num="[5,3]" :ratio="0.01" :real.sync="createFundValue.sevenDayEarn" :negative="false" unit="%" style="width:224px;"></win_input>

        </win_form_item>

      </div>
    </win_form>

    <div slot="footer" class="dialog-footer" v-show="buttonShow">
      <win_button @click="dialogCancel">取消</win_button>
      <win_button type="primary" :loading="createLoading" @click="submitDialog">{{dialogSumbitText}}</win_button>
    </div>
  </win_dialog>
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