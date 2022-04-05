<template>
    <div
        :ref="getShapeRef"
        class="shape"
        :class="active"
        @click="handleSelectCurComponent"
        @mousedown="handleMouseDownOnShape"
    >
        <!-- 旋转 -->
        <el-icon
            v-show="isActive"
            :size="25"
            :color="'rgb(64, 158, 255)'"
            class="icon-xiangyouxuanzhuan"
            @mousedown="handleRotate"
        >
            <refresh-right />
        </el-icon>
        <!-- 锁定 -->
        <el-icon v-show="element.isLock" class="icon-suo"><lock /></el-icon>
        <point ref="pointRef" :element="element" :isActive="isActive" :default-style="defaultStyle" />
        <slot></slot>
    </div>
</template>

<script setup>
import { defineProps, computed, ref, toRefs, onMounted } from "vue";
import { useStore } from "vuex";
import { RefreshRight, Lock } from "@element-plus/icons-vue";
import eventBus from "@/utils/eventBus";
import runAnimation from "@/utils/runAnimation";

import Point from "./components/Point.vue";

const store = useStore();

const pointRef = ref(null);

const props = defineProps({
    active: {
        type: Boolean,
        default: false,
    },
    defaultStyle: {
        require: true,
        type: Object,
        default: () => {},
    },
    element: {
        type: Object,
        default: () => {},
    },
    index: {
        require: true,
        type: [Number, String],
        default: 0,
    },
});

const curComponent = computed(() => store.state.component.curComponent);
const isActive = computed(() => props.active && !props.element.isLock);
const { defaultStyle, element, index } = toRefs(props);

let shapeRef = ref(null)
function getShapeRef(el){
    shapeRef.value = el
}

function handleSelectCurComponent(e) {
    // 阻止向父组件冒泡
    e.stopPropagation();
    e.preventDefault();
    store.commit("contextmenu/hideContextmenu");
}

// 处理旋转
function handleRotate(e) {
    store.commit("component/setClickComponentStatus", true);
    e.preventDefault();
    e.stopPropagation();

    // 初始坐标和初始角度
    const pos = { ...defaultStyle.value };
    const startX = e.clientX;
    const startY = e.clientY;
    const startRotate = pos.rotate;

    // 获取元素中心点位置
    const rect = shape.value.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // 旋转前的角度
    const rotateDegreeBefore = (Math.atan2(startY - centerY, startX - centerX) * 180) / Math.PI;

    // 如果元素没有移动，则不保存快照
    let hasMove = false;
    const move = (moveEvent) => {
        hasMove = true;
        const curX = moveEvent.clientX;
        const curY = moveEvent.clientY;
        // 旋转后的角度
        const rotateDegreeAfter = (Math.atan2(curY - centerY, curX - centerX) * 180) / Math.PI;
        // 获取旋转的角度值
        pos.rotate = startRotate + rotateDegreeAfter - rotateDegreeBefore;
        // 修改当前组件样式
        store.commit("component/setShapeStyle", pos);
    };

    const up = () => {
        hasMove && store.dispatch("snapshot/recordSnapshot");
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
        pointRef.value.updateCursor(true);
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
}

function handleMouseDownOnShape(e) {
    store.commit("component/setClickComponentStatus", true);

    if (element.value.component != "v-text" && element.value.component != "rect-shape") {
        e.preventDefault();
    }
    e.stopPropagation();

    store.commit("component/setCurComponent", { component: element.value, index: index.value });
    if (element.value.isLock) return;

    const position = { ...defaultStyle.value };
    const startX = e.clientX;
    const startY = e.clientY;
    // 需要转换成数字类型
    const startTop = Number(position.top);
    const startLeft = Number(position.left);

    // 如果元素没有移动，则不保存快照
    let hasMove = false;
    const move = (moveEvent) => {
        hasMove = true;
        const currentX = moveEvent.clientX;
        const currentY = moveEvent.clientY;

        position.top = currentY - startY + startTop;
        position.left = currentX - startX + startLeft;

        store.dispatch("public/setShapeStyle", position);
    };

    const up = () => {
        hasMove && store.dispatch("snapshot/recordSnapshot");
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
    };

    document.addEventListener("mousemove", move, false);
    document.addEventListener("mouseup", up, false);
}

onMounted(() => {
    eventBus.on("runAnimation", () => {
        if(element.value == curComponent.value){
            runAnimation(shapeRef.value, curComponent.value.animations);
        }
    });
    eventBus.on("stopAnimation", () => {
        shapeRef.value.classList.remove("animated", "infinite");
    });
});
</script>

<style lang="scss" scoped>
.shape {
    position: absolute;

    &:hover {
        cursor: move;
    }
}

.active {
    outline: 1px solid #70c0ff;
    user-select: none;
}

.icon-xiangyouxuanzhuan {
    position: absolute;
    top: -34px;
    left: 50%;
    transform: translateX(-50%);
    cursor: grab;
    color: #59c7f9;
    font-size: 20px;
    font-weight: 600;

    &:active {
        cursor: grabbing;
    }
}

.icon-suo {
    position: absolute;
    top: 0;
    right: 0;
}
</style>
