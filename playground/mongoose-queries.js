const { mongoose, ObjectID } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todos');

var id = '6ba8a9ad9dbb4c41f09b8f57';

if (ObjectID.isValid) {
    Todo.find({
        _id: id
    }).then((result) => {
        console.log(JSON.stringify(result, undefined, 2));
    });

    Todo.findOne({
        _id: id
    }).then((result) => {
        console.log(JSON.stringify(result, undefined, 2));
    });

    Todo.findById({
        _id: id
    }).then((result) => {
        console.log(JSON.stringify(result, undefined, 2));
    });
}
else {
    console.log('Id is not valid');
}