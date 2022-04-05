<template>
    <div v-show="menuShow" class="contextmenu" :style="{ top: `${menuTop}px`, left: `${menuLeft}px` }">
        <ul @mouseup="handleMouseUp">
            <template v-if="curComponent">
                <template v-if="!curComponent.isLock">
                    <li @click="copy">复制</li>
                    <li @click="paste">黏贴</li>
                    <li @click="cut">剪切</li>
                    <li @click="deleteComponent">删除</li>
                    <li @click="lock">锁定</li>
                    <li @click="topComponent">置顶</li>
                    <li @click="bottomComponent">置底</li>
                    <li @click="upComponent">上移</li>
                    <li @click="downComponent">下移</li>
                </template>
                <li v-else @click="unLock">解锁</li>
            </template>
        </ul>
    </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const menuShow = computed(() => store.state.contextmenu.menuShow);
const menuTop = computed(() => store.state.contextmenu.menuTop);
const menuLeft = computed(() => store.state.contextmenu.menuLeft);

const curComponent = computed(() => store.state.component.curComponent);

// 点击菜单时不取消当前组件的选中状态
function handleMouseUp() {
    store.commit("component/setClickComponentStatus", true);
}

function copy() {
    store.dispatch("copy/copy");
}
function paste() {
    store.dispatch("copy/paste", true);
    store.dispatch("snapshot/recordSnapshot");
}
function cut() {
    store.dispatch("copy/cut");
}
function deleteComponent() {
    store.commit("component/deleteComponent");
    store.dispatch("snapshot/recordSnapshot");
}
function lock() {
    store.dispatch("lock/lock");
}
function unLock() {
    store.dispatch("lock/unLock");
}
function topComponent() {
    store.dispatch("layer/topComponent");
    store.dispatch("snapshot/recordSnapshot");
}
function bottomComponent() {
    store.dispatch("layer/bottomComponent");
    store.dispatch("snapshot/recordSnapshot");
}
function upComponent() {
    store.dispatch("layer/upComponent");
    store.dispatch("snapshot/recordSnapshot");
}
function downComponent() {
    store.dispatch("layer/downComponent");
    store.dispatch("snapshot/recordSnapshot");
}
</script>

<style lang="scss" scoped>
.contextmenu {
    position: absolute;
    z-index: 1000;

    ul {
        border: 1px solid #e4e7ed;
        border-radius: 4px;
        background-color: #fff;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        box-sizing: border-box;
        margin: 5px 0;
        padding: 0;

        li {
            font-size: 12px;
            padding: 0 20px;
            position: relative;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: #606266;
            height: 30px;
            line-height: 30px;
            box-sizing: border-box;
            cursor: pointer;

            &:hover {
                color: #fff;
                background-color: #409eff;
            }
        }
    }
}
</style>
