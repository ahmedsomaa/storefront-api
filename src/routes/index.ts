import { Request, Response, Router } from 'express';

import productsRoutes from './products';
import usersRoutes from './users';
import ordersRoutes from './orders';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/orders', ordersRoutes);
routes.use('/products', productsRoutes);

routes.get('/', (_req: Request, res: Response): void => {
  res.status(200).send(`<h1 style="text-align:center;">Welcome to Storefront API</h1>`);
});

export default routes;
