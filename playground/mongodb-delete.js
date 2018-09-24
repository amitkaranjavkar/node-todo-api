const { MongoClient } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to MongoDB server');
    }

    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    //deleteMany
    // db.collection('Todos').deleteMany({ text: 'Eat Lunch' }).then((result) => {
    //     console.log(result);
    // }, (error) => {
    //     console.log(error);
    // });

    //deleteOne - deletes the first item that mathces the criteria
    // db.collection('Todos').deleteOne({ text: 'Eat Lunch' }).then((result) => {
    //     console.log(result);
    // }, (error) => {
    //     console.log(error);
    // });

    //Find a document in Todos collection and delete it, it returns a json object in value property of "then"
    //success callback which can be used to undo the delete on user in case the record was accidently deleted
    // db.collection('Todos').findOneAndDelete({ completed: true }).then((res) => {
    //     console.log('Deletion successful', res.value);
    // }, (error) => {
    //     console.log(error);
    // });

    client.close();
});