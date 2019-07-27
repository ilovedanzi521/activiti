import Vue from "vue";
import Component from "vue-class-component";
import { WinRspType } from "../../common/enum/BaseEnum";
import { WinResponseData } from "../../common/vo/BaseVO";
import PageVO from "../../common/vo/PageVO";
// import { userServices } from "../../common/service/BaseService";
import userService from "../service/userService";
import { UserReqVO } from "../vo/UserVO";
import AddCom from "../view/addCom.vue";
import AddDep from "../view/addDep.vue";
import AddRole from "../view/addRole.vue";
import AddUser from "../view/addUser.vue";
import EditCom from "../view/editCom.vue";
import EditDep from "../view/editDep.vue";
import EditRole from "../view/editRole.vue";
import EditUser from "../view/editUser.vue";
import DeleteRole from "../view/deleteRole.vue";
import TabType from "../view/tabtype.vue";
import UserTable from "../view/userTable.vue";
import ForbidUser from "../view/forbidUser.vue";
import CancelUser from "../view/cancelUser.vue";
import ResetPassword from "../view/resetPassword.vue";
import UserRoleRight from "../view/userRoleRight.vue";
import AddRoleUser from "../view/addRoleUser.vue";
import BaseController from "../../common/controller/BaseController";

@Component({
    components: {
        AddUser,
        AddCom,
        AddDep,
        AddRole,
        EditCom,
        EditDep,
        EditRole,
        EditUser,
        UserTable,
        DeleteRole,
        TabType,
        AddRoleUser,
        ForbidUser,
        CancelUser,
        ResetPassword,
        UserRoleRight
    }
})
export default class UserController extends BaseController {
    $set;
    $refs;
    $forceUpdate;
    userStates = ["1"];
    compayArray = [];
    filterText = "";
    userReqVo: UserReqVO = new UserReqVO();

    /**打开添加部门窗口生成部门编码并回填到窗口面板*/
    handleAddDep() {
        this.httpCreateDepartmentCode({
            companyId: this.userReqVo.company.companyId
        });
    }

    /**打开添加角色窗口生成角色编码并回填到角色面板并且获该公司所有角色*/
    handleAddRole() {
        this.httpCreateRoleCode({
            departmentId: this.userReqVo.department.departmentId
        });
        this.httpgetRole({
            companyId: this.userReqVo.company.companyId
        });
    }

    /**打开添加角色用户口窗口获取当前公司下的所有用户
     *
     */
    handleAddRoleUser() {
        let params = {
            companyId: this.userReqVo.company.companyId,
            userState: 1
        };
        this.getCompanyUser(params);
    }

    handleShowRole(params) {
        this.userReqVo.dialogFormVisible = true;
        this.userReqVo.roleInfo = params;
    }

    /***点击切换树形菜单 */
    handleNodeClick(data, node) {
        if (data.cid == 1) {
            if (this.userReqVo.department.departmentId) {
                this.userReqVo.department.departmentId = "";
                this.userReqVo.department.departmentname = "";
                this.userReqVo.department.departmentCode = "";
                this.userReqVo.department.departmentArray = [];
            }
            if (this.userReqVo.role.roleId) {
                this.userReqVo.role.roleId = "";
                this.userReqVo.role.role = "";
                this.userReqVo.role.rolesArray = [];
            }
            this.userReqVo.changeType = 1;
            this.userReqVo.company.companyId = data.id;
            this.userReqVo.company.companyCode = data.companyCode;
            this.userReqVo.company.companySimpleName = data.label;
            this.userReqVo.company.companyName = data.companyName;
            this.userReqVo.department.departmentArray = this.showDepartment(
                this.userReqVo.company.companyId
            );
            this.userReqVo.showTab = this.userReqVo.company.companyId;
            let params = {
                companyId: this.userReqVo.company.companyId,
                userStates: this.userStates
            };
            this.compayArray = [this.userReqVo.company.companyId];
            this.getUser(params);
        } else if (data.cid == 2) {
            if (this.userReqVo.role.role) {
                this.userReqVo.role.role = "";
                this.userReqVo.role.roleId = "";
            }
            this.userReqVo.changeType = 2;
            this.userReqVo.department.departmentId = data.id;
            this.userReqVo.department.departmentname = data.label;
            this.userReqVo.department.departmentCode = data.departmentCode;
            this.userReqVo.role.rolesArray = this.showRles(
                this.userReqVo.department.departmentArray
            );
            // //当没用获取到公司id的时候重新手动获取下公司Id

            let params = {
                companyId: this.userReqVo.company.companyId,
                departmentId: this.userReqVo.department.departmentId,
                userStates: this.userStates
            };
            this.getUser(params);
        } else if (data.cid == 3) {
            this.userReqVo.role.role = data.label;
            this.userReqVo.role.roleId = data.id;
            this.userReqVo.role.roleCode = data.roleCode;
            this.userReqVo.role.roleInfo = data.roleDescription;
            this.userReqVo.role.roleType1 = data.roleType1;
            this.userReqVo.role.mutexRoleId = data.mutexRoleId;
            this.userReqVo.changeType = 3;
            //当没用获取到部门的时候重新手动获取下部门Id
            if (!this.userReqVo.department.departmentId) {
                this.userReqVo.department.departmentId = node.parent.data.id;
                this.userReqVo.department.departmentname =
                    node.parent.data.label;
                this.userReqVo.department.departmentCode =
                    node.paren.data.departmentCode;
            }
            let params = {
                companyId: this.userReqVo.company.companyId,
                departmentId: this.userReqVo.department.departmentId,
                roleId: this.userReqVo.role.roleId,
                userStates: this.userStates
            };
            this.getUser(params);
        } else {
            return;
        }
    }

