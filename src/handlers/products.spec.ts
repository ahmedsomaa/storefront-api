import app from '../server';
import supertest from 'supertest';
import { Account, User, UserModel } from '../models/user';
import { Product } from '../models/product';

let bearerToken = '';
const request = supertest(app);
const userModel = new UserModel();

describe('-- Products Hanlder Test Suite', (): void => {
  beforeAll(async (): Promise<void> => {
    await userModel.create({
      email: 'cbratton@dm.com',
      first_name: 'Creed',
      last_name: 'Bratton',
      password: 'quabity_assurance'
    } as User);

    const { body } = await request
      .post('/users/auth')
      .set('Content-type', 'application/json')
      .send({
        email: 'cbratton@dm.com',
        password: 'quabity_assurance'
      } as Account);
    const {
      data: { token }
    } = body;
    bearerToken = `Bearer ${token}`;
  });

  afterAll(async (): Promise<void> => {
    await userModel.delete(4);
  });

  describe('--- GET /products', (): void => {
    it('should return all products', async (): Promise<void> => {
      const { status, body } = await request.get('/products');
      expect(status).toBe(200);
      expect(body.data.length).toBe(8);
    });

    it('should return products for the same category', async (): Promise<void> => {
      const { status, body } = await request.get('/products?category=Tablets');
      expect(status).toBe(200);
      expect(body.data.length).toBeGreaterThan(0);
    });
  });

  describe('--- GET /products/popular-5', (): void => {
    it('should return the 5 most popular products', async (): Promise<void> => {
      const { status, body } = await request.get('/products/popular-5');
      expect(status).toBe(200);
      expect(body.data.map(({ id }: Product) => id)).toEqual([7, 5, 2, 4, 3]);
    });
  });

  describe('--- POST /products', (): void => {
    it('should create a new product', async (): Promise<void> => {
      const { status, body } = await request
        .post('/products')
        .set('Content-type', 'application/json')
        .set('Authorization', bearerToken)
        .send({ name: 'Liverpool Jacket', price: 120, category: 'Clothes' } as Product);
      expect(status).toBe(200);
      expect(body.data.id).toEqual(9);
      expect(body.data.name).toEqual('Liverpool Jacket');
    });
  });

  describe('--- GET /products/:id', (): void => {
    it('should retrieve a product by id', async (): Promise<void> => {
      const { status, body } = await request.get('/products/9');
      expect(status).toBe(200);
      expect(body.data.id).toEqual(9);
      expect(body.data.name).toEqual('Liverpool Jacket');
    });
  });

  describe('--- PUT /products', (): void => {
    it('should update an existing product', async (): Promise<void> => {
      const { status, body } = await request
        .put('/products')
        .set('Content-type', 'application/json')
        .set('Authorization', bearerToken)
        .send({
          id: 9,
          price: 100,
          category: 'Clothes',
          name: 'Liverpool 22 Season Jacket'
        } as Product);
      expect(status).toBe(200);
      expect(body.data.id).toEqual(9);
      expect(body.data.price).toEqual(100);
      expect(body.data.name).toEqual('Liverpool 22 Season Jacket');
    });
  });

  describe('--- DELETE /products/:id', (): void => {
    it('should delete an existing product', async (): Promise<void> => {
      const { status, body } = await request
        .delete('/products/9')
        .set('Content-type', 'application/json')
        .set('Authorization', bearerToken);
      expect(status).toBe(200);
      expect(body.data.id).toEqual(9);
      expect(body.data.price).toEqual(100);
      expect(body.data.name).toEqual('Liverpool 22 Season Jacket');
    });
  });
});
