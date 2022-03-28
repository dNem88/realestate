const ObjectId  = require('mongodb').ObjectId;

async function getDrivers(req, res, next) {
    try{
        const drivers = req.app.locals.client.db('f1').collection('drivers').find().toArray();
        return drivers;
    }catch(e) {
        return {error: {message: 'Could not get drivers from db collection!!'}};
    }
    
}

async function getDriver(req, driverId) {
    try {
        const driver = req.app.locals.client.db('f1').collection('drivers').findOne({_id: ObjectId(driverId)});
        return driver;
    } catch (e) {
        return {
            error: {
                message: 'Could not get driver from db collection!!'
            }
        }
    }
}

module.exports = {
    getDriver,
    getDrivers
}