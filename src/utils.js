let utils = new class Utils {
    isArray(value) {
        return Object.prototype.toString.call(value) === '[object Array]';
    }

    isString(value) {
        return Object.prototype.toString.call(value) === '[object String]';
    }

    isFunction(value) {
        return Object.prototype.toString.call(value) === '[object Function]';
    }

    isObject(value) {
        return Object.prototype.toString.call(value) === '[object Object]';
    }

    isNumber(value) {
        return Object.prototype.toString.call(value) === '[object Number]';
    }

    isBoolean(value) {
        return Object.prototype.toString.call(value) === '[object Boolean]';
    }

    isNull(value) {
        return Object.prototype.toString.call(value) === '[object Null]';
    }

    mergeObject(target, source) {
        if (this.isObject(target) && this.isObject(source)) {
            for (let key in source) {
                if (source.hasOwnProperty(key)) {
                    target[key] = target[key] && this.isObject(target[key]) ? this.mergeObject(target[key], source[key]) : source[key];
                }
            }
        }
        return target;
    }
};

export default utils;