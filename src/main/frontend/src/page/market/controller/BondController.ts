import Vue from "vue";
import Component from "vue-class-component";
import BondInfo from "@/page/market/view/BondInfo.vue";
import BondRate from "@/page/market/view/BondRate.vue";
import BondSerial from "@/page/market/view/BondSerial.vue";
import BondInterestRateChange from "@/page/market/view/InterestRateChangeInfo.vue";

@Component({ components: { BondInfo, BondRate, BondSerial, BondInterestRateChange } })
export default class BondController extends Vue {
    private activeName: string = "first";
}
