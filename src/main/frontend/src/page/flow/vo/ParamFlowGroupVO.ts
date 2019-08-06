import { BaseReqVO, BaseRepVO } from "../../common/vo/BaseVO";
export class ParamFlowGroupVO extends BaseRepVO {
    /**
     * 流程名称
     */
    flowName: string;
    /**
     * 流程类等级
     */
    level: string;
    /**
     * 流程类父id
     */
    fatherId: number;

}


