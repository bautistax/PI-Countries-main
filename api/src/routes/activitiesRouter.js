const {Router} = require('express');

const  {
    postActivitiesHandler,
    getAllActivitiesHandler
} = require('../handlers/activitiesHandler.js');

const activitiesRouter = Router();

activitiesRouter.post('/', postActivitiesHandler);
activitiesRouter.get('/',getAllActivitiesHandler);

module.exports = activitiesRouter;