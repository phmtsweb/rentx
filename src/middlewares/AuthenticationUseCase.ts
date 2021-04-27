import { verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import AppError from '../errors/AppError';
import IUsersRepository from '../modules/accounts/repositories/IUsersRepository';

interface IPayload {
  sub: string;
}

@injectable()
class AuthenticationUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(token: string): Promise<void> {
    if (!token || token.trim() === '') {
      throw new AppError('Token missing', 401);
    }
    const { sub: userId } = verify(
      token,
      'e0d7a685df692b983cc4c5fd21e657fa',
    ) as IPayload;
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new AppError('Token is not valid!', 401);
    }
  }
}
export default AuthenticationUseCase;
