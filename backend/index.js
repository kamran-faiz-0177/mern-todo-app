const express = require("express");
const app = express();
const TaskRouter = require("./Routes/TaskRouter");
const cors = require("cors");

require("dotenv").config();
require("./Models/db");
const PORT = process.env.PORT || 8082;

app.use(cors());
app.use(express.json());



app.use("/api/user",TaskRouter);


app.listen(PORT, () => {
    console.log(`app is running at this port ${PORT}`);
})