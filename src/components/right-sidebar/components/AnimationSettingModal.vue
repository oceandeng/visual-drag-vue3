<template>
    <el-dialog
        :title="`${config.label} 动画配置`"
        v-model="centerDialogVisible"
        width="30%"
        center
        @close="handleCloseModal"
    >
        <div class="time">
            动画时长：<el-input-number
                v-model="config.animationTime"
                controls-position="right"
                :min="0.1"
                :precision="2"
                :step="0.01"
            />
        </div>
        <div class="loop">
            是否循环：<el-switch v-model="config.isLoop" active-text="是" inactive-text="否" :disabled="isDisabled">
            </el-switch>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleCloseModal">取 消</el-button>
            <el-button type="primary" @click="handleSaveSetting">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script setup>
import eventBus from "@/utils/eventBus";
import { defineProps, defineEmits, ref, reactive, computed } from "vue";
import {useStore} from 'vuex'

const store = useStore()
const curComponent = computed(() => store.state.component.curComponent)
const isDisabled = computed(() => curComponent.value.animations.length > 1)

const emit = defineEmits(['close'])

const props = defineProps({
    curIndex: {
        type: Number,
        default: 0,
    },
});

let config = ref({});
let centerDialogVisible = ref(true);

const { label, animationTime, isLoop = false, value } = curComponent.value.animations[props.curIndex] || {}
config.value = {
    animationTime,
    label,
    isLoop,
    value,
}

function handleCloseModal(){
    emit('close')
}

function handleSaveSetting(){
    const {isLoop } = config.value
    store.commit('animation/alterAnimation', {
        index: props.curIndex,
        data: {
            animationIndex: config.value.animationTime,
            isLoop,
        }
    })
    eventBus.emit('stopAnimation')
    handleCloseModal()
}
</script>

<style scoped lang="scss">
.loop {
    margin-top: 10px;
}
</style>
