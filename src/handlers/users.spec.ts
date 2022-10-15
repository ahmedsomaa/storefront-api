import app from '../server';
import supertest from 'supertest';
import { UserModel } from '../models/user';

let bearerToken = '';
const request = supertest(app);
const userModel = new UserModel();

describe('-- Users Handler Test Suite', (): void => {
  beforeAll(async (): Promise<void> => {
    await userModel.create({
      email: 'jhalpert@dm.com',
      first_name: 'Jim',
      last_name: 'Halpert',
      password: 'big_tuna'
    });
  });

  afterAll(async (): Promise<void> => {
    await userModel.delete(4);
  });

  describe('--- POST /users/auth', (): void => {
    it("should return 200 for a valid user's credentials", async (): Promise<void> => {
      const { status, body } = await request
        .post('/users/auth')
        .set('Content-type', 'application/json')
        .send({
          email: 'jhalpert@dm.com',
          password: 'big_tuna'
        });
      expect(status).toBe(200);
      const {
        data: {
          token,
          user: { email, id }
        }
      } = body;
      expect(id).toBe(5);
      expect(email).toBe('jhalpert@dm.com');
      bearerToken = `Bearer ${token}`;
    });
  });

  describe('--- POST /users', (): void => {
    it('should create a new user for a valid bearer token', async (): Promise<void> => {
      const { status, body } = await request
        .post('/users')
        .set('Content-type', 'application/json')
        .send({
          email: 'abernard@dm.com',
          first_name: 'Andy',
          last_name: 'Bernard',
          password: 'nard_dog'
        });
      expect(status).toBe(200);
      const {
        data: {
          user: { id, email }
        }
      } = body;
      expect(id).toBe(6);
      expect(email).toBe('abernard@dm.com');
    });
  });

  describe('--- GET /users', (): void => {
    it('should return 200 with a list of users', async (): Promise<void> => {
      const {
        status,
        body: { data, errors }
      } = await request.get('/users').set('Authorization', bearerToken);
      expect(status).toBe(200);
      expect(errors).toBe(null);
      expect(data.length).toBeGreaterThan(0);
    });
  });

  describe('--- PUT /users', (): void => {
    it('should update user with new details for a valid bearer token', async (): Promise<void> => {
      const { status, body } = await request
        .put('/users')
        .set('Content-type', 'application/json')
        .set('Authorization', bearerToken)
        .send({
          id: 6,
          email: 'andy.bernard@dm.com',
          first_name: 'Andy',
          last_name: 'Bernard',
          password: 'nard_dog'
        });
      expect(status).toBe(200);
      const {
        data: { id, email }
      } = body;
      expect(id).toBe(6);
      expect(email).toBe('andy.bernard@dm.com');
    });

    it('should not update and return 401 for invalid bearer token or no token', async (): Promise<void> => {
      const { status, body } = await request
        .put('/users')
        .set('Content-type', 'application/json')
        .send({
          email: 'andy.bernard@dm.com',
          first_name: 'Andy',
          last_name: 'Bernard',
          password: 'nard_dog'
        });
      expect(status).toBe(401);
      const {
        data,
        errors: { details }
      } = body;
      expect(data).toBe(null);
      expect(details).toEqual("Either user didn't provide a token or token is invalid");
    });
  });

  describe('--- GET /users/:id', (): void => {
    it('should return user object for a valid user id  a valid bearer token', async (): Promise<void> => {
      const { status, body } = await request.get('/users/6').set('Authorization', bearerToken);
      expect(status).toBe(200);
      const {
        data: { id, email }
      } = body;
      expect(id).toBe(6);
      expect(email).toBe('andy.bernard@dm.com');
    });

    it('should return 401 for invalid bearer token or no token', async (): Promise<void> => {
      const { status, body } = await request.get('/users/6');
      expect(status).toBe(401);
      const {
        data,
        errors: { details }
      } = body;
      expect(data).toBe(null);
      expect(details).toEqual("Either user didn't provide a token or token is invalid");
    });
  });

  describe('--- DELETE /users/:id', (): void => {
    it('should return user object for a valid user id  a valid bearer token', async (): Promise<void> => {
      const { status, body } = await request.delete('/users/6').set('Authorization', bearerToken);
      expect(status).toBe(200);
      const {
        data: { id, email }
      } = body;
      expect(id).toBe(6);
      expect(email).toBe('andy.bernard@dm.com');
    });

    it('should return 401 for invalid bearer token or no token', async (): Promise<void> => {
      const { status, body } = await request.delete('/users/6');
      expect(status).toBe(401);
      const {
        data,
        errors: { details }
      } = body;
      expect(data).toBe(null);
      expect(details).toEqual("Either user didn't provide a token or token is invalid");
    });
  });
});
