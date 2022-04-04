// 角度转弧度
// Math.PI = 180度
export function angleToRadian(angle) {
    return (angle * Math.PI) / 180;
}

/**
 * 计算根据圆心旋转后的坐标点
 * @param   {Object}  point  旋转前的点坐标
 * @param   {Object}  center 旋转中心
 * @param   {Number}  rotate 旋转角度
 * @return  {Object}         旋转后的坐标
 * https://www.zhihu.com/question/67425734/answer/252724399 旋转矩阵公式
 */
export function calculateRotatedPointCoordinate(point, center, rotate) {
    /**
     * 旋转公式
     * 点a(x, y)
     * 旋转中心(x, y)
     * 旋转后点(x, y)
     * 旋转角度θ    theta
     * nx = cosθ * (ax - cx) - sinθ * (ay - cy) + cx
     * ny = sinθ * (ax - cx) + cosθ * (ay - cy) + cy
     */
    const radian = angleToRadian(rotate)

    return {
        x: Math.cos(radian) * (point.x - center.x) - Math.sin(radian) * (point.y - center.y) + center.x,
        y: Math.sin(radian) * (point.x - center.x) + Math.cos(radian) * (point.y - center.y) + center.y,
    };
}

/**
 * 获取旋转后的点坐标（八个点之一）
 * @param  {Object} style  样式
 * @param  {Object} center 组件中心点
 * @param  {String} name   点名称
 * @return {Object}        旋转后的点坐标
 */
export function getRotatedPointCoordinate(style, center, name) {
    let point // point 是未旋转前的坐标
    switch (name) {
        case 't':
            point = {
                x: style.left + (style.width / 2),
                y: style.top,
            }

            break
        case 'b':
            point = {
                x: style.left + (style.width / 2),
                y: style.top + style.height,
            }

            break
        case 'l':
            point = {
                x: style.left,
                y: style.top + style.height / 2,
            }

            break
        case 'r':
            point = {
                x: style.left + style.width,
                y: style.top + style.height / 2,
            }

            break
        case 'lt':
            point = {
                x: style.left,
                y: style.top,
            }

            break
        case 'rt':
            point = {
                x: style.left + style.width,
                y: style.top,
            }

            break
        case 'lb':
            point = {
                x: style.left,
                y: style.top + style.height,
            }

            break
        default: // rb
            point = {
                x: style.left + style.width,
                y: style.top + style.height,
            }

            break
    }

    return calculateRotatedPointCoordinate(point, center, style.rotate)
}

// 求两点之间的中点坐标
export function getCenterPoint(p1, p2) {
    return {
        x: p1.x + ((p2.x - p1.x) / 2),
        y: p1.y + ((p2.y - p1.y) / 2),
    }
}

export function changeStyleWithScale(value, scale) {
    return (value * parseInt(scale)) / 100;
}

export function mod360(deg) {
    return (deg + 360) % 360;
}
