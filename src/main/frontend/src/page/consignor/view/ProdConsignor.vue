<template>
    <div class="ProdConsignor">
        <!--委托人详情子组件:Begin -->
        <ProdConsignorDialog v-if="isDetailAble" ref="prodConsignorDialog" @getFormData="formDataSubmit"></ProdConsignorDialog>
        <!--委托人详情子组件:End -->
        <!--委托人新增删除按钮组:Begin -->
        <div class="col-md-12" style="margin-top:10px;">
            <ul class="btn-edit fr">
                <el-button-group>
                    <win_button type="info" style="color:#2B3551" icon="el-icon-plus" round @click="onAddSubmit">新增</win_button>
                    <win_button type="info" style="color:#2B3551" icon="el-icon-delete" :disabled="multipleSelection.length == 0" round @click="onBatchDeleteSubmit">删除</win_button>
                </el-button-group>
            </ul>
        </div>
        <!--委托人新增删除按钮组:End -->
        <!--委托人表格数据:Begin -->
        <div class="consignorDataTable" style="width:100%;">
            <win_table max-height="650" highlight-current-row :data="pageVO.list" @cell-dblclick="handleRowDBClick" @select-all="handleSelectAll" @select-change="handleSelectionChange" :showIndex="false">
                <win_table_column sortable prop="no" label="委托人序号" align="center" min-width="120"></win_table_column>
                <win_table_column sortable prop="name" label="委托人名称" align="left" min-width="220"></win_table_column>
                <win_table_column sortable prop="shortName" label="委托人简称" align="left" min-width="140"></win_table_column>
                <win_table_column prop="type" :formatter="prodDicFormatter" label="公司类型" align="left" min-width="150"></win_table_column>
                <win_table_column prop="linkMan" label="联系人" align="left" min-width="120"></win_table_column>
                <win_table_column prop="telNo" label="电话号码" align="center" min-width="140"></win_table_column>
                <win_table_column prop="mobile" label="手机号码" align="center" min-width="140"></win_table_column>
                <win_table_column prop="address" label="联系地址" align="left" min-width="240"></win_table_column>
                <win_table_column prop="summary" label="备注" align="left" min-width="200"></win_table_column>
                <win_table_column prop="updateUserName" label="操作人" align="left" min-width="150"></win_table_column>
                <win_table_column prop="updateTime" :formatter="TimeFormatter" label="操作时间" align="left" width="150"></win_table_column>
                <win_table_column align="center" fixed="right" min-width="160">
                    <template slot-scope="scope">
                        <win_button size="small" @click="onEditClick(scope.row)" type="text" icon="el-icon-edit-outline">修改</win_button>
                        <win_button size="small" @click="onDeleteClick(scope.row)" style="color:#FF4D4D" type="text" icon="el-icon-delete">删除</win_button>
                    </template>
                </win_table_column>
            </win_table>
            <!--委托人表格分页:Begin -->
            <win_pagination v-bind:childMsg="pageVO" @callFather="pageFindSubmit"></win_pagination>
            <!--委托人表格分页:End -->
        </div>
        <!--委托人表格数据:End -->
    </div>
</template>
<script lang="ts">
import ProdConsignorController from "../controller/ProdConsignorController";
import Component from "vue-class-component";

@Component
export default class ProdConsignor extends ProdConsignorController {}
</script>
<style lang="scss" scoped>
</style>