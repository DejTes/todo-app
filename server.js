const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Todo = require("./models/todo.js");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.delete("/todo/:id", (req, res) => {
  Todo.findByIdAndRemove(req.params.id, (error, data) => {
    res.redirect("/todo");
  });
});

app.get("/todo/:id/edit", (req, res) => {
  Todo.findById(req.params.id, (error, foundTodoList) => {
    res.render("edit.ejs", { todo: foundTodoList });
  });
});

app.put("/todo/:id", (req, res) => {
  Todo.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedFruit) => {
      res.redirect("/todo");
    }
  );
});

app.get("/todoapp/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/todo", (req, res) => {
  Todo.create(req.body, (error, createdTodo) => {
    res.redirect("/todo");
  });
});

// index route

app.get("/todo", (req, res) => {
  Todo.find({}, (error, allTodo) => {
    res.render("index.ejs", {
      todo: allTodo,
    });
  });
});

mongoose.set("strictQuery", true);
mongoose.connect("mongodb://localhost:27017/list", () => {
  console.log("The connection with mongo is established");
});

app.listen(3000, () => {
  console.log("listening");
});
