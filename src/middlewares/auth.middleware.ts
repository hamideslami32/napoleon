import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
const ignorePaths = ['/auth/login', '/auth/register'];
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (ignorePaths.includes(req.path)) return next();
  const { authorization } = req.headers;
  if (!authorization || !jwt.verify(`jwt ${authorization}`, process.env.secret)) return res.status(401).send();
  next();
};
