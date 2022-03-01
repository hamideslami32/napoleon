import { getConnection } from "typeorm";
import { Auth } from "../entity/Auth";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
const authRepository = getConnection().getRepository(Auth);
const ignorePaths = ["/auth/login", "/auth/register"];
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (ignorePaths.includes(req.path)) next();
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).send();
  const auth = await authRepository.findOne({
    where: { token: authorization },
  });
  if (!auth || !jwt.verify(auth.token, process.env.secret))
    return res.status(401).send();
  next();
};
