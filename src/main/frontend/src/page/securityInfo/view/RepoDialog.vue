<template>
  <!-- 增删改弹框 begin-->
  <win_dialog :title="dialogTitle" :before-close="closeDialog" :visible.sync="dialogVisible" :close-on-click-modal="false" :close-on-press-escape="false" width="690px">
    <win_form id="#create" :model="createRepo" :rules="rules" ref="createRepo" label-width="100px" :disabled="formDisabled">
      <el-row>
        <el-col :span="12">
          <win_form_item label="证券代码" prop="securityCode">
            <win_select v-model="createRepo.securityCode" filterable placeholder="请选择" :disabled="securityCodeDisabaled" clearable>
              <win_option v-for="item in securityCodes" :key="item.securityCode" :label="item.securityCode" :value="item.securityCode">
                <span style="float: left">{{ item.securityCode }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.securityName }}</span>
              </win_option>
            </win_select>
          </win_form_item>
        </el-col>
        <el-col :span="12">
          <win_form_item label="回购天数" prop="repoDay">
            <el-input v-model.number="createRepo.repoDay" clearable maxlength="3"></el-input>
          </win_form_item>
        </el-col>
      </el-row>
    </win_form>
    <div slot="footer" class="dialog-footer" v-if="operationShow">
      <win_button @click="dialogCancel">取消</win_button>
      <win_button type="primary" :loading="dialogLoading" @click="submitDialog">{{dialogSumbitText}}</win_button>
    </div>
  </win_dialog>
  <!-- 增删改弹框 end-->
</template>
<script lang="ts">
import RepoDialogController from "../controller/RepoDialogController";
export default class RepoDialog extends RepoDialogController {}
</script>
<style scoped>
.el-button--warning {
  background-color: #ff900d;
}
</style>
