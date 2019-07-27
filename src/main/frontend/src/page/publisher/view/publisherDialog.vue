<template>
    <div>
        <win_dialog :title="dialogVO.title" :visible.sync="dialogVO.visible" width="770px" :close-on-click-modal="dialogVO.closeOnClickModal" :before-close="closeFormDialog">
            <win_form :inline="true" :disabled="dialogVO.disableFlag" ref="publisherForm" :model="publisherVO" :rules="rules">
                <div class="form_content">
                    <win_form_item label="发行人编号" prop="publisherCode">
                        <el-input suffix-icon="xxxx" v-model="publisherVO.publisherCode" :disabled="dialogVO.action === 2" maxlength="30"></el-input>
                    </win_form_item>
                    <win_form_item label="资产币种" prop="assetsCurrencyCode">
                        <win_select v-model="publisherVO.assetsCurrencyCode" placeholder="请选择">
                            <win_option v-for="item in compareData.repCurrencyVOs" :key="item.currencyCode" :label="item.currencyName" :value="item.currencyCode"></win_option>
                        </win_select>
                    </win_form_item>
                </div>
                <div class="form_content">
                    <win_form_item label="发行人名称" prop="publisherName">
                        <el-input suffix-icon="xxxx" v-model="publisherVO.publisherName" maxlength="50"></el-input>
                    </win_form_item>
                    <win_form_item label="注册资本" prop="registerCapital">
                        <el-input suffix-icon="xxxx" v-model="publisherVO.registerCapital"></el-input>
                    </win_form_item>
                </div>
                <div class="form_content">
                    <win_form_item label="法人代表" prop="legalPerson">
                        <el-input suffix-icon="xxxx" v-model="publisherVO.legalPerson" maxlength="50"></el-input>
                    </win_form_item>
                    <win_form_item label="外部评级" prop="externalRating">
                        <win_select v-model="publisherVO.externalRating" placeholder="请选择">
                            <win_option v-for="item in compareData.externalRating" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode"></win_option>
                        </win_select>
                    </win_form_item>
                </div>
                <div class="form_content">
                    <win_form_item label="公司类别" prop="companyCategory">
                        <win_select v-model="publisherVO.companyCategory" placeholder="请选择">
                            <win_option v-for="item in compareData.companyCategorySelect" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode"></win_option>
                        </win_select>
                    </win_form_item>
                    <win_form_item label="内部评级" prop="internalRating">
                        <win_select v-model="publisherVO.internalRating" placeholder="请选择">
                            <win_option v-for="item in compareData.internalRating" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode"></win_option>
                        </win_select>
                    </win_form_item>
                </div>
                <div class="form_content">
                    <win_form_item label="企业性质" prop="enterpriseNature">
                        <win_select v-model="publisherVO.enterpriseNature" placeholder="请选择">
                            <win_option v-for="item in compareData.enterpriseNatureSelect" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode"></win_option>
                        </win_select>
                    </win_form_item>
                    <win_form_item label="注册地址" prop="registerAddress">
                        <el-input suffix-icon="xxxx" v-model="publisherVO.registerAddress" maxlength="120"></el-input>
                    </win_form_item>
                </div>
                <div class="form_content">
                    <win_form_item label="备注">
                        <el-input type="textarea" suffix-icon="xxxx" maxlength="200" v-model="publisherVO.remark"></el-input>
                    </win_form_item>
                </div>
            </win_form>
            <span slot="footer" class="dialog-footer">
                <win_button @click="closeFormDialog()" type="default">取消</win_button>
                <win_button v-if="dialogVO.action === 1" @click="addPublisher('publisherForm')" type="primary">确认</win_button>
                <win_button v-else-if="dialogVO.action === 2" @click="updatePublisher('publisherForm')" type="primary">确认</win_button>
                <win_button v-else @click="deletePublisher('publisherForm')" type="primary">确认</win_button>
            </span>
        </win_dialog>
    </div>
</template>
<script lang="ts">
import PublisherDialogController from "../controller/PublisherDialogController";
import Component from "vue-class-component";
export default class PublisherDialog extends PublisherDialogController {}
</script>
<style lang="scss" scoped>
</style>

