'use strict';

var Readable = require('readable-stream').Readable;
var util = require('util');
var os = require('os');

function MemoryStream (opt) {
    if (!opt) opt = {};
    if (!(this instanceof MemoryStream)) return new MemoryStream(opt);

    Readable.call(this, opt);
    var self = this;
    self.sep = opt.sep || '\n';
    self._destroyed = false;
    self.iv = null;
    self.interval = opt.interval || 1000;

    function getMemoryData () {

        var heapUsed = process.memoryUsage().heapUsed;
        var heapTotal = process.memoryUsage().heapTotal;
        var heapPercent = heapUsed / heapTotal;
        var freeMem = os.freemem() / 1e6;

        var data = {
            heapUsed: heapUsed,
            heapTotal: heapTotal,
            heapPercent: heapPercent,
            freeMem: freeMem
        };

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