    /**
     *查询用户以用户注销，正常，冻结模式状态查询
     *
     *
     * **/
    getUserTable(userState) {
        let findItem;
        let findIndex: number;
        findItem = this.userStates.filter((item, index) => {
            if (item === userState) {
                findIndex = index;
                return item;
            }
        });
        if (findItem[0]) {
            if (this.userStates.length == 1) {
                return;
            }
            this.userStates.splice(findIndex, 1);
        } else {
            this.userStates.push(userState);
        }
        this.userReqVo.stateController.switchingUserState = userState;
        let params = {
            ...{
                companyId: this.userReqVo.company.companyId,
                departmentId: this.userReqVo.department.departmentId,
                userStates: this.userStates
            },
            ...this.userReqVo.reqParam
        };
        this.getUser(params);
    }
    /***添加公司*/
    async httpAddCompany(params) {
        userService
            .addCompany(params)
            .then((winResponseData: WinResponseData) => {
                if (WinRspType.SUCC == winResponseData.winRspType) {
                    this.success("添加公司成功");
                } else {
                    this.errorMessage(winResponseData.msg);
                }
            });
    }

    /***编辑公司*/
    async httpEditCompany(params) {
        this.userReqVo.formType = "";
        let result = await userService.editCompany(params);
        this.success("编辑公司成功");
    }
    /***删除公司*/
    httpDeletetCom(param) {
        userService
            .deleteCompany(param)
            .then((winResponseData: WinResponseData) => {
                if (WinRspType.SUCC == winResponseData.winRspType) {
                    this.success("删除公司成功");
                } else {
                    this.errorMessage(winResponseData.msg);
                }
            });
    }

    /***添加部门*/
    async httpAdddepartment(params) {
        this.userReqVo.formType = "";
        let result = await userService.addDepartment(params);
        let index = this.getCompanIndex(this.userReqVo.company.companyId);
        this.success("添加部门成功");
    }

    /***编辑部门*/
    async httpEditdepartment(params) {
        let result = await userService.editDepartment(params);
        this.success("编辑部门成功");
    }
    /***删除部门*/
    httpDeleteDepartment(param) {
        console.log(param);
        userService
            .deleteDepartment(param)
            .then((winResponseData: WinResponseData) => {
                if (WinRspType.SUCC == winResponseData.winRspType) {
                    this.success("删除部门成功");
                } else {
                    this.errorMessage(winResponseData.msg);
                }
            });
    }

    /***添加角色*/

    addRoleRight(option) {
        userService.addRole(option).then((winResponseData: WinResponseData) => {
            if (WinRspType.SUCC == winResponseData.winRspType) {
                this.success("添加角色成功");
            } else {
                this.errorMessage(winResponseData.msg);
            }
        });
    }

