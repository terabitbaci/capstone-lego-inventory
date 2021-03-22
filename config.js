//exports.DATABASE_URL = process.env.DATABASE_URL || global.DATABASE_URL || 'mongodb://admin:administrator1@ds163530.mlab.com:63530/lego-inventory';
//exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://admin:administrator1@ds163530.mlab.com:63530/lego-inventory';
exports.DATABASE_URL = process.env.DATABASE_URL || global.DATABASE_URL || 'mongodb://lego-inventory-user:Password1@lego-inventory-cluster.uvoen.mongodb.net/lego-inventory-for-heroku?retryWrites=true&w=majority';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://lego-inventory-user:Password1@lego-inventory-cluster.uvoen.mongodb.net/lego-inventory-for-heroku?retryWrites=true&w=majority';
exports.PORT = process.env.PORT || 8080;
