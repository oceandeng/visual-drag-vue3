<template>
    <el-tabs v-model="activeName">
        <el-tab-pane label="属性" name="attr">
            <attr-list v-if="curComponent"></attr-list>
            <p v-else class="placeholder">请选择组件</p>
        </el-tab-pane>
        <el-tab-pane label="动画" name="animation">
            <animation-list v-if="curComponent"></animation-list>
            <p v-else class="placeholder">请选择组件</p>
        </el-tab-pane>
        <el-tab-pane label="事件" name="events">
            <event-list v-if="curComponent"></event-list>
            <p v-else class="placeholder">请选择组件</p>
        </el-tab-pane>
    </el-tabs>
</template>

<script setup>
import { ref, computed } from "vue";
import {useStore} from 'vuex'

import AttrList from './AttrList.vue'
import AnimationList from './AnimationList.vue'
import EventList from './EventList.vue'

const store = useStore()

const curComponent = computed(() => store.state.component.curComponent)

const activeName = ref("attr");
</script>

<style scss scoped>
.placeholder {
    text-align: center;
    color: #333;
}
</style>
