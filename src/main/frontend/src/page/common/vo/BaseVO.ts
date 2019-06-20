/**
 * 基础请求VO
 */
export class BaseReqVO {
    id: number;
    userId: string;
    ip: string;
    mac: string;
    hostName: string;
    menuId: number;
    reqPageNum: number;
    reqPageSize: number;
}

/**
 * 基础返回VO
 */
export class BaseRepVO {
    id: number;
    createUserId: string;
    createUserName: string;
    createTime: string;
    updateUserId: string;
    updateUserName: string;
    updateTime: string;
}

export interface WinResponseData {
    code: string;
    msg: string;
    winRspType: string;
    data: any;
}
