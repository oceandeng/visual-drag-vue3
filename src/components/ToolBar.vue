<template>
    <el-header class="top-bar">
        <el-row>
            <el-button :size="buttonSize">撤销</el-button>
            <el-button :size="buttonSize">重做</el-button>
            <el-button :size="buttonSize">插入图片</el-button>
            <el-button :size="buttonSize">预览</el-button>
            <el-button :size="buttonSize" @click="save">保存</el-button>
            <el-button :size="buttonSize">清空画布</el-button>
            <el-button :size="buttonSize" disabled>组合</el-button>
            <el-button :size="buttonSize" disabled>拆分</el-button>
            <el-button :size="buttonSize" disabled>锁定</el-button>
            <el-button :size="buttonSize" disabled>解锁</el-button>
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
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";

const store = useStore();

const buttonSize = "small";
const canvasStyleData = computed(() => store.state.public.canvasStyleData);
const componentData = computed(() => store.state.component.componentData);

function setCanvasStyle() {
    store.commit("public/setCanvasStyle", store.state.public.canvasStyleData);
}

function save() {
    console.log(componentData.value);
    localStorage.setItem("canvasStyle", JSON.stringify(canvasStyleData.value));
    localStorage.setItem("canvasData", JSON.stringify(componentData.value));
    ElMessage({
        message: '保存成功！',
        type: 'success',
    })
}
</script>

<style lang="scss" scoped>
.top-bar {
    box-sizing: border-box;
    padding: 15px 0 0 20px;
    background: #409eff;
}
</style>
