<template>
    <div class="container">

        <el-container>

            <win-table :data="pageVO.list" style="width: 100%" max-height="600px">
                <win-table-column prop="taskName" label="任务名称"></win-table-column>
                <win-table-column prop="taskType" label="任务类型"></win-table-column>
                <win-table-column prop="path" label="任务路径"></win-table-column>
                <win-table-column prop="description" label="描述"></win-table-column>
                <win-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <div class="operate">
                            <span @click="deleteTask(scope.row)">删除</span>
                            <span @click="openUpdateDialog(scope.row)">修改</span>
                            <span @click="exec(scope.row)">执行</span>
                        </div>
                    </template>
                </win-table-column>
            </win-table>

            <win-pagination v-bind:child-msg="pageVO" @callFather="pageQuery"></win-pagination>

        </el-container>
    </div>
</template>
<script lang="ts">
//import CellTaskController from "../controller/CellTaskController";
import Component from "vue-class-component";
//export default class CellTaskView extends CellTaskController {}
</script>
<style lang="scss" scoped>
</style>
