<template>
    <div class="animation-list">
        <div class="div-animation">
            <el-button @click="isShowAnimation = true">添加动画</el-button>
            <el-button @click="previewAnimate">预览动画</el-button>
            <div>
                <el-tag
                    v-for="(tag, index) in curComponent.animations"
                    :key="index"
                    closable
                    @close="removeAnimation(index)"
                >
                    {{ tag.label }}
                    <el-icon class="cursor el-icon-setting" @click="handleAnimationSetting(index)"><setting /></el-icon>
                </el-tag>
            </div>
        </div>

        <!-- 选择动画 -->
        <Modal v-model="isShowAnimation">
            <el-tabs v-model="animationActiveName">
                <el-tab-pane
                    v-for="item in animationClassData"
                    :key="item.label"
                    :label="item.label"
                    :name="item.label"
                >
                    <el-scrollbar class="animate-container">
                        <div
                            v-for="(animate, index) in item.children"
                            :ref="getAnimates"
                            :key="animate.value"
                            class="animate"
                            @mouseenter="handlerunAnimation(animate, index)"
                            @click="addAnimation(animate)"
                        >
                            <div>
                                {{ animate.label }}
                            </div>
                        </div>
                    </el-scrollbar>
                </el-tab-pane>
            </el-tabs>
        </Modal>

        <!-- 编辑动画配置 -->
        <AnimationSettingModal
            v-if="isShowAnimationSetting"
            :cur-index="curIndex"
            @close="isShowAnimationSetting = false"
        />
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { Setting } from "@element-plus/icons-vue";

import Modal from "@/components/Modal.vue";
import AnimationSettingModal from "./components/AnimationSettingModal.vue";

import eventBus from "@/utils/eventBus";
import animationClassData from "@/utils/animationClassData";
import runAnimation from "@/utils/runAnimation";

const store = useStore();
const curComponent = computed(() => store.state.component.curComponent);

let isShowAnimation = ref(false);
let animationActiveName = "进入";
let isShowAnimationSetting = ref(false);
let curIndex = ref(0);

const animates = ref([]);
const getAnimates = (el) => {
    animates.value.push(el);
};

function addAnimation(animate) {
    store.dispatch("animation/addAnimation", animate);
    isShowAnimation.value = false;
}

function previewAnimate() {
    eventBus.emit("runAnimation");
}

function removeAnimation(index) {
    store.dispatch("animation/removeAnimation", index);
    if (!curComponent.value.animations.length) {
        // 清空动画数据，停止运动
        eventBus.emit("stopAnimation");
    }
}

function handleAnimationSetting(index) {
    isShowAnimationSetting.value = true;
    curIndex.value = index;
}

async function handlerunAnimation(animate, index) {
    if (animate.pending) return;

    animate.pending = true;
    await runAnimation(animates.value[index], [animate]);

    // 防止无限触发同一元素的动画
    setTimeout(() => {
        animate.pending = false;
    }, 100);
}
</script>

<style lang="scss">
.animation-list {
    .cursor {
        cursor: pointer;
    }

    .div-animation {
        text-align: center;

        & > div {
            margin-top: 20px;
        }

        .el-tag {
            display: block;
            width: 50%;
            margin: auto;
            margin-bottom: 10px;
        }
    }

    .el-scrollbar__view {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        padding-left: 10px;

        .animate {
            cursor: pointer;
        }

        .animate > div {
            width: 100px;
            height: 60px;
            background: #f5f8fb;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 12px;
            margin-bottom: 10px;
            font-size: 12px;
            color: #333;
            border-radius: 3px;
            user-select: none;
            cursor: pointer;
        }
    }
}
</style>
