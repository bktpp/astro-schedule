const mongoose = require("mongoose");

const MONGO_URL =
   "mongodb+srv://bktpdev:CpiL0JVs25rDq30I@cluster0.rgvlhdy.mongodb.net/astro?retryWrites=true&w=majority";

mongoose.connection.once("open", () => {
   console.log("mongoDB connection ready");
});

mongoose.connection.on("error", (error) => {
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
