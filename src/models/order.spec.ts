import { Order, OrderModel, OrderProduct } from './order';

const orderModel = new OrderModel();
const testOrder: Order = { user_id: 1, status: 'active' };
const testOrderProduct: OrderProduct = { order_id: 1, product_id: 1, quantity: 2 };

describe('-- Order Class Test Suite', (): void => {
  describe('--- Class Methods Availability', (): void => {
    it('should have an index method', (): void => expect(orderModel.index).toBeDefined());
    it('should have an indexByUserId method', (): void =>
      expect(orderModel.showByUserId).toBeDefined());
    it('should have an indexByCompletedStatus method', (): void =>
      expect(orderModel.indexByCompletedStatus).toBeDefined());
    it('should have a show method', (): void => expect(orderModel.show).toBeDefined());
    it('should have a create method', (): void => expect(orderModel.create).toBeDefined());
    it('should have an update method', (): void => expect(orderModel.update).toBeDefined());
    it('should have a delete method', (): void => expect(orderModel.delete).toBeDefined());
    it('should have an addProductToOrder method', (): void =>
      expect(orderModel.addProductToOrder).toBeDefined());
  });

  describe('--- create Method', (): void => {
    it('should create a new order', async (): Promise<void> => {
      const result = await orderModel.create(testOrder);
      expect(result.id).toBe(6);
    });
  });

  describe('--- addProductToOrder', (): void => {
    it('should create a new order', async (): Promise<void> => {
      const result = await orderModel.addProductToOrder(testOrderProduct);
      expect(result.id).toBe(10);
    });
  });

  describe('--- index Method', (): void => {
    it('should return all orders', async (): Promise<void> => {
      const products = await orderModel.index();
      expect(products.length).toEqual(4);
    });
  });

  describe('--- indexByUserId Method', (): void => {
    it('should return current active order for a user', async (): Promise<void> => {
      const order = await orderModel.showByUserId(1);
      expect(order.id).toEqual(1);
    });
  });

  describe('--- indexByCompletedStatus Method', (): void => {
    it('should return all completed orders for a user', async (): Promise<void> => {
      const orders = await orderModel.indexByCompletedStatus(1);
      expect(orders.length).toEqual(1);
    });
  });

  describe('--- show Method', (): void => {
    it('should return an order for a valid id number', async (): Promise<void> => {
      const result = await orderModel.show(4);
      expect(result.id).toBe(4);
      expect(result.user_id).toEqual(2);
    });
  });

  describe('--- update Methods', (): void => {
    it('should update an order with new details', async (): Promise<void> => {
      const result = await orderModel.update({
        ...testOrder,
        status: 'complete',
        id: 6
      });
      expect(result.id).toEqual(6);
      expect(result.status).toEqual('complete');
    });
  });

  describe('--- delete Method', (): void => {
    it('should delete an order', async (): Promise<void> => {
      const result = await orderModel.delete(6);
      expect(result.id).toEqual(6);
      expect(result.status).toEqual('complete');
    });
  });
});
