const { MongoClient } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to Mongo DB server');
    }

    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    //Finding records based on column values
    db.collection('Todos').find({ completed: false }).toArray().then((result) => {
        console.log(JSON.stringify(result, undefined, 2));
    }, (error) => {
        console.log('Error ', error);
    });

    //Finding all records
    db.collection('Todos').find().toArray().then((result) => {
        console.log(JSON.stringify(result, undefined, 2));
    }, (error) => {
        console.log('Error ', error);
    });

    //Finding records by ObjectID
    db.collection('Todos').find({
        _id: new ObjectID('5ba4ae805eb03c575050ec16')
    }).toArray().then((result) => {
        console.log(JSON.stringify(result, undefined, 2));
    }, (error) => {
        console.log('Error ', error);
    });

    //Count all documents in Todos collection
    db.collection('Todos').find().count().then((count) => {
        console.log('Count(s) of document in Todos is: ', count);
    }, (error) => {
        console.log('Error ', error);
    });

    client.close();
});