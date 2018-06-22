exports.DATABASE_URL = process.env.DATABASE_URL || global.DATABASE_URL || 'mongodb://admin:administrator1@ds163530.mlab.com:63530/lego-inventory';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://admin:administrator1@ds163530.mlab.com:63530/lego-inventory';
exports.PORT = process.env.PORT || 8080;
