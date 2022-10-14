import { NextFunction, Request, Response } from 'express';
import { Product, ProductModel } from '../models/product';

import ServerResponse from '../utils/server-response';

const model = new ProductModel();

// ----------------------------------------- handlers
const findAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let products: Array<Product> = [];
    const hasQuery = Object.keys(req.query).length;
    if (hasQuery) {
      products = await model.indexByCategory(req.query.category as string);
    } else {
      products = await model.index();
    }
    res.status(200).json(new ServerResponse(products, null, 200));
  } catch (error) {
    next(error);
  }
};

const popular5 = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const popular = await model.popular5();
    res.status(200).json(new ServerResponse(popular, null, 200));
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
    const created = await model.create(req.body as Product);
    res.status(200).json(new ServerResponse(created, null, 200));
  } catch (error) {
    next(error);
  }
};

const update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const updated = await model.update(req.body as Product);
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

export default {
  findAll,
  popular5,
  findById,
  create,
  update,
  destroy
};
