class DateUtils {
    /**默认开始时间 */
    defaultStartTime(): Date {
        return new Date(new Date().toLocaleDateString());
    }
    /**默认结束时间 */
    defaultEndtTime(): Date {
        const start = new Date(new Date().toLocaleDateString());
        const endtime = 24 * 60 * 60 * 1000 - 1;
        return new Date(start.getTime() + endtime);
    }
    /**今天 */
    setTDTime(picker) {
        const start = new Date(new Date().toLocaleDateString());
        const endtime = 24 * 60 * 60 * 1000 - 1;
        const end = new Date(start.getTime() + endtime);
        picker.$emit("pick", [start, end]);
    }
    /**昨天 */
    setYDTime(picker) {
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        const start = new Date(yesterday.toLocaleDateString());
        const endtime = 24 * 60 * 60 * 1000 - 1;
        const end = new Date(start.getTime() + endtime);
        picker.$emit("pick", [start, end]);
    }
    /**最近一周 */
    setNWTime(picker) {
        const nearWeek = new Date(new Date().setDate(new Date().getDate() - 6));
        const start = new Date(nearWeek.toLocaleDateString());
        const endtime = 24 * 60 * 60 * 1000 - 1;
        const end = new Date(
            new Date(new Date().toLocaleDateString()).getTime() + endtime
        );
        picker.$emit("pick", [start, end]);
    }
    /**最近一月 */
    setNMTime(picker) {
        const nearMonth = new Date(
            new Date().setMonth(new Date().getMonth() - 1)
        );
        const start = new Date(nearMonth.toLocaleDateString());
        const endtime = 24 * 60 * 60 * 1000 - 1;
        const end = new Date(
            new Date(new Date().toLocaleDateString()).getTime() + endtime
        );
        picker.$emit("pick", [start, end]);
    }
    /**最近一年 */
    setNYTime(picker) {
        const nearYear = new Date(
            new Date().setFullYear(new Date().getFullYear() - 1)
        );
        const start = new Date(nearYear.toLocaleDateString());
        const endtime = 24 * 60 * 60 * 1000 - 1;
        const end = new Date(
            new Date(new Date().toLocaleDateString()).getTime() + endtime
        );
        picker.$emit("pick", [start, end]);
    }
}

let dateUtils: DateUtils = new DateUtils();
export default dateUtils;
