import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import IUsersRepository from '../modules/accounts/repositories/IUsersRepository';

interface IPayload {
  sub: string;
}

@injectable()
class Authentication {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { },

  async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction): Promise<void> {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new Error('Token missing');
  }

  const [, token] = authHeader.split(' ');
  try {
    const { sub: userId } = verify(token, 'e0d7a685df692b983cc4c5fd21e657fa') as IPayload;
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new Error('User is not valid!');
    }
    next();
  } catch {
    throw new Error('Token is invalid');
  }
}
}

export default Authentication;


