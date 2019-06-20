/**
 * 表单弹框对象
 */
class DialogFormUtils {
    /**弹框标题 */
    title: string = "";
    /**弹框是否禁用 */
    disableFlag: boolean = false;
    /**弹框功能，1新增 2修改 3删除 */
    action: number = 1;

    getDefaultDialog(): DialogFormUtils {
        this.title = "";
        this.action = 1;
        this.disableFlag = false;
        return this;
    }

    getAddDialog(title): DialogFormUtils {
        this.title = title;
        this.action = 1;
        this.disableFlag = false;
        return this;
    }

    getUpdateDialog(title): DialogFormUtils {
        this.title = title;
        this.action = 2;
        this.disableFlag = false;
        return this;
    }

    getDeleteDialog(title): DialogFormUtils {
        this.title = title;
        this.action = 3;
        this.disableFlag = true;
        return this;
    }
    constructor() {}
}

let dialogVO = new DialogFormUtils();
export default dialogVO;
