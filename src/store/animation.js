export const moduleAnimation = {
    namespaced: true,

    actions: {
        addAnimation({rootState}, animation){
            const { curComponent} = rootState.component
            curComponent.animations.push(animation)
        },

        removeAnimation({rootState}, index){
            const { curComponent } = rootState.component;
            curComponent.animations.splice(index, 1)
        },

        alterAnimation({rootState}, {index, data={}}){
            const { curComponent } = rootState.component;
            if(typeof index === 'number'){
                const original = curComponent.animations[index]
                curComponent.animations[index] = {...original, ...data}
            }
        }
    }
}