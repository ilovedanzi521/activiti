<template>
    <div class="ProdConsignor">
        <!--委托人详情子组件:Begin -->
        <ProdConsignorDialog v-if="isDetailAble" ref="prodConsignorDialog" @getFormData="formDataSubmit"></ProdConsignorDialog>
        <!--委托人详情子组件:End -->
        <!--委托人新增删除按钮组:Begin -->
        <div class="col-md-12" style="margin-top:10px;">
            <ul class="btn-edit fr">
                <el-button-group>
                    <win-button type="info" icon="el-icon-plus" round @click="onAddSubmit">新增</win-button>
                    <win-button type="info" icon="el-icon-delete" :disabled="multipleSelection.length == 0" round @click="onBatchDeleteSubmit">删除</win-button>
                </el-button-group>
            </ul>
        </div>
        <!--委托人新增删除按钮组:End -->
        <!--委托人表格数据:Begin -->
        <div class="consignorDataTable" style="margin-top:10px;">
            <win-table max-height="650" highlight-current-row :data="pageVO.list" @cell-dblclick="handleRowDBClick" @select-all="handleSelectAll" @select-change="handleSelectionChange" :showIndex="false">
                <win-table-column sortable prop="no" label="委托人编号" align="center" min-width="120"></win-table-column>
                <win-table-column sortable prop="name" label="委托人名称" align="left" min-width="220"></win-table-column>
                <win-table-column sortable prop="shortName" label="委托人简称" align="left" min-width="140"></win-table-column>
                <win-table-column prop="type" :formatter="prodDicFormatter" label="公司类型" align="left" min-width="150"></win-table-column>
                <win-table-column prop="linkMan" label="联系人" align="left" min-width="120"></win-table-column>
                <win-table-column prop="telNo" label="电话号码" align="center" min-width="140"></win-table-column>
                <win-table-column prop="mobile" label="手机号码" align="center" min-width="140"></win-table-column>
                <win-table-column prop="address" label="联系地址" align="left" min-width="240"></win-table-column>
                <win-table-column prop="summary" label="备注" align="left" min-width="200"></win-table-column>
                <win-table-column prop="updateUserId" label="操作人" align="left" min-width="150"></win-table-column>
                <win-table-column prop="updateTime" :formatter="TimeFormatter" label="操作时间" align="left" width="150"></win-table-column>
                <win-table-column align="center" fixed="right" label="操作" min-width="160">
                    <template slot-scope="scope">
                        <win-button size="small" @click="onEditClick(scope.row)" type="text" icon="el-icon-edit-outline">修改</win-button>
                        <win-button size="small" @click="onDeleteClick(scope.row)" style="color:#FF4D4D" type="text" icon="el-icon-delete">删除</win-button>
                    </template>
                </win-table-column>
            </win-table>
            <!--委托人表格分页:Begin -->
            <win-pagination v-bind:childMsg="pageVO" @callFather="pageFindSubmit"></win-pagination>
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