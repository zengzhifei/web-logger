//package
import pkg from '../package.json';
//utils
import utils from './utils.js';
//logger network
import network from './web-network.js';

class WebLogger {
    constructor(options = {}) {
        this.version = pkg.version;
        this.modules = ['network', 'exception'];
        this.configs = {
            monitorModules: this.modules,
            modulesCallback: function (data) {
                // TODO modules callback
            },
        };

        if (options.hasOwnProperty('monitorModules') && utils.isArray(options.monitorModules) && options.monitorModules.length) {
            let monitorModules = [];
            for (let i in options.monitorModules) {
                this.modules.indexOf(options.monitorModules[i]) > -1 && monitorModules.push(options.monitorModules[i]);
            }
            this.configs.monitorModules = monitorModules;
        }

        if (options.hasOwnProperty('modulesCallback') && utils.isFunction(options.modulesCallback)) {
            this.configs.modulesCallback = options.modulesCallback;
        }

        if (this.configs.monitorModules.length) {
            for (let i in this.configs.monitorModules) {
                let opts = options[this.configs.monitorModules[i]];
                opts = utils.isObject(opts) ? opts : {};
                (!opts.hasOwnProperty('callback') || !utils.isFunction(opts.callback)) && (opts.callback = this.configs.modulesCallback);
                new network(opts);
            }
        }
    }

    config(name, value = null) {
        if (utils.isString(name) && name && (null !== value)) {
            return (this.configs[name] = value) === value;
        }
        return utils.isString(name) && name ? this.configs[name] : this.configs;
    }
}

export default WebLogger;