export const moduleLock = {
    namespaced: true,

    actions: {
        lock({ rootState}){
            rootState.component.curComponent.isLock = true
            
        },

        unLock({ rootState}){
            rootState.component.curComponent.isLock = false;
        }
    }
}