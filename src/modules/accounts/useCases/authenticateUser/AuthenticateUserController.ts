import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserUseCase from './AuthenticateUserUseCase';

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);
    try {
      const userWithToken = await authenticateUserUseCase.execute({
        email,
        password,
      });
      return response.json(userWithToken);
    } catch ({ message }) {
      return response.status(400).json({ message });
    }
  }
}

export default AuthenticateUserController;
