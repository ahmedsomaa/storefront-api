import { Order, OrderModel, OrderProduct } from '../models/order';

import { Request, Response, NextFunction } from 'express';

import ServerResponse from '../utils/server-response';

const model = new OrderModel();

// ----------------------------------------- handlers
const findAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const orders = await model.index();
    res.status(200).json(new ServerResponse(orders, null, 200));
  } catch (error) {
    next(error);
  }
};

const findById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const order = await model.show(+id);
    res.status(200).json(new ServerResponse(order, null, 200));
  } catch (error) {
    next(error);
  }
};

const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const created = await model.create(req.body as Order);
    res.status(200).json(new ServerResponse(created, null, 200));
  } catch (error) {
    next(error);
  }
};

const update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const updated = await model.update(req.body as Order);
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

const findCurrentByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = req.params;
    const orders = await model.showByUserId(+userId);
    res.status(200).json(new ServerResponse(orders, null, 200));
  } catch (error) {
    next(error);
  }
};

const findAllCompleted = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId } = req.params;
    const orders = await model.indexByCompletedStatus(+userId);
    res.status(200).json(new ServerResponse(orders, null, 200));
  } catch (error) {
    next(error);
  }
};

const addProductToOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const added = await model.addProductToOrder(req.body as OrderProduct);
    res.status(200).json(new ServerResponse(added, null, 200));
  } catch (error) {
    next(error);
  }
};

export default {
  findAll,
  findById,
  create,
  update,
  destroy,
  findCurrentByUserId,
  findAllCompleted,
  addProductToOrder
};
