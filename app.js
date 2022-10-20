//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/todolistDB", {
  useNewUrlParser: true,
});

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const itemSchema = new mongoose.Schema({
  name: { type: String },
});

const Item = mongoose.model("Item", itemSchema);

const item1 = {
  name: "Learn Python",
};

const item2 = {
  name: "Learn Spring Boot",
};

const item3 = {
  name: "Learn JavaScript",
};

const defaultItems = [item1, item2, item3];

app.get("/", (req, res) => {
  Item.find({}, (err, results) => {
    if (results.length === 0) {
      Item.insertMany(defaultItems, (err) => {
        if (err) {
          console.log("Inserted Failed");
        } else {
          console.log("Inserted Successfully");
        }
      });
      res.redirect("/");
    } else {
      res.render("list", { listTitle: "Today", items: results });
    }
  });
});

app.post("/", (req, res) => {
  let item = req.body.newItem;
  const newItem = new Item({
    name: item,
  });

  newItem.save();
  res.redirect("/");
});

app.post("/delete", (req, res) => {
  const id = req.body.checkbox;
  Item.findByIdAndRemove(id, (err) => {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Successfully");
    }
  });
  res.redirect("/");
});

app.get("/:customListName", (req, res) => {
  const customListName = req.params.customListName;
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("Listening on port 3000");
});
