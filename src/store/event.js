export const moduleEvent = {
    namespaced: true,

    actions: {
        addEvent({rootState}, {event, param}){
            rootState.component.curComponet.events[event] = param
        },

        removeEvent({rootState}, event){
            delete rootState.component.curComponet.events[event];
        }
    }
}