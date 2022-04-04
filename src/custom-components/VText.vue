<template>
    <div
        v-if="editMode == 'edit'"
        class="v-text"
        @keydown="handleKeydown"
        @keyup="handleKeyup"
    >
        <!-- tabindex >= 0 使得双击时聚集该元素 -->
        <div
            ref="text"
            :contenteditable="canEdit"
            :class="{ canEdit }"
            :tabindex="element.id"
            :style="{ verticalAlign: element.style.verticalAlign }"
            @dblclick="setEdit"
            @paste="clearStyle"
            @mousedown="handleMousedown"
            @blur="handleBlur"
            @input="handleInput"
            v-html="element.propValue"
        ></div>
    </div>
    <div v-else class="v-text preview">
        <div :style="{ verticalAlign: element.style.verticalAlign }" v-html="element.propValue"></div>
    </div>
</template>

<script setup>
import { computed, defineProps } from "vue";
import { useStore } from "vuex";

const store = useStore();
const editMode = computed(() => store.state.public.editMode);

const canEdit = true

const props = defineProps({
    propValue: {
        type: String,
        default: "",
    },
    element: {
        type: Object,
        default: () => {},
    }
});

function setEdit(){}
function clearStyle(){}
function handleMousedown(){}
function handleBlur(){}
function handleInput(e) {}

</script>

<style lang="scss" scoped>
.v-text {
    width: 100%;
    height: 100%;
    display: table;

    div {
        display: table-cell;
        width: 100%;
        height: 100%;
        outline: none;
    }

    .canEdit {
        cursor: text;
        height: 100%;
    }
}

.preview {
    user-select: none;
}
</style>