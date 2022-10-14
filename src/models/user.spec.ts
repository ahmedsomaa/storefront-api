import { Account, User, UserModel } from './user';

const userModel = new UserModel();
const testUser: User = {
  email: 'kmalone@dm.com',
  first_name: 'Kevin',
  last_name: 'Malone',
  password: 'cookie_monster'
};

describe('-- User Model Test Suite', (): void => {
  describe('--- Class Methods Availability', (): void => {
    it('should have an index method', (): void => expect(userModel.index).toBeDefined());
    it('should have a show method', (): void => expect(userModel.show).toBeDefined());
    it('should have a create method', (): void => expect(userModel.create).toBeDefined());
    it('should have an update method', (): void => expect(userModel.update).toBeDefined());
    it('should have a delete method', (): void => expect(userModel.delete).toBeDefined());
    it('should have an authenticate method', (): void =>
      expect(userModel.authenticate).toBeDefined());
  });

  describe('--- create Method', (): void => {
    it('should create a new user', async (): Promise<void> => {
      const result = await userModel.create(testUser);
      expect(result.id).toBe(7);
      expect(result.email).toEqual(testUser.email);
    });
  });

  describe('--- index Method', (): void => {
    it('should return all users', async (): Promise<void> => {
      const products = await userModel.index();
      expect(products.length).toBeGreaterThan(0);
    });
  });

  describe('--- show Method', (): void => {
    it('should return a user for a valid id number', async (): Promise<void> => {
      const result = await userModel.show(7);
      expect(result.id).toBe(7);
      expect(result.email).toEqual(testUser.email);
    });
  });

  describe('--- update Methods', (): void => {
    it('should update a product with new details', async (): Promise<void> => {
      const result = await userModel.update({
        ...testUser,
        email: 'kevin.malone@dm.com',
        id: 7
      });
      expect(result.email).toEqual('kevin.malone@dm.com');
    });
  });

  describe('--- authenticate Method', (): void => {
    it('should return a user object for valid credentials', async (): Promise<void> => {
      const result = await userModel.authenticate({
        email: 'kevin.malone@dm.com',
        password: testUser.password
      } as Account);
      expect(result?.id).toBe(7);
    });

    it('should return null for invalid credentials', async (): Promise<void> => {
      const result = await userModel.authenticate({
        email: 'm.scott@dundermifflin.com',
        password: 'wrong password'
      });
      expect(result).toBe(null);
    });
  });

  describe('--- delete Method', (): void => {
    it('should delete a user', async (): Promise<void> => {
      const result = await userModel.delete(7);
      expect(result.id).toEqual(7);
      expect(result.email).toEqual('kevin.malone@dm.com');
    });
  });
});
