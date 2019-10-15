<template>
    <div class="container">
        <!--程序主窗体-->
        <el-container height="100%">
            <el-aside width="185px">
                <div ref="userinfo">
                    <el-button-group style="width:185px;margin-bottom:-18px ">
                        <win-button :disabled="level!=1" type="info" round @click="addflowgroup" icon="el-icon-plus">新增</win-button>
                        <win-button type="info" icon="el-icon-delete" round @click="delflowgroup">删除</win-button>
                    </el-button-group>

                    <!--左侧树形列表 -->
                    <el-tree style="margin-top:10px; width:185px;top: 30px;bottom: 0;position: absolute" ref="SlotTree" node-key="id" :accordion="true" :default-expanded-keys="expandList" :data="treedata" :auto-expand-parent="false"
                        @node-click="handleNodeClick" :highlight-current="true">
                        <div class="comp-tr-node" slot-scope="{ node, data }">
                            <template v-if="data.isEdit">
                                <el-input size="mini" v-focus v-model.trim="data.label" @blur.stop="handleBlur(data)" @keyup.enter.native="handleBlur(data)" :ref="'slotTreeInput' +data.id" :id="data.id" :autofocus="true" :maxlength="15">
                                </el-input>
                            </template>
                            <template v-else>
                                <span @dblclick="edit(data)">
                                    {{ data.label }}
                                </span>
                            </template>
                        </div>
                    </el-tree>
                </div>
            </el-aside>
            <el-container>
                <el-header height="165px">
                    <win-form :inline="true" :model="reqVO" class="demo-form-inline" v-testName="{'TEST_NAME':'WLL'}">
                        <el-row>
                            <win-form-item label="流程名称" style="margin-right:-15px;margin-left:-25px">
                                <!-- <el-input v-model="reqVO.flowName" :maxlength="80"></el-input> -->

                                <win-select v-model="reqVO.flowName" filterable clearable placeholder="请选择">
                                    <win-option v-for="item in staticSelectItemVO.flowNameItems" :key="item.code" :label="item.name" :value="item.name"></win-option>
                                </win-select>

                            </win-form-item>
                            <win-form-item label="流程类型" style="margin-right:-15px">
                                <win-select v-model="reqVO.flowType" filterable clearable placeholder="请选择">
                                    <win-option v-for="item in staticSelectItemVO.flowTypeItems" :key="item.code" :label="item.name" :value="item.code"></win-option>
                                </win-select>
                            </win-form-item>
                            <win-form-item label="产品" style="margin-right:-15px">
                                <win-select v-model="reqVO.productCode" filterable clearable placeholder="请选择" @change="changeItems('reqVO','PRO',reqVO.productCode)">
                                    <win-option v-for="item in staticSelectItemVO.productItems" :key="item.no" :label="item.name" :value="item.no">
                                        <span style="float: left">{{ item.code }}</span>
                                        <span>{{ "&nbsp;"+item.name }}</span>
                                    </win-option>
                                </win-select>
                            </win-form-item>
                            <win-form-item label="资产单元" style="margin-right:-15px">
                                <win-select v-model="reqVO.investCompany" filterable clearable placeholder="请选择" @change="changeItems('reqVO','COM',reqVO.investCompany)">
                                    <win-option v-for="item in items.reqVO.investCompanyItems" :key="item.code" :label="item.name" :value="item.code"></win-option>
                                </win-select>
                            </win-form-item>

                            <win-form-item style="width:120px">
                                <el-button type="text" style="color:#FF900D" :icon="isShowClass" @click="showMore" round>{{showMoreText}}</el-button>
                            </win-form-item>
                            <win-form-item>
                                <win-button @click="queryExchangeFlow(reqVO)" type="primary">查询</win-button>
                                <win-button @click="reset()" type="default">重置</win-button>
                            </win-form-item>
                        </el-row>
                        <div v-if="isShow">
                            <el-row style="margin-top:-20px;">
                                <win-form-item label="投资组合" style="margin-right:-15px;margin-left:-25px">
                                    <win-select v-model="reqVO.investConstitute" filterable clearable placeholder="请选择" @change="changeLink">
                                        <win-option v-for="item in items.reqVO.investConstituteItems" :key="item.code" :label="item.name" :value="item.code">
                                            <span style="float: left">{{ item.code }}</span>
                                            <span>{{ "&nbsp;"+item.name }}</span>
                                        </win-option>
                                    </win-select>
                                </win-form-item>
                                <win-form-item label="指令类型" style="margin-right:-15px">
                                    <win-select v-model="reqVO.instructionType" filterable clearable placeholder="请选择">
                                        <win-option v-for="item in staticSelectItemVO.instructionTypeItems" :key="item.code" :label="item.name" :value="item.code"></win-option>
                                    </win-select>
                                </win-form-item>
                                <win-form-item label="交易市场" style="margin-right:-15px">
                                    <win-select v-model="reqVO.marketCode" filterable clearable placeholder="请选择" @change="changeItems('reqVO','MAK',reqVO.marketCode)">
                                        <win-option v-for="item in staticSelectItemVO.marketItems" :key="item.code" :label="item.name" :value="item.code"></win-option>
                                    </win-select>
                                </win-form-item>
                                <win-form-item label="证券类型" style="margin-right:-15px">
                                    <win-select v-model="reqVO.securityType" filterable clearable placeholder="请选择" @change="changeLink">
                                        <win-option v-for="item in items.reqVO.securityTypeItems" :key="item.code" :label="item.name" :value="item.code"></win-option>
                                    </win-select>
                                </win-form-item>

                            </el-row>
                            <el-row style="margin-top:-20px">
                                <win-form-item label="交易方向" style="margin-right:-15px;margin-left:-25px">
                                    <win-select v-model="reqVO.transactionDirection" filterable clearable placeholder="请选择" @change="changeLink">
                                        <win-option v-for="item in items.reqVO.transactionDirectionItems" :key="item.code" :label="item.name" :value="item.code">
                                            <span style="float: left">{{ item.code }}</span>
                                            <span>{{ "&nbsp;"+item.name }}</span>
                                        </win-option>
                                    </win-select>
                                </win-form-item>
                            </el-row>
                        </div>
                        <el-row style="margin-left:5px ;margin-bottom:8px;margin-top:-15px">
                            <el-button-group>

                                <win-button :disabled="level!=2" type="info" round @click="openAddDialog()" icon="el-icon-plus">新增</win-button>
                                <win-button :disabled="!options" type="info" icon="el-icon-delete" round @click="batchDelete(tableChecked)">删除</win-button>
                                <win-button :disabled="!options" type="info" icon="el-icon-video-play" round @click="startflow(tableChecked)">启用</win-button>
                                <win-button :disabled="!options" type="info" icon="el-icon-video-pause" round @click="stopflow(tableChecked)">停用</win-button>
                            </el-button-group>
                        </el-row>
                    </win-form>
                    <!--返回数据列表-->
                    <win-table ref="xTable1" :data="pageVO.list" :selection-width="20" max-height="680px" :show-index="false" @select-all="selectAllEvent" @select-change="handleSelectionChange" border>
                        <!-- <win-table-column type="selection"></win-table-column> -->
                        <win-table-column prop="flowName" label="流程名称" sortable></win-table-column>
                        <win-table-column prop="flowTypeName" label="流程类型" sortable></win-table-column>
                        <win-table-column prop="productName" label="产品" sortable></win-table-column>
                        <win-table-column prop="investCompanyName" label="资产单元" sortable></win-table-column>
                        <win-table-column prop="investConstituteName" label="投资组合" sortable></win-table-column>
                        <win-table-column prop="instructionTypeName" label="指令类型" sortable></win-table-column>
                        <win-table-column prop="marketCodeName" label="交易市场" sortable></win-table-column>
                        <win-table-column prop="securityTypeName" label="证券类型" sortable></win-table-column>
                        <win-table-column prop="transactionDirectionName" label="交易方向" sortable></win-table-column>
                        <win-table-column label="启用标志" prop="startFlag">
                            <template slot-scope="scope">
                                <el-switch v-model="scope.row.startFlag" :active-value="true" :inactive-value="false" active-color="#13ce66" inactive-color="#ff4949" @change="change(scope.row,scope.row.startFlag)"></el-switch>
                            </template>
                        </win-table-column>
                        <win-table-column min-width="200" prop="publisherCode" fi label="操作" header-align="center" align="center" fixed="right">
                            <template slot-scope="scope">
                                <win-button type="text" @click="openUpdateDialog(scope.row)" size="small" icon="el-icon-edit-outline">修改</win-button>

                                <win-button type="text" @click="designFlow(scope.row)" size="small" icon="el-icon-link">设计流程</win-button>
                            </template>
                        </win-table-column>
                    </win-table>
                    <!--分页组件-->
                    <!-- <Pagination v-bind:childMsg="pageVO" @callFather="pageQuery"></Pagination> -->
                    <win-pagination v-bind:child-msg="pageVO" @callFather="pageQuery"></win-pagination>
                </el-header>
            </el-container>
        </el-container>

        <!--修改、增加框 -->

        <win-fdialog :title="dialogTitle" :visible.sync="dialogVisible" width="40%" class="dialogclass" :close-on-click-modal="false" @close="closeDialog('exchangeForm')">
            <win-form :inline="true" label-position="right" ref="exchangeForm" :model="flowVO" :rules="rules" v-testName="{'TEST_NAME':'WLL'}">
                <div class="form_content_flow" style="margin-top: 20px;">
                    <win-form-item label="流程名称" prop="flowName">
                        <win-input v-model.trim="flowVO.flowName" :disabled="flowVO.id!=null" :maxlength="80"></win-input>
                    </win-form-item>
                    <win-form-item label="流程类型" prop="flowType">
                        <win-select v-model="flowVO.flowType" :disabled="flowVO.id!=null" filterable clearable placeholder="请选择">
                            <win-option v-for="item in staticSelectItemVO.flowTypeItems" :key="item.code" :label="item.name" :value="item.code"></win-option>
                        </win-select>
                    </win-form-item>
                </div>
                <div class="form_content_flow">
                    <win-form-item label="有效日期" prop="timeArray">
                        <!-- <el-date-picker v-model="flowVO.beginDate" value-format="yyyy-MM-dd" type="date" placeholder="开始日期"></el-date-picker>
                        <el-date-picker v-model="flowVO.endDate" value-format="yyyy-MM-dd" type="date" placeholder="结束日期"></el-date-picker> -->
                        <win-date-picker style="width: 80%;" v-model="flowVO.timeArray" format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :disabled="deleteFlag"></win-date-picker>
                    </win-form-item>
                </div>
                <div class="form_content_flow">
                    <win-form-item label="产品" prop="productCode">
                        <win-select v-model="flowVO.productCode" :disabled="flowVO.id!=null" filterable clearable placeholder="请选择" @change="changeItems('flowVO','PRO',flowVO.productCode)">
                            <win-option v-for="item in staticSelectItemVO.productItems" :key="item.no" :label="item.name" :value="item.no">
                                <span style="float: left">{{ item.code }}</span>
                                <span>{{ "&nbsp;"+item.name }}</span>
                            </win-option>
                        </win-select>
                    </win-form-item>
                    <win-form-item label="资产单元" prop="investCompany">
                        <win-select v-model="flowVO.investCompany" filterable clearable placeholder="请选择" :disabled="deleteFlag" @change="changeItems('flowVO','COM',flowVO.investCompany)">
                            <win-option v-for="item in items.flowVO.investCompanyItems" :key="item.code" :label="item.name" :value="item.code"></win-option>
                        </win-select>
                    </win-form-item>
                </div>
                <div class="form_content_flow">
                    <win-form-item label="投资组合" prop="investConstitute">
                        <win-select v-model="flowVO.investConstitute" filterable clearable placeholder="请选择" :disabled="deleteFlag" @change="changeLink">
                            <win-option v-for="item in items.flowVO.investConstituteItems" :key="item.code" :label="item.name" :value="item.code">
                                <span style="float: left">{{ item.code }}</span>
                                <span>{{ "&nbsp;"+item.name }}</span>
                            </win-option>
                        </win-select>
                    </win-form-item>
                    <win-form-item label="指令类型">
                        <win-select v-model="flowVO.instructionType" filterable clearable placeholder="请选择" :disabled="deleteFlag">
                            <win-option v-for="item in staticSelectItemVO.instructionTypeItems" :key="item.code" :label="item.name" :value="item.code"></win-option>
                        </win-select>
                    </win-form-item>
                </div>
                <div class="form_content_flow">
                    <win-form-item label="交易市场" prop="marketCode">
                        <win-select v-model="flowVO.marketCode" filterable clearable placeholder="请选择" @change="changeItems('flowVO','MAK',flowVO.marketCode)" :disabled="deleteFlag">
                            <win-option v-for="item in staticSelectItemVO.marketItems" :key="item.code" :label="item.name" :value="item.code"></win-option>
                        </win-select>
                    </win-form-item>
                    <win-form-item label="证券类型">
                        <win-select v-model="flowVO.securityType" filterable clearable placeholder="请选择" :disabled="deleteFlag" @change="changeLink">
                            <win-option v-for="item in items.flowVO.securityTypeItems" :key="item.code" :label="item.name" :value="item.code"></win-option>
                        </win-select>
                    </win-form-item>
                </div>
                <div class="form_content_flow">
                    <win-form-item label="交易方向" prop="transactionDirection">
                        <win-select v-model="flowVO.transactionDirection" filterable clearable placeholder="请选择" :disabled="deleteFlag" @change="changeLink">
                            <win-option v-for="item in items.flowVO.transactionDirectionItems" :key="item.code" :label="item.name" :value="item.code">
                                <span style="float: left">{{ item.code }}</span>
                                <span>{{ "&nbsp;"+item.name }}</span>
                            </win-option>
                        </win-select>
                    </win-form-item>
                    <win-form-item label="控制类型">
                        <win-select v-model="flowVO.controlType" filterable clearable placeholder="请选择" :disabled="deleteFlag">
                            <win-option v-for="item in staticSelectItemVO.controlTypeItems" :key="item.code" :label="item.name" :value="item.code"></win-option>
                        </win-select>
                    </win-form-item>
                    <win-input v-if="false" v-model="flowVO.flowCode"></win-input>
                </div>
            </win-form>
            <span slot="footer" class="dialog-footer">
                <win-button @click="closeDia('exchangeForm')" type="default">取消</win-button>
                <span v-if="deleteFlag">
                    <win-button @click="deleteExchangeFlow('exchangeForm')" type="primary">确认</win-button>
                </span>
                <span v-else-if="flowVO.id">
                    <win-button @click="updateExchangeFlow('exchangeForm')" type="primary">确认</win-button>
                </span>
                <span v-else>
                    <win-button @click="addExchangeFlow('exchangeForm')" type="primary">确认</win-button>
                </span>
            </span>
            <!-- <div>

                    <win-button @click="closeDialog('exchangeForm')" class="defaultButton">取消</win-button>
                    <span v-if="deleteFlag">
                        <win-button @click="deleteExchangeFlow(true)" class="yellowButton">确认</win-button>
                    </span>
                    <span v-else-if="flowVO.id">
                        <win-button @click="updateExchangeFlow(true)" class="yellowButton">确认</win-button>
                    </span>
                    <span v-else>
                        <win-button @click="addExchangeFlow(true)" class="yellowButton">确认</win-button>
                    </span>
                </div> -->
        </win-fdialog>
        <!--end -->
        <!-- 流程弹出窗体-->
        <win-fdialog @close="closeFlowDialog" title="流程设计" :visible.sync="dialogTableVisible" width="1740px" height="760px" top="50px">
            <iframe :src="flowUrl" style="width:100%;height:760px;" frameborder="0" marginwidth="0" marginheight="0" ref="frame" id="frame"></iframe>
        </win-fdialog>
        <!-- 流程弹出窗体结束-->
    </div>
</template>
<script lang="ts">
import ExchangeFlowController from "../controller/ExchangeFlowController";
import Component from "vue-class-component";
import ElementUI from "element-ui";
export default class Exchange extends ExchangeFlowController {
    /**鼠标聚焦 */
    /**鼠标移开 */
}
</script>
<style lang="scss" scoped>
/*@import "../../../assets/style/page.scss";*/
.flow {
    position: fixed;
    width: 80%;
    height: 100%;
    right: 0;
    top: 0;
    background: #000;
    z-index: 9999;
}
.win_aside {
    background-color: #000;
    color: #333;
    text-align: center;
    /*line-height: 600px;*/
}

.win_header {
    background-color: #000;
    height: 20%;
}
.form_content_flow {
    height: 12%;
}
.dialogclass {
    margin-top: 62px;
}
</style>


