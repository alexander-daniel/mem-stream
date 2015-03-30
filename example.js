'use strict';

var MemoryStream = require('./index');

var memStream = new MemoryStream({
    sep: '\n',
    interval: 500,
    dataType: 'osFreeMem'
});

memStream.pipe(process.stdout);
