import Vue from "vue";
import Component from "vue-class-component";
import ParamRivalTrader from "../view/ParamRivalTrader.vue";
import ParamRivalBankAccount from "../view/ParamRivalBankAccount.vue";
import ParamRivalCashAccount from "../view/ParamRivalCashAccount.vue";

@Component({
    components: {
        ParamRivalTrader,
        ParamRivalBankAccount,
        ParamRivalCashAccount
    }
})
export default class ParamRivalTabsController extends Vue {
    private activeName: string = "first";
}
