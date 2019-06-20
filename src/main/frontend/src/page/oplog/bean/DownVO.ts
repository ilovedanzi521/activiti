import { DicRepVO } from "../../dictionary/vo/DicVO";
export default class DownVO {
    /**操作用户,下拉框数据 */
    userSelect: User[] = [new User(1, "张山"), new User(2, "王五")];
    /**日志类型,下拉框数据 */
    logTypeSelect: DicRepVO[] = [];
    /**时间范围, 下拉框数据 */
    timeRangeSelect: TimeRangeType[] = TimeRangeType.list();

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

export class TimeRangeType {
    title: string;

    value: string;

    constructor(title, value) {
        this.title = title;
        this.value = value;
    }

    static list(): TimeRangeType[] {
        return [
            new TimeRangeType("今天", "TD"),
            new TimeRangeType("昨天", "YD"),
            new TimeRangeType("最近一周", "NW"),
            new TimeRangeType("最近一月", "NM"),
            new TimeRangeType("最近一年", "NY"),
            new TimeRangeType("今自定义", "CS")
        ];
    }
}
