const mongoose = require('mongoose');

const config = {
    dburl: process.env.DATABASE_URL
}

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

try {
    mongoose.connect(config.dburl, options);
} catch (error) {
    console.log(error);
}

const db = mongoose.connection;

db.on('connected', function () {
    console.log('Mongoose default connection established.');
});

db.on('close', function () {
    console.log('Mongoose connection closed.');
});

// When the connection is disconnected
db.on('disconnected', function () {
    console.log('Mongoose default connection ended.');
});

module.exports.db = db;