import { User } from '../entity/User';

export type TUserRegisterBody = Pick<User, 'username' | 'password' | 'email'>;
export type TUserLoginBody = Pick<User, 'username' | 'password'>;
export type TUserLoginResponse = Omit<User, 'password'>;
export type TUserLogoutBody = Pick<User, 'token'>;
export type TUserRefreshBody = Pick<User, 'token' | 'refreshToken'>;
