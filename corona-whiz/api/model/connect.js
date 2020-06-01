const mongoose = require('mongoose');

const connectDb = function() {
    return mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

module.exports = connectDb;