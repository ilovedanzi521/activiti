<template>
    <div class="ps1 transactionForm_contanier">
        <div class="buttonGroup_contanier">
            <li v-if="modifyFlag">
                <div class="fl">
                    <win_button type="primary" @click="modify">修改</win_button>
                </div>
            </li>
            <li v-if="!modifyFlag">
                <div class="fl">
                    <win_button type="primary" @click="update">确认</win_button>
                </div>
                <div class="fr">
                    <win_button type="primary" @click="cancel">取消</win_button>
                </div>
            </li>
        </div>
        <ul class="formContent">
            <li>
                <div class="fl">
                    <span>市场编码</span>
                    <win_input v-model="details.marketCode" :disabled="true"></win_input>
                </div>
                <div class="fr">
                    <span>交易日类型</span>
                    <win_input v-model="details.tradeDayType" :disabled="true"></win_input>
                </div>
            </li>
            <li>
                <div class="fl">
                    <span>市场名称</span>
                    <win_input v-model="details.marketName" :disabled="true"></win_input>
                </div>
                <div class="fr">
                    <span>市场全称</span>
                    <win_input v-model="details.marketFullName" :disabled="true"></win_input>
                </div>
            </li>
            <li>
                <div class="fl">
                    <span>国家/地区</span>
                    <win_input v-model="details.country" :disabled="true"></win_input>
                </div>
                <div class="fr">
                    <span>时区</span>
                    <win_input v-model="details.timeZone" :disabled="true"></win_input>
                </div>
            </li>
            <li>
                <div class="fl">
                    <span>上午开市时间</span>
                    <el-time-select v-model="details.morningMarketOpen" :disabled="modifyFlag" :picker-options="{start: '08:30:00',step: '00:15:00', end: '18:30:00'}" placeholder="选择时间"></el-time-select>
                </div>
                <div class="fr">
                    <span>上午闭市时间</span>
                    <el-time-select v-model="details.morningMarketClose" :disabled="modifyFlag" :picker-options="{start: '08:30',step: '00:15', end: '18:30'}" placeholder="选择时间"></el-time-select>
                </div>
            </li>
            <li>
                <div class="fl">
                    <span>下午开市时间</span>
                    <el-time-select v-model="details.afternoonMarketOpen" :disabled="modifyFlag" :picker-options="{start: '08:30',step: '00:15', end: '18:30'}" placeholder="选择时间"></el-time-select>
                </div>
                <div class="fr">
                    <span>下午闭市时间</span>
                    <el-time-select v-model="details.afternoonMarketClose" :disabled="modifyFlag" :picker-options="{start: '08:30',step: '00:15', end: '18:30'}" placeholder="选择时间"></el-time-select>
                </div>
            </li>
            <li>
                <div class="fl">
                    <span>晚上开市时间</span>
                    <el-time-select v-model="details.nightMarketOpen" :disabled="modifyFlag" :picker-options="{start: '08:30',step: '00:15', end: '18:30'}" placeholder="选择时间"></el-time-select>
                </div>
                <div class="fr">
                    <span>晚上闭市时间</span>
                    <el-time-select v-model="details.nightMarketClose" :disabled="modifyFlag" :picker-options="{start: '08:30',step: '00:15', end: '18:30'}" placeholder="选择时间"></el-time-select>
                </div>
            </li>
            <li>
                <div>
                    <span class="beizhu">备注</span>
                    <!-- <win_input v-model="details.remark" :disabled="modifyFlag" type="textarea" :autosize="{ minRows: 3, maxRows: 5}"></win_input> -->
                    <textarea cols="2" rows="5" v-model="details.remark" :disabled="modifyFlag"></textarea>
                </div>
            </li>
        </ul>
    </div>
</template>
<script lang="ts">
import MarketDetailController from "../controller/MarketDetailController";
import Component from "vue-class-component";
@Component
export default class Market extends MarketDetailController {}
</script>
<style lang="scss" scoped>
@import "../../../assets/style/element.scss";

.transactionForm_contanier {
    width: 1158px;
    height: 708px;
    margin: 20px auto 0;
    padding: 26px 34px 0 34px;
    background: #2b3551;
    box-sizing: border-box;
    .buttonGroup_contanier {
        border-bottom: 1px solid #6b7286;
        margin-bottom: 44px;
        li {
            margin-bottom: 24px;
        }
    }
    input {
        @include iuputUi();
        display: inline-block;
        vertical-align: middle;
    }

    span {
        display: inline-block;
        width: 90px;
        text-align: right;
        font-size: 14px;
        margin-right: 10px;
        vertical-align: middle;
        color: #adb5bb;
    }
}
.formContent {
    width: 100%;
    li {
        // display: flex;
        // flex-direction: row;
        margin-bottom: 38px;
        width: 100%;
        div.fl {
            margin-left: 100px;
        }
        div.fr {
            // background: red;
            margin-left: 150px;
        }
        .beizhu {
            display: inline-block;
            vertical-align: middle;
            width: 188px;
            // padding-top: 30px;
        }
        textarea {
            display: inline-block;
            vertical-align: middle;
            width: 700px;
            background: #2b3551;
            border: 1px solid #6b7286;
            border-radius: 6px;
            outline: none;
            color: #fff;
            resize: none;
            font-size: 14px;
            padding: 12px 0 0 24px;
            box-sizing: border-box;
        }

        // justify-content: center;
        // align-items: center;
    }
}

li {
    width: 80%;
    margin-bottom: 32px;
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