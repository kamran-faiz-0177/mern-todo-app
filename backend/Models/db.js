const mongoose = require("mongoose");
const MONGO_URL = process.env.DB_URL;

mongoose.connect(MONGO_URL)
    .then(() => {
        console.log(`mongo db is connected...`);
    }).catch((error) => {
        console.log(`mongodb is faceing this error`);
    })