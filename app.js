const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");


const userRouter = require("./routes/userRouter");
const connectdb = require("./db/connection");
require("./models/usertable");

const app = express();
app.use(cors());
app.use(express.json());
//
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
const port = 8000;

const database =
    "mongodb+srv://pranjaldhar002:Alphadigama09@cluster0.45hsa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.set("strictQuery", false);
connectdb(database);


app.use("/", userRouter);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
