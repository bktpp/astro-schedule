const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once('open', () => {
   console.log('mongoDB connection ready');
});

mongoose.connection.on('error', (error) => {
   console.error(`An error occurred on connection: ${error}`);
});

async function mongoConnect() {
   await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
   await mongoose.disconnect();
}

module.exports = {
   mongoConnect,
   mongoDisconnect,
};
