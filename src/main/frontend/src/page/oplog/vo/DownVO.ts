import { DicRepVO } from "../../dictionary/vo/DicVO";
export default class DownVO {
    /**操作用户,下拉框数据 */
    userSelect: User[] = [new User(1, "张山"), new User(2, "王五")];
    /**日志类型,下拉框数据 */
    logTypeSelect: DicRepVO[] = [];

    static init() {
        return new DownVO();
    }
}

export class User {
    id: number;
    name: string;
    title: string;

    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.title = name;
    }
}
