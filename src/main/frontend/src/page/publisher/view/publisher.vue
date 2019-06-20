<template>
    <div class="container">
        <!--表单查询-->
        <win_form :inline="true">
            <div class="form_content">
                <el-button
                    round
                    @click="openAddDialog('publisherForm')"
                    icon="el-icon-plus"
                    class="iconAddbutton"
                >新增</el-button>
                <win_form_item label="发行人编号">
                    <el-input suffix-icon="xxxx" v-model="form.publisherCode"></el-input>
                </win_form_item>
                <win_form_item label="发行人名称">
                    <el-input suffix-icon="xxxx" v-model="form.publisherName"></el-input>
                </win_form_item>
                <win_form_item label="企业性质">
                    <win_select v-model="form.enterpriseNatures" multiple placeholder="请选择">
                        <win_option
                            v-for="item in enterpriseNatureSelect"
                            :key="item.dicCode"
                            :label="item.dicExplain"
                            :value="item.dicCode"
                        ></win_option>
                    </win_select>
                </win_form_item>
                <win_form_item>
                    <win_button @click="query()" class="yellowButton">查询</win_button>
                    <win_button @click="reset()" class="defaultButton">重置</win_button>
                </win_form_item>
            </div>
        </win_form>
        <!--表格数据-->
        <win_table :data="pageVO.list">
            <win_table_column align="center" type="index" label="序号" width="50"></win_table_column>
            <win_table_column prop="publisherCode" label="发行人编号" sortable></win_table_column>
            <win_table_column prop="publisherName" label="发行人名称" sortable></win_table_column>
            <win_table_column prop="legalPerson" sortable label="法人代表"></win_table_column>
            <win_table_column
                prop="companyCategory"
                :formatter="companyCategoryFormatter"
                sortable
                label="公司类别"
            ></win_table_column>
            <win_table_column
                prop="enterpriseNature"
                :formatter="enterpriseNatureFormatter"
                sortable
                label="企业性质"
                :show-overflow-tooltip="true"
            ></win_table_column>
            <win_table_column prop="assetsCurrencyCode" sortable label="资产币种"></win_table_column>
            <win_table_column prop="registerCapital" sortable label="注册资本"></win_table_column>
            <win_table_column prop="externalRating" :formatter="exFormatter" sortable label="外部评级"></win_table_column>
            <win_table_column prop="internalRating" :formatter="inFormatter" sortable label="内部评级"></win_table_column>
            <win_table_column prop="registerAddress" sortable label="注册地址"></win_table_column>
            <win_table_column prop="remark" sortable label="备注"></win_table_column>
            <win_table_column label="操作" width="180">
                <template slot-scope="scope">
                    <div class="operate">
                        <span @click="openUpdateDialog(scope.row)">
                            <i class="el-icon-edit"></i>修改
                        </span>
                        <span @click="openDeleteDialog(scope.row)">
                            <i class="el-icon-delete"></i>删除
                        </span>
                    </div>
                </template>
            </win_table_column>
        </win_table>
        <!--分页组件-->
        <Pagination v-bind:childMsg="pageVO" @callFather="pageQuery"></Pagination>
        <!--编辑、新增-->
        <win_dialog
            :title="dialogVO.title"
            ref="publisherForm"
            :model="publisherVO"
            :visible.sync="dialogVisible"
            width="40%"
        >
            <win_form :inline="true" :disabled="dialogVO.disableFlag">
                <div class="form_content">
                    <win_form_item label="发行人编号">
                        <el-input suffix-icon="xxxx" v-model="publisherVO.publisherCode"></el-input>
                    </win_form_item>
                    <win_form_item label="资产币种">
                        <win_select v-model="publisherVO.assetsCurrencyCode" placeholder="请选择">
                            <win_option
                                v-for="item in repCurrencyVOs"
                                :key="item.currencyCode"
                                :label="item.currencyName"
                                :value="item.currencyCode"
                            ></win_option>
                        </win_select>
                    </win_form_item>
                </div>
                <div class="form_content">
                    <win_form_item label="发行人名称">
                        <el-input suffix-icon="xxxx" v-model="publisherVO.publisherName"></el-input>
                    </win_form_item>
                    <win_form_item label="注册资本">
                        <el-input suffix-icon="xxxx" v-model="publisherVO.registerCapital"></el-input>
                    </win_form_item>
                </div>
                <div class="form_content">
                    <win_form_item label="法人代表">
                        <el-input suffix-icon="xxxx" v-model="publisherVO.legalPerson"></el-input>
                    </win_form_item>
                    <win_form_item label="外部评级">
                        <win_select v-model="publisherVO.externalRating" placeholder="请选择">
                            <win_option
                                v-for="item in externalRating"
                                :key="item.dicCode"
                                :label="item.dicExplain"
                                :value="item.dicCode"
                            ></win_option>
                        </win_select>
                    </win_form_item>
                </div>
                <div class="form_content">
                    <win_form_item label="公司类别">
                        <win_select v-model="publisherVO.companyCategory" placeholder="请选择">
                            <win_option
                                v-for="item in companyCategorySelect"
                                :key="item.dicCode"
                                :label="item.dicExplain"
                                :value="item.dicCode"
                            ></win_option>
                        </win_select>
                    </win_form_item>
                    <win_form_item label="内部评级">
                        <win_select v-model="publisherVO.internalRating" placeholder="请选择">
                            <win_option
                                v-for="item in internalRating"
                                :key="item.dicCode"
                                :label="item.dicExplain"
                                :value="item.dicCode"
                            ></win_option>
                        </win_select>
                    </win_form_item>
                </div>
                <div class="form_content">
                    <win_form_item label="企业性质">
                        <win_select v-model="publisherVO.enterpriseNature" placeholder="请选择">
                            <win_option
                                v-for="item in enterpriseNatureSelect"
                                :key="item.dicCode"
                                :label="item.dicExplain"
                                :value="item.dicCode"
                            ></win_option>
                        </win_select>
                    </win_form_item>
                    <win_form_item label="注册地址">
                        <el-input suffix-icon="xxxx" v-model="publisherVO.registerAddress"></el-input>
                    </win_form_item>
                </div>
                <div class="form_content">
                    <win_form_item label="备注">
                        <el-input suffix-icon="xxxx" v-model="publisherVO.remark"></el-input>
                    </win_form_item>
                </div>
            </win_form>
            <div class="divCenter">
                <div class="buttons">
                    <win_button @click="closeDialog()" class="defaultButton">取消</win_button>
                    <span v-if="dialogVO.action === 1">
                        <win_button @click="addPublisher('exchangeForm')" class="yellowButton">确认</win_button>
                    </span>
                    <span v-else-if="dialogVO.action === 2">
                        <win_button @click="updatePublisher('exchangeForm')" class="yellowButton">确认</win_button>
                    </span>
                    <span v-else>
                        <win_button @click="deletePublisher()" class="yellowButton">确认</win_button>
                    </span>
                </div>
            </div>
        </win_dialog>
    </div>
</template>
<script lang="ts">
import PublisherController from "../controller/PublisherController";
import Component from "vue-class-component";
export default class PublisherView extends PublisherController {}
</script>
<style lang="scss" scoped>
@import "../../../assets/style/page.scss";
.buttons button {
    margin: 0px 20px;
}
</style>