    /**修改角色 */
    httpEditRole(prams) {
        userService
            .updateRole(prams)
            .then((winResponseData: WinResponseData) => {
                if (WinRspType.SUCC == winResponseData.winRspType) {
                    this.success("修改角色成功");
                } else {
                    this.errorMessage(winResponseData.msg);
                }
            });
    }

    /**删除角色 */
    httpDeleteRole(prams) {
        console.log(prams);
        userService
            .deleteRole(prams)
            .then((winResponseData: WinResponseData) => {
                if (WinRspType.SUCC == winResponseData.winRspType) {
                    this.success("删除角色成功");
                } else {
                    this.errorMessage(winResponseData.msg);
                }
            });
    }
    /***添加用户角色*/
    adduserRole(params) {
        userService
            .addRoleUser(params)
            .then((winResponseData: WinResponseData) => {
                if (WinRspType.SUCC == winResponseData.winRspType) {
                    this.successMessage("增加用户角色成功");
                    let params = {
                        companyId: this.userReqVo.company.companyId
                    };
                    this.getUser(params);
                    this.userReqVo.stateController.switchFormType = "";
                } else {
                    this.errorMessage(winResponseData.msg);
                }
            });
    }

    /**
     *  用户编码唯一性校验
     * @param userId 用户ID
     * @param callback 回调函数
     */
    httpValidateUserCode(userId: string, callback: any) {
        console.log("httpValidateUserCode userId == " + userId);
        userService
            .validateUserCode(userId)
            .then((winResponseData: WinResponseData) => {
                if (WinRspType.SUCC == winResponseData.winRspType) {
                    if (winResponseData.data) {
                        callback("用户编码已经存在");
                    } else {
                        callback();
                    }
                } else {
                    this.errorMessage(winResponseData.msg);
                }
            });
    }

    /***添加用户*/
    async httpAddUser(params) {
        let companyCode = this.userReqVo.company.companyCode;
        let departmentCode = this.userReqVo.department.departmentCode;
        let departmentId = this.userReqVo.department.departmentId;
        this.userReqVo.formType = "";
        let newParams = {
            ...params,
            companyCode: companyCode,
            departmentCode: departmentCode,
            departmentId
        };

        userService
            .addUser(newParams)
            .then((winResponseData: WinResponseData) => {
                if (WinRspType.SUCC == winResponseData.winRspType) {
                    this.userReqVo.stateController.switchFormType = "";
                    this.win_message_success("新增用户成功");
                    let params = {
                        companyId: this.userReqVo.company.companyId
                    };
                    this.getUser(params);
                } else {
                    this.win_message_error(winResponseData.msg);
                }
            });
    }

    /***编辑用户*/
    httpEditUser(res) {
        let companyCode = this.userReqVo.company.companyCode;
        let departmentCode = this.userReqVo.department.departmentCode;
        let params = {
            ...res,
            companyCode: companyCode,
            departmentCode: departmentCode
        };
        userService
            .editUser(params)
            .then((winResponseData: WinResponseData) => {
                if (WinRspType.SUCC == winResponseData.winRspType) {
                    this.userReqVo.stateController.switchFormType = "";
                    this.win_message_success("修改用户成功");
                    let params = {
                        companyId: this.userReqVo.company.companyId
                    };
                    this.getUser(params);
                } else {
                    this.win_message_error(winResponseData.msg);
                }
            });
    }
    /***冻结用户*/
    httpForbidUser() {
        userService.forbidUser({ id: this.userReqVo.user.id }).then(() => {
            this.successMessage("用户冻结成功");
            let params = { companyId: this.userReqVo.company.companyId };
            this.getUser(params);
            this.userReqVo.stateController.switchFormType = "";
        });
    }
    /***解冻用户*/
    httpThawUser() {
        userService.thawUser({ id: this.userReqVo.user.id }).then(() => {
            this.successMessage("用户解冻成功");
            let params = { companyId: this.userReqVo.company.companyId };
            this.getUser(params);
            this.userReqVo.stateController.switchFormType = "";
        });
    }
    /***重置密码*/
    async httpResetUser(params) {
        userService.resetPassword({ id: this.userReqVo.user.id }).then(() => {
            this.successMessage("用户密码重置成功");
            this.userReqVo.stateController.switchFormType = "";
        });
    }
    /***注销用户*/
    async httpCancelUser(params) {
        console.log(this.userReqVo.user.id);
        userService.cancelUser({ id: this.userReqVo.user.id }).then(() => {
            this.successMessage("用注销成功");
            let params = { companyId: this.userReqVo.company.companyId };
            this.getUser(params);
            this.userReqVo.stateController.switchFormType = "";
        });
    }
    /***剔除该用户*/
    httpEliminateUser(roleId) {
        userService
            .eliminateUser({ userId: this.userReqVo.user.userCode, roleId })
            .then(() => {
                this.successMessage("该用户剔除成功");
                let params = { companyId: this.userReqVo.company.companyId };
                this.getUser(params);
                this.userReqVo.stateController.switchFormType = "";
            });
    }

