const { Router } = require('express');
const countriesRouter = require('./countriesRouter.js');
const activitiesRouter = require('./activitiesRouter.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.use('/countries',countriesRouter);
router.use('/activities',activitiesRouter);
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
