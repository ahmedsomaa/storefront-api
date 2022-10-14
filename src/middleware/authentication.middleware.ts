import { NextFunction, Request, Response } from 'express';

import ServerResponse from '../utils/server-response';
import config from '../config';
import jwt from 'jsonwebtoken';

const {
  jwt: { secret }
} = config;

const useAuthentication = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];
    jwt.verify(token as string, secret);
    next();
  } catch (error) {
    res.status(401).json(
      new ServerResponse(
        null,
        {
          details: "Either user didn't provide a token or token is invalid"
        },
        401
      )
    );
  }
};

export { useAuthentication };
