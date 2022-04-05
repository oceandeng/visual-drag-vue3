<template>
    <div class="editor-body">
        <div
            id="editor"
            class="editor"
            :style="{
                width: `${changeStyleWithScale(canvasStyleData.width, canvasStyleData.scale)}px`,
                height: `${changeStyleWithScale(canvasStyleData.height, canvasStyleData.scale)}px`,
            }"
            @contextmenu="handleContextmenu"
            @mousedown="handleMouseDown"
        >
            <!-- 网格线 -->
            <grid />

            <!-- 页面组件展示 -->
            <shape
                v-for="(item, index) in componentData"
                :key="item.id"
                :default-style="item.style"
                :active="item.id === (curComponent || {}).id"
                :element="item"
                :index="index"
                :top="item.style.top"
                :style="getShapeStyle(item.style)"
                :class="{lock: item.isLock}"
            >
                <component
                    :is="item.component"
                    :id="`component${item.id}`"
                    class="component"
                    :style="getComponentStyle(item.style)"
                    :prop-value="item.propValue"
                    :element="item"
                    @input="handleInput(item)"
                />
            </shape>
            <contextmenu />
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

import Grid from "./Grid.vue";
import Shape from "./Shape.vue";
import Contextmenu from "./components/ContextMenu.vue"

import { changeStyleWithScale  } from "@/utils/translate";
import { getStyle, setStyle } from '@/utils/style'

const styleArray = ['top', 'left', 'width', 'height', 'rotate']

const store = useStore();
const canvasStyleData = computed(() => store.state.public.canvasStyleData);
const componentData = computed(() => store.state.component.componentData);
const curComponent = computed(() => store.state.component.curComponent);

function handleContextmenu(e){
    e.stopPropagation()
    e.preventDefault()

    // 计算菜单相对编辑器的位移
    let target = e.target
    let top = e.offsetY
    let left = e.offsetX

    while(target instanceof SVGElement){
        target = target.parentNode
    }

    while(!target.className.includes('editor')){
        left += target.offsetLeft
        top += target.offsetTop
        target = target.parentNode
    }

    store.commit('contextmenu/showContextmenu', {top, left})
}

function handleMouseDown(e){
    // 如果没有选中组件 在画布上点击时需要调用 e.preventDefault() 防止触发 drop 事件
    if(!curComponent.value || (curComponent.value.component != 'v-text' && curComponent.value != 'rect-shape')){
        e.preventDefault()
    }
}

function getShapeStyle(style) {
    return setStyle(style, styleArray)
}

function getComponentStyle(style){
    return getStyle(style, styleArray)
}

function handleInput(item){
    console.log(item);
}


</script>

<style lang="scss" scoped>
.editor-body {
    width: 100%;
    overflow: auto;
    margin-bottom: 40px;
}
.editor {
    position: relative;
    background: #fff;
    margin: auto;

    .lock {
        opacity: 0.5;

        &:hover {
            cursor: not-allowed;
        }
    }
}
.editor {
    .component {
        outline: none;
        width: 100%;
        height: 100%;
    }
}
</style>
