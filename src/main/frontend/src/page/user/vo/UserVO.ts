import { BaseReqVO, BaseRepVO, WinResponseData } from "../../common/vo/BaseVO";
interface userArray {
    id: string;
    userCode: string;
    username: string;
    belongUser: string;
    tel: string;
    pho: string;
    email: string;
    belongDep: string;
    type: number;
}
export class UserReqVO extends BaseReqVO {
    userName: string;
    validateCode: string;
    companyFullName: string;
    companySimpleName: string;
    companyCode: string;
    formType: string = "";
    tableData: userArray[];
}
