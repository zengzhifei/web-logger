let Utils = new class Utils {
    isArray(value) {
        return Object.prototype.toString.call(value) == '[object Array]';
    }
};

export default Utils;