export const modulePublic = {
    namespaced: true,

    state: () => ({
        editMode: "edit",
        canvasStyleData: {
            width: 1200,
            height: 900,
            scale: 100,
        },
    }),

    mutations: {
        setCanvasStyle(state, style) {
            state.canvasStyleData = style;
        },
        setEditMode(state, mode) {
            state.mode = mode;
        }
    },

    actions: {
        setShapeStyle({commit}, position){
            commit('component/setShapeStyle', position, {root: true})
        }
    }
};