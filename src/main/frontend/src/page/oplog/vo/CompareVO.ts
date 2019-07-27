import { DateRangeType } from "../../common/enum/DateRangeType";
import { DicRepVO } from "../../dictionary/vo/DicVO";
import dateUtils from "../../common/util/DateUtils";

/** 用户类型 */
class User {
    public userId: string;
    public userName: string;
}

/** 数据准备对象 */
export let CompareVO = {
    // 日志类型,下拉框数据
    logTypeSelect: new Array<DicRepVO>(),
    // 操作用户列表
    userList: new Array<User>(),
    // 操作用户下拉列表
    userSelect: new Array<User>(),
    // 操作时间，快捷选项
    pickerOptions: {
        shortcuts: [
            {
                text: DateRangeType.TD,
                onClick: dateUtils.setTDTime
            },
            {
                text: DateRangeType.YD,
                onClick: dateUtils.setYDTime
            },
            {
                text: DateRangeType.NW,
                onClick: dateUtils.setNWTime
            },
            {
                text: DateRangeType.NM,
                onClick: dateUtils.setNMTime
            },
            {
                text: DateRangeType.NHY,
                onClick: dateUtils.setHYTime
            }
        ]
    }
};
