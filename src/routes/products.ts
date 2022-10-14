import ProductsHandler from '../handlers/products';
import { Router } from 'express';
import { useAuthentication } from '../middleware/authentication.middleware';

const productsRoutes = Router();

productsRoutes
  .route('/')
  .get(ProductsHandler.findAll)
  .post(useAuthentication, ProductsHandler.create)
  .put(useAuthentication, ProductsHandler.update);

productsRoutes.route('/popular-5').get(ProductsHandler.popular5);

productsRoutes
  .route('/:id')
  .get(ProductsHandler.findById)
  .delete(useAuthentication, ProductsHandler.destroy);

export default productsRoutes;
