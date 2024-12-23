const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const userRouter = require("./routes/userRouter");
const connectdb = require("./db/connection");
require("./models/usertable");

const app = express();

// CORS configuration
const corsOptions = {
    origin: 'https://auth-mern002.netlify.app', // Replace with your frontend URL
    methods: 'GET,POST,PUT,DELETE', // Allow specific HTTP methods if needed
    allowedHeaders: 'Content-Type, Authorization', // Allow specific headers
};

app.options("*", cors(corsOptions));  // Allow preflight for all routes

// Use middleware
app.use(express.json());  // Only need this once
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// MongoDB connection setup
const database = "mongodb+srv://pranjaldhar002:Alphadigama09@cluster0.45hsa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.set("strictQuery", false);
connectdb(database);

// Routes
app.use("/", userRouter);

// Start the server
const port = 8000;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
