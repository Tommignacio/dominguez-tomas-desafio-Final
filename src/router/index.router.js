const { Router } = require('express');
const errorMiddleware = require('../api/middlewares/error.middleware');
const routeExist = require('../api/middlewares/routeExist.middleware');
const apiRoutes = require('./routes/api-rest/routes');
const authRoutes = require('./routes/auth/routes');
const webSiteRoutes = require('./routes/website/routes');

const router = Router();

// Routes
router.use('/auth', authRoutes);
router.use('/api', apiRoutes);
router.use('/', webSiteRoutes);

// NotFoundPage middleware
router.use("/*", routeExist);

// Error middleware
router.use(errorMiddleware);

module.exports = router;