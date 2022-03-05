import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
const ignorePaths = ['/auth/login', '/auth/register', '/auth/refresh'];
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (ignorePaths.includes(req.path)) return next();
  const { authorization } = req.headers;
  if (!authorization || !(await verifyToken(authorization))) return res.status(401).send();
  next();
};
