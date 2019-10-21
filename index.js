module.exports = require('./src/Wilog.class');


// //CONFIG
// const amqp = require('amqplib');
// const CONFIG_HEART_BEAT = 30;
// const WI_LOG_CHANNEL_DEFAULT = 'wi_backend_log';
// const DEFAULT_HOST = 'localhost';
// const DEFAULT_PORT = 5672;
// const DEFAULT_USERNAME = 'test_publisher';
// const DEFAULT_PASSWORD = '123456';

// const WARNING = 'WARN';
// const ERROR = 'ERROR';
// const INFO = 'INFO';

// class Log {
//     constructor(wilog, type) {
//         //do nothing
//         this.wilog = wilog;
//         this.objPayload = {
//             type: type,
//             payload: null,
//             idProject: null,
//             message: "",
//             time: new Date()
//         }
//     }

//     getPayload() {
//         return this.objPayload;
//     }

//     project(idProject) {
//         this.objPayload.idProject = idProject;
//         return this;
//     }

//     message(message) {
//         this.objPayload.message = message;
//         return this;
//     }

//     payload(payLoad) {
//         this.objPayload.payload = payLoad;
//         return this;
//     }

//     push() {
//         this.wilog.push(this);
//     }

// }

// class WiLog {
//     constructor(config) {
//         this.queueChannel = WI_LOG_CHANNEL_DEFAULT;
//         this.queue = [];
//         this.config = config || {};
//         if (this.config.queue) {
//             this.queueChannel = this.config.queue
//         }
//         this.connection = null;
//         this.channel = null;
//         this.state = false;
//         this.init();
//         this.run();
//     }

//     setQueue(queue) {
//         this.queueChannel = queue.toString();
//     }

//     run() {
//         let runner = () => {
//             if (this.state) {
//                 if (this.queue.length > 0) {
//                     let message = this.queue.pop();
//                     console.log(JSON.stringify(message.getPayload()));
//                     if (
//                         this.channel.sendToQueue(this.queueChannel, Buffer.from(JSON.stringify(message.getPayload())), {persistent: true})
//                     ) {
//                         //message sent successfully
//                         setTimeout(runner, 0);
//                     } else {
//                         //message sent failed
//                         this.queue.push(message);
                        
//                         //wait for 1sec
//                         setTimeout(runner, 1000);
//                     }
//                 } else {
//                     //nothing to push
//                     //wait for 1sec to continue check for queue
//                     setTimeout(runner, 1000);
//                 }
//             } else {
//                 //wait for 3sec
//                 setTimeout(runner, 3000);
//             }
//         }

//         runner();
//     }

//     closeThenInitConnection() {
//         this.state = false;
//         this.connection.close();
//         this.channel.close();
//         this.init();
//     }

//     closeThenInitChannel() {
//         this.state = false;
//         this.channel.close();
//         this.initChannel()
//         .then((channel)=>{
//             this.channel = channel;
//             this.state = true;
//         })
//         .catch(e=>{
//             console.log(e.message);
//         });
//     }

//     //init connection
//     initConnection() {
//         return new Promise((resolve, reject)=>{
//             amqp.connect({
//                 hostname: this.config.host || DEFAULT_HOST,
//                 port: this.config.port || DEFAULT_PORT,
//                 heartbeat: CONFIG_HEART_BEAT,
//                 username: this.config.username || DEFAULT_USERNAME,
//                 password: this.config.password || DEFAULT_PASSWORD
//             }).then(conn=>{
//                 //process.once('SIGINT', conn.close.bind(conn));
//                 //set up listener

//                 conn.on('close', ()=>{
//                     this.closeThenInitConnection();
//                 });
//                 conn.on('error', ()=>{
//                     this.closeThenInitConnection();
//                 });
                
//                 //resolve
//                 resolve(conn);
//             }).catch(e => {
//                 reject(e);
//             });
//         });
//     }

//     init() {
//         this.initConnection()
//         .then((conn)=>{
//             this.connection = conn;
//             this.initChannel()
//             .then((channel)=>{
//                 this.channel = channel;
//                 this.state = true;
//             })
//             .catch(e=>{
//                 console.log(e.message);
//             });
//         })
//         .catch(e=>{
//             console.log(e.message);
//         });
//     }

//     initChannel() {
//         return new Promise((resolve, reject)=>{
//             this.connection.createChannel()
//             .then((channel)=>{
//                 //handle
//                 channel.on('error', ()=>{
//                     this.closeThenInitChannel();
//                 });
//                 channel.on('close', () => {
//                     this.closeThenInitChannel();
//                 });

//                 channel.assertQueue(this.queueChannel, {
//                     durable: true
//                 });
//                 //resolve
//                 resolve(channel);
//             })
//             .catch(e=>{
//                 reject(e);
//             });
//         });
//     }

//     push(message) {
//         this.queue.unshift(message);
//     }

//     info() {
//         return new Log(this, INFO);
//     }

//     warn() {
//         return new Log(this, WARNING);
//     }

//     error() {
//         return new Log(this, ERROR);
//     }

// }

// module.exports = WiLog;