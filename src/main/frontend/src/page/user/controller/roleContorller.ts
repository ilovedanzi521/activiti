import Vue from "vue";
import Component from "vue-class-component";
import { UserReqVO } from "../vo/UserVO";
import { WinRspType } from "../../common/enum/BaseEnum";
import { WinResponseData } from "../../common/vo/BaseVO";
import BaseController from "../../common/controller/BaseController";
import userService from "../service/userService";
import { win_fdialog } from "@win-frond-frameworks/biz-common";
import { win_button } from "@win-frond-frameworks/biz-common";
import { win_form, win_form_item } from "@win-frond-frameworks/biz-common";
import { win_select, win_option } from "@win-frond-frameworks/biz-common";
import { win_input } from "@win-frond-frameworks/biz-common";
import { win_table, win_table_column } from "@win-frond-frameworks/biz-common";
import { win_tab, win_tabs } from "@win-frond-frameworks/biz-common";
import {
    win_checkbox,
    win_checkboxButton,
    win_checkboxGroup
} from "@win-frond-frameworks/biz-common";
@Component({
    components: {
        win_select,
        win_option,
        win_input,
        win_form,
        win_form_item,
        win_fdialog,
        win_button,
        win_table,
        win_table_column,
        win_checkbox,
        win_checkboxButton,
        win_checkboxGroup,
        win_tab,
        win_tabs
    }
})
export default class RoleController extends BaseController {
    $set;
    dialogFormVisible: boolean = true;
    activeName: string = "menu";
    checkArray: any = [];
    userReqVo: UserReqVO = new UserReqVO();
    checkedArray = [];
    /** 点击一级菜单的checkout**/
    changeFloorOne(item) {
        item.checked = !item.checked;
        item.version = Math.random() * 100;
        item.children.forEach(element => {
            if (element.children) {
                element.children.forEach(next => {
                    next.checked = item.checked;
                    if (next.children) {
                        next.children.forEach(next2 => {
                            next2.checked = item.checked;
                            if (next2.checked) {
                                this.deleteRoleAdministration(next2.id);
                                this.addRoleAdministration({
                                    firstId: item.id,
                                    secondId: element.id,
                                    threeId: next.id,
                                    id: next2.id,
                                    type: item.menuType,
                                    lastType: element.menuType
                                });
                            } else {
                                this.deleteRoleAdministration(next2.id);
                            }
                        });
                    }
                });
            }
        });
    }
    /** 点击二级菜单的checkout**/
    changeFloorSecond(item, second, three) {
        item.version = Math.random() * 100;
        three.checked = !three.checked;
        let isAllCheCked = false;
        if (three.checked) {
            three.children.forEach(element => {
                element.checked = true;
                this.deleteRoleAdministration(element.id);
                this.addRoleAdministration({
                    firstId: item.id,
                    secondId: second.id,
                    threeId: three.id,
                    id: element.id,
                    type: second.menuType,
                    lastType: element.menuType
                });
            });

            for (let i = 0; i < second.children.length; i++) {
                if (!second.children[i].checked) {
                    isAllCheCked = false;
                    return;
                }
            }

            for (let i = 0; i < item.children.length; i++) {
                console.log(item.children);
                for (let j = 0; j < item.children[i].children.length; j++) {
                    if (!item.children[i].children[j].checked) {
                        isAllCheCked = false;
                        return;
                    }
                }
            }
            isAllCheCked = true;
            if (isAllCheCked) {
                this.changeFloorOne(item);
            }
        } else {
            item.checked = false;
            three.children.forEach(element => {
                element.checked = false;
                this.deleteRoleAdministration(element.id);
            });
        }
    }

    /** 点击三级菜单的checkout**/
    changeFloorTree(item, second, three, four) {
        item.version = Math.random() * 100;
        four.checked = !four.checked;
        let isSeondCked = false;
        if (!four.checked) {
            three.checked = false;
            item.checked = false;
            this.deleteRoleAdministration(four.id);
        } else {
            this.addRoleAdministration({
                firstId: item.id,
                secondId: second.id,
                threeId: three.id,
                id: four.id,
                type: second.menuType,
                lastType: four.menuType
            });

            for (let i = 0; i < three.children.length; i++) {
                if (!three.children[i].checked) {
                    isSeondCked = false;
                    return;
                }
                isSeondCked = true;
            }
            if (isSeondCked) {
                this.changeFloorSecond(item, second, three);
            }
        }
    }

    /**
     *
     *  添加权限元素
     *
     *
     * */
    addRoleAdministration(options: {}): void {
        let keys = Object.keys(options);
        let menuArray = [];
        keys.forEach((item, index) => {
            let storageObject = {};
            if (item == "type") {
                return;
            } else if (item == "lastType") {
                return;
            } else {
                if (index == 3) {
                    storageObject["id"] = options[item];
                    storageObject["menuType"] = options["lastType"];
                } else {
                    storageObject["id"] = options[item];
                    storageObject["menuType"] = options["type"];
                }

                menuArray.push(storageObject);
            }
        });
        this.checkArray.push(menuArray);
        // console.log(this.checkArray);
    }
    /**
     * 删除权限
     *
     */
    deleteRoleAdministration(fourId: string): void {
        let newToStringArray = [];
        newToStringArray = this.checkArray.map(item => JSON.stringify(item));

        newToStringArray.forEach((item, index) => {
            // console.log(item)
            if (item.indexOf(fourId) > -1) {
                let deleteIndex: number;
                deleteIndex = index;
                this.checkArray.splice(deleteIndex, 1);
                return;
            }
            return;
        });
        // console.log(this.checkArray);
    }

    /**
     * 权限初始化
     *
     */
    mounted() {
        userService.initTree({}).then((winResponseData: WinResponseData) => {
            if (WinRspType.SUCC == winResponseData.winRspType) {
                this.userReqVo.roleRightArray = winResponseData.data;
            } else {
                this.errorMessage(winResponseData.msg);
            }
        });
        // userService
        //     .getRoleRight(this.userReqVo.role.roleId)
        //     .then((winResponseData: WinResponseData) => {
        //         if (WinRspType.SUCC == winResponseData.winRspType) {
        //             this.userReqVo.roleRightArray = winResponseData.data;
        //         } else {
        //             this.errorMessage(winResponseData.msg);
        //         }
        //     });
    }

    /**
     *
     *  初始化角色权限
     *
     *
     * */
}
