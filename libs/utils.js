/**
 * @file 小工具
 * @author ss.feng
 */
'use strict'

const os = require('os');
const signs = require('./signs');

exports.hostname = function() {
    return os.hostname().replace(/qunar\.com/g, '').replace(/\./g, '_');
};

exports.suffix = function(key) {
    return signs['_'] + signs[key] + signs['_'] + exports.hostname();
};
