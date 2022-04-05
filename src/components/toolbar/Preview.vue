<template>
    <div v-if="modelValue" class="bg">
        <el-button class="close" @click="close">关闭</el-button>
        <div class="canvas-container">
            <div
                class="canvas"
                :style="{
                    width: changeStyleWithScale(canvasStyleData.width) + 'px',
                    height: changeStyleWithScale(canvasStyleData.height) + 'px',
                }"
            >
                <component-wrapper v-for="(item, index) in componentData" :key="index" :config="item" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, defineProps, defineEmits } from "vue";
import { useStore } from "vuex";
import { changeStyleWithScale } from '@/utils/translate'

import ComponentWrapper from "./ComponentWrapper.vue";

const store = useStore();
const componentData = computed(() => store.state.component.componentData);
const canvasStyleData = computed(() => store.state.public.canvasStyleData);

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: true,
    },
});
const emit = defineEmits()

function close(){
    console.log(11);
    emit("update:modelValue", false);
}
</script>

<style lang="scss" scoped>
.bg {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: fixed;
    background: rgb(0, 0, 0, 0.5);
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: auto;
    padding: 20px;

    .canvas-container {
        width: calc(100% - 40px);
        height: calc(100% - 120px);
        overflow: auto;

        .canvas {
            height: 100%;
            background: #fff;
            position: relative;
            margin: auto;
        }
    }

    .close {
        position: absolute;
        right: 20px;
        top: 20px;
    }
}
</style>
