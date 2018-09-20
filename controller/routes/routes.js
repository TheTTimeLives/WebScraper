const path = require('path');
const axios = require("axios");
const request = require("request");
const cheerio = require("cheerio");


let db = require('../../models');


axios.get("https://www.eventhubs.com/").then(function (response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);
    // console.log(response.data);

    var result = {};

    // Now, we grab every h2 within an article tag, and do the following:
    $("div[class=storyabstract]").each(function (i, element) {
        // Save an empty result object

        // Add the text and href of every link, and save them as properties of the result object
        result.title = $(this).children('h1').children('a').text();
        result.body = $(this).children('p').text();
        result.link = $(this).children('h1').children('a').attr("href");

        db.Article.create(result)
            .then(function (dbArticle) {
                // View the added result in the console
                // console.log(dbArticle);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                // return res.json(err);
            });

    });

});



module.exports = function (app) {

    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../../views/home.html"));
    });

    app.get("/mongopopulate", function (req, res) {

        db.Article.find({})
            .then(function (dbArticle) {
                // If we were able to successfully find Articles, send them back to the client
                console.log(dbArticle);
                res.json(dbArticle);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });

    });

    app.get("/api/messages", function (req, res) {

        db.Comment.find({})
            .then(function (dbArticle) {
                // If we were able to successfully find Articles, send them back to the client
                console.log(dbArticle);
                res.json(dbArticle);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });

    });

    app.post('/message', function (req,res){
        // console.log(req.body);

        db.Comment.create(req.body)
            .then(function (dbArticle) {
                // View the added result in the console
                console.log(dbArticle);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                // return res.json(err);
            });

    });


}

