import { DicRepVO } from "../../dictionary/vo/DicVO";
/**
 * 类描述：用户日志界面下拉框数据VO
 * 创建人：@author jianshengxiong
 * 创建时间：2019/6/14
 *
 */
export default class DownVO {
    /**操作用户,下拉框数据 */
    userSelect: User[] = [];
    /**日志类型,下拉框数据 */
    logTypeSelect: DicRepVO[] = [];

    static init(): DownVO {
        return new DownVO();
    }
}

export class User {
    userId: number;
    userName: string;
}
