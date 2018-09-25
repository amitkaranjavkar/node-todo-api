const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('../server/models/todos');
const { Users } = require('../server/models/users');
const { ObjectID } = require('mongodb');

var app = express();

app.use(bodyParser.json());

app.post("/todos", (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((result) => {
        res.status(200).send(result);
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({
            todos
        })
    }, (err) => {
        res.status(400).send(err);
    });
});


app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (ObjectID.isValid(id)) {
        Todo.findById({
            _id: id
        }).then((result) => {
            res.send(result);
        }, (error) => {
            res.send(error);
        });
    }
    else {
        res.status(400).send();
    }
});

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    //Todo.remove();
    //Todo.findOneAndRemove();
    Todo.findByIdAndRemove(id).then((result) => {
        res.send(result);
    }, (error) => {

    });
});

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    }
    else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id,
        {
            $set:
                body
        },
        {
            new: true
        }).then((todo) => {
            if (!todo) {
                return res.status(404).send();
            }
            res.send({ todo });
        }).catch((e) => {
            res.status(400).send();
        })
});

app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    if (body.email != null && body.password != null) {
        var user = new Users({
            email: body.email,
            password: body.password
        });

        user.save().then((result) => {
            res.status(200).send(result);
        }).catch((err) => {
            res.status(400).send(err);
        });
    }
    else {
        res.status(400).send();
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
})