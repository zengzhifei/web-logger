import WebModule from "./web-module.js";
import utils from "./utils.js";

class WebNetwork extends WebModule {
    constructor(options = {}) {
        super(options);

        this._mockAjax();
    }

    /**
     * mock ajax
     * @private
     */
    _mockAjax() {
        let that = this;
        let _open = window.XMLHttpRequest.prototype.open;
        let _send = window.XMLHttpRequest.prototype.send;

        window.XMLHttpRequest.prototype.open = function () {
            let _this = this, args = [].slice.call(arguments);

            try {
                let timer = null, initState = -1;

                _this._network = {
                    requestMethod: args[0],
                    requestUrl: args[1],
                    requestType: args[2] ? 'async' : 'sync'
                };

                let _state = _this.onreadystatechange || function () {
                };
                let onReadyStateChange = function () {
                    if (_this.readyState === 0) {
                        // TODO UNSENT
                        !_this._network.requestTime && (_this._network.requestTime = (+new Date()));
                    } else if (_this.readyState === 1) {
                        // TODO OPENED
                        !_this._network.requestTime && (_this._network.requestTime = (+new Date()));
                    } else if (_this.readyState === 2) {
                        // TODO HEADERS_RECEIVED
                    } else if (_this.readyState === 3) {
                        // TODO LOADING
                    } else if (_this.readyState === 4) {
                        // TODO DONE
                        timer && clearInterval(timer);
                        _this._network.requestTimeout = _this.timeout;
                        _this._network.requestHeader = _this.getAllResponseHeaders().split('\n');
                        _this._network.responseStatus = _this.status;
                        _this._network.responseType = _this.responseType;
                        _this._network.responseResult = _this.response;
                        _this._network.responseTime = (+new Date());
                        _this._network.costTime = _this._network.responseTime - (_this._network.requestTime || _this._network.responseTime);

                        if (utils.isFunction(that.configs.callback)) {
                            setTimeout(function () {
                                that.configs.callback(_this._network);
                            }, 1);
                        }
                    }
                    return _state.apply(_this, arguments);
                };
                _this.onreadystatechange = onReadyStateChange;

                timer = setInterval(() => {
                    initState !== _this.readyState && (initState = _this.readyState) && onReadyStateChange.call(_this);
                }, 10);

            } catch (e) {
                console.log(e);
            }

            return _open.apply(this, args);
        };

        window.XMLHttpRequest.prototype.send = function () {
            let _this = this, args = [].slice.call(arguments);

            try {
                if (_this._network.requestMethod.toLocaleUpperCase() === 'POST') {
                    let requestData = {};
                    args[0] && args[0].split('&').forEach(function (item, index) {
                        item = item.split('=');
                        let key = decodeURIComponent(item[0].replace(/\+/g, ' '));
                        requestData[key] = decodeURIComponent(item[1].replace(/\+/g, ' '));
                    });
                    _this._network.requestData = requestData;
                }
            } catch (e) {
                console.log(e);
            }

            return _send.apply(this, args);
        };
    }
}

export default WebNetwork;