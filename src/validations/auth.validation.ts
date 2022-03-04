import joi from 'joi';
import {
  TUserLoginBody,
  TUserLogoutBody,
  TUserRefreshBody,
  TUserRegisterBody,
} from '../models/user.model';

export const register = {
  body: joi.object<TUserRegisterBody>().keys({
    username: joi.string().required(),
    password: joi.string().required(),
    email: joi.string().required().email(),
  }),
};
export const login = {
  body: joi.object<TUserLoginBody>().keys({
    username: joi.string().required(),
    password: joi.string().required(),
  }),
};
export const logout = {
  body: joi.object<TUserLogoutBody>().keys({
    token: joi.string().required(),
  }),
};
export const refresh = {
  body: joi.object<TUserRefreshBody>().keys({
    token: joi.string().required(),
    refreshToken: joi.string().max(40).required()
  }),
};
