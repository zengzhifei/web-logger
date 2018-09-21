import pkg from '../package.json';
import utils from "./utils.js";
import webCore from "./web-core.js";
import network from './web-network.js';
import error from './web-error.js';

class WebLogger {
    constructor(options = {}) {
        this.version = pkg.version;
        this.modules = ['network', 'error'];
        this.configs = {
            mountedModules: [],
            modulesCallback: function (data) {
                // TODO modules callback
            },
        };

        const modulesClass = {
            network: network,
            error: error
        };

        if (options.hasOwnProperty('mountedModules') && utils.isArray(options.mountedModules) && options.mountedModules.length) {
            let mountedModules = [];
            for (let i in options.mountedModules) {
                if (options.mountedModules.hasOwnProperty(i)) {
                    this.modules.indexOf(options.mountedModules[i]) > -1 && mountedModules.push(options.mountedModules[i]);
                }
            }
            this.configs.mountedModules = mountedModules;
        } else {
            for (let i in this.modules) {
                this.configs.mountedModules.push(this.modules[i]);
            }
        }

        if (options.hasOwnProperty('modulesCallback') && utils.isFunction(options.modulesCallback)) {
            this.configs.modulesCallback = options.modulesCallback;
        }

        if (this.configs.mountedModules.length) {
            for (let i in this.configs.mountedModules) {
                let opts = options[this.configs.mountedModules[i]];
                if (utils.isObject(opts)) {
                    if (utils.isObject(this.configs[this.configs.mountedModules[i]])) {
                        utils.mergeObject(this.configs[this.configs.mountedModules[i]], opts);
                    } else {
                        this.configs[this.configs.mountedModules[i]] = opts;
                    }
                }
                let configs = this.getModuleConfig(this.configs.mountedModules[i]);
                if (utils.isFunction(modulesClass[this.configs.mountedModules[i]])) {
                    let moduleObject = new modulesClass[this.configs.mountedModules[i]](configs);
                    webCore.mountModule(this.configs.mountedModules[i], moduleObject);
                } else {
                    this.configs.mountedModules.splice(i, 1);
                }
            }
        }
    }

    config(name = null, value = null) {
        if (utils.isNull(name) || (utils.isString(name) && utils.isNull(value))) {
            return utils.isNull(name) ? this.configs : this.configs[name];
        } else if (utils.isObject(name)) {
            utils.mergeObject(this.configs, name);
        } else if (utils.isString(name)) {
            if (utils.isObject(this.configs[name]) && utils.isObject(value)) {
                utils.mergeObject(this.configs[name], value);
            } else {
                this.configs[name] = value;
            }
        }

        return this;
    }

    getModuleConfig(module) {
        let configs = {};
        if (module && utils.isString(module) && this.modules.indexOf(module) > -1) {
            configs = utils.isObject(this.configs[module]) ? this.configs[module] : {};
            (!configs.hasOwnProperty('callback') || !utils.isFunction(configs.callback)) && (configs.callback = this.configs.modulesCallback);
        }
        return configs;
    }

    reload(module) {
        let modules = module && utils.isString(module) && this.modules.indexOf(module) > -1 ? [module] : this.configs.mountedModules;
        for (let i in modules) {
            if (modules.hasOwnProperty(i)) {
                let configs = this.getModuleConfig(modules[i]);
                let moduleObject = webCore.getMountedModule(modules[i]);
                utils.isObject(moduleObject) && moduleObject.setOptions(configs);
            }
        }
    }
}

export default WebLogger;