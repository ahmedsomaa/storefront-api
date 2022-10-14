import { Product, ProductModel } from './product';

const productModel = new ProductModel();
const testProduct: Product = { name: 'Pixel 7', price: 599, category: 'Phones' };

describe('-- Product Model Test Suite', (): void => {
  describe('--- Class Methods Availability', (): void => {
    it('should have an index method', (): void => expect(productModel.index).toBeDefined());
    it('should have an indexByCategory method', (): void =>
      expect(productModel.indexByCategory).toBeDefined());
    it('should have a show method', (): void => expect(productModel.show).toBeDefined());
    it('should have a create method', (): void => expect(productModel.create).toBeDefined());
    it('should have a delete method', (): void => expect(productModel.delete).toBeDefined());
    it('should have an update method', (): void => expect(productModel.update).toBeDefined());
    it('should have a popular5 method', (): void => expect(productModel.popular5).toBeDefined());
  });

  describe('--- create Method', (): void => {
    it('should create a new product', async (): Promise<void> => {
      const result = await productModel.create(testProduct);
      expect(result.id).toBe(10);
      expect(result.name).toEqual(testProduct.name);
    });
  });

  describe('--- index Method', (): void => {
    it('should return all products', async (): Promise<void> => {
      const products = await productModel.index();
      expect(products.length).toEqual(9);
    });
  });

  describe('--- indexByCategory Method', (): void => {
    it('should return all products for the same category', async (): Promise<void> => {
      const result = await productModel.indexByCategory('Tablets');
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('--- show Method', (): void => {
    it('should return a product for a valid id number', async (): Promise<void> => {
      const result = await productModel.show(10);
      expect(result.id).toBe(10);
      expect(result.name).toEqual(testProduct.name);
    });
  });

  describe('--- update Methods', (): void => {
    it('should update a product with new details', async (): Promise<void> => {
      const result = await productModel.update({
        ...testProduct,
        name: 'Pixel 7 Pro',
        price: 899.99,
        id: 10
      });
      expect(result.name).toEqual('Pixel 7 Pro');
      expect(result.price).toEqual(899.99);
    });
  });

  describe('--- delete Method', (): void => {
    it('should delete a product', async (): Promise<void> => {
      const result = await productModel.delete(10);
      expect(result.id).toEqual(10);
      expect(result.name).toEqual('Pixel 7 Pro');
    });
  });

  describe('--- popular5 Method', (): void => {
    it('should return a list of the 5 most popular', async (): Promise<void> => {
      const result = await productModel.popular5();
      expect(result.length).toEqual(5);
      expect(result.map(({ id }) => id)).toEqual([7, 5, 2, 4, 3]);
    });
  });
});
