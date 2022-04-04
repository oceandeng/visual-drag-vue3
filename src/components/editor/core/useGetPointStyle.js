export function useGetPointStyle() {

    const getPointStyle = (point, defaultStyle, cursors) => {
        const { width, height } = defaultStyle;

        const hasT = /t/.test(point);
        const hasR = /r/.test(point);
        const hasB = /b/.test(point);
        const hasL = /l/.test(point);

        let top = 0;
        let left = 0;

        if (point.length == 2) {
            // 四个角的点
            top = hasT ? 0 : height;
            left = hasL ? 0 : width;
        } else {
            // 上下两点的点，宽度居中
            if (hasT || hasB) {
                top = hasT ? 0 : height;
                left = width / 2;
            }
            // 左右两点的点，高度居中
            if (hasL || hasR) {
                top = height / 2;
                left = hasL ? 0 : width;
            }
        }

        return {
            marginTop: "-4px",
            marginLeft: "-4px",
            top: `${top}px`,
            left: `${left}px`,
            cursor: cursors[point]
        };
    };

    return {
        getPointStyle,
    }
}