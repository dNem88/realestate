const {
    MongoClient
} = require('mongodb');

// const client = new MongoClient("mongodb+srv://dNem88:daniel123$$@dn88.vllop.mongodb.net/realestate?retryWrites=true&w=majority", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })


// module.exports = (app) => {
//     client.connect((err, db) => {
//         if (err) {
//             console.log('Failed to connect to database!');
//         }
//         if (db) {
//             console.log('Connected to MongoDB Atlas Realestate');
//             app.locals.client = db;
//             app.listen(process.env.PORT || 4000, console.log(`Server listens on port ${process.env.PORT} and you can make your requests`));
//             /*Keep a reference to the database in app.locals*/
//         }
//     });
// };


const uri = process.env.MONGODB_URI;
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}
console.log(process.env.MONGODB_URI)
let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
    throw new Error('Add Mongo Uri to env.local')
}

if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise
} else {
    client = new MongoClient(uri, options)
    clientPromise = client.connect()
}



module.exports = clientPromise