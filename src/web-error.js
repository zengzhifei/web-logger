import WebModule from "./web-module.js";
import utils from "./utils.js";

class WebError extends WebModule {
    constructor(option = {}) {
        super(option);

        this._mockError();
    }

    /**
     * mock exception
     * @private
     */
    _mockError() {
        let that = this, error;
        window.addEventListener('error', function (errorEvent) {
            if (errorEvent.target === window) {
                error = {
                    errorMessage: errorEvent.message,
                    errorFileName: errorEvent.filename,
                    errorLineNo: errorEvent.lineno,
                    errorColNo: errorEvent.colno,
                    errorTime: +new Date(),
                    errorStack: errorEvent.error && errorEvent.error.stack ? errorEvent.error.stack.toString() : ''
                };
            } else {
                error = {
                    errorMessage: errorEvent.target.outerHTML + ' 404 (Not Found)',
                    errorFileName: errorEvent.target.baseURI,
                    errorLineNo: 0,
                    errorColNo: 0,
                    errorTime: +new Date(),
                    errorStack: errorEvent.error && errorEvent.error.stack ? errorEvent.error.stack.toString() : ''
                };
            }

            if (utils.isFunction(that.configs.callback)) {
                setTimeout(function () {
                    that.configs.callback(error);
                }, 1);
            }
        }, true);
    }
}

export default WebError;
