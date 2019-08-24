<template>
    <div>
        <div>
            <el-button @click="addNode">增加</el-button>
            <el-button @click="remove">删除</el-button>
            <!-- <el-input :autofocus="true" v-model="sa"></el-input> -->
        </div>
        <el-tree class="filter-tree" :accordion="true" :default-expanded-keys="['1']" :data="treeData" :props="defaultProps" default-expand-all ref="tree2" @node-click="handleNodeClick">
            <div class="comp-tr-node" slot-scope="{ node, data }">
                <!-- 编辑状态 -->
                <template v-if="data.isEdit">
                    <el-input size="mini" v-focus v-model="data.aa" @blurstop="handleBlur(data)" @mouseout="handleBlur(data)" :ref="'slotTreeInput'+data.id" :id="data.id"
					
					
		
					></el-input>
                </template>
                <template v-else>
                    <span @dblclick="edit(data)">
                        {{ data.aa }}
                    </span>
                </template>
            </div>
        </el-tree>
    </div>

</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Emit } from "vue-property-decorator";
import { win-tree } from "@win-frond-frameworks/biz-common";

@Component({
    components: {}
})
export default class FromDialog extends Vue {
    level = 0;
    sa = "111";
    currentId = "";
    firstId = "";
    secondId = "";
    threeId = "";
    firtsIndex;
    secondInde;
    node;
    element;

    treeData = [
        {
            id: "1",
            aa: "一级 1",
            children: [
                {
                    id: "4",
                    aa: "二级 1-1",
                    children: [
                        {
                            id: "9",
                            aa: "三级 1-1-1"
                        },
                        {
                            id: "10",
                            aa: "三级 1-1-2"
                        }
                    ]
                }
            ]
        },
        {
            id: "3",
            aa: "一级 3",
            children: [
                {
                    id: "7",
                    aa: "二级 3-1",
                    children: []
                },
                {
                    id: "8",
                    aa: "二级 3-2",
                    children: []
                }
            ]
        }
    ];

    defaultProps = {
        children: "children",
        label: "aa"
    };

    handleNodeClick(element, node, VueComponent) {
        this.level = node.level;
        this.currentId = element.id;
        console.log(this.currentId);
        // this.node = node;
        // this.element = element;
    }
    /**添加节点 */
    addNode() {
        //增加一级节点
        if (!this.level) {
            let obj = { id: "", aa: "", children: [] };
            obj.id = Math.floor(Math.random() * 100) + "";
            obj.aa = "新增节点1";
            obj.children = [];
            this.treeData.push(obj);
        }
        //增加二级节点
        if (this.level == 1) {
            for (let i = 0; i < this.treeData.length; i++) {
                if (this.treeData[i].id == this.currentId) {
                    let obj = { id: "", aa: "", children: [] };
                    obj.id = Math.floor(Math.random() * 100) + "";
                    obj.aa = "新增节点2";
                    obj.children = [];
                    this.treeData[i].children.push(obj);
                    return;
                }
            }
        }
        //增加三级节点
        if (this.level == 2) {
            for (let i = 0; i < this.treeData.length; i++) {
                for (let j = 0; j < this.treeData[i].children.length; j++) {
                    if (this.treeData[i].children[j].id == this.currentId) {
                        // if (!this.treeData[i].children[j].children) {
                        //     alert(11);
                        //     this.treeData[i].children[j].children = new Array();
                        //     let obj = { id: "", aa: "" };
                        //     obj.id = Math.floor(Math.random() * 100) + "";
                        //     obj.aa = "新增节点3";
                        //     this.treeData[i].children[j].children.push(obj);
                        //     return;
                        // }
                        let obj = { id: "", aa: "" };
                        obj.id = Math.floor(Math.random() * 100) + "";
                        obj.aa = "新增节点3";
                        this.treeData[i].children[j].children.push(obj);
                        return;
                    }
                }
            }
        }
    }

    remove() {
        if (this.level == 1) {
            for (let i = 0; i < this.treeData.length; i++) {
                if (this.treeData[i].id == this.currentId) {
                    if (this.treeData[i].children.length > 0) {
                        alert("该流程下还用数据");
                    } else {
                        this.treeData.splice(i, 1);
                        alert("删除成功");
                    }
                }
            }
        }
        if (this.level == 3) {
        }
    }

    edit(item) {
        this.$set(item, "isEdit", true);
    }

    handleBlur(item) {
        this.$set(item, "isEdit", false);
    }
}
</script>
<style lang="scss" scoped>
</style>