<template>
  <win-fdialog :title="dialogTitle" :before-close="closeDialog" :visible.sync="dialogVisible" :close-on-click-modal="false" :close-on-press-escape="false" width="780px">
    <win-form id="#create" :model="paramRivalInfoRepVO" :rules="rules" ref="paramRivalInfo" label-width="110px" :disabled="formDisabled">
      <win-row>
        <win-col :span="rivalNoWidth">
          <win-form-item label="对手方序号" prop="rivalNo">
            <el-input v-model.number="paramRivalInfoRepVO.rivalNo" clearable :disabled="rivalDisabled"></el-input>
          </win-form-item>
        </win-col>
        <win-col :span="spanWidth">
          <win-form-item label="对手方名称" prop="rivalName">
            <el-input v-model.number="paramRivalInfoRepVO.rivalName" clearable></el-input>
          </win-form-item>
        </win-col>
        <win-col :span="spanWidth">
          <win-form-item label="对手方简称" prop="rivalShortName">
            <el-input v-model="paramRivalInfoRepVO.rivalShortName" clearable maxlength="30"></el-input>
          </win-form-item>
        </win-col>
        <win-col :span="spanWidth">
          <win-form-item label="对手方评级" prop="appraise">
            <win-select v-model="paramRivalInfoRepVO.appraise" placeholder="请选择" clearable>
              <win-option v-for="item in rivalInfoDicData.appraiseDic" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
                <span style="float: left">{{ item.dicCode }}</span>
                <span>{{ "&nbsp;"+item.dicExplain }}</span>
              </win-option>
            </win-select>
          </win-form-item>
        </win-col>
        <win-col :span="spanWidth">
          <win-form-item label="优质对手方" prop="golden" class="dialogItem">
            <win-select v-model="paramRivalInfoRepVO.golden" placeholder="请选择" clearable>
              <win-option v-for="item in rivalInfoDicData.goldenDic" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
                <span style="float: left">{{ item.dicCode }}</span>
                <span>{{ "&nbsp;"+item.dicExplain }}</span>
              </win-option>
            </win-select>
          </win-form-item>
        </win-col>
        <win-col :span="spanWidth">
          <win-form-item label="首期结算方式" prop="firstSettleType">
            <win-select v-model="paramRivalInfoRepVO.firstSettleType" placeholder="请选择" clearable>
              <win-option v-for="item in rivalInfoDicData.settleTypeDic" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
                <span style="float: left">{{ item.dicCode }}</span>
                <span>{{ "&nbsp;"+item.dicExplain }}</span>
              </win-option>
            </win-select>
          </win-form-item>
        </win-col>
        <win-col :span="spanWidth">
          <win-form-item label="到期结算方式" prop="secondSettleType">
            <win-select v-model="paramRivalInfoRepVO.secondSettleType" placeholder="请选择" clearable>
              <win-option v-for="item in rivalInfoDicData.settleTypeDic" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
                <span style="float: left">{{ item.dicCode }}</span>
                <span>{{ "&nbsp;"+item.dicExplain }}</span>
              </win-option>
            </win-select>
          </win-form-item>
        </win-col>
        <win-col :span="24">
          <win-form-item label="备注" prop="remark">
            <el-input :span="24" type="textarea" v-model="paramRivalInfoRepVO.remark"></el-input>
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
import ParamRivalInfoDialogController from "../controller/ParamRivalInfoDialogController";
export default class ParamRivalInfoDialog extends ParamRivalInfoDialogController {}
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