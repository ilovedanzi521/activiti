<template>
  <!-- 增删改弹框 begin-->
  <win-fdialog :title="dialogTitle" :before-close="closeDialog" :visible.sync="dialogVisible" :close-on-click-modal="false" :close-on-press-escape="false" width="690px">
    <win-form id="#create" :model="createRepo" :rules="rules" ref="createRepo" label-width="100px" :disabled="formDisabled">
      <el-row>
        <el-col :span="12">
          <win-form-item label="证券代码" prop="securityCode">
            <win-select v-model="createRepo.securityCode" filterable placeholder="请选择" :disabled="securityCodeDisabaled" clearable>
              <win-option v-for="item in securityCodes" :key="item.securityCode" :label="item.securityCode" :value="item.securityCode">
                <span style="float: left">{{ item.securityCode }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.securityName }}</span>
              </win-option>
            </win-select>
          </win-form-item>
        </el-col>
        <el-col :span="12">
          <win-form-item label="回购天数" prop="repoDay">
            <el-input v-model.number="createRepo.repoDay" clearable maxlength="3"></el-input>
          </win-form-item>
        </el-col>
      </el-row>
    </win-form>
    <div slot="footer" class="dialog-footer" v-if="operationShow">
      <win-button @click="dialogCancel">取消</win-button>
      <win-button type="primary" :loading="dialogLoading" @click="submitDialog">{{dialogSumbitText}}</win-button>
    </div>
  </win-fdialog>
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
