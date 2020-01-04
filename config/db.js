const mongoose = require('mongoose');

// config file gitignored for security
const config = require('config');

const db = config.get('mongoURI')

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true, // removes 'DepreciationWarning' for URL string parser
            useUnifiedTopology: true, // removes 'DepreciationWarning' for Server Discovery & Monitoring
        });

        console.log('MongoDB Connected...');
    } catch (err) {
        console.log(err.message);

        // Exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB;