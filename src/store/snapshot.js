export const moduleSnapshot = {
    namespaced: true,

    state: () => ({
        snapShotData: [],   // 编辑器快照数据
        snapshotIndex: -1,  //快照索引
    }),

    mutations: {
        // 撤销
        undo(state){
            
        },
        // 重做
        redo(state){
            
        },
        // 记录快照
        recordSnapshot(state){

        }
    }
}