<!--
 @component elementUI@2.7.2 Tree 组件二次开发
 -->
<template>
    <div v-loading="isLoading" class="comp-tree">
        <el-button class="comp-tr-top"
                   type="primary"
                   size="small"
                   @click="handleAddTop">添加顶级节点</el-button>
        <!-- tree -->
        <el-tree ref="SlotTree"
                 :data="setTree"
                 :props="defaultProps"
                 :expand-on-click-node="false"
                 highlight-current
                 :node-key="NODE_KEY">
            <div class="comp-tr-node" slot-scope="{ node, data }">
                <!-- 编辑状态 -->
                <template v-if="node.isEdit">
                    <el-input v-model="data.name"
                              autofocus
                              size="mini"
                              :ref="'slotTreeInput'+data[NODE_KEY]"
                              @blur.stop="handleInput(node, data)"
                              @keyup.enter.native="handleInput(node, data)"></el-input>
                </template>

                <!-- 非编辑状态 -->
                <template v-else>
                    <!-- 名称： 新增节点增加class（is-new） -->
                    <span :class="[data[NODE_KEY] < NODE_ID_START ? 'is-new' : '', 'comp-tr-node--name']">
							{{ node.label }}
						</span>

                    <!-- 按钮 -->
                    <span class="comp-tr-node--btns">
							<!-- 新增 -->
							<el-button icon="el-icon-plus"
                                       size="mini"
                                       circle
                                       type="primary"
                                       @click="handleAdd(node, data)"></el-button>

                        <!-- 编辑 -->
							<el-button icon="el-icon-edit"
                                       size="mini"
                                       circle
                                       type="info"
                                       @click="handleEdit(node, data)"></el-button>

                        <!-- 删除 -->
							<el-button icon="el-icon-delete"
                                       size="mini"
                                       circle
                                       type="danger"
                                       @click="handleDelete(node, data)"></el-button>
						</span>
                </template>
            </div>
        </el-tree>
    </div>
</template>

<script>
import tree from "../controller/tree";
export default class Exchange extends tree {}
</script>

<style lang="scss">
/* common */

// 显示按钮
.show-btns {
  opacity: 1;
}

/* common end */

.comp-tree {
  width: 100%;
  max-width: 700px;
  max-height: 80vh;
  padding: 2em;
  overflow: auto;
//顶部按钮
  .comp-tr-top {
    width: 100px;
    margin-bottom: 2em;
  }
  // 自定义节点
  .comp-tr-node {
    // label
    .comp-tr-node--name {
      display: inline-block;
      line-height: 40px;
      min-height: 40px;
      // 新增
      &.is-new {
        font-weight: bold;
      }
    }
    // button
    .comp-tr-node--btns {
      margin-left: 10px;
      opacity: 0;
      transition: opacity 0.1s;
      .el-button {
        transform: scale(0.8); // 缩小按钮
        & + .el-button {
          margin-left: -1px;
        }
      }
    }
  }
  // 高亮显示按钮
  .is-current {
    & > .el-tree-node__content {
      .comp-tr-node--btns {
        @extend .show-btns;
      }
    }
  }
  // 悬浮显示按钮
  .el-tree-node__content {
    &:hover {
      .comp-tr-node--btns {
        @extend .show-btns;
      }
    }
  }
}
</style>
