const {Router} = require('express');

const {
    getCountriesHandlerById,
    getCountriesHandler,
} = require('../handlers/countriesHandler.js');

const countriesRouter= Router();

countriesRouter.get('/',getCountriesHandler);
countriesRouter.get('/:id',getCountriesHandlerById);


module.exports= countriesRouter;