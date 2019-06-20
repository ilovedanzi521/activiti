/*
 * @Author: mikey.zhaopeng 
 * @Date: 2019-05-22 09:08:50 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-05-30 21:33:43
 */

export default{
    //添加快速区
    addFast(state,value){
        state.fastData=[value,...state.fastData];
        // console.log(state.fastData)
    },
    //删除快速区
    removeFast(state,value){
        console.log(value)
        state.fastData=state.fastData.filter(item=>item.title!==value.title)},}