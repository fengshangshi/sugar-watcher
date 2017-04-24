#sugar-watcher

sugar2.0框架的监控组件。

##API

###time(key, timestamp)
对key进行一定时间范围内的时间差计算，以统计接口的平均耗时

```
const watcher = require('sugar-watcher');
// watcher.time('test', [endTime - startTime]);
```

###count(key)
对key进行一定时间范围内的计数

```
const watcher = require('sugar-watcher');
watcher.count('test');
```