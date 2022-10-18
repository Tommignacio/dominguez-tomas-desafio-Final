const { Router } = require('express');
const Routes = require('./collections.routes');

const apiRoutes = Router();
const routes = new Routes();

//Routes
apiRoutes.use(routes.products);
apiRoutes.use(routes.carts);
// apiRoutes.use(routes.messages);
apiRoutes.use(routes.users);

module.exports = apiRoutes;
