
//jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');



const app = express();


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

app.get('/', (req, res) => {
    let day = date.getDate();
    res.render('list', { listTitle: day , items: items});
});


app.post('/', (req, res) => {
    let item = req.body.newItem;
    let listTitle = req.body.listTitle;
    console.log(listTitle);
    if (listTitle === "Work List"){
        workItems.push(item);
        res.redirect('/work');
    }else{
        items.push(item);
        res.redirect('/');
    }
});

app.get('/work', (req, res) => {
    res.render('list', {listTitle: "Work List", items: workItems});
});


// app.post('/work', (req, res) => {
//     let item = req.body.newItem;
//     workItems.push(item);
//     res.redirect('/');
// });




app.listen(3000, function () {
    console.log("Listening on port 3000");
});
