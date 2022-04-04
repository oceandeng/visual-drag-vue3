import { reactive } from "vue";

export const moduleComponent = {
    namespaced: true,

    state: () => ({
        componentData: [],
        curComponent: null,
        curComponentIndex: null,
        isClickComponent: false,
    }),

    mutations: {
        setClickComponentStatus(state, status) {
            state.isClickComponent = status;
        },
        addComponent(state, { component, index }) {
            if (index != undefined) {
                state.componentData.splice(index, 1);
            } else {
                state.componentData.push(component);
            }
        },
        setCurComponent(state, { component, index }) {
            state.curComponent = component;
            state.curComponentIndex = index;
        },
        setShapeStyle(state, { top, left, width, height, rotate }) {
            if (top) state.curComponent.style.top = top;
            if (left) state.curComponent.style.left = left;
            if (width) state.curComponent.style.width = width;
            if (height) state.curComponent.style.height = height;
            if (rotate) state.curComponent.style.rotate = rotate;
        },
        setComponentData(state, componentData = []) {
            state.componentData = reactive(componentData)
        },
    },
};
