import Vue from "vue";
import Component from "vue-class-component";
import ProdConsignor from "../view/ProdConsignor.vue";
import ProdSubConsignor from "../view/ProdSubConsignor.vue";

@Component({
    components: {
        ProdConsignor,
        ProdSubConsignor
    }
})
export default class ProdConsignorTabsController extends Vue {
    private activeName: string = "first";
}
