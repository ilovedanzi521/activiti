<template>
    <div class="ps1">
        <div class="fl">
            <ul>
                <li>
                    <div class="fl">
                        <span>交易方向:</span>
                        <win_select clearable filterable v-model="directionReqVO.transactionDirection" placeholder="请选择">
                            <win_option v-for="item in directionCodes" :key="item.transactionDirection" :label="item.transactionDirection+'-'+item.transactionDirectionName" :value="item.transactionDirection"></win_option>
                        </win_select>
                    </div>
                    <div class="fr">
                        <span>证券方向:</span>
                        <win_select clearable v-model="directionReqVO.securityPath" placeholder="请选择">
                            <win_option v-for="item in securityTypeDic.securityPathDic" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode"></win_option>
                        </win_select>
                    </div>
                    <div class="fr">
                        <span>资金方向:</span>
                        <win_select clearable v-model="directionReqVO.fundsPath" placeholder="请选择">
                            <win_option v-for="item in securityTypeDic.fundsPathDic" :key="item.dicCode" :label="item.dicExplain" :value="item.dicCode"></win_option>
                        </win_select>
                    </div>
                    <div class="fr">
                        <win_button style="width: 90px;" type="primary" icon="el-icon-search" @click="queryTransactionDirection">查询</win_button>
                        <win_button style="width: 90px;" icon="el-icon-refresh" @click="reset">重置</win_button>
                    </div>
                </li>
            </ul>
        </div>
        <div class=".ps2">
            <win_table :max-height="520" :data="pageVO.list" style="width: 100%" :showSelection="false">
                <win_table_column prop="marketCode" :formatter="marketFormatter" label="交易市场" width="157"></win_table_column>
                <win_table_column prop="transactionDirection" label="交易方向" width="150"></win_table_column>
                <win_table_column prop="transactionDirectionName" label="交易方向名称" width="180"></win_table_column>
                <win_table_column prop="declarePath" :formatter="declarePatFormatter" label="申报方向" width="180"></win_table_column>
                <win_table_column prop="fundsPath" :formatter="fundsPathFormatter" label="资金方向" width="180"></win_table_column>
                <win_table_column prop="securityPath" :formatter="securityPathFormatter" label="证券方向" width="180"></win_table_column>
                <win_table_column prop="effectSecurity" :formatter="effectSecurityFormatter" label="影响证券" width="180"></win_table_column>
                <win_table_column prop="relationChangePath" :formatter="relationChangePathFormatter" label="关联变动方向" width="180"></win_table_column>
                <win_table_column prop="relationEffectSecurity" :formatter="relationEffectSecurityFormatter" label="关联影响证券" width="150"></win_table_column>
            </win_table>
            <!-- 分页组件 -->
            <win_pagination v-bind:child-msg="pageVO" @callFather="pageQuery"></win_pagination>
        </div>
    </div>
</template>
<script lang="ts">
import Component from "vue-class-component";
import TransactionDirectionController from "../controller/TransactionDirectionController";

@Component
export default class ParamTransactionDirection extends TransactionDirectionController {}
</script>
<style lang="scss" scoped>
@import "../../../assets/style/element.scss";

.ps1 {
    span {
        display: inline-block;
        width: 80px;
        text-align: left;
        vertical-align: middle;
        color: #fff;
    }
}

li {
    width: 100%;
    overflow: hidden;
    .fl {
        float: left;
    }
    .fr {
        float: left;
        margin-left: 30px;
    }
}
</style>