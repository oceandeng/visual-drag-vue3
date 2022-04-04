<template>
    <div class="home">
        <tool-bar />

        <el-container>
            <!-- 左侧组件列表 -->
            <el-aside width="200px">
                <component-list />
            </el-aside>

            <!-- 中间画布 -->
            <el-main class="editor-canvas">
                <div
                    class="editor-content"
                    @drop="handleDrop"
                    @dragover="handleDragOver"
                    @mousedown="handleMouseDown"
                    @mouseup="deselectCurComponent"
                >
                    <editor />
                </div>
            </el-main>

            <!-- 右侧属性列表 -->
            <el-aside width="260px">
                <right-sidebar />
            </el-aside>
        </el-container>
    </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

import ToolBar from "@/components/ToolBar.vue";
import ComponentList from "@/components/ComponentsList.vue";
import Editor from "@/components/editor/Index.vue";
import RightSidebar from "@/components/RightSidebar.vue";

import componentlist from "@/custom-components/component-list";
import { deepCopy, generateID } from "@/utils/utils";

const store = useStore();
const editor = computed(() => store.state.compose.editor);
const isClickComponent = computed(() => store.state.component.isClickComponent);

// created
restore()

onMounted(() => {
    store.commit("compose/getEditor", "#editor");
});

// 用localStorage保存的数据恢复画布
function restore(){
    const canvasStyle = localStorage.getItem('canvasStyle')
    const canvasData = localStorage.getItem('canvasData')

    if(canvasStyle){
        store.commit('public/setCanvasStyle', JSON.parse(canvasStyle))
    }
    if(canvasData){
        store.commit('component/setComponentData', JSON.parse(canvasData).map(item => {
            return {
                ...item, 
                id: generateID(),
            }
        })
    )}
}

function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    const index = e.dataTransfer.getData("index");
    const editorInfo = editor.value.getBoundingClientRect();

    if (index != undefined && index != "") {
        const component = deepCopy(componentlist[index]);
        component.style.top = e.y - editorInfo.y;
        component.style.left = e.x - editorInfo.x;
        component.id = generateID();
        store.commit("component/addComponent", { component });
    }
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
}

function handleMouseDown() {
    store.commit("component/setClickComponentStatus", false);
}

function deselectCurComponent(e) {
    if (!isClickComponent) {
        store.commit("component/setCurComponent", { component: null, index: null });
    }

    // 0 左击 1 滚轮 2 右击
    if (e.button != 2) {
    }
}

</script>

<style lang="scss" scoped>
.home {
    height: 100vh;

    .editor-canvas {
        height: 100vh;
        box-sizing: border-box;
        position: relative;
        overflow-x: scroll;
        background: #f6f6f6;

        .editor-content {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
