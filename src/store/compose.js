import { $ } from "@/utils/utils";

export const moduleCompose = {
    namespaced: true,

    state: () => ({
        editor: null,
    }),

    mutations: {
        getEditor(state, id) {
            state.editor = $(id);
        },
    },
};
