const {MongoClient} = require('mongodb');

const client = new MongoClient("mongodb+srv://dNem88:daniel123$$@dn88.vllop.mongodb.net/realestate?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


module.exports = (app) => {
    client.connect((err, db) => {
        if (err) {
            console.log('Failed to connect to database!');
        } 
        if (db) {
            console.log('Connected to MongoDB Atlas Realestate');
            app.locals.client = db;
            app.listen(process.env.PORT || 4000, console.log(`Server listens on port ${process.env.PORT} and you can make your requests`));
            /*Keep a reference to the database in app.locals*/
        }
    });
};