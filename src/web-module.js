import utils from "./utils";

class WebModule {
    constructor(options) {
        this.configs = {
            callback: function (data) {
                // TODO module callback
            }
        };
        this.setOptions(options);
    }

    setOptions(options) {
        if (utils.isObject(options)) {
            Object.assign(this.configs, options);
        }
    }
}

export default WebModule;