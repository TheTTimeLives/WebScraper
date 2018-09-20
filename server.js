const express = require('express');
const bp = require('body-parser');
const mongoose = require('mongoose');
const axios = require("axios");
const cheerio = require("cheerio");
const request = require("request");
const hb = require("express-handlebars");




const app = express();

const PORT = process.env.PORT || 5000;

app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());
app.use(express.static(__dirname + '/public'));

require('./controller/routes/routes')(app);

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoScraper";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.listen(PORT, function () {
    console.log(`Success! You are running on ${PORT}!`);
})