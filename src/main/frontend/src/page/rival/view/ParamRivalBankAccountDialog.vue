<template>
  <win-fdialog :title="dialogTitle" :before-close="closeDialog" :visible.sync="dialogVisible" :close-on-click-modal="false" :close-on-press-escape="false" width="780px">
    <win-form id="#create" :model="paramRivalBankAccountRepVO" ref="ParamRivalBankAccount" label-width="110px">
      <win-row>
        <win-col :span="spanWidth">
          <win-form-item label="对手方序号" prop="rivalNo">
            <el-input v-model.number="paramRivalBankAccountRepVO.rivalNo" :disabled="rivalDisabled" clearable></el-input>
          </win-form-item>
        </win-col>
        <win-col :span="spanWidth">
          <win-form-item label="对手方名称" prop="rivalName">
            <el-input v-model="paramRivalBankAccountRepVO.rivalName" :disabled="rivalDisabled" clearable></el-input>
          </win-form-item>
        </win-col>
        <win-col :span="spanWidth">
          <win-form-item label="托管账号" prop="escrowAccount">
            <el-input v-model="paramRivalBankAccountRepVO.escrowAccount" clearable maxlength="30"></el-input>
          </win-form-item>
        </win-col>
        <win-col :span="spanWidth">
          <win-form-item label="托管账户名称" prop="escrowName">
            <el-input v-model="paramRivalBankAccountRepVO.escrowName" clearable maxlength="30"></el-input>
          </win-form-item>
        </win-col>
        <win-col :span="spanWidth">
          <win-form-item label="托管机构" prop="escrowParty">
            <win-select v-model="paramRivalBankAccountRepVO.escrowParty" placeholder="请选择" clearable>
              <win-option v-for="item in rivalBankAccountDicDataVO.escrowPartyTypes" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
                <span style="float: left">{{ item.dicCode }}</span>
                <span>{{ "&nbsp;"+item.dicExplain }}</span>
              </win-option>
            </win-select>
          </win-form-item>
        </win-col>
        <win-col :span="spanWidth">
          <win-form-item label="停用标志" prop="stop">
            <win-select v-model="paramRivalBankAccountRepVO.stop" placeholder="请选择" clearable>
              <win-option v-for="item in rivalBankAccountDicDataVO.stopTypes" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
                <span style="float: left">{{ item.dicCode }}</span>
                <span>{{ "&nbsp;"+item.dicExplain }}</span>
              </win-option>
            </win-select>
          </win-form-item>
        </win-col>

      </win-row>
    </win-form>

    <div slot="footer" class="dialog-footer" v-if="operationShow">
      <win-button @click="dialogCancel">取消</win-button>
      <win-button type="primary" :loading="createLoading" @click="submitDialog">{{ dialogSumbitText }}</win-button>
    </div>
  </win-fdialog>
</template>
<script lang="ts">
import ParamRivalBankAccountDialogController from "../controller/ParamRivalBankAccountDialogController";
export default class ParamRivalBankAccountDialog extends ParamRivalBankAccountDialogController {}
</script>
<style lang="css" scoped>
.el-button--warning {
  background-color: #ff900d;
}
.el-date-editor {
  width: 224px;
}
span font {
  text-align: left;
  margin: -30px 0 0px;
  font-size: 16px;
}
</style>