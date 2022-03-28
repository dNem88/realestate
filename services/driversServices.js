const driversData = require('../data/driversData');

async function getAllDrivers(req,res,next) {
    try {
        return driversData.getDrivers(req, res, next);
    }catch(e) {
        return {error: {message: "Error while getting data!"}}
    }
}

async function getDriverById(req,res,next) {
    try {
        return driversData.getDriver(req, req.params.id );
    } catch (e) {
        return {
            error: {
                message: "Error while getting data!"
            }
        }
    }
}

module.exports = {
    getDriverById,
    getAllDrivers
}