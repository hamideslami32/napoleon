import { Request, Response } from "express";
import { getConnection } from "typeorm";
import { Auth } from "../entity/Auth";
import { User } from "../entity/User";
import {
  TUserLoginBody,
  TUserLogoutBody,
  TUserRefreshBody,
  TUserRegisterBody,
} from "../models/user.model";
import sha256 from "crypto-js/sha256";
import sha1 from "crypto-js/sha1";
import { ApiError } from "../utils/apiError";
import { omit } from "../utils/pick";
import jwt from "jsonwebtoken";
import dayjs from "dayjs";

const connection = getConnection();
const userRepository = connection.getRepository(User);
const authRepository = connection.getRepository(Auth);

const generateAuth = async (user: User) => {
  const token = jwt.sign({ data: user }, process.env.secret, {
    expiresIn: "1h",
  });
  const refreshToken = sha1(token);
  const auth = new Auth({ refreshToken, token });
  // await authRepository.save(auth);
  user.auth = auth;
  await userRepository.save(user);
  return auth;
};
export const login = async (req: Request, res: Response) => {
  const body = req.body as TUserLoginBody;
  const passwordHash = sha256(body.password).toString();
  const user = await userRepository.findOne({
    where: { username: body.username, password: passwordHash },
    relations: ['auth']
  });
  if (!user)
    res.status(401).json({
      error: new ApiError(401, "username or password is invalid"),
    });
  const auth = await authRepository
    .findOne({ where: { user } })
    .catch(() => null);
  if (!auth || !jwt.verify(auth.token, process.env.secret)) {
    await generateAuth(user);
  }

  const response = omit(user, ["password"]);
  res.status(200).json(response);
};
export const logout = async (req: Request, res: Response) => {
  const { token } = req.body as TUserLogoutBody;
  const auth = await authRepository.findOne({ where: { token } });
  if (auth) await authRepository.remove(auth);
  res.status(200).send();
};
export const register = async (req: Request, res: Response) => {
  const body = req.body as TUserRegisterBody;
  const user = new User();
  user.username = body.username;
  user.password = sha256(body.password).toString();
  user.email = body.email;
  await userRepository.save(user);
  login(req, res);
};
export const refresh = async (req: Request, res: Response) => {
  const { refreshToken, token } = req.body as TUserRefreshBody;

  const user = await userRepository.findOne({
    where: { auth: { refreshToken, token } },
  });
  if (!user)
    res.status(401).json({
      error: new ApiError(401, "no user with this token found"),
    });
  authRepository.remove(user.auth);
  const auth = await generateAuth(user);
  res.status(200).json(omit(auth, ["id"]));
};
