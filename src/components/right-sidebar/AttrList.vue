<template>
    <div class="attr-list">
        <el-form>
            <el-form-item v-for="({ key, label }, index) in styleKeys" :key="index" :label="label">
                <el-color-picker v-if="key == 'borderColor'" v-model="curComponent.style[key]"></el-color-picker>
                <el-color-picker v-else-if="key == 'color'" v-model="curComponent.style[key]"></el-color-picker>
                <el-color-picker
                    v-else-if="key == 'backgroundColor'"
                    v-model="curComponent.style[key]"
                ></el-color-picker>
                <el-select v-else-if="selectKeys.includes(key)" v-model="curComponent.style[key]">
                    <template v-if="key == 'textAlign'">
                        <el-option
                            v-for="item in textAlignOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </template>
                    <template v-else-if="key == 'borderStyle'">
                        <el-option
                            v-for="item in borderStyleOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </template>
                    <template v-else-if="key == 'verticalAlign'">
                        <el-option
                            v-for="item in verticalAlignOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </template>
                </el-select>
                <el-input v-else v-model.number="curComponent.style[key]" />
            </el-form-item>
            <el-form-item v-if="curComponent && !excludes.includes(curComponent.component)" label="内容">
                <el-input v-model="curComponent.propValue" type="textarea" />
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { styleData } from "@/utils/style";

const store = useStore();
const curComponent = computed(() => store.state.component.curComponent);

const styleKeys = computed(() => {
    if (curComponent.value) {
        const curComponentStyleKeys = Object.keys(curComponent.value.style);
        return styleData.filter((item) => curComponentStyleKeys.includes(item.key));
    }
});

const selectKeys = ["textAlign", "borderStyle", "verticalAlign"];
const excludes = ["Picture", "Group"];
const textAlignOptions = [
    {
        label: "左对齐",
        value: "left",
    },
    {
        label: "居中",
        value: "center",
    },
    {
        label: "右对齐",
        value: "right",
    },
];
const borderStyleOptions = [
    {
        label: "实线",
        value: "solid",
    },
    {
        label: "虚线",
        value: "dashed",
    },
];
const verticalAlignOptions = [
    {
        label: "上对齐",
        value: "top",
    },
    {
        label: "居中对齐",
        value: "middle",
    },
    {
        label: "下对齐",
        value: "bottom",
    },
];
</script>

<style lang="scss" scoped>
.attr-list {
    overflow: auto;
    padding: 20px;
    padding-top: 0;
    height: 100%;
}
</style>
