import db from '../db';

export type OrderProduct = {
  id?: number;
  order_id?: number;
  product_id: number;
  quantity: number;
};

export type Order = {
  id?: number;
  user_id: number;
  status: 'active' | 'complete';
  products?: Array<OrderProduct>;
};

export class OrderModel {
  // get all orders
  async index(): Promise<Array<Order>> {
    try {
      const query = `SELECT o.*, array_to_json(array_agg(row_to_json(op))) as products FROM orders o 
      JOIN order_products op ON o.id = op.order_id GROUP BY o.id`;
      const connection = await db.connect();
      const { rows } = await connection.query(query);
      connection.release();
      return rows.map((row) => this.dto(row as Order));
    } catch (error) {
      const { message } = error as Error;
      throw new Error(`Failed to retrieve orders because of this error: ${message}`);
    }
  }

  // get an order by id
  async show(orderId: number): Promise<Order> {
    try {
      const query = `SELECT o.*, array_to_json(array_agg(row_to_json(op))) as products FROM 
      orders o JOIN order_products op ON o.id = op.order_id WHERE o.id = ($1) GROUP BY o.id`;
      const connection = await db.connect();
      const { rows } = await connection.query(query, [orderId]);
      connection.release();
      return this.dto(rows[0] as Order);
    } catch (error) {
      const { message } = error as Error;
      throw new Error(
        `Failed to retrieve order with id = ${orderId} because of this error: ${message}`
      );
    }
  }

  // create new order
  async create(order: Order): Promise<Order> {
    try {
      const query = 'INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *';
      const connection = await db.connect();
      const { rows } = await connection.query(query, [order.user_id, order.status]);
      connection.release();
      return rows[0];
    } catch (error) {
      const { message } = error as Error;
      throw new Error(`Failed to create new order because of this error: ${message}`);
    }
  }

  // update an existing order
  async update(order: Order): Promise<Order> {
    try {
      const query = 'UPDATE orders SET status = ($1), user_id = ($2) WHERE id = ($3) RETURNING *';
      const connection = await db.connect();
      const { rows } = await connection.query(query, [order.status, order.user_id, order.id]);
      connection.release();
      return rows[0];
    } catch (error) {
      const { message } = error as Error;
      throw new Error(
        `Failed to update order with id = ${order.id} because of this error: ${message}`
      );
    }
  }

  async delete(orderId: number): Promise<Order> {
    try {
      const query = 'DELETE FROM orders WHERE id = ($1) RETURNING *';
      const connection = await db.connect();
      const { rows } = await connection.query(query, [orderId]);
      connection.release();
      return rows[0];
    } catch (error) {
      const { message } = error as Error;
      throw new Error(
        `Failed to delete order with id = ${orderId} because of this error: ${message}`
      );
    }
  }

  // get current user orders
  async showByUserId(userId: number): Promise<Order> {
    try {
      const query = `SELECT o.*, array_to_json(array_agg(row_to_json(op))) as products FROM 
        orders o JOIN order_products op ON o.id = op.order_id WHERE o.user_id = ($1) AND o.status = 'active' 
        GROUP BY o.id ORDER BY o.id DESC`;
      const connection = await db.connect();
      const { rows } = await connection.query(query, [userId]);
      connection.release();
      return this.dto(rows[0] as Order);
    } catch (error) {
      const { message } = error as Error;
      throw new Error(
        `Failed to get current order for user with id = ${userId} because of this error: ${message}`
      );
    }
  }

  // return users completed orders
  async indexByCompletedStatus(userId: number): Promise<Array<Order>> {
    try {
      const query = `SELECT o.*, array_to_json(array_agg(row_to_json(op))) as products FROM 
        orders o JOIN order_products op ON o.id = op.order_id WHERE o.user_id = ($1) AND o.status = 'complete' 
        GROUP BY o.id`;
      const connection = await db.connect();
      const { rows } = await connection.query(query, [userId]);
      connection.release();
      return rows.map((row) => this.dto(row as Order));
    } catch (error) {
      const { message } = error as Error;
      throw new Error(`Failed to retrieve completed orders because of this error: ${message}`);
    }
  }

  // adds a product to an order
  async addProductToOrder(orderProduct: OrderProduct): Promise<OrderProduct> {
    try {
      const query =
        'INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *';
      const connection = await db.connect();
      const { rows } = await connection.query(query, [
        orderProduct.order_id,
        orderProduct.product_id,
        orderProduct.quantity
      ]);
      connection.release();
      return rows[0];
    } catch (error) {
      const { message } = error as Error;
      throw new Error(
        `Failed to add product #${orderProduct.product_id} to order #${orderProduct.order_id} completed orders 
        because of this error: ${message}`
      );
    }
  }

  private dto(order: Order): Order {
    return {
      id: order.id,
      user_id: order.user_id,
      status: order.status,
      products: order.products?.map(({ product_id, quantity }) => ({
        product_id,
        quantity
      }))
    } as Order;
  }
}
