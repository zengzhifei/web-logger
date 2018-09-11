class WebNetwork {
    constructor() {
        this.networkList = {};
        this._mockAjax();
    }

    /**
     * mock ajax
     * @private
     */
    _mockAjax() {
        let that = this;
        let id = this._getUniqueID();
        let _open = window.XMLHttpRequest.prototype.open;
        let _send = window.XMLHttpRequest.prototype.send;

        this.networkList[id] = {};

        window.XMLHttpRequest.prototype.open = function () {
            let _this = this, timer = null, args = [].slice.call(arguments), initState = -1, network = {};

            this._method = args[0];

            let _state = _this.onreadystatechange || function () {
            };
            let onReadyStateChange = function () {
                if (_this.readyState === 0) {
                    //TODO UNSENT
                    !network.startTime && (network.startTime = (+new Date()));
                } else if (_this.readyState === 1) {
                    //TODO OPENED
                    !network.startTime && (network.startTime = (+new Date()));
                } else if (_this.readyState === 2) {
                    //TODO HEADERS_RECEIVED
                    network.header = _this.getAllResponseHeaders();
                } else if (_this.readyState === 3) {
                    //TODO LOADING
                } else if (_this.readyState === 4) {
                    //TODO DONE
                    clearInterval(timer);
                    network.method = args[0];
                    network.url = args[1];
                    network.async = args[2];
                    network.status = _this.status;
                    network.responseType = _this.responseType;
                    network.response = _this.response;
                    network.endTime = (+new Date());
                    network.costTime = network.endTime - (network.startTime || network.endTime);
                    Object.assign(that.networkList[id], network);

                    console.log('callback');
                    console.log(that.networkList[id]);
                }
                return _state.apply(_this, arguments);
            };
            _this.onreadystatechange = onReadyStateChange;

            timer = setInterval(() => {
                initState !== _this.readyState && (initState = _this.readyState) && onReadyStateChange.call(_this);
            }, 10);
            return _open.apply(_this, args);
        };

        window.XMLHttpRequest.prototype.send = function () {
            let _this = this, args = [].slice.call(arguments), network = {};

            if (_this._method.toLocaleUpperCase() === 'POST') {
                network.data = args[0].split('&');
                Object.assign(that.networkList[id], network);
            }

            return _send.apply(this, args);
        };
    }

    /**
     * generate unique id
     * @returns {string}
     * @private
     */
    _getUniqueID() {
        let length = 32, timestamp = (+new Date()).toString(), randStringArr = timestamp.split("").reverse(), id = [];
        for (let i = 0; i < length; ++i) {
            let index = Math.random() * (randStringArr.length - 1) | 0;
            id.push(randStringArr[index]);
        }
        return id.join('');
    }
}

export default WebNetwork;