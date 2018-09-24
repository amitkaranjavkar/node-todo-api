const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to MongoDB server');
    }

    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    //updateMany (with MongoDB update operators)
    db.collection('Todos').updateMany(
        {
            completed: true
        },
        {
            $set:
            {
                text: 'Something to do new'
            }
        })
        .then((result) => {
            console.log(result);
        }, (error) => {
            console.log(error);
        });

    //updateOne - updates the first item that mathces the criteria (with MongoDB update operators)
    db.collection('Todos').updateOne(
        {
            completed: false
        },
        {
            $set:
            {
                text:'Updated text'
            }
        }).then((result) => {
            console.log(result);
        }, (error) => {
            console.log(error);
        });

    //findOneAndUpdate (with MongoDB update operators)
    db.collection('Todos').findOneAndUpdate(
        {
            text: 'Something to do'
        },
        {
            $set:
            {
                text: 'Something to do',
                completed: false
            }
        }).then((result) => {
            console.log(result);
        }, (error) => {
            console.log(error);
        });

    //findOneAndUpdate
    db.collection('Users').findOneAndUpdate(
        {
            _id: new ObjectID("5ba4b00b97d474487026a8aa")
        },
        {
            $set:
            {
                name: 'Sakshi Karanjavkar',
            },
            $inc: {
                age: 1 //increment age by 1 using $inc update operators
            }
        }).then((result) => {
            console.log(result);
        }, (error) => {
            console.log(error);
        });

    client.close();
})