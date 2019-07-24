import { DicRepVO } from "../../dictionary/vo/DicVO";
import ParamCurrencyRepVO from "../../currency/vo/ParamCurrencyRepVO";
export default class ProdEscrowAccountInfoDic {
    public currencyDic: ParamCurrencyRepVO[] = [];
    public accountTypeDic: DicRepVO[] = [];
    public provinceDic: DicRepVO[] = [];
    public cityDic: DicRepVO[] = [];
}