    /***展示当前公司下的所有部门*/
    showDepartment(companyId: string): any {
        let selectDepartment = this.userReqVo.companArray.filter(
            item => item.id == companyId
        );
        return selectDepartment[0].children;
    }

    /***展示当前部门下的所有部门角色*/
    showRles(array: any[]): any {
        let selectRole = array.filter(
            item => item.id == this.userReqVo.department.departmentId
        );
        return selectRole[0].children;
    }

    /***将下拉框的选择的职位Id保存*/
    setDepartmentId(departmentId) {
        this.userReqVo.department.departmentId = departmentId;
    }

    /***获取当前部门角色列表*/
    changeDep(res) {
        this.userReqVo.department.departmentId = res.id;
        this.userReqVo.department.departmentCode = res.departmentCode;
        this.userReqVo.role.rolesArray = this.showRles(
            this.userReqVo.department.departmentArray
        );
        this.userReqVo.role.role = this.userReqVo.role.rolesArray[0].label;
    }

    /***获取当前公司角色列表*/
    httpgetRole(param) {
        userService
            .getRoleList(param)
            .then((winResponseData: WinResponseData) => {
                if (WinRspType.SUCC == winResponseData.winRspType) {
                    this.userReqVo.company.companyRoleArray = this.setRoles(
                        winResponseData.data
                    );
                } else {
                    this.errorMessage(winResponseData.msg);
                }
            });
    }

    setRoles(array) {
        let roles = [];
        roles = array.map(item => {
            return {
                mutexRoleId: item.id,
                roleName: item.roleName,
                roleCode: item.roleCode,
                roleState: item.roleState,
                roleType: item.roleType,
                createUserId: item.createUserId
            };
        });
        return roles;
    }

    /***生成部门编码*/

    httpCreateDepartmentCode(param) {
        userService
            .createDepartmentCode(param)
            .then((winResponseData: WinResponseData) => {
                if (WinRspType.SUCC == winResponseData.winRspType) {
                    this.userReqVo.department.departmentCode =
                        winResponseData.data;
                } else {
                    this.errorMessage(winResponseData.msg);
                }
            });
    }

    /***生成角色编码*/

    httpCreateRoleCode(param) {
        userService
            .createRoleCode(param)
            .then((winResponseData: WinResponseData) => {
                if (WinRspType.SUCC == winResponseData.winRspType) {
                    console.log(winResponseData.data);
                    this.userReqVo.role.roleCode = winResponseData.data;
                } else {
                    this.errorMessage(winResponseData.msg);
                }
            });
    }

    /***获取当前公司的索引 */
    getCompanIndex(id): number {
        let setindex;
        this.userReqVo.companArray.forEach((item, index) => {
            if (item.id == id) {
                setindex = index;
            }
        });
        return setindex;
    }

    /***获取当前公司部门的索引 */
    getDepartmentIndex(compindex): number {
        let setindex;
        this.userReqVo.companArray[compindex].children.forEach(
            (item, index) => {
                if (item.id == this.userReqVo.department.departmentId) {
                    setindex = index;
                }
            }
        );
        return setindex;
    }

    /***获取当前公司员工 */
    getCompanyUser(param) {
        userService
            .getCompanyUser(param)
            .then((winResponseData: WinResponseData) => {
                if (WinRspType.SUCC == winResponseData.winRspType) {
                    this.userReqVo.company.companyUserArray =
                        winResponseData.data;
                } else {
                    this.errorMessage(winResponseData.msg);
                }
            });
    }

