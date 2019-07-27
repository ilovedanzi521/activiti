import Vue from "vue";
import Component from "vue-class-component";
import BondInfo from "@/page/securityInfo/view/BondInfo.vue";
import BondRate from "@/page/securityInfo/view/BondRate.vue";
import BondSerial from "@/page/securityInfo/view/BondSerial.vue";
import BondInterestRateChange from "@/page/securityInfo/view/InterestRateChangeInfo.vue";

@Component({
    components: { BondInfo, BondRate, BondSerial, BondInterestRateChange }
})
export default class BondController extends Vue {
    private activeName: string = "first";
}
