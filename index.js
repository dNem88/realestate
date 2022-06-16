const express = require('express');
const app = express();
const router = require('./routes');
const path = require('path');




require('./middlewares/config')(app);
require('./config/database')(app);
app.use(router);

app.listen(process.env.PORT || 4000, console.log(`Server listens on port ${process.env.PORT}`));



/*Deployed at  https://dsdrealestate.herokuapp.com/ */
/* https://dashboard.heroku.com/apps/boiling-brushlands-51072/deploy/github */