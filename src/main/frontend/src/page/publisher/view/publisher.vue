<template>
    <div class="container">
        <!--表单查询-->
        <win_form :inline="true">
            <div class="form_content">
                <win_button round @click="openAddDialog('publisherForm')" icon="el-icon-plus" class="iconAddbutton">新增</win_button>
                <win_form_item label="发行人编号">
                    <el-input suffix-icon="xxxx" v-model="form.publisherCode"></el-input>
                </win_form_item>
                <win_form_item label="发行人名称">
                    <el-input suffix-icon="xxxx" v-model="form.publisherName"></el-input>
                </win_form_item>
                <win_form_item label="企业性质">
                    <win_select v-model="form.enterpriseNatures" multiple placeholder="请选择">
                        <win_option v-for="item in compareData.enterpriseNatureSelect" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode"></win_option>
                    </win_select>
                </win_form_item>
                <win_form_item>
                    <win_button @click="query()" type="primary">查询</win_button>
                    <win_button @click="reset()" type="default">重置</win_button>
                </win_form_item>
            </div>
        </win_form>
        <!--表格数据-->
        <win_table :data="pageVO.list" :showSelection="false" :showIndex="false">
            <win_table_column width="150" prop="publisherCode" label="发行人编号" sortable></win_table_column>
            <win_table_column width="150" prop="publisherName" label="发行人名称" sortable></win_table_column>
            <win_table_column width="150" prop="legalPerson" sortable label="法人代表"></win_table_column>
            <win_table_column width="150" prop="companyCategory" :formatter="companyCategoryFormatter" sortable label="公司类别"></win_table_column>
            <win_table_column width="150" prop="enterpriseNature" :formatter="enterpriseNatureFormatter" sortable label="企业性质" :show-overflow-tooltip="true"></win_table_column>
            <win_table_column width="150" prop="assetsCurrencyCode" sortable label="资产币种"></win_table_column>
            <win_table_column width="150" prop="registerCapital" :formatter="moneyFormatter" sortable label="注册资本"></win_table_column>
            <win_table_column width="150" prop="externalRating" :formatter="exFormatter" sortable label="外部评级"></win_table_column>
            <win_table_column width="150" prop="internalRating" :formatter="inFormatter" sortable label="内部评级"></win_table_column>
            <win_table_column width="150" prop="registerAddress" sortable label="注册地址"></win_table_column>
            <win_table_column width="150" prop="remark" sortable label="备注"></win_table_column>
            <win_table_column width="150" label="操作">
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
        <win_pagination v-bind:childMsg="pageVO" @callFather="pageQuery"></win_pagination>
        <!--编辑、新增-->
        <PublisherDialog :dialogVO="dialogVO" :publisherVO="publisherVO" :compareData="compareData" @query="query"></PublisherDialog>
    </div>
</template>
<script lang="ts">
import PublisherController from "../controller/PublisherController";
import Component from "vue-class-component";
export default class PublisherView extends PublisherController {}
</script>
<style lang="scss" scoped>
</style>
