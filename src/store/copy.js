import toast from "@/utils/toast";
import { generateID, deepCopy } from "@/utils/utils";

export const moduleCopy = {
    namespaced: true,

    state: () => ({
        copyData: null, // 复制黏贴剪切
        isCut: false,
    }),

    actions: {
        copy({ state, commit, rootState }) {
            if(!rootState.component.curComponent){
                toast('请选择组件')
                return
            }

            // 如果有剪切的数据，需要先还原
            restorePreCutData(state, commit, rootState)
            copyData(state, rootState)

            state.isCut = false
        },
        paste({ state, commit, rootState }, isMouse) {
            if(!state.copyData){
                toast('请选择组件')
                return
            }

            const data = state.copyData.data

            if(isMouse){
                data.style.top = rootState.contextmenu.menuTop
                data.style.left = rootState.contextmenu.menuLeft
            }else{
                data.style.top += 10
                data.style.left += 10
            }

            data.id = generateID()

            // Group 的子组件根节点的 id 是通过组件的 id 生成的，必须重新生成 id，否则拆分 Group 的时候获取根节点不正确
            if(data.component === 'Group'){
                data.propValue.forEach(component => {
                    component.id = generateID()
                })
            }

            commit('component/addComponent', {component: deepCopy(data)}, {root: true})

            if(state.isCut){
                state.copyData = null
            }
        },
        cut({ state, commit, rootState }) {
            if(!rootState.component.curComponent){
                toast('请选择组件')
                return
            }

            // 如果重复剪切，需要恢复上一次剪切的数据
            restorePreCutData(state, commit, rootState)
            copyData(state, rootState)

            commit('component/deleteComponent', null, {root: true})
            state.isCut = true
        },
    },
};

// 恢复上一次剪切的数据
function restorePreCutData(state,commit, rootState){
    if(state.isCut && state.copyData){
        const data = deepCopy(state.copyData.data)
        const index = state.copyData.index
        data.id = generateID()
        commit('component/addComponent', {component: data, index}, {root: true})
        if (rootState.component.curComponentIndex >= index) {
            // 如果当前组件索引大于等于插入索引，需要加一，因为当前组件后移了一位
            rootState.component.curComponentIndex++
        }
    }
}

function copyData(state, rootState){
    state.copyData = {
        data: deepCopy(rootState.component.curComponent),
        index: rootState.component.curComponentIndex,
    }
}
