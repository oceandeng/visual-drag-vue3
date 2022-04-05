<template>
    <div @click="handleClick" ref="wrapperRef">
        <component
            :is="config.component"
            class="component"
            :style="getStyle(config.style)"
            :prop-value="config.propValue"
            :element="config"
        />
    </div>
</template>

<script setup>
import { defineProps, onMounted, ref } from "vue";
import runAnimation from "@/utils/runAnimation";
import { getStyle } from "@/utils/style";
import { events } from '@/utils/events'

const wrapperRef = ref(null);

const props = defineProps({
    config: {
        type: Object,
        require: true,
        default: () => {},
    },
});

onMounted(() => {
    runAnimation(wrapperRef.value, props.config.animations);
});

function handleClick() {
    const events = props.config.events;
    Object.keys(events).forEach((event) => {
        [event](events[event]);
    });
}
</script>

<style lang="scss" scoped>
.component {
    position: absolute;
}
</style>
