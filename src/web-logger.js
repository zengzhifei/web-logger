//utils
import Utils from './utils.js';
//logger network
import WebNetwork from './web-network.js';

class WebLogger {
    constructor(options) {
        this.configs = {
            monitorModules: ['network']
        };
        if (options.hasOwnProperty('monitorModules') && Utils.isArray(options.monitorModules) && options.monitorModules.length) {
            let monitorModules = [];
            for (let i in options.monitorModules) {
                this.configs.monitorModules.indexOf(options.monitorModules[i]) > -1 && monitorModules.push(options.monitorModules[i]);
            }
        }
        new WebNetwork();
    }


}

export default WebLogger;