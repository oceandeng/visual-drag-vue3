import { reactive } from "vue";

export function deepCopy(target) {
    if (typeof target == "object") {
        const result = Array.isArray(target) ? [] : {};

        for (const key in target) {
            if (typeof target[key] == "object") {
                result[key] = deepCopy(target[key]);
            } else {
                result[key] = target[key];
            }
        }

        return result;
    }

    return target;
}

let id = 0;

export function generateID() {
    return id++;
}

export function $(element) {
    return document.querySelector(element);
}

export function swap(arr, i, j) {
    const temp = arr[i]
    arr[i] = reactive(arr[j])
    arr[j] = reactive(temp)
}
