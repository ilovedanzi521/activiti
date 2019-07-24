<template>
    <div class="container">
        <div class="left-contanier">
            <div class="header">
                <span class="headerTitle">系统信息</span>
                <span class="close">✕</span>
            </div>
            <div class="register-content">
                <p class="register-item">
                    <label>公司注册码:</label>
                    <input type="text" placeholder="请填写公司注册码" />
                </p>
                <p class="register-item">
                    <label>产品到期时间:</label>
                    <span>2019/12/12 9：00：00</span>
                </p>
                <p class="register-item">
                    <label>版本信息:</label>
                    <span>V2019C300R016</span>
                </p>
                <p class="register-item btnGronp">
                    <span class="btn submit">提交</span>
                    <span class="btn">取消</span>
                </p>
            </div>
        </div>
        <div class="right-contanier">
            <div class="mast"></div>

        </div>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {};
    },
    created() {},
    mounted() {},
    watch: {},
    computed: {},
    methods: {}
};
</script>
<style lang="scss" scoped>
.container {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;

    .left-contanier {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 0;
        bottom: 0;
        width: 50%;
        background: #fff;
        .header {
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            height: 60px;
            padding: 0 24px;
            color: #ff900d;
            box-sizing: border-box;
            top: 0;
            left: 0;
            box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
            .headerTitle {
                font-size: 18px;
                font-weight: bolder;
            }
            .close {
                font-size: 18px;
            }
        }
        .register-content {
            .register-item {
                margin-bottom: 30px;
                label {
                    width: 120px;
                    display: inline-block;
                    vertical-align: middle;
                    font-size: 16px;
                    text-align: right;
                    color: #54575e;
                    margin-right: 30px;
                }
                span {
                    display: inline-block;
                    vertical-align: middle;
                    height: 48px;
                    line-height: 48px;
                    color: #54575e;
                }
                input {
                    width: 334px;
                    height: 40px;
                    line-height: 40px;
                    padding-left: 13px;
                    box-sizing: border-box;
                    border: 1px solid #b7b7b7;
                    &::-webkit-input-placeholder {
                        color: #d3d3d3;
                    }
                }
            }
            .btnGronp {
                margin-left: 132px;
                .btn {
                    width: 152px;
                    height: 40px;
                    display: inline-block;
                    vertical-align: middle;
                    line-height: 40px;
                    border-radius: 6px;
                    border: 1px solid #b7b7b7;
                    background: #fff;
                    text-align: center;
                    color: #999;
                    box-sizing: border-box;
                    &.submit {
                        background: #ff900d;
                        border: 1px solid #ff900d;
                        color: #fff;
                        margin-right: 20px;
                    }
                }
            }
        }
    }
    .right-contanier {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 50%;
        width: 50%;
        background: url("../../../assets/image/7c00f3806d1f8d909f1d4eb8a6dd5ea34213557221671c-3WuwrO(1).png")
            no-repeat;
        background-size: 100% 100%;
        .mast {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
        }
    }
}
</style>