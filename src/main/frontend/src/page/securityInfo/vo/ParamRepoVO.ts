import { BaseReqVO, BaseRepVO } from "../../common/vo/BaseVO";
export class ParamRepoRepVO extends BaseRepVO {
    /**
     * 证券代码
     */
    public securityCode: string = "";

    /**
     * 证券名称
     */
    public securityName: string = "";

    /**
     * 回购天数
     */
    public repoDay: number;

    /**
     * 交易市场
     */
    public marketCode: string = "";
}

export class ParamRepoReqVO extends BaseReqVO {
    /**
     * 证券代码
     */
    public securityCode: string = "";

    /**
     * 证券名称
     */
    public securityName: string = "";

    /**
     * 回购天数
     */
    public repoDay: number;

    /**
     * 交易市场
     */
    public marketCode: string[] = [];
}
