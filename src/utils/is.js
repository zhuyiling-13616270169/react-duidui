// 判断值是否未某个类型
export function is (val, type) {
    return Object.prototype.toString.call(val) === `[object ${type}]`;
}

export const isObject = (value) => value !== null && typeof value === 'object';
export const isFunction = (value) => typeof value === 'function';
export const isString = (value) => typeof value === 'string';
export const isBoolean = (value) => typeof value === 'boolean';
export const isNumber = (value) => typeof value === 'number';
export const isUndefined = (value) => typeof value === 'undefined';

export function isEmpty (value) {
    if (isUndefined(value) || value === null) {
        return true;
    }

    if (Array.isArray(value) || is(value, 'String') || value instanceof String) {
        return value.length === 0;
    }

    if (value instanceof Map || value instanceof Set) {
        return value.size === 0;
    }

    if (is(value, 'Object')) {
        return Object.keys(value).length === 0;
    }

    return false;
}