    /***加载树形公司结构 */
    async getCompent() {
        await this.getTree();
        let params = { companyId: this.userReqVo.company.companyId };
        this.getUser(params);
    }
    /***加载公司结构树 */
    async getTree() {
        let comps = await userService.getCompany();
        this.userReqVo.companArray = comps.data.map(item => {
            return {
                id: item.companyId,
                cid: 1,
                label: item.companySimpleName,
                companyName: item.companyFullName,
                companyCode: item.companyCode,
                children: item.departments.map(department => {
                    return {
                        id: department.departmentId,
                        label: department.departmentName,
                        cid: 2,
                        departmentCode: department.departmentCode,
                        children: department.roles.map(role => {
                            return {
                                cid: 3,
                                id: role.roleId,
                                label: role.roleName,
                                roleCode: role.roleCode,
                                roleType1: role.roleType,
                                mutexRoleId: role.mutexRoleId,
                                roleDescription: role.roleDescription
                            };
                        })
                    };
                })
            };
        });
        return comps;
    }
    /***首次加载公司树结构 */
    async fristGetCompent() {
        await this.getTree();
        this.userReqVo.company.companyId = this.userReqVo.companArray[0].id;
        this.userReqVo.company.companySimpleName = this.userReqVo.companArray[0].label;
        this.userReqVo.company.companyName = this.userReqVo.companArray[0].companyName;
        this.userReqVo.company.companyCode = this.userReqVo.companArray[0].companyCode;
        this.userReqVo.showTab = this.userReqVo.companArray[0].id;
        this.userReqVo.department.departmentArray = this.showDepartment(
            this.userReqVo.company.companyId
        );
        let params = {
            companyId: this.userReqVo.company.companyId,
            userStates: this.userStates
        };
        this.compayArray = [this.userReqVo.company.companyId];
        this.getUser(params);
    }

    /**
     * 用户分页查询
     * @param vo
     */
    httpUserPageQuery(vo: PageVO) {
        console.log("vo == " + vo.pageNum + " " + vo.pageSize);

        var params = {
            ...this.userReqVo.reqParam,
            ...{ reqPageNum: vo.pageNum, reqPageSize: vo.pageSize }
        };

        this.getUser(params);
    }

    /***加载查询user表格*/
    async getUser(params) {
        params.reqPageNum = params.reqPageNum || 1;
        params.reqPageSize = params.reqPageSize || 10;

        this.userReqVo.reqParam = params;

        let users = await userService.getUsers(params);
        // console.log(users.data.data);
        let userArray;
        userArray = users.data.list.map(item => {
            return {
                id: item.id,
                userCode: item.userId,
                userName: item.userName,
                contactWay: item.contactWay,
                phoneNumber: item.phoneNumber,
                mailAddress: item.mailAddress,
                departmentName: item.departmentName,
                departmentId: item.departmentId,
                status: item.userState,
                roleNames: item.roleNames,
                userType: item.userType
            };
        });
        this.userReqVo.userPageVO = users.data;
        this.userReqVo.userArray = userArray;
    }

    /***获取当前用户的索引 */
    getUserColumnIndex(id): number {
        let setindex;
        this.userReqVo.userArray.forEach((item, index) => {
            if (item.id == id) {
                setindex = index;
            }
        });
        return setindex;
    }

    handleAddJurisdiction() {
        this.userReqVo.stateController.swicheRoleRight = true;
        userService
            .getRoleRight(this.userReqVo.role.roleId)
            .then((winResponseData: WinResponseData) => {
                if (WinRspType.SUCC == winResponseData.winRspType) {
                    this.userReqVo.roleRightArray = winResponseData.data;
                } else {
                    this.errorMessage(winResponseData.msg);
                }
            });
    }

    /** 树形结构搜索功能*/
    // filterChange() {
    //     this.userReqVo.companArray.forEach(item => {
    //         if (item.label.indexOf(this.filterText) > -1) {
    //             this.compayArray = [];
    //             this.compayArray = [item.id];
    //         }
    //     });
    // }

    filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
    }

    /***添加,删除，编辑成功 */
    success(string: string): void {
        this.successMessage(string);
        this.compayArray = [this.userReqVo.company.companyId];
        this.userReqVo.stateController.switchFormType = "";
        this.getCompent();
    }

    async mounted() {
        this.fristGetCompent();
    }
}
