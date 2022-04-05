<template>
<div>

    <el-header class="top-bar">
        <el-row>
            <el-button :size="buttonSize" @click="undo">撤销</el-button>
            <el-button :size="buttonSize" @click="redo">重做</el-button>
            <!-- <el-button :size="buttonSize">插入图片</el-button> -->
            <el-button :size="buttonSize" @click="preview">预览</el-button>
            <el-button :size="buttonSize" @click="save">保存</el-button>
            <el-button :size="buttonSize" @click="clearCanvas">清空画布</el-button>
            <!-- <el-button :size="buttonSize" disabled>组合</el-button>
            <el-button :size="buttonSize" disabled>拆分</el-button> -->
            <el-button :size="buttonSize" @click="lock">锁定</el-button>
            <el-button :size="buttonSize" @click="unlock">解锁</el-button>
            <el-row>
                <span class="f12 ml20 white lh25">画布大小：</span>
                <span
                    ><el-input
                        :size="buttonSize"
                        class="w60"
                        v-model="canvasStyleData.width"
                        @input="setCanvasStyle"
                    ></el-input
                ></span>
                <span class="f12 ml5 mr5 white lh25">*</span>
                <span
                    ><el-input
                        :size="buttonSize"
                        class="w60"
                        v-model="canvasStyleData.height"
                        @input="setCanvasStyle"
                    ></el-input
                ></span>
            </el-row>
            <el-row>
                <span class="f12 ml20 white lh25">画布比例：</span>
                <span
                    ><el-input
                        :size="buttonSize"
                        class="w60"
                        v-model="canvasStyleData.scale"
                        @input="setCanvasStyle"
                    ></el-input
                ></span>
                <span class="f12 ml5 white lh25">%</span>
            </el-row>
        </el-row>
    </el-header>
    <!-- 预览 -->
    <Preview v-model="isShowPreview" @change="handlePreviewChange"/>
</div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import eventBus from '@/utils/eventBus'

import Preview from './toolbar/Preview.vue'

const store = useStore();

const buttonSize = "small";
const canvasStyleData = computed(() => store.state.public.canvasStyleData);
const componentData = computed(() => store.state.component.componentData);

let isShowPreview = ref(false)

function setCanvasStyle() {
    store.commit("public/setCanvasStyle", store.state.public.canvasStyleData);
}

function undo() {
    store.dispatch("snapshot/undo");
}

function redo() {
    store.dispatch("snapshot/redo");
}

function save() {
    console.log(componentData.value);
    localStorage.setItem("canvasStyle", JSON.stringify(canvasStyleData.value));
    localStorage.setItem("canvasData", JSON.stringify(componentData.value));
    ElMessage({
        message: "保存成功！",
        type: "success",
    });
}
function lock(){
    store.dispatch('lock/lock')
}
function unlock(){
    store.dispatch('lock/unLock')
}
function preview(){
    isShowPreview.value = true
    store.commit('public/setEditMode', 'preview')
}
function handlePreviewChange(){
    store.commit('public/setEditMode', 'edit')
}
function clearCanvas(){
    store.commit('component/setCurComponent', { component: null, index: null })
    store.commit('component/setComponentData', [])
    store.dispatch('snapshot/recordSnapshot')
}

eventBus.on('preview', preview)
eventBus.on('save', save)
eventBus.on('clearCanvas', clearCanvas)

</script>

<style lang="scss" scoped>
.top-bar {
    box-sizing: border-box;
    padding: 15px 0 0 20px;
    background: #409eff;
}
</style>
