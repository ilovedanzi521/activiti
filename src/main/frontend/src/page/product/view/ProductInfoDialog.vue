<template>
    <div class="ProductInfoDialog">
        <!--产品详情对话框:Begin -->
        <win_dialog :title="prodDialogControl.myTitle" :visible.sync="prodDialogControl.dialogFormVisible" :close-on-press-escape="false" :close-on-click-modal="false" :before-close="handleClose">
            <!--产品详情表单:Begin -->
            <win_form :model="form" ref="ruleForm" :rules="fundInfoDialogRules" :disabled="prodDialogControl.allDisabled" label-width="122px" :inline="true">
                <win_row class="titalRow">
                    <span>
                        <font class="titalFont">委托人信息</font>
                    </span>
                </win_row>

                <win_form_item label="委托人代码" prop="consignorNo">
                    <win_select v-model="form.consignorNo" @change="consignorSelect" clearable :disabled="prodDialogControl.isConsignorDisabled" placeholder="请选择">
                        <win_option v-for="item in prodSelectEntity.consignorSelect" :key="item.no" :label="item.name" :value="item.no">
                            <span style="float: left">{{ item.no }}</span>
                            <span>{{ "&nbsp;"+item.name }}</span>
                        </win_option>
                    </win_select>
                </win_form_item>

                <win_form_item label="二级委托人名称" prop="subConsignorNo">
                    <win_select v-model="form.subConsignorNo" clearable :disabled="prodDialogControl.isSubConsignorDisabled" placeholder="请选择">
                        <win_option v-for="item in prodSelectEntity.subConsignorSelect" :key="item.no" :label="item.name" :value="item.no">
                            <span style="float: left">{{ item.no }}</span>
                            <span>{{ "&nbsp;"+item.name }}</span>
                        </win_option>
                    </win_select>
                </win_form_item>

                <el-divider></el-divider>
                <win_row class="titalRow">
                    <span>
                        <font class="titalFont">基础信息</font>
                    </span>
                </win_row>
                <win_form_item label="产品代码" prop="code">
                    <win_input v-model="form.code" :rules="['number']" maxlength=22 :disabled="prodDialogControl.isCodeDisabled"></win_input>
                </win_form_item>
                <win_form_item label="产品名称" prop="name">
                    <win_input v-model="form.name" :rules="['number','word','chinese']" maxlength=128></win_input>
                </win_form_item>
                <win_form_item label="产品份额" prop="prodShare">
                    <win_input v-model="form.prodShare" :num="[18,2]" :negative="false" maxlength=20></win_input>
                </win_form_item>
                <win_form_item label="产品类型" prop="type">
                    <win_select v-model="form.type" clearable placeholder="请选择">
                        <win_option v-for="item in prodDicEntity['type']" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
                            <span style="float: left">{{ item.dicCode }}</span>
                            <span>{{ "&nbsp;"+item.dicExplain }}</span>
                        </win_option>
                    </win_select>
                </win_form_item>
                <win_form_item label="资产币种" prop="assetCury">
                    <win_select v-model="form.assetCury" clearable placeholder="请选择">
                        <win_option v-for="item in prodDicEntity['assetCury']" :key="item.currencyCode" :label="item.currencyName" :value="item.currencyCode">
                            <span style="float: left">{{ item.currencyCode }}</span>
                            <span>{{ "&nbsp;"+item.currencyName }}</span>
                        </win_option>
                    </win_select>
                </win_form_item>
                <win_form_item label="募集币种" prop="collectCury">
                    <win_select v-model="form.collectCury" clearable placeholder="请选择">
                        <win_option v-for="item in prodDicEntity['collectCury']" :key="item.currencyCode" :label="item.currencyName" :value="item.currencyCode">
                            <span style="float: left">{{ item.currencyCode }}</span>
                            <span>{{ "&nbsp;"+item.currencyName }}</span>
                        </win_option>
                    </win_select>
                </win_form_item>
                <win_form_item label="产品状态" prop="status">
                    <win_select v-model="form.status" clearable placeholder="请选择">
                        <win_option v-for="item in prodDicEntity['status']" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
                            <span style="float: left">{{ item.dicCode }}</span>
                            <span>{{ "&nbsp;"+item.dicExplain }}</span>
                        </win_option>
                    </win_select>
                </win_form_item>
            </win_form>
            <!--产品详情表单:End -->
            <!--产品详情提交:Begin -->
            <div slot="footer" class="dialog-footer" v-show="prodDialogControl.isSubmitShow">
                <win_button @click="undoForm('ruleForm')">取 消</win_button>
                <win_button type="primary" @click="dialogFormSubmit('ruleForm')">{{prodDialogControl.dialogSumbitText}}</win_button>
            </div>
            <!--产品详情提交:End -->
        </win_dialog>
        <!--产品详情对话框:End -->
    </div>
</template>
<script lang="ts">
import ProdInfoDialogController from "../controller/ProdInfoDialogController";
import Component from "vue-class-component";

@Component
export default class ProductInfoDialog extends ProdInfoDialogController {}
</script>
<style lang="scss" scoped>
.ProductInfoDialog /deep/ {
    .el-dialog {
        width: 1180px;
    }
    .titalRow {
        height: 35px;

        .titalFont {
            color: white;
        }
    }
}
</style>