const config = require('./conf');
const devConfig = require('./conf-dev');

module.exports = process.env.NODE_ENV === 'production' ? config : devConfig;