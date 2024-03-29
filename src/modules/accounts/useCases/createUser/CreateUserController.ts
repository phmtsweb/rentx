import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserUseCase from './CreateUserUseCase';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password, driver_license } = request.body;
    try {
      const createUserUseCase = container.resolve(CreateUserUseCase);
      await createUserUseCase.execute({
        name,
        email,
        password,
        driveLicense: driver_license,
      });
    } catch ({ message }) {
      return response.status(400).json({ message });
    }

    return response.status(201).send();
  }
}

export default CreateUserController;
