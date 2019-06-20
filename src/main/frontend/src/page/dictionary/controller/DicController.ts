import Component from "vue-class-component";
import { WinRspType } from "../../common/enum/BaseEnum";
import { WinResponseData } from "../../common/vo/BaseVO";
import { DicReqVO, DicRepVO } from "../vo/DicVO";
import DicService from "../service/DicService";
import BaseController from "../../common/controller/BaseController";
import PageVO from "../../common/vo/PageVO";

@Component({ components: {} })
export default class DicController extends BaseController {
    dicService: DicService = new DicService();

    dicReqVO: DicReqVO = new DicReqVO();
    dicSubReqVO: DicReqVO = new DicReqVO();

    dicList: Array<DicRepVO> = [];
    dicSubList: Array<DicRepVO> = [];

    dicSubPageVO: PageVO = new PageVO();

    /**
     * 查询字典项信息
     *
     */
    serachDicList() {
        this.dicService
            .diclist(this.dicReqVO)
            .then((winResponseData: WinResponseData) => {
                if (WinRspType.SUCC == winResponseData.winRspType) {
                    this.dicList = winResponseData.data;

                    this.dicSubReqVO = new DicReqVO();
                    this.dicSubReqVO.commonParam = this.dicReqVO.commonParam;
                    this.serachDicSubList(this.dicSubReqVO);
                } else {
                    this.errorMessage(winResponseData.msg);
                }
            });
    }

    /**
     * 查询字典子项信息
     *
     * @param vo
     */
    serachDicSubList(vo: DicReqVO) {
        this.dicService
            .dicSubList(vo)
            .then((winResponseData: WinResponseData) => {
                if (WinRspType.SUCC == winResponseData.winRspType) {
                    this.dicSubList = winResponseData.data.list;
                    this.dicSubPageVO = winResponseData.data;
                } else {
                    this.errorMessage(winResponseData.msg);
                }
            });
    }

    /**
     * 点击字典项查询字典子项信息
     *
     * @param item
     */
    handleDicRow(item: DicRepVO) {
        this.dicSubReqVO = new DicReqVO();
        this.dicSubReqVO.parentDicCode = item.dicCode;

        this.serachDicSubList(this.dicSubReqVO);
    }

    /**
     * 字典子项分页查询
     *
     * @param vo
     */
    dicSubPageQuery(vo: PageVO) {
        this.dicSubReqVO.reqPageNum = vo.pageNum;
        this.dicSubReqVO.reqPageSize = vo.pageSize;

        this.serachDicSubList(this.dicSubReqVO);
    }

    mounted() {
        this.serachDicList();
    }
}
