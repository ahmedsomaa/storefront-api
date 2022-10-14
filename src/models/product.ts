import db from '../db';

export type Product = {
  id?: number;
  name: string;
  price: number;
  category?: string;
  total_orders?: number;
};

export class ProductModel {
  // get all products
  async index(): Promise<Array<Product>> {
    try {
      const query = 'SELECT * FROM products';
      const connection = await db.connect();
      const { rows } = await connection.query(query);
      connection.release();
      return rows.map((row) => this.dto(row));
    } catch (error) {
      const { message } = error as Error;
      throw new Error(`Failed to retrieve products because of this error: ${message}`);
    }
  }

  // get all products with the same category
  async indexByCategory(category: string): Promise<Array<Product>> {
    try {
      const query = 'SELECT * FROM products WHERE category = ($1)';
      const connection = await db.connect();
      const { rows } = await connection.query(query, [category]);
      connection.release();
      return rows.map((row) => this.dto(row));
    } catch (error) {
      const { message } = error as Error;
      throw new Error(
        `Failed to retrieve products with category = ${category} because of this error: ${message}`
      );
    }
  }

  // get product by id
  async show(productId: number): Promise<Product> {
    try {
      const query = 'SELECT * FROM products WHERE id = ($1)';
      const connection = await db.connect();
      const { rows } = await connection.query(query, [productId]);
      connection.release();
      return this.dto(rows[0]);
    } catch (error) {
      const { message } = error as Error;
      throw new Error(
        `Failed to retrieve product with id = ${productId} because of this error: ${message}`
      );
    }
  }

  // create new product
  async create(product: Product): Promise<Product> {
    try {
      const query = 'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *';
      const connection = await db.connect();
      const { rows } = await connection.query(query, [
        product.name,
        product.price,
        product.category
      ]);
      connection.release();
      return this.dto(rows[0]);
    } catch (error) {
      const { message } = error as Error;
      throw new Error(`Failed to create new product because of this error: ${message}`);
    }
  }

  // update a given product
  async update(product: Product): Promise<Product> {
    try {
      const query =
        'UPDATE products SET name = ($1), price = ($2), category = ($3) WHERE id = ($4) RETURNING *';
      const connection = await db.connect();
      const { rows } = await connection.query(query, [
        product.name,
        product.price,
        product.category,
        product.id
      ]);
      connection.release();
      return this.dto(rows[0]);
    } catch (error) {
      const { message } = error as Error;
      throw new Error(
        `Failed to update product with id = ${product.id} because of this error: ${message}`
      );
    }
  }

  // deletes a product with a given id
  async delete(productId: number): Promise<Product> {
    try {
      const query = 'DELETE FROM products WHERE id = ($1) RETURNING *';
      const connection = await db.connect();
      const { rows } = await connection.query(query, [productId]);
      connection.release();
      return this.dto(rows[0]);
    } catch (error) {
      const { message } = error as Error;
      throw new Error(
        `Failed to delete product with id = ${productId} because of this error: ${message}`
      );
    }
  }

  // 5 most popular products
  async popular5(): Promise<Array<Product>> {
    try {
      const query = `SELECT p.*, SUM(op.quantity) AS total_orders FROM products p JOIN order_products op 
      ON p.id = op.product_id GROUP BY p.id, p.name, p.price ORDER BY total_orders DESC LIMIT 5`;
      const connection = await db.connect();
      const { rows } = await connection.query(query);
      connection.release();
      return rows.map((row) => this.dto(row));
    } catch (error) {
      const { message } = error as Error;
      throw new Error(
        `Failed to retrieve 5 most popular products because of this error: ${message}`
      );
    }
  }

  // data transfer object to convert
  // returned price to a TS number as it's returning
  // as  a string since it's type is NUMERIC
  private dto(queryResult: Product): Product {
    const hasTotalOrders = queryResult.total_orders !== undefined;
    return hasTotalOrders
      ? {
          ...queryResult,
          price: +queryResult.price,
          total_orders: +(queryResult.total_orders as number)
        }
      : { ...queryResult, price: +queryResult.price };
  }
}
