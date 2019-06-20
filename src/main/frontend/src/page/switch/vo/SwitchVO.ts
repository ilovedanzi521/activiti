import { BaseReqVO, BaseRepVO } from "../../common/vo/BaseVO";
export class SwitchReqVO extends BaseReqVO {
    switchType: string;
    switchName: string;
    switchValue: string;
    switchStatus: number;
}

export class SwitchRepVO extends BaseRepVO {
    switchType: string;
    switchName: string;
    switchValue: string;
    switchStatus: number;
    preSwitchStatus: number;
    switchExplain: string;
}

export class SwitchOpLogReqVO extends BaseReqVO {
    switchType: string;
    switchId: number;
    operationType: number;
    operationExplain: number;
}

export class SwitchOpLogRepVO extends BaseReqVO {
    operationType: number;
    operationExplain: string;
    switchName: string;
}
