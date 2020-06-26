const express = require("express");
const mongoose = require("mongoose");

// Require all models
const db = require("./models");
console.log(db);

// require router 
const router = require("./routes");
// Connect to MongoDB
mongoose.connect("mongodb://localhost/grocerydb",
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Db connected'))
    .catch((error) => console.log(error));

const PORT = 3000;

// Initialize Express
const app = express();

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public static folder
app.use(express.static("public"));
app.use(router);


// Start the server
app.listen(PORT, function () {
    console.log("Listening on port " + PORT + ".");
});