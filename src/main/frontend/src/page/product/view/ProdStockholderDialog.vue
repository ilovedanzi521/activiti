<template>
  <win-fdialog :title="dialogTitle" :before-close="closeDia" :visible.sync="dialogVisible" :close-on-click-modal="false" :close-on-press-escape="false" width="40%">
    <win-form id="#create" :model="createStockholder" ref="create" :rules="rules" label-width="100px" size="small" :inline="true" :disabled="formDisabled">
      <p style="text-align: left; margin: -30px 0 0px">产品信息</p>
      <div class="form_content">
        <win-form-item label="产品代码" prop="fundCode" class="dialogItem" required="true">
          <win-input v-model="createStockholder.fundCode" :disabled="statusDisabaled"></win-input>
        </win-form-item>
        <win-form-item label="产品名称" prop="fundName" class="dialogItem" required="true">
          <win-input v-model="createStockholder.fundName" :disabled="statusDisabaled"></win-input>
        </win-form-item>
      </div>
      <el-divider></el-divider>

      <p style="text-align: left; margin: -30px 0 0px; margin-top:1px;">账户信息</p>
      <div class="form_content">
        <win-form-item label="股东代码" prop="code" class="dialogItem" required="true">
          <win-input v-model="createStockholder.code" :disabled="updateStatusDisabaled"></win-input>
        </win-form-item>
        <win-form-item label="股东属性" prop="ownerType" class="dialogItem">
          <win-select v-model="createStockholder.ownerType" filterable clearable :disabled="updateStatusDisabaled">
            <win-option v-for="item in stockholderDicVO.ownerTypes" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
            </win-option>
          </win-select>
        </win-form-item>
      </div>

      <div class="form_content">
        <win-form-item label="股东名称" prop="name" class="dialogItem" required="true">
          <win-input v-model="createStockholder.name" :disabled="updateStatusDisabaled"></win-input>
        </win-form-item>
        <win-form-item label="股东账户简称" prop="shortname" class="dialogItem">
          <win-input v-model="createStockholder.shortname" :disabled="updateStatusDisabaled"></win-input>
        </win-form-item>

      </div>
      <div class="form_content">
        <win-form-item label="交易市场" prop="marketNo" class="dialogItem" required="true">
          <win-select v-model="createStockholder.marketNo" filterable clearable :disabled="updateStatusDisabaled" @change="selectMarketEvent">
            <win-option v-for="item in stockholderDicVO.marketTypes" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
              <span style="float: left">{{ item.dicCode }}</span>
              <span style=" color: #8492a6; font-size: 13px">{{ "&nbsp;"+item.dicExplain }}</span>
            </win-option>
          </win-select>
        </win-form-item>
        <win-form-item label="指定席位" prop="seat" class="dialogItem">
          <win-select v-model="createStockholder.seat" :disabled="seatDisabaled" filterable clearable>
            <win-option v-for="item in prodSeatRepVOs" :key="item.code" :label="item.name" :value="item.code">
              <span style="float: left">{{ item.code }}</span>
              <span>{{ "&nbsp;"+item.name }}</span>
            </win-option>
          </win-select>
        </win-form-item>
      </div>
      <div class="form_content">
        <win-form-item label="登记公司" prop="registration" class="dialogItem">
          <win-select v-model="createStockholder.registration" disabled>
            <win-option v-for="item in stockholderDicVO.registrations" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
            </win-option>
          </win-select>
        </win-form-item>
        <win-form-item label="登记状态" prop="registerStatus" class="dialogItem" required="true">
          <win-select v-model="createStockholder.registerStatus" filterable clearable>
            <win-option v-for="item in stockholderDicVO.dicRegisterStatus" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
            </win-option>
          </win-select>
        </win-form-item>
      </div>

      <win-row>
        <win-col :span="24">
          <win-form-item label="备注" prop="summary" class="dialogItem">
            <win-input v-model="createStockholder.summary" type="textarea" :rows="3" maxlength=255 :disabled="updateStatusDisabaled"></win-input>
          </win-form-item>
        </win-col>
      </win-row>

    </win-form>

    <div slot="footer" class="dialog-footer" v-show="buttonShow">
      <win-button @click="dialogCancel">取消</win-button>
      <win-button type="primary" :loading="createLoading" @click="submitDialog">{{dialogSumbitText}}</win-button>
    </div>
  </win-fdialog>
</template>
<script lang="ts">
import ProdStockholderDialogController from "../controller/ProdStockholderDialogController";
export default class ProdStockholderDialog extends ProdStockholderDialogController {
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
.dialogItem /deep/.el-textarea.el-input--small .el-textarea__inner {
  width: 584px;
}
</style>