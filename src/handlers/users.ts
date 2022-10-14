import { NextFunction, Request, Response } from 'express';
import { User, UserModel, Account } from '../models/user';
import config from '../config';
import jwt from 'jsonwebtoken';

import ServerResponse from '../utils/server-response';

const model = new UserModel();

const {
  jwt: { secret }
} = config;

// ----------------------------------------- handlers
const findAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await model.index();
    res.status(200).json(new ServerResponse(users, null, 200));
  } catch (error) {
    next(error);
  }
};

const findById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const found = await model.show(+id);
    res.status(200).json(new ServerResponse(found, null, 200));
  } catch (error) {
    next(error);
  }
};

const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const created = await model.create(req.body as User);
    res.status(200).json(new ServerResponse(created, null, 200));
  } catch (error) {
    next(error);
  }
};

const update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const updated = await model.update(req.body as User);
    res.status(200).json(new ServerResponse(updated, null, 200));
  } catch (error) {
    next(error);
  }
};

const destroy = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await model.delete(+id);
    res.status(200).json(new ServerResponse(deleted, null, 200));
  } catch (error) {
    next(error);
  }
};

const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await model.authenticate(req.body as Account);
    const token = jwt.sign({ user }, secret);
    user !== null
      ? res.status(200).json(new ServerResponse({ user, token }, null, 200))
      : res
          .status(401)
          .json(
            new ServerResponse(null, { details: 'Either user email or password in incorrect' }, 401)
          );
  } catch (error) {
    next(error);
  }
};

// ----------------------------------------- routes

export default { findAll, findById, create, update, destroy, authenticate };
