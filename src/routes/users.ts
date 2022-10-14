import { Router } from 'express';
import UsersHandler from '../handlers/users';
import { useAuthentication } from '../middleware/authentication.middleware';

const usersRoutes = Router();

usersRoutes
  .route('/')
  .get(useAuthentication, UsersHandler.findAll)
  .post(useAuthentication, UsersHandler.create)
  .put(useAuthentication, UsersHandler.update);
usersRoutes.route('/auth').post(UsersHandler.authenticate);
usersRoutes
  .route('/:id')
  .get(useAuthentication, UsersHandler.findById)
  .delete(useAuthentication, UsersHandler.destroy);

export default usersRoutes;
