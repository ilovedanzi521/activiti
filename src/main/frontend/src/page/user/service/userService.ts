import { WinResponseData } from "../../common/vo/BaseVO";
import { UserReqVO } from "../vo/UserVO";
import AxiosFun from "../../../api/AxiosFun";

/**
 * user页面获取数据
 */
export default class userService {
    /**获取树形公司菜单 */
    static getCompany(): Promise<WinResponseData> {
        return AxiosFun.post(
            AxiosFun.authCenterServiceName + "/api/menuTree/cdrTree",
            {}
        );
    }

    static getUsers(vo): Promise<WinResponseData> {
        return AxiosFun.post(
            AxiosFun.authCenterServiceName + "/api/multiQuery/userCompanyPage",
            vo
        );
    }
    /**添加公司 */
    static addCompany(vo: UserReqVO): Promise<WinResponseData> {
        return AxiosFun.post(
            AxiosFun.authCenterServiceName + "/api/company/add",
            vo
        );
    }

    /**编辑公司 */
    static editCompany(vo: UserReqVO): Promise<WinResponseData> {
        return AxiosFun.post(
            AxiosFun.authCenterServiceName + "/api/company/modify",
            vo
        );
    }

    /**删除公司 */
    static deleteCompany(vo: UserReqVO): Promise<WinResponseData> {
        return AxiosFun.post(
            AxiosFun.authCenterServiceName + "/api/company/delete",
            vo
        );
    }

    /**获取公司下所有角色 */
    static getRoleList(vo: UserReqVO): Promise<WinResponseData> {
        return AxiosFun.post(
            AxiosFun.authCenterServiceName + "/api/role/list",
            vo
        );
    }

    /**
     * 获取公司下所有用户
     */
    static getCompanyUser(vo: UserReqVO): Promise<WinResponseData> {
        return AxiosFun.post(
            AxiosFun.authCenterServiceName + "/api/user/list",
            vo
        );
    }

    /**添加部门 */
    static addDepartment(vo: UserReqVO): Promise<WinResponseData> {
        return AxiosFun.post(
            AxiosFun.authCenterServiceName + "/api/department/add",
            vo
        );
    }
    /**添加部门 */
    static createDepartmentCode(vo: UserReqVO) {
        return AxiosFun.post(
            AxiosFun.authCenterServiceName +
                "/api/department/createDepartmentCode",
            vo
        );
    }
    /**编辑部门 */
    static editDepartment(vo: UserReqVO): Promise<WinResponseData> {
        return AxiosFun.post(
            AxiosFun.authCenterServiceName + "/api/department/modify",
            vo
        );
    }

    /**删除部门 */
    static deleteDepartment(vo: UserReqVO): Promise<WinResponseData> {
        return AxiosFun.post(
            AxiosFun.authCenterServiceName + "/api/department/delete",
            vo
        );
    }

    //添加角色
    static addRole(vo: UserReqVO): Promise<WinResponseData> {
        return AxiosFun.post(
            AxiosFun.authCenterServiceName + "/api/departmentRole/add",
            vo
        );
    }
    //修改角色
    static updateRole(vo: UserReqVO): Promise<WinResponseData> {
        return AxiosFun.post(
            AxiosFun.authCenterServiceName + "/api/departmentRole/update",
            vo
        );
    }
    //删除角色
    static deleteRole(vo: UserReqVO): Promise<WinResponseData> {
        return AxiosFun.post(
            AxiosFun.authCenterServiceName + "/api/departmentRole/delete",
            vo
        );
    }

    /*获取修改用户的权限*/
    static getRoleRight(roleId): Promise<WinResponseData> {
        return AxiosFun.get(
            AxiosFun.authCenterServiceName + "/api/menuTree/roles/" + roleId
        );
    }

    /***添加用户角色 */
    static addRoleUser(vo: UserReqVO): Promise<WinResponseData> {
        return AxiosFun.post(
            AxiosFun.authCenterServiceName + "/api/roleUser/add",
            vo
        );
    }

    //获取角色编码
    static createRoleCode(vo: UserReqVO): Promise<WinResponseData> {
        return AxiosFun.post(
            AxiosFun.authCenterServiceName +
                "/api/departmentRole/createRoleCode",
            vo
        );
    }

    /**
     * 用户编码唯一性校验
     * @param userId
     */
    static validateUserCode(userId: string) {
        return AxiosFun.post(
            AxiosFun.authCenterServiceName + "/api/user/userCodeExist",
            { userId: userId }
        );
    }

    //编辑用户
    static editUser(vo: UserReqVO): Promise<WinResponseData> {
        return AxiosFun.post(
            AxiosFun.authCenterServiceName + "/api/user/modify",
            vo
        );
    }

    //添加用户
    static addUser(vo: UserReqVO): Promise<WinResponseData> {
        return AxiosFun.post(
            AxiosFun.authCenterServiceName + "/api/user/add",
            vo
        );
    }

    /**
     * 初始化菜单树角色
     */
    static initTree(vo): Promise<WinResponseData> {
        return AxiosFun.post(
            AxiosFun.authCenterServiceName + "/api/menuTree/all",
            vo
        );
    }

    /**
     * 新加部门角色
     */
    static addDepartmentRole(vo): Promise<WinResponseData> {
        return AxiosFun.post(
            AxiosFun.authCenterServiceName + "/api/departmentRole/add",
            vo
        );
    }

    //冻结用户
    static forbidUser(vo: UserReqVO): Promise<WinResponseData> {
        return AxiosFun.post(
            AxiosFun.authCenterServiceName + "/api/user/forbid",
            vo
        );
    }

    //解冻用户
    static thawUser(vo: UserReqVO): Promise<WinResponseData> {
        return AxiosFun.post(
            AxiosFun.authCenterServiceName + "/api/user/thaw ",
            vo
        );
    }

    //重置密码
    static resetPassword(vo: UserReqVO): Promise<WinResponseData> {
        return AxiosFun.post(
            AxiosFun.authCenterServiceName + "/api/user/reset",
            vo
        );
    }

    //注销用户
    static cancelUser(vo: UserReqVO): Promise<WinResponseData> {
        return AxiosFun.post(
            AxiosFun.authCenterServiceName + "/api/user/cancel",
            vo
        );
    }
}
