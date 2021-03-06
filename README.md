# mem-stream
Creates a Readable stream of memory information.

# example
```javascript
var MemoryStream = require('mem-stream');

var memStream = new MemoryStream({
    sep: '\n',
    interval: 500,
    dataType: 'osFreeMem'
});

memStream.pipe(process.stdout);

// {"heapUsed":2719192,"heapTotal":7195904,"heapPercent":0.3778805275890284,"freeMem":9306.43968}
// {"heapUsed":3080016,"heapTotal":7195904,"heapPercent":0.42802349781208865,"freeMem":9306.46016}
// {"heapUsed":3104224,"heapTotal":7195904,"heapPercent":0.4313876338539258,"freeMem":9306.472448}
// {"heapUsed":3107712,"heapTotal":7195904,"heapPercent":0.43187235405030416,"freeMem":9306.546176}
```

# methods
```javascript
var MemoryStream = require('mem-stream');
```

## var memoryStream = new MemoryStream(opts)

- `opts.sep` - `string` the separator used between outputted chunks.
- `opts.interval` - `int` how often to poll for data
- `opts.dataType` - Can be one of the following:
    - `heapUsed` - process heap used in kb
    - `heapTotal` - process heap total in kb
    - `heapPercent` - % of heap used
    - `osFreeMem` - total system free memory in kb


# install
```bash
npm install mem-stream
```

# license
MIT
