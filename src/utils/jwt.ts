import sha1 from 'crypto-js/sha1';
import jwt from 'jsonwebtoken';
import { getConnection } from 'typeorm';
import { User } from '../entity/User';
import { omit } from './pick';


const connection = getConnection();
const userRepository = connection.getRepository(User);

export const verifyToken = (token: string): Promise<boolean> => {
  return new Promise((resolve) => {
    jwt.verify(token, process.env.secret, (err) => {      
      resolve(!err);
    });
  });
};


export const generateToken = async (user: User) => {
  const token = jwt.sign({ user: omit(user, ['token', 'refreshToken', 'courses', 'password']) }, process.env.secret, {
    expiresIn: '1h',
  });
  const refreshToken = sha1(token).toString();
  user.token = token;
  user.refreshToken = refreshToken;
  await userRepository.update(user.id, user);
  return { token, refreshToken };
};