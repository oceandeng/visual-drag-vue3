import { deepCopy } from "@/utils/utils";

export const moduleSnapshot = {
    namespaced: true,

    state: () => ({
        snapshotData: [], // 编辑器快照数据
        snapshotIndex: -1, //快照索引
    }),

    actions: {
        undo({ state, commit, rootState }) {
            if (state.snapshotIndex >= 0) {
                state.snapshotIndex--;
                const componentData = deepCopy(state.snapshotData[state.snapshotIndex]) || [];

                if (rootState.component.curComponent) {
                    // 如果当前组件不在 componentData 中，则置空
                    const needClean = !componentData.find(
                        (component) => rootState.component.curComponent.id == component.id
                    );

                    if (needClean) {
                        commit(
                            "component/setCurComponent",
                            {
                                component: null,
                                index: null,
                            },
                            { root: true }
                        );
                    }
                }

                commit("component/setComponentData", componentData, { root: true });
            }
        },
        redo({ state, commit }) {
            if (state.snapshotIndex < state.snapshotData.length - 1) {
                state.snapshotIndex++;
                commit("component/setComponentData", deepCopy(state.snapshotData[state.snapshotindex]), { root: true });
            }
        },
        recordSnapshot({ state, rootState }) {
            // 添加新的快照
            state.snapshotData[++state.snapshotIndex] = deepCopy(rootState.component.componentData);
            // 在 undo 过程中，添加新的快照时，要将它后面的快照清理掉
            if (state.snapshotIndex < state.snapshotData.length - 1) {
                state.snapshotData = state.snapshotData.slice(0, state.snapshotIndex + 1);
            }
        },
    },
};
