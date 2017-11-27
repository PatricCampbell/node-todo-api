const express = require("express");
const bodyParser = require("body-parser");
const { ObjectID } = require("mongodb");

const { mongoose } = require("./db/mongoose");
const { User } = require("./models/user");
const { Todo } = require("./models/todo");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get("/todos", (req, res) => {
  const todos = Todo.find()
    .then(todos => {
      res.send({ todos });
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

app.post("/todos", (req, res) => {
  const todo = new Todo(req.body);

  todo
    .save()
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

app.get("/todos/:id", (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  const todo = Todo.findById(id)
    .then(todo => {
      if (todo) {
        res.send({ todo });
      } else {
        res.status(404).send();
      }
    })
    .catch(err => {
      res.status(400).send();
    });
});

app.listen(port, () => {
  console.log(`Started server on port ${port}`);
});

module.exports = { app };
