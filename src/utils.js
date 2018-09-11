let utils = new class Utils {
    isArray(value) {
        return Object.prototype.toString.call(value) == '[object Array]';
    }

    isString(value) {
        return Object.prototype.toString.call(value) == '[object String]';
    }

    isFunction(value) {
        return Object.prototype.toString.call(value) == '[object Function]';
    }

    isObject(value) {
        return Object.prototype.toString.call(value) == '[object Object]';
    }
}

export default utils;