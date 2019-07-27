import Vue from "vue";
import Component from "vue-class-component";
import ProdConsignor from "../view/ProdConsignor.vue";
import ProdSubConsignor from "../view/ProdSubConsignor.vue";
import BaseController from "../../common/controller/BaseController";

@Component({
    components: {
        ProdConsignor,
        ProdSubConsignor
    }
})
export default class ProdConsignorTabsController extends BaseController {
    private activeName: string = "first";
}
