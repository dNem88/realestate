const router = require('express').Router();
const authController = require('./controllers/authController');
const offersController = require('./controllers/offersController')
const dealsController = require('./controllers/dealsController')
const callsController = require('./controllers/callsController')
// const isAuthorized = require('./middlewares/isAuthorized')
const tasksController = require('./controllers/tasksController')
const customersController = require('./controllers/customersController')
const statsController = require('./controllers/statsController')


router.use('/users',  authController);
router.use('/offers', offersController);
router.use('/deals', dealsController);
router.use('/calls', callsController);
router.use('/customers', customersController);
router.use('/stats', statsController)
router.use('/tasks', tasksController)


module.exports = router;