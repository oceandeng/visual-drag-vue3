<template>
    <div
        class="shape-point"
        v-for="item in isActive ? pointList : []"
        :key="item"
        :style="handleGetPointStyle(item)"
        @mousedown="handleMouseDownOnPoint(item, $event)"
    ></div>
</template>

<script setup>
import { toRefs, reactive, defineProps, computed, watchEffect, defineExpose, getCurrentInstance } from "vue";
import { useStore } from "vuex";

import calculateComponentPositonAndSize from "@/utils/calculateComponentPositonAndSize";

import { useGetCursor, useGetPointStyle } from "../core";

const { ctx } = getCurrentInstance();

const store = useStore();
const curComponent = computed(() => store.state.component.curComponent);
const editor = computed(() => store.state.compose.editor);

const props = defineProps({
    element: {
        type: Object,
        default: () => {},
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    defaultStyle: {
        type: Object,
        default: () => {},
    },
});

const { element, defaultStyle } = toRefs(props);

const { getPointStyle } = useGetPointStyle();
const { pointList, getCursor } = useGetCursor();

let cursors = toRefs(reactive({}));

function handleGetPointStyle(item) {
    return getPointStyle(item, defaultStyle.value, cursors);
}

// 更新cursors
function updateCursor(isForceUpdate) {
    if (curComponent.value) {
        cursors = getCursor(curComponent.value);
        // 强制刷新
        !!isForceUpdate && ctx.$forceUpdate();
    }
}

// 点击小圆点操作
function handleMouseDownOnPoint(point, e) {
    store.commit("component/setClickComponentStatus", true);
    e.stopPropagation();
    e.preventDefault();

    const style = { ...defaultStyle.value };
    const { width, height, top, left } = { ...defaultStyle.value };

    // 组件宽高比
    const proportion = width / height;

    // 组件中心点
    const center = {
        x: left + width / 2,
        y: top + height / 2,
    };

    // 获取画布位移信息
    const editorRectInfo = editor.value.getBoundingClientRect();

    // 获取 point 与实际拖动基准点的差值
    const pointRect = e.target.getBoundingClientRect();
    // 当点击远点相对于画布的中心坐标
    const curPoint = {
        x: Math.round(pointRect.left - editorRectInfo.left + e.target.offsetWidth / 2),
        y: Math.round(pointRect.top - editorRectInfo.top + e.target.offsetHeight / 2),
    };

    // 获取对称点坐标
    const symmetricPoint = {
        x: center.x - (curPoint.x - center.x),
        y: center.y - (curPoint.y - center.y),
    };

    // 是否需要保存快照
    let needSave = false;
    let isFirst = true;

    const needLockProportion = isNeedLockProportion();

    const move = (moveEvent) => {
        // 第一次点击时也会触发 move，所以会有“刚点击组件但未移动，组件的大小却改变了”的情况发生
        // 因此第一次点击时不触发 move 事件
        if (isFirst) {
            isFirst = false;
            return;
        }

        needSave = true;
        const curPositon = {
            x: moveEvent.clientX - editorRectInfo.left,
            y: moveEvent.clientY - editorRectInfo.top,
        };

        calculateComponentPositonAndSize(point, style, curPositon, proportion, needLockProportion, {
            center,
            curPoint,
            symmetricPoint,
        });

        store.commit("component/setShapeStyle", style);
    };

    const up = () => {
        needSave && store.dispatch("snapshot/recordSnapshot");
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
}

function isNeedLockProportion() {
    if (element.value.component != "Group") return false;
    const ratates = [0, 90, 180, 360];
    for (const component of element.value.propValue) {
        if (!ratates.includes(mod360(parseInt(component.style.rotate)))) {
            return true;
        }
    }
    return true;
}

watchEffect(() => {
    updateCursor();
});

// 暴露子组件方法，便于父组件调用
defineExpose({
    updateCursor,
});
</script>

<style lang="scss" scoped>
.shape-point {
    position: absolute;
    background: #fff;
    border: 1px solid #59c7f9;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    z-index: 1;
}
</style>
