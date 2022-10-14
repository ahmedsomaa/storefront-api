import app from '../server';
import supertest from 'supertest';
import { Account, User, UserModel } from '../models/user';
import { Order, OrderProduct } from '../models/order';

let bearerToken = '';
const request = supertest(app);
const userModel = new UserModel();

describe('-- Orders Handler Test Suite', (): void => {
  beforeAll(async (): Promise<void> => {
    await userModel.create({
      email: 'stanely.hudson@dm.com',
      first_name: 'Stanely',
      last_name: 'Hudson',
      password: 'the_sassy_man'
    } as User);

    const { body } = await request
      .post('/users/auth')
      .set('Content-type', 'application/json')
      .send({
        email: 'stanely.hudson@dm.com',
        password: 'the_sassy_man'
      } as Account);
    const {
      data: { token }
    } = body;
    bearerToken = `Bearer ${token}`;
  });

  afterAll(async (): Promise<void> => {
    await userModel.delete(3);
  });

  describe('--- GET /orders', (): void => {
    it('should return all orders', async (): Promise<void> => {
      const { status, body } = await request.get('/orders');
      expect(status).toBe(200);
      expect(body.data.length).toEqual(4);
    });
  });

  describe('--- POST /orders', (): void => {
    it('should create an order', async (): Promise<void> => {
      const { status, body } = await request
        .post('/orders')
        .set('Content-type', 'application/json')
        .send({ user_id: 2, status: 'active' } as Order);
      expect(status).toBe(200);
      expect(body.data.id).toBe(5);
      expect(body.data.user_id).toBe(2);
      expect(body.data.status).toBe('active');
    });
  });

  describe('--- PUT /orders', (): void => {
    it('should update an existing order', async (): Promise<void> => {
      const { status, body } = await request
        .put('/orders')
        .set('Content-type', 'application/json')
        .send({ id: 5, user_id: 2, status: 'complete' } as Order);
      expect(status).toBe(200);
      expect(body.data.status).toEqual('complete');
    });
  });

  describe('--- POST /add-product', (): void => {
    it('should add a product to an order', async (): Promise<void> => {
      const { status, body } = await request
        .post('/orders/add-product')
        .set('Content-type', 'application/json')
        .send({ order_id: 1, product_id: 8, quantity: 1 } as OrderProduct);
      expect(status).toBe(200);
      expect(body.data.order_id).toEqual(1);
      expect(body.data.product_id).toEqual(8);
      expect(body.data.quantity).toEqual(1);
    });
  });

  describe('--- GET /orders/:id', (): void => {
    it('should return an order for the given id', async (): Promise<void> => {
      const { status, body } = await request.get('/orders/1');
      expect(status).toBe(200);
      expect(body.data.id).toBe(1);
      expect(body.data.user_id).toBe(1);
      expect(body.data.status).toEqual('active');
    });
  });

  describe('--- DELETE /orders/:id', (): void => {
    it('should delete an existing order', async (): Promise<void> => {
      const { status, body } = await request.delete('/orders/5');
      expect(status).toBe(200);
      expect(body.data.id).toBe(5);
      expect(body.data.user_id).toBe(2);
      expect(body.data.status).toEqual('complete');
    });
  });

  describe('--- GET /orders/users/:userId/current', (): void => {
    it('should return the current order for a user', async (): Promise<void> => {
      const { status, body } = await request
        .get('/orders/users/1/current')
        .set('Authorization', bearerToken);
      expect(status).toBe(200);
      expect(body.data.id).toBe(1);
    });
  });

  describe('--- GET /users/:userId/complete', (): void => {
    it('should return the current order for a user', async (): Promise<void> => {
      const { status, body } = await request
        .get('/orders/users/1/complete')
        .set('Authorization', bearerToken);
      expect(status).toBe(200);
      expect(body.data.length).toBeGreaterThan(0);
    });
  });
});
