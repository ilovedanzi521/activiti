<template>
    <div class="ProductInfoDialog">
        <!--产品详情对话框:Begin -->
        <win-fdialog :title="prodDialogControl.myTitle" :visible.sync="prodDialogControl.dialogFormVisible" :close-on-press-escape="false" :close-on-click-modal="false" :before-close="handleClose">
            <!--产品详情表单:Begin -->
            <win-form :model="form" ref="ruleForm" :rules="fundInfoDialogRules" :disabled="prodDialogControl.allDisabled" label-width="122px" :inline="true">
                <win-row class="titalRow">
                    <span>
                        <font class="titalFont">委托人信息</font>
                    </span>
                </win-row>

                <win-form-item label="委托人代码" prop="consignorNo">
                    <win-select v-model="form.consignorNo" @change="consignorSelect" clearable :disabled="prodDialogControl.isConsignorDisabled" placeholder="请选择">
                        <win-option v-for="item in prodSelectEntity.consignorSelect" :key="item.no" :label="item.name" :value="item.no">
                            <span style="float: left">{{ item.no }}</span>
                            <span>{{ "&nbsp;"+item.name }}</span>
                        </win-option>
                    </win-select>
                </win-form-item>

                <win-form-item label="二级委托人名称" prop="subConsignorNo">
                    <win-select v-model="form.subConsignorNo" clearable :disabled="prodDialogControl.isSubConsignorDisabled" placeholder="请选择">
                        <win-option v-for="item in prodSelectEntity.subConsignorSelect" :key="item.no" :label="item.name" :value="item.no">
                            <span style="float: left">{{ item.no }}</span>
                            <span>{{ "&nbsp;"+item.name }}</span>
                        </win-option>
                    </win-select>
                </win-form-item>

                <el-divider></el-divider>
                <win-row class="titalRow">
                    <span>
                        <font class="titalFont">基础信息</font>
                    </span>
                </win-row>
                <win-form-item label="产品代码" prop="code">
                    <win-input v-model="form.code" :rules="['number']" maxlength=22 :disabled="prodDialogControl.isCodeDisabled"></win-input>
                </win-form-item>
                <win-form-item label="产品名称" prop="name">
                    <win-input v-model="form.name" :rules="['number','word','chinese']" maxlength=128></win-input>
                </win-form-item>
                <win-form-item label="产品份额" prop="prodShare">
                    <win-input v-model="form.prodShare" :num="[18,2]" :negative="false" maxlength=20></win-input>
                </win-form-item>
                <win-form-item label="产品类型" prop="type">
                    <win-select v-model="form.type" clearable placeholder="请选择">
                        <win-option v-for="item in prodDicEntity['type']" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
                            <span style="float: left">{{ item.dicCode }}</span>
                            <span>{{ "&nbsp;"+item.dicExplain }}</span>
                        </win-option>
                    </win-select>
                </win-form-item>
                <win-form-item label="资产币种" prop="assetCury">
                    <win-select v-model="form.assetCury" clearable placeholder="请选择">
                        <win-option v-for="item in prodDicEntity['assetCury']" :key="item.currencyCode" :label="item.currencyName" :value="item.currencyCode">
                            <span style="float: left">{{ item.currencyCode }}</span>
                            <span>{{ "&nbsp;"+item.currencyName }}</span>
                        </win-option>
                    </win-select>
                </win-form-item>
                <win-form-item label="募集币种" prop="collectCury">
                    <win-select v-model="form.collectCury" clearable placeholder="请选择">
                        <win-option v-for="item in prodDicEntity['collectCury']" :key="item.currencyCode" :label="item.currencyName" :value="item.currencyCode">
                            <span style="float: left">{{ item.currencyCode }}</span>
                            <span>{{ "&nbsp;"+item.currencyName }}</span>
                        </win-option>
                    </win-select>
                </win-form-item>
                <win-form-item label="产品状态" prop="status">
                    <win-select v-model="form.status" clearable placeholder="请选择">
                        <win-option v-for="item in prodDicEntity['status']" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
                            <span style="float: left">{{ item.dicCode }}</span>
                            <span>{{ "&nbsp;"+item.dicExplain }}</span>
                        </win-option>
                    </win-select>
                </win-form-item>
            </win-form>
            <!--产品详情表单:End -->
            <!--产品详情提交:Begin -->
            <div slot="footer" class="dialog-footer" v-show="prodDialogControl.isSubmitShow">
                <win-button @click="undoForm('ruleForm')">取 消</win-button>
                <win-button type="primary" @click="dialogFormSubmit('ruleForm')">{{prodDialogControl.dialogSumbitText}}</win-button>
            </div>
            <!--产品详情提交:End -->
        </win-fdialog>
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