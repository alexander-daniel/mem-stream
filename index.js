'use strict';

var Readable = require('readable-stream').Readable;
var util = require('util');
var os = require('os');

function MemoryStream (opt) {
    if (!opt) opt = {};
    if (!(this instanceof MemoryStream)) return new MemoryStream(opt);

    var self = this;
    Readable.call(this, opt);

    self.sep = opt.sep || '\n';
    self.interval = opt.interval || 1000;
    self.dataType = opt.dataType;

    self._destroyed = false;
    self.iv = null;

    function getMemoryData () {

        var heapUsed = process.memoryUsage().heapUsed;
        var heapTotal = process.memoryUsage().heapTotal;
        var data;

        switch (self.dataType) {
            case 'heapUsed':
                data  = heapUsed;
                break;
            case 'heapTotal':
                data = heapTotal;
                break;
            case 'heapPercent':
                data = Math.floor(heapUsed / heapTotal * 100);
                break;
            case 'osFreeMem':
                data = os.freemem() / 1e6;
                break;
        }

        if (!opt.objectMode) {
            data = JSON.stringify(data) + self.sep;
            data = new Buffer(data, 'utf8');
        }

        self.push(data);

    }

    function startSignal () {
        self.iv = setInterval(getMemoryData, self.interval);
    }

    startSignal();

}

util.inherits(MemoryStream, Readable);

MemoryStream.prototype._read = function () {
    if (this._destroyed) {
        this.push(null);
    }
};

MemoryStream.prototype.destroy = function () {
    clearInterval(this.iv);
    this._destroyed = true;
    this.emit('end');
};

module.exports = MemoryStream;
