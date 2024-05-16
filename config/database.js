const {
    MongoClient
} = require('mongodb');


const uri = process.env.MONGODB_URI;
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}
console.log(process.env.MONGODB_URI)
let client;
let clientPromise;

// if (!process.env.MONGODB_URI) {
//     throw new Error('Add Mongo Uri to .env')
// }

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