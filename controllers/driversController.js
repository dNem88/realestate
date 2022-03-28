const router = require('express').Router();
const services = require('../services/driversServices');

router.get('/', async(req,res,next) => {
    const query = req.query
    console.log(query)
    try {
        if (query.name) {
            const response = await req.app.locals.client.db('f1').collection('drivers').findOne({familyName: query.name});
            if (response) {
                res.status(200).json(response)
            } else {
                throw new Error('Failed to fetch driver!')

            }
        } else {
            const drivers = await services.getAllDrivers(req, res, next);
            res.status(200).json(drivers);
        }
    } catch (e){
        res.status(400).json(e.message || {error: {message: 'Error while getting drivers'}})
    }
});
router.get('/:id', async (req, res, next) => {
    try {
        const driver = await services.getDriverById(req, res, next);
        res.status(200).json(driver);
    } catch(e) {
        res.status(400).json({
            error: {
                message: 'Error while getting current driver'
            }
        })
    }
    
});

module.exports = router;