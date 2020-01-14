const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require('../config');

/**
 * mongodb数据库连接
 */
// mongoose.Promise = global.Promise;

let mongoUrl;
if (process.env.NODE_ENV === 'production') {
    mongoUrl = `mongodb://${config.db.username}:${config.db.password}@${config.db.hostname}:${config.db.port}/${config.db.db}`;
} else {
    mongoUrl = `mongodb://${config.db.hostname}:${config.db.port}/${config.db.db}`;
}


mongoose.connect(mongoUrl, {useNewUrlParser: true}).then(data => {
    console.log('connect to Mongo Success');
}).catch(e => {
    console.error('链接数据库失败：', e);
});

mongoose.connection.on('error', err => {
    console.error('链接数据库失败----', err);
});

exports.getModel = function (model) {
    const _model = require(`./${model}.js`);
    return mongoose.model(model, new Schema(_model));
}