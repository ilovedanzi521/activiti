<template>
    <div class="ProdConsignorDialog">
        <!--产品详情对话框:Begin -->
        <win_dialog :title="consignorDialogControl.myTitle" :visible.sync="consignorDialogControl.dialogFormVisible" :close-on-press-escape="false" :close-on-click-modal="false" width="42%" :before-close="handleClose">
            <!--产品详情表单:Begin -->
            <win_form :model="form" ref="ruleForm" :rules="consignorDialogRules" :disabled="consignorDialogControl.allDisabled" label-width="116px" :inline="true">

                <win_form_item label="委托人名称" prop="name">
                    <win_input v-model="form.name" maxlength=50></win_input>
                </win_form_item>
                <win_form_item label="委托人简称" prop="shortName">
                    <win_input v-model="form.shortName" maxlength=20></win_input>
                </win_form_item>
                <win_form_item label="公司类型" prop="type">
                    <win_select v-model="form.type" clearable placeholder="请选择">
                        <win_option v-for="item in consignorDicEntity['type']" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
                            <span style="float: left">{{ item.dicCode }}</span>
                            <span>{{ "&nbsp;"+item.dicExplain }}</span>
                        </win_option>
                    </win_select>
                </win_form_item>

                <win_form_item label="联系人">
                    <win_input v-model="form.linkMan" maxlength=50></win_input>
                </win_form_item>

                <win_form_item label="电话号码">
                    <win_input v-model="form.telNo" maxlength=50></win_input>
                </win_form_item>

                <win_form_item label="手机号码">
                    <win_input v-model="form.mobile" :num="[11]" :negative="false" maxlength=50></win_input>
                </win_form_item>

                <win_form_item label="联系地址">
                    <win_input v-model="form.address" maxlength=100></win_input>
                </win_form_item>

                <win_form_item label="备注">
                    <win_input type="textarea" v-model="form.summary" :rows="3" maxlength=255 placeholder="请输入内容">
                    </win_input>
                </win_form_item>

            </win_form>
            <!--产品详情表单:End -->
            <!--产品详情提交:Begin -->
            <div slot="footer" class="dialog-footer" v-show="consignorDialogControl.isSubmitShow">
                <el-button @click="undoForm('ruleForm')">取 消</el-button>
                <el-button type="primary" @click="dialogFormSubmit('ruleForm')">{{consignorDialogControl.dialogSumbitText}}</el-button>
            </div>
            <!--产品详情提交:End -->
        </win_dialog>
        <!--产品详情对话框:End -->
    </div>
</template>
<script lang="ts">
import ProdConsignorDialogController from "../controller/ProdConsignorDialogController";
import Component from "vue-class-component";

@Component
export default class ProdConsignorDialog extends ProdConsignorDialogController {}
</script>
<style lang="scss" scoped>
.el-button--warning {
    background-color: #ff900d;
}
</style>