import Vue from "vue";
import axios from "axios";
import Component from "vue-class-component";
import { UserReqVO } from "../vo/UserVO";
import userService from "../service/userService";
import AddUser from "../view/addUser.vue";
import AddCom from "../view/addCom.vue";
import AddDep from "../view/addDep.vue";
import { win_tabs, win_tab } from "../../../components/win-tabs";
import { win_tree } from "../../../components/win-tree";
import { win_table, win_table_column } from "../../../components/win-table";
@Component({
    components: {
        AddUser,
        AddCom,
        AddDep,
        win_tabs,
        win_tab,
        win_tree,
        win_table,
        win_table_column
    }
})
export default class UserController extends Vue {
    companyArray: any[] = [
        {
            id: 1,
            label: "默认公司",
            children: [
                {
                    id: 4,
                    label: "默认部门",
                    children: [
                        {
                            id: 9,
                            label: "默认职位"
                        },
                        {
                            id: 10,
                            label: "默认职位"
                        }
                    ]
                }
            ]
        }
    ];
    userReqVo: UserReqVO = new UserReqVO();
    handleAddCom() {
        this.userReqVo.formType = "AddCom";
    }
    handleAddDep() {
        this.userReqVo.formType = "AddDep";
    }

    handleAddUser() {
        this.userReqVo.formType = "AddUser";
    }
    handleFromClose() {
        this.userReqVo.formType = "";
    }
    comParams(params) {
        const { companyFullName, companySimpleName, companyCode } = params;
        axios
            .post(
                "/param/dfas-auth-center/api/company/add",
                { companyFullName, companySimpleName, companyCode },
                {
                    headers: {
                        Authorization: localStorage
                            .getItem("Authorization")
                            .replace('"', "")
                            .replace('"', "")
                    }
                }
            )
            .then(res => {
                this.companyArray = [
                    {
                        id: 1,
                        label: companySimpleName,
                        children: [
                            {
                                id: 4,
                                label: "默认部门",
                                children: [
                                    {
                                        id: 9,
                                        label: "默认职位"
                                    },
                                    {
                                        id: 10,
                                        label: "默认职位"
                                    }
                                ]
                            }
                        ]
                    },
                    ...this.companyArray
                ];
            });

        console.log(params);
    }
}
