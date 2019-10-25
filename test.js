// let WiLog = require('./index');

// let wiLog = new WiLog({
//     host: '192.168.0.87'
// });

// let random = parseInt(Math.random() * 50);

// let count = 0;

// let publish = function() {
//     wiLog.warn()
//     .project(1)
//     .payload({from: random})
//     .message("This is count number " + (++count))
//     .push();
//     setTimeout(publish, 500);
// };

// setTimeout(publish, 500);

let WiLog = require('./src/Wilog.class');

let wiLog = new WiLog("./logs");

// wiLog.info({message: "Hello word"});
wiLog.error({message: "Hello word"});
wiLog.info({message: "hello"});