'use strict';

var MemoryStream = require('./index');

var StampStream = require('./timestamp-stream');
var stamper = new StampStream();

var memStream = new MemoryStream({
    sep: '\n',
    interval: 500
});

memStream.pipe(stamper).pipe(process.stdout);
