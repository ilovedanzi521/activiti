<template>
    <div class="container">

        <el-container>

            <win_table :data="pageVO.list" style="width: 100%" max-height="600px">
                <win_table_column prop="taskName" label="任务名称"></win_table_column>
                <win_table_column prop="taskType" label="任务类型"></win_table_column>
                <win_table_column prop="path" label="任务路径"></win_table_column>
                <win_table_column prop="description" label="描述"></win_table_column>
                <win_table_column label="操作" width="180">
                    <template slot-scope="scope">
                        <div class="operate">
                            <span @click="deleteTask(scope.row)">删除</span>
                            <span @click="openUpdateDialog(scope.row)">修改</span>
                            <span @click="exec(scope.row)">执行</span>
                        </div>
                    </template>
                </win_table_column>
            </win_table>

            <win_pagination v-bind:child-msg="pageVO" @callFather="pageQuery"></win_pagination>

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
