const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('../server/models/todos');
const { Users } = require('../server/models/users');

var app = express();

app.use(bodyParser.json());

app.post("/todos", (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((result) => {
        res.send(result);
    }, (err) => {
        res.send(err);
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
})