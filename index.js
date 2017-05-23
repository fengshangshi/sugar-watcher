/**
 * @file 监控平台打点组件
 * @author ss.feng
 */
const graphite = require('graphite');
const util = require('./libs/utils');

class Watcher {
    constructor(options, callback) {
        let __rate = options.rate || 1;
        let __host = options.host || '';
        let __port = options.port || 2013;
        let __callback = callback || function() {};

        __rate = __rate * (1000 * 60);

        let __url = 'plaintext://' + __host + ':' + __port;

        let __timeCache = {};
        let __metrics = this.metrics = {};

        this.count = function(key) {
            key += util.suffix(key);
            if (__metrics[key]) {
                __metrics[key]++;
            } else {
                __metrics[key] = 1;
            }
        };

        this.time = function(key) {
            key += util.suffix(key);
            if (__timeCache[key]) {
                __timeCache[key]['count'] += 1;
                __timeCache[key]['timestamp'] += timestamp;
            } else {
                __timeCache[key] = {
                    count: 1,
                    timestamp: timestamp,
                };
            }

            let count = __timeCache[key].count;
            let time = __timeCache[key].timestamp;

            __metrics[key] = time / count;
        };

        function send() {
            setTimeout(() => {
                sendLogToWatcher();
            }, __rate);
        }

        function sendLogToWatcher() {
            let client = graphite.createClient(__url);
            client.write(__metrics, err => {
                client.end();

                if (err) {
                    __callback(err);
                    return 'watcher日志发送错误';
                }

                Object.keys(__metrics).forEach(key => {
                    __metrics[key] = 0;
                });

                Object.keys(__timeCache).forEach(key => {
                    __timeCache[key] = null;
                });
            });
        }

        // 入口
        send();
    }

    set metrics(newValue) {
        this._metrics = newValue;
    }

    get metrics() {
        return this._metrics;
    }
}

module.exports = Watcher;
