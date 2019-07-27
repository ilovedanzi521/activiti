<template>
    <win_fdialog title="修改密码" :visible.sync="dialogFormVisible" @close="close" :close-on-click-modal="false" width="420px" v-win_dialogDrag>
        <win_form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm">
            <div>
                <win_form_item label="用户编码">
                    <win_input placeholder="用户名编码" :disabled="true" v-model="userReqVo.user.userCode"></win_input>
                </win_form_item>

            </div>
            <div>
                <win_form_item label="用户姓名">
                    <win_input placeholder="用户姓名" :disabled="true" v-model="userReqVo.user.userName"></win_input>
                </win_form_item>
            </div>
            <div>
                <win_form_item label="重置密码" prop="">
                    <win_input placeholder="请输入密码" autocomplete="off" type="password" v-model="ruleForm.pass"></win_input>
                </win_form_item>
            </div>
            <div>
                <win_form_item label="确认密码" prop="checkPass">
                    <win_input placeholder="请确认密码" v-model="ruleForm.checkPass" autocomplete="off" type="password"></win_input>
                </win_form_item>
            </div>
        </win_form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="handleSubmitPassWord('ruleForm')">确 认</el-button>
        </div>
    </win_fdialog>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Emit } from "vue-property-decorator";
import { win_fdialog } from "@win-frond-frameworks/biz-common";
import { win_button } from "@win-frond-frameworks/biz-common";
import { win_form, win_form_item } from "@win-frond-frameworks/biz-common";
import { win_input } from "@win-frond-frameworks/biz-common";
import { UserReqVO, UserClass } from "../vo/UserVO";
@Component({
    components: {
        win_fdialog,
        win_button,
        win_form,
        win_form_item,
        win_input
    }
})
export default class Password extends Vue {
    dialogFormVisible: boolean = true;
    ruleForm = {
        pass: "",
        checkPass: ""
    };

    @Prop()
    userReqVo: UserReqVO;

    validatePass2 = (rule, value, callback) => {
        if (value === "") {
            callback(new Error("请再次输入密码"));
        } else if (value !== this.ruleForm.pass) {
            callback(new Error("两次输入密码不一致!"));
        } else {
            callback();
        }
    };

    rules = {
        pass: [{ required: true, message: "请输入密码", trigger: "blur" }],
        checkPass: [{ validator: this.validatePass2, trigger: "blur" }]
    };

    handleSubmitPassWord(formName) {
        let form: any = this.$refs[formName];
        form.validate(valid => {
            if (valid) {
                let params = {
                    id: this.userReqVo.user.id,
                    loginPassword: this.ruleForm.checkPass
                };
                console.log(params);
                this.$emit("httpResetUserPassword", params);
            } else {
                alert("请按要求填写");
                return false;
            }
        });
    }

    close() {}
}
</script>
<style lang="scss" scoped>
</style>