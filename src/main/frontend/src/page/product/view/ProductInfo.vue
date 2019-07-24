<template>
    <div class="ProductInfo">
        <!--产品详情子组件:Begin -->
        <ProdInfoDialog v-if="isDetailAble" ref="prodInfoDialog" @getFormData="formDataSubmit"></ProdInfoDialog>
        <!--产品详情子组件:End -->
        <!--产品详情查询表单:Begin -->
        <div class="formInline" style="width:100%;height:38px;">
            <win_form v-model="productInfoForm" :inline="true">
                <win_row>
                    <win_col :span="4">
                        <el-button-group>
                            <win_button type="info" style="color:#2B3551" icon="el-icon-plus" @click="onAddSubmit" round>新增</win_button>
                            <win_button type="info" style="color:#2B3551" icon="el-icon-delete" :disabled="multipleSelection.length == 0" round>导出</win_button>
                        </el-button-group>
                    </win_col>
                    <win_col :span="6" :offset="4">
                        <win_form_item label="产品名称">
                            <el-autocomplete v-model="productInfoForm.name" :fetch-suggestions="inCodeSelectFun" @select="handleCodeSelect" clearable placeholder="请输入内容">
                            </el-autocomplete>
                        </win_form_item>
                    </win_col>
                    <win_col :span="6">
                        <win_form_item label="产品状态">
                            <win_select v-model="productInfoForm.status" clearable placeholder="请选择">
                                <win_option v-for="item in prodInfoDicData.status" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode">
                                    <span style="float: left">{{ item.dicCode }}</span>
                                    <span>{{ "&nbsp;"+item.dicExplain }}</span>
                                </win_option>
                            </win_select>
                        </win_form_item>
                    </win_col>
                    <win_col :span="4">
                        <win_button type="primary" icon="el-icon-search" @click="onFindSubmit">查询</win_button>
                        <win_button icon="el-icon-refresh" @click="reset">重置</win_button>
                    </win_col>
                </win_row>
            </win_form>
        </div>
        <!--产品查询表单:End -->
        <!--产品表格数据:Begin -->
        <div class="fundDataTable" style="width:100%;">
            <win_table :height="tableHeight" highlight-current-row @cell-click="handleCurrentChange" :data="pageVO.list" @select-all="handleSelectAll" ref="fundInfoTable" @cell-dblclick="handleRowDBClick"
                @select-change="handleSelectionChange" :showIndex="false">
                <win_table_column sortable prop="no" label="产品序号" align="center" min-width="100"></win_table_column>
                <win_table_column sortable prop="code" label="产品代码" align="left" min-width="120"></win_table_column>
                <win_table_column sortable prop="name" label="产品名称" align="left" min-width="200"></win_table_column>
                <win_table_column prop="prodShare" label="产品份额" align="right" min-width="180"></win_table_column>
                <win_table_column prop="type" :formatter="prodDicFormatter" label="产品类型" align="left" min-width="120"></win_table_column>
                <win_table_column prop="status" :formatter="prodDicFormatter" label="产品状态" align="center" min-width="120"></win_table_column>
                <win_table_column prop="assetCury" :formatter="prodCuryFormatter" label="资产币种" align="left" min-width="150"></win_table_column>
                <win_table_column prop="collectCury" :formatter="prodCuryFormatter" label="募集币种" align="left" min-width="150"></win_table_column>
                <win_table_column prop="createUserId" label="录入人" align="left" min-width="150"></win_table_column>
                <win_table_column prop="createTime" label="录入时间" align="left" min-width="150"></win_table_column>
                <win_table_column prop="updateUserId" label="最近修改人" align="left" min-width="150"></win_table_column>
                <win_table_column prop="updateTime" label="最近修改时间" align="left" min-width="150"></win_table_column>
                <win_table_column fixed="right" header-align="center" align="center" label="操作" min-width="160">
                    <template slot-scope="scope">
                        <win_button size="small" @click="onEditClick(scope.row)" type="text" icon="el-icon-edit-outline">修改</win_button>
                        <win_button size="small" @click="onDeleteClick(scope.row)" style="color:#FF4D4D" type="text" icon="el-icon-delete">删除</win_button>
                    </template>
                </win_table_column>
            </win_table>
            <!--产品表格分页:Begin -->
            <win_pagination v-bind:childMsg="pageVO" @callFather="pageFindSubmit"></win_pagination>
            <!--产品表格分页:End -->
        </div>
        <!--产品表格数据:End -->
    </div>
</template>
<script lang="ts">
import ProductInfoController from "../controller/ProductInfoController";
import Component from "vue-class-component";

@Component
export default class ProductInfo extends ProductInfoController {}
</script>
<style lang="scss" scoped>
</style>