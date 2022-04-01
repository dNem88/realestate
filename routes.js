const router = require('express').Router();
const authController = require('./controllers/authController');
const offersController = require('./controllers/offersController')
const dealsController = require('./controllers/dealsController')
const callsController = require('./controllers/callsController')
const isAuthorized = require('./middlewares/isAuthorized')


router.use('/users', authController);
router.use('/offers', offersController);
router.use('/deals', dealsController);
router.use('/calls', callsController)



module.exports = router;