export default (Vue) => {
    /* from面板拖动指令
     * 
     * */
    Vue.directive("win_dialogDrag", {
            inserted(el) {
                const dialogHeaderEl = el.querySelector(".el-dialog__header");
                const dragDom = el.querySelector(".el-dialog");
                const dragDomParent = el.querySelector(".el-dialog").parentNode
                dragDomParent.style.display = "block"
                dialogHeaderEl.style.cursor = "move"
                dragDom.style.left = "50%"
                dragDom.style.top = "18%"
                let marginLeft = -parseInt(dragDom.style.width) / 2
                let marginTop = -parseInt(dragDom.clientHeight) / 2
                dragDom.style.marginLeft = marginLeft + "px"
                dragDom.style.marginTop = 0 + "px"
                // dragDom.style.marginBottom = "0px"
                const sty =
                    dragDom.currentStyle || window.getComputedStyle(dragDom, null);
                dialogHeaderEl.onmousedown = e => {
                    // 鼠标按下，计算当前元素距离可视区的距离
                    const disX = e.clientX - dialogHeaderEl.offsetLeft;
                    const disY = e.clientY - dialogHeaderEl.offsetTop;

                    // 获取到的值带px 正则匹配替换
                    let styL, styT;
                    if (sty.left.includes("%")) {
                        styL = +document.body.clientWidth *
                            (+sty.left.replace(/\%/g, "") / 100);
                        styT = +document.body.clientHeight *
                            (+sty.top.replace(/\%/g, "") / 100);
                    } else {
                        styL = +sty.left.replace(/\px/g, "");
                        styT = +sty.top.replace(/\px/g, "");
                    }
                    document.onmousemove = function (e) {
                        // 通过事件委托，计算移动的距离
                        const l = e.clientX - disX;
                        const t = e.clientY - disY;
                        const dialoWidth = dragDom.clientWidth;
                        const screeWidth = document.body.clientWidth;
                        const dialoHeight = dragDom.clientHeight;
                        const screeHeight = document.body.clientHeight;

                        // 移动当前元素
                        let left = l + styL;
                        let top = t + styT
                        if (left <= 0 - marginLeft) {
                            left = 0 - marginLeft;
                        }
                        if (left > screeWidth - dialoWidth - marginLeft) {
                            left = screeWidth - dialoWidth - marginLeft - 10
                        }
                        if (top <= 0) {
                            top = 0 + 20
                        }

                        if (top > screeHeight - dialoHeight - 70) {
                            top = screeHeight - dialoHeight - 70
                        }

                        dragDom.style.left = `${left}px`;
                        dragDom.style.top = `${top}px`;
                        //将此时的位置传出去
                        //binding.value({x:e.pageX,y:e.pageY})
                    };

                    document.onmouseup = function (e) {
                        document.onmousemove = null;
                        document.onmouseup = null;
                    };
                };
            }
        }),
        /* from光标定位到那个input框
         * 
         * */
        Vue.directive("focus", {
            inserted(el) {
                let input = el.querySelector(".el-input__inner")
                input.focus();
            }
        }),

        Vue.directive("winfocus", {
            bind(el) {
                el.focus();
            }
        })

    Vue.directive("testName", {
        inserted(el, binding) {
            // if (process.env.NODE_ENV != developmen1111t) {
            //     return
            // }/代码判断生产环境下不执行任何代码
            let e = el.parentNode.parentNode
            let elNode = getChildNodes(e)
            let type = 1
            elNode.forEach((item, index) => {
                if (item.localName == "input") {
                    let placeholder = item.getAttribute("placeholder")
                    if (!placeholder) {
                        item.setAttribute("test_name", `${binding.value.TEST_NAME}-${index}`);
                    } else {
                        item.setAttribute("test_name", `${binding.value.TEST_NAME}-${placeholder}`);
                    }

                }
                if (item.localName == "textarea") {
                    item.setAttribute("test_name", `${binding.value.TEST_NAME}-${index}`);
                }

                if (item.localName == "button") {
                    if (type == 1) {
                        item.setAttribute("test_name", `${binding.value.TEST_NAME}-确定`);
                        type = 2
                    } else {
                        item.setAttribute("test_name", `${binding.value.TEST_NAME}-取消 `);
                        type = 1
                    }
                }
            })

        }
    })
}



function getChildNodes(node) {
    var nodes = [...node.childNodes];
    // console.log(node.childNodes)
    var arr = [];
    for (var i = 0; i < nodes.length; i++) {
        // console.log(nodes[i])
        var childNode = nodes[i];
        if (childNode.nodeType == 1) {
            arr.push(childNode);
            var temp = getChildNodes(childNode); //递归调用getChildNodes方法，查看当前子节点下是否还有子节点
            arr = arr.concat(temp); //将递归获取的子节点数组与之前的数组拼接成一个数组
        }
    }
    return arr;

}
