import utils from "./utils.js";

let webCore = new class WebCore {
    constructor() {
        this.mountedModules = {};
    }

    mountModule(moduleName, moduleObject) {
        if (moduleName && utils.isString(moduleName) && moduleObject && utils.isObject(moduleObject)) {
            this.mountedModules[moduleName] = moduleObject;
        }
    }

    getMountedModule(moduleName) {
        return moduleName && utils.isString(moduleName) && this.mountedModules.hasOwnProperty(moduleName) ? this.mountedModules[moduleName] : null;
    }

};

export default webCore;