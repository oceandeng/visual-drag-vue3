<template>
    <div style="overflow: hidden">
        <img :src="propValue" />
    </div>
</template>
<script setup>
import { defineProps } from "vue";

const props = defineProps({
    propValue: {
        type: String,
        require: true,
    },
    element: {
        type: Object,
        default: () => {}
    }
});
</script>
<style lang="scss" scoped>
img{
    width: 100%;
    height: 100%;
}
</style>