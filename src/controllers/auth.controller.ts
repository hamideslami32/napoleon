import { Request, Response } from 'express';
import { getConnection } from 'typeorm';
import { User } from '../entity/User';
import {
  TUserLoginBody,
  TUserLogoutBody,
  TUserRefreshBody,
  TUserRegisterBody,
} from '../models/user.model';
import sha256 from 'crypto-js/sha256';
import sha1 from 'crypto-js/sha1';
import { ApiError } from '../utils/apiError';
import { omit } from '../utils/pick';
import jwt from 'jsonwebtoken';

const connection = getConnection();
const userRepository = connection.getRepository(User);

const generateAuth = async (user: User) => {
  const token = jwt.sign({ data: user }, process.env.secret, {
    expiresIn: '1h',
  });
  const refreshToken = sha1(token).toString();
  user.token = token;
  user.refreshToken = refreshToken;
  await userRepository.update(user.id, user);
  return { token, refreshToken };
};
export const login = async (req: Request, res: Response) => {
  const body = req.body as TUserLoginBody;
  const passwordHash = sha256(body.password).toString();
  const user = await userRepository.findOne({
    where: { username: body.username, password: passwordHash },
  });
  if (!user)
    return res.status(401).json({
      error: new ApiError(401, 'username or password is invalid'),
    });

  if (!user.token || !jwt.verify('jwt ' + user.token, process.env.secret)) {
    await generateAuth(user);
  }

  const response = omit(user, ['password']);
  return res.status(200).json(response);
};
export const logout = async (req: Request, res: Response) => {
  const { token } = req.body as TUserLogoutBody;
  const user = await userRepository.findOne({ where: { token } });
  if (user) {
    user.token = null;
    user.refreshToken = null;
    await userRepository.update(user.id, user);
  }
  return res.status(200).send();
};
export const register = async (req: Request, res: Response) => {
  const body = req.body as TUserRegisterBody;
  if (await userRepository.findOne({ where: { username: body.username } })) return res.status(400).json({ error: new ApiError(400, 'username already exists') });
  const user = new User();
  user.username = body.username;
  user.password = sha256(body.password).toString();
  user.email = body.email;
  const savedUser = await userRepository.save(user);
  Object.assign(savedUser, await generateAuth(savedUser));
  res.status(200).json(omit(savedUser, ['id']));
};
export const refresh = async (req: Request, res: Response) => {
  const { refreshToken, token } = req.body as TUserRefreshBody;

  const user = await userRepository.findOne({
    where: { auth: { refreshToken, token } },
  });
  if (!user)
    return res.status(401).json({
      error: new ApiError(401, 'no user with this token found'),
    });
  const newTokens = await generateAuth(user);
  return res.status(200).json(newTokens);
};
