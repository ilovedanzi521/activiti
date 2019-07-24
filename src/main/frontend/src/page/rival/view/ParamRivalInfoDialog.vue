<template>
  <win_dialog :title="dialogTitle" :before-close="closeDialog" :visible.sync="dialogVisible" :close-on-click-modal="false" :close-on-press-escape="false" width="780px">
    <win_form id="#create" :model="paramRivalInfoRepVO" :rules="rules" ref="paramRivalInfo" label-width="110px" :disabled="formDisabled">
      <win_row>
        <win_col :span="rivalNoWidth">
          <win_form_item label="对手方序号" prop="rivalNo">
            <el-input v-model.number="paramRivalInfoRepVO.rivalNo" clearable :disabled="rivalDisabled"></el-input>
          </win_form_item>
        </win_col>
        <win_col :span="spanWidth">
          <win_form_item label="对手方名称" prop="rivalName">
            <el-input v-model.number="paramRivalInfoRepVO.rivalName" clearable></el-input>
          </win_form_item>
        </win_col>
        <win_col :span="spanWidth">
          <win_form_item label="对手方简称" prop="rivalShortName">
            <el-input v-model="paramRivalInfoRepVO.rivalShortName" clearable maxlength="30"></el-input>
          </win_form_item>
        </win_col>
        <win_col :span="spanWidth">
          <win_form_item label="对手方评级" prop="appraise">
            <win_select v-model="paramRivalInfoRepVO.appraise" placeholder="请选择" clearable>
              <win_option v-for="item in rivalInfoDicData.appraiseDic" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
                <span style="float: left">{{ item.dicCode }}</span>
                <span>{{ "&nbsp;"+item.dicExplain }}</span>
              </win_option>
            </win_select>
          </win_form_item>
        </win_col>
        <win_col :span="spanWidth">
          <win_form_item label="优质对手方" prop="golden" class="dialogItem">
            <win_select v-model="paramRivalInfoRepVO.golden" placeholder="请选择" clearable>
              <win_option v-for="item in rivalInfoDicData.goldenDic" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
                <span style="float: left">{{ item.dicCode }}</span>
                <span>{{ "&nbsp;"+item.dicExplain }}</span>
              </win_option>
            </win_select>
          </win_form_item>
        </win_col>
        <win_col :span="spanWidth">
          <win_form_item label="首期结算方式" prop="firstSettleType">
            <win_select v-model="paramRivalInfoRepVO.firstSettleType" placeholder="请选择" clearable>
              <win_option v-for="item in rivalInfoDicData.settleTypeDic" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
                <span style="float: left">{{ item.dicCode }}</span>
                <span>{{ "&nbsp;"+item.dicExplain }}</span>
              </win_option>
            </win_select>
          </win_form_item>
        </win_col>
        <win_col :span="spanWidth">
          <win_form_item label="到期结算方式" prop="secondSettleType">
            <win_select v-model="paramRivalInfoRepVO.secondSettleType" placeholder="请选择" clearable>
              <win_option v-for="item in rivalInfoDicData.settleTypeDic" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
                <span style="float: left">{{ item.dicCode }}</span>
                <span>{{ "&nbsp;"+item.dicExplain }}</span>
              </win_option>
            </win_select>
          </win_form_item>
        </win_col>
        <win_col :span="24">
          <win_form_item label="备注" prop="remark">
            <el-input :span="24" type="textarea" v-model="paramRivalInfoRepVO.remark"></el-input>
          </win_form_item>
        </win_col>
      </win_row>
    </win_form>

    <div slot="footer" class="dialog-footer" v-if="operationShow">
      <win_button @click="dialogCancel">取消</win_button>
      <win_button type="primary" :loading="createLoading" @click="submitDialog">{{ dialogSumbitText }}</win_button>
    </div>
  </win_dialog>
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