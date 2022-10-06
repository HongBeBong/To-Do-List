
//jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');

const app = express();


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

var items = [];

app.get('/', (req, res) => {

    var today = new Date();

    currentDay = today.getDay();

    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    var day = today.toLocaleDateString("en-US", options);


    res.render('list', { kindOfDay: day , items: items});

});


app.post('/', (req, res) => {
    var item = req.body.newItem;
    items.push(item);
    res.redirect('/');
});




app.listen(3000, function () {
    console.log("Listening on port 3000");
});
