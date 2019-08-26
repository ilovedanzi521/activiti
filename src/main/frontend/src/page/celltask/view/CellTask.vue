<template>
    <div class="container">
        <el-container>
            <el-header>
                <win-form :inline="true" ref="opLogForm" :model="reqVO">
                    <div class="form_content">
                        <win-form-item label="任务名称">
                            <win-input suffix-icon="xxxx" v-model="reqVO.taskName"></win-input>
                        </win-form-item>
                        <win-form-item label="任务类型">
                            <win-select v-model="reqVO.taskType" filterable placeholder="请选择">
                                <win-option key="kettle" label="kettle" value="kettle"></win-option>
                                <win-option key="shell" label="shell" value="shell"></win-option>
                            </win-select>
                            <!-- <win-input suffix-icon="xxxx" v-model="reqVO.taskType"></win-input> -->
                        </win-form-item>
                        <win-form-item label="任务路径">
                            <win-input suffix-icon="xxxx" v-model="reqVO.path"></win-input>
                        </win-form-item>
                        <win-form-item label="描述">
                            <win-input suffix-icon="xxxx" v-model="reqVO.description"></win-input>
                        </win-form-item>
                        <win-form-item>
                            <div class="form-button">
                                <win-button @click="query()" type="primary">查询</win-button>
                                <win-button @click="reset()" type="default">重置</win-button>
                            </div>
                        </win-form-item>
                    </div>
                </win-form>
            </el-header>
        </el-container>
        <el-container>
            <el-aside width="185px">
                <win-menu>
                    <win-menu-item v-on:click="redirectTask">TASK定义</win-menu-item>
                    <win-menu-item v-on:click="redirectDefinition">流程定义</win-menu-item>
                    <win-menu-item v-on:click="redirectInstance">运行实例</win-menu-item>
                    <win-menu-item v-on:click="redirectLog">日志查询</win-menu-item>
                </win-menu>
            </el-aside>
            <el-main>
                <win-button @click=" openAddDialog()" type="primary">新增</win-button>

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
                <!--新增修改-->
                <win-fdialog :title="dialogTitle" :visible.sync="dialogVisible" width="40%">
                    <win-form :inline="true" label-position="left" ref="exchangeForm" :model="reqVO" :rules="rules">
                        <div class="form_content">
                            <win-form-item label="任务名称" prop="taskName">
                                <el-input v-model="reqVO.taskName" :disabled="reqVO.id!=null"></el-input>
                            </win-form-item>
                            <win-form-item label="任务类型" prop="taskType">
                                <!-- <el-input v-model="reqVO.taskType" :disabled="reqVO.id!=null"></el-input> -->
                                <win-select v-model="reqVO.taskType" :disabled="reqVO.id!=null" filterable placeholder="请选择">
                                    <win-option key="kettle" label="kettle" value="kettle"></win-option>
                                    <win-option key="shell" label="shell" value="shell"></win-option>
                                </win-select>
                            </win-form-item>
                        </div>
                        <div class="form_content">
                            <win-form-item label="任务路径" prop="path">
                                <el-input v-model="reqVO.path"></el-input>
                            </win-form-item>
                            <win-form-item label=" 描述" prop="description">
                                <el-input v-model="reqVO.description"></el-input>
                            </win-form-item>
                        </div>

                    </win-form>
                    <el-divider></el-divider>
                    <div>
                        <win-button @click="closeDialog()" class="defaultButton">取消</win-button>
                        <span v-if="reqVO.id">
                            <win-button @click="updateCellTask('exchangeForm')" class="yellowButton">确认</win-button>
                        </span>
                        <span v-else>
                            <win-button @click="addCellTask('exchangeForm')" class="yellowButton">确认</win-button>
                        </span>
                    </div>
                </win-fdialog>
            </el-main>
        </el-container>
    </div>
</template>
<script lang="ts">
import CellTaskController from "../controller/CellTaskController";
import Component from "vue-class-component";
export default class CellTaskView extends CellTaskController {}
</script>
<style lang="scss" scoped>
</style>
