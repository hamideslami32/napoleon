import { Response, Request } from 'express';
import { getConnection } from 'typeorm';
import { User } from '../entity/User';

const userRepository = getConnection().getRepository(User);

export const getUsers = (req: Request, res: Response) => {
  userRepository.find().then((users) => {
    res.json(users);
  });
};
