export const moduleContextmenu = {
    namespaced: true,

    state: () => ({
        menuTop: 0,
        menuLeft: 0,
        menuShow: false,
    }),

    mutations: {
        showContextmenu(state, { top, left }) {
            state.menuShow = true;
            state.menuTop = top;
            state.menuLeft = left;
        },
        hideContextmenu(state) {
            state.menuShow = false;
        },
    },
};
