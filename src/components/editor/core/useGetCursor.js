import { mod360 } from "@/utils/translate";

export function useGetCursor() {
    // 八个方向
    const pointList = ["lt", "t", "rt", "r", "rb", "b", "lb", "l"];
    // 每个点对应的初始角度
    const initialAngle = {
        lt: 0,
        t: 45,
        rt: 90,
        r: 135,
        rb: 180,
        b: 225,
        lb: 270,
        l: 315,
    };
    // 每个范围的角度对应的光标
    const angleToCursor = [
        { start: 338, end: 23, cursor: "nw" },
        { start: 23, end: 68, cursor: "n" },
        { start: 68, end: 113, cursor: "ne" },
        { start: 113, end: 158, cursor: "e" },
        { start: 158, end: 203, cursor: "se" },
        { start: 203, end: 248, cursor: "s" },
        { start: 248, end: 293, cursor: "sw" },
        { start: 293, end: 338, cursor: "w" },
    ];

    const getCursor = (curComponent) => {
        const rotate = mod360(curComponent.style.rotate); //取余 360
        const result = {};
        let lastMatchIndex = -1; // 从上一个命中的角度索引开始匹配下一个，降低时间复杂度

        pointList.forEach((point) => {
            const angle = mod360(initialAngle[point] + rotate);
            const len = angleToCursor.length;
            while (true) {
                lastMatchIndex = (lastMatchIndex + 1) % len;
                const angleLimit = angleToCursor[lastMatchIndex];

                if (angle >= 338 || angle < 23) {
                    result[point] = "nw-resize";
                    return;
                }

                if (angleLimit.start <= angle && angle < angleLimit.end) {
                    result[point] = angleLimit.cursor + "-resize";
                    return;
                }
            }
        });

        return result;
    };

    return {
        pointList,
        getCursor,
    };
}
