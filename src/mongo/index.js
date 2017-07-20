/**
 * Created by Administrator on 2017/7/8.
 */
import mongoose from 'mongoose';
import config from '../config';
mongoose.connect(config.MONGO_SERVER, {poolSize: 10, useMongoClient: true});
const db = mongoose.connection;
mongoose.Promise = global.Promise;
db.once('open', () => {
    console.log('mongoserver connect successfully');
});

db.on('error', function(error) {
    console.error('Error in Mongo connection: ' + error);
    mongoose.disconnect();
});

db.on('close', function() {
    console.log('connection disconnected');
    mongoose.connect(config.MONGO_SERVER, {server:{auto_reconnect:true}});
});
export default db;