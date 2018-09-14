import utils from "./utils.js";

class WebModule {
    constructor(options) {
        this.configs = {
            callback: function (data) {
                // TODO module callback
            },
        };
        this.setOptions(options);
    }

    setOptions(options) {
        if (utils.isObject(options)) {
            utils.mergeObject(this.configs, options);
        }
    }
}

export default WebModule;