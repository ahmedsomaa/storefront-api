import bcrypt from 'bcrypt';
import config from '../config';
import db from '../db';

export type User = {
  id?: number;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
};

export type Account = {
  email: string;
  password: string;
};

const {
  jwt: { salt, pepper }
} = config;

export class UserModel {
  // get all users
  async index(): Promise<Array<User>> {
    try {
      const query = 'SELECT id, email, first_name, last_name FROM users';
      const connection = await db.connect();
      const { rows } = await connection.query(query);
      connection.release();
      return rows;
    } catch (error) {
      const { message } = error as Error;
      throw new Error(`Failed to retrieve users because of this error: ${message}`);
    }
  }

  // get user by id
  async show(userId: number): Promise<User> {
    try {
      const query = 'SELECT id, email, first_name, last_name FROM users WHERE id = ($1)';
      const connection = await db.connect();
      const { rows } = await connection.query(query, [userId]);
      connection.release();
      return rows[0];
    } catch (error) {
      const { message } = error as Error;
      throw new Error(
        `Failed to retrieve user with id = ${userId} because of this error: ${message}`
      );
    }
  }

  // create new user
  async create(user: User): Promise<User> {
    try {
      const query = `INSERT INTO users (email, first_name, last_name, password) VALUES ($1, $2, $3, $4) RETURNING id, 
      email, first_name, last_name`;
      const connection = await db.connect();
      const passwordHash = bcrypt.hashSync(user.password.concat(pepper), salt);
      const { rows } = await connection.query(query, [
        user.email,
        user.first_name,
        user.last_name,
        passwordHash
      ]);
      connection.release();
      return rows[0];
    } catch (error) {
      const { message } = error as Error;
      throw new Error(`Failed to create new user because of this error: ${message}`);
    }
  }

  // update user with given id
  async update(user: User): Promise<User> {
    try {
      const query = `UPDATE users SET email = ($1), first_name = ($2), last_name = ($3) WHERE id = ($4) RETURNING id, 
      email, first_name, last_name`;
      const connection = await db.connect();
      const { rows } = await connection.query(query, [
        user.email,
        user.first_name,
        user.last_name,
        user.id
      ]);
      connection.release();
      return rows[0];
    } catch (error) {
      const { message } = error as Error;
      throw new Error(
        `Failed to update user with id = ${user.id} because of this error: ${message}`
      );
    }
  }

  // delete a given user
  async delete(userId: number): Promise<User> {
    try {
      const query = 'DELETE FROM users WHERE id = ($1) RETURNING id, email, first_name, last_name';
      const connection = await db.connect();
      const { rows } = await connection.query(query, [userId]);
      connection.release();
      return rows[0];
    } catch (error) {
      const { message } = error as Error;
      throw new Error(
        `Failed to delete user with id = ${userId} because of this error: ${message}`
      );
    }
  }

  // authenticate a user
  async authenticate({ email, password }: Account): Promise<User | null> {
    try {
      const query = 'SELECT * from users WHERE email = ($1)';
      const connection = await db.connect();
      const { rows } = await connection.query(query, [email]);
      connection.release();
      if (rows.length) {
        const [user] = rows;
        const { id, email, first_name, last_name, password: hashed } = user;
        const isMatch = bcrypt.compareSync(password.concat(pepper), hashed);
        if (isMatch) {
          return { id, email, first_name, last_name } as User;
        }
      }
      return null;
    } catch (error) {
      const { message } = error as Error;
      throw new Error(
        `Failed to authenticate user with email = ${email} because of this error: ${message}`
      );
    }
  }
}
