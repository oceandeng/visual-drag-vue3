// 获取样式
export function getStyle(style, filter = []) {
    const needUnit = ["fontSize", "width", "height", "top", "left", "borderWidth", "letterSpacing", "borderRadius"];

    const result = {}
    Object.keys(style).forEach(key => {
        if(!filter.includes(key)){
            if(key != 'rotate'){
                result[key] = style[key]

                if(needUnit.includes(key)){
                    result[key] += 'px'
                }
            }else{
                result.transform = `${key}(${style[key]}deg)`
            }
        }
    })

    return result
}

export function setStyle(style, attributes = []) {
    const attributesCopy = Reflect.apply(Array.prototype.slice, attributes, []);

    let result = {};

    attributesCopy.forEach((key) => {
        if (key != "rotate") {
            result[key] = `${style[key]}px`;
        } else {
            result.transform = `${key}(${style[key]}deg)`;
        }
    });

    return result;
}
