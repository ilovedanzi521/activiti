<template>
  <win_dialog :title="dialogTitle" :before-close="closeDialog" :visible.sync="dialogVisible" :close-on-click-modal="false" :close-on-press-escape="false" width="780px">
    <win_form id="#create" :model="paramRivalTraderRepVO" :rules="rules" ref="paramRivalTrader" label-width="110px" :disabled="formDisabled">
      <win_row>
        <win_col :span="spanWidth">
          <win_form_item label="对手方序号" prop="rivalNo">
            <el-input v-model.number="paramRivalTraderRepVO.rivalNo" clearable :disabled="rivalDisabled"></el-input>
          </win_form_item>
        </win_col>
        <win_col :span="spanWidth">
          <win_form_item label="对手方名称" prop="rivalName">
            <el-input v-model.number="paramRivalTraderRepVO.rivalName" clearable :disabled="rivalDisabled"></el-input>
          </win_form_item>
        </win_col>
        <win_col :span="spanWidth">
          <win_form_item label="对手方交易员" prop="traderName">
            <el-input v-model="paramRivalTraderRepVO.traderName" clearable maxlength="30"></el-input>
          </win_form_item>
        </win_col>
        <win_col :span="spanWidth">
          <win_form_item label="联系方式" prop="phone">
            <el-input v-model="paramRivalTraderRepVO.phone" clearable maxlength="30"></el-input>
          </win_form_item>
        </win_col>
        <win_col :span="spanWidth">
          <win_form_item label="QQ" prop="qq" class="dialogItem">
            <el-input v-model="paramRivalTraderRepVO.qq" clearable maxlength="30"></el-input>
          </win_form_item>
        </win_col>
        <win_col :span="spanWidth">
          <win_form_item label="邮箱" prop="email">
            <el-input v-model="paramRivalTraderRepVO.email" clearable maxlength="30"></el-input>
          </win_form_item>
        </win_col>
        <win_col :span="spanWidth">
          <win_form_item label="停用标志" prop="stop">
            <win_select v-model="paramRivalTraderRepVO.stop" placeholder="请选择" clearable>
              <win_option v-for="item in rivalTraderDicDataVO.stopDic" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
                <span style="float: left">{{ item.dicCode }}</span>
                <span>{{ "&nbsp;"+item.dicExplain }}</span>
              </win_option>
            </win_select>
          </win_form_item>
        </win_col>
        <win_col :span="24">
          <win_form_item label="备注" prop="remark">
            <el-input :span="24" type="textarea" v-model="paramRivalTraderRepVO.remark"></el-input>
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