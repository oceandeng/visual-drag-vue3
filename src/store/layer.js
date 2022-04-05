import { swap } from "@/utils/utils";
import toast from "@/utils/toast";

export const moduleLayer = {
    namespaced: true,

    actions: {
        upComponent({ rootState }) {
            const { componentData, curComponentIndex } = rootState.component;
            // 上移图层 index, 表示元素在数组中越往后
            if (curComponentIndex < componentData.length - 1) {
                swap(componentData, curComponentIndex, curComponentIndex + 1);
            } else {
                toast("已经到顶了");
            }
        },

        downComponent({ rootState }) {
            const { componentData, curComponentIndex } = rootState.component;
            // 下移图层 index, 表示元素在数组中越往前
            if (curComponentIndex > 0) {
                swap(componentData, curComponentIndex, curComponentIndex - 1);
            } else {
                toast("已经到底了");
            }
        },

        topComponent({ rootState }) {
            const { componentData, curComponentIndex, curComponent } = rootState.component;
            // 置顶
            if (curComponentIndex < componentData.length - 1) {
                componentData.splice(curComponentIndex, 1);
                componentData.push(curComponent);
            } else {
                toast("已经到顶了");
            }
        },

        bottomComponent({ rootState }) {
            const { componentData, curComponentIndex, curComponent } = rootState.component;
            // 置底
            if (curComponentIndex > 0) {
                componentData.splice(curComponentIndex, 1);
                componentData.unshift(curComponent);
            } else {
                toast("已经到底了");
            }
        },
    },
};
