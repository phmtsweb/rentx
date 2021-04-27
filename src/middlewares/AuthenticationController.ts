import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import AuthenticationUseCase from './AuthenticationUseCase';

class AuthenticationController {
  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const authHeader = request.headers.authorization || '';
    const [, token] = authHeader.split(' ');
    const authenticationUseCase = container.resolve(AuthenticationUseCase);
    await authenticationUseCase.execute(token);
    return next();
  }
}

export default AuthenticationController;
