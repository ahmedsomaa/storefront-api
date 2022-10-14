import { Router } from 'express';
import OrdersHandler from '../handlers/orders';
import { useAuthentication } from '../middleware/authentication.middleware';

const ordersRoutes = Router();

ordersRoutes
  .route('/')
  .get(OrdersHandler.findAll)
  .post(OrdersHandler.create)
  .put(OrdersHandler.update);

ordersRoutes.route('/add-product').post(OrdersHandler.addProductToOrder);

ordersRoutes.route('/:id').get(OrdersHandler.findById).delete(OrdersHandler.destroy);

ordersRoutes
  .route('/users/:userId/current')
  .get(useAuthentication, OrdersHandler.findCurrentByUserId);

ordersRoutes
  .route('/users/:userId/complete')
  .get(useAuthentication, OrdersHandler.findAllCompleted);

export default ordersRoutes;
