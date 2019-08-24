<template>
  <win-fdialog :title="dialogTitle" :before-close="closeDialog" :visible.sync="dialogVisible" :close-on-click-modal="false" :close-on-press-escape="false" width="780px">
    <win-form id="#create" :model="paramRivalTraderRepVO" :rules="rules" ref="paramRivalTrader" label-width="110px" :disabled="formDisabled">
      <win-row>
        <win-col :span="spanWidth">
          <win-form-item label="对手方序号" prop="rivalNo">
            <el-input v-model.number="paramRivalTraderRepVO.rivalNo" clearable :disabled="rivalDisabled"></el-input>
          </win-form-item>
        </win-col>
        <win-col :span="spanWidth">
          <win-form-item label="对手方名称" prop="rivalName">
            <el-input v-model.number="paramRivalTraderRepVO.rivalName" clearable :disabled="rivalDisabled"></el-input>
          </win-form-item>
        </win-col>
        <win-col :span="spanWidth">
          <win-form-item label="对手方交易员" prop="traderName">
            <el-input v-model="paramRivalTraderRepVO.traderName" clearable maxlength="30"></el-input>
          </win-form-item>
        </win-col>
        <win-col :span="spanWidth">
          <win-form-item label="联系电话" prop="phone">
            <win-input v-model="paramRivalTraderRepVO.phone" :num="[20,0]" clearable maxlength="30">
            </win-input>
          </win-form-item>
        </win-col>
        <win-col :span="spanWidth">
          <win-form-item label="QQ" prop="qq" class="dialogItem">
            <win-input v-model="paramRivalTraderRepVO.qq" :num="[30,0]" clearable maxlength="30"></win-input>
          </win-form-item>
        </win-col>
        <win-col :span="spanWidth">
          <win-form-item label="邮箱" prop="email">
            <el-input v-model="paramRivalTraderRepVO.email" clearable maxlength="30"></el-input>
          </win-form-item>
        </win-col>
        <win-col :span="spanWidth">
          <win-form-item label="停用标志" prop="stop">
            <win-select v-model="paramRivalTraderRepVO.stop" placeholder="请选择" clearable>
              <win-option v-for="item in rivalTraderDicDataVO.stopDic" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
                <span style="float: left">{{ item.dicCode }}</span>
                <span>{{ "&nbsp;"+item.dicExplain }}</span>
              </win-option>
            </win-select>
          </win-form-item>
        </win-col>
        <win-col :span="24">
          <win-form-item label="备注" prop="remark">
            <el-input :span="24" type="textarea" v-model="paramRivalTraderRepVO.remark"></el-input>
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
import ParamRivalTraderDialogController from "../controller/ParamRivalTraderDialogController";
export default class ParamRivalTraderDialog extends ParamRivalTraderDialogController {}
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