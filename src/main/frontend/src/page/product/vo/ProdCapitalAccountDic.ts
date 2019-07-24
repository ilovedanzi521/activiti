import { DicRepVO } from "../../dictionary/vo/DicVO";
import ParamCurrencyRepVO from "../../currency/vo/ParamCurrencyRepVO";
export default class ProdCapitalAccountDic {
    public brokerType: DicRepVO[] = [];
    public accountStatus: DicRepVO[] = [];
    public accountType: DicRepVO[] = [];
    public currencyDic: ParamCurrencyRepVO[] = [];
}
