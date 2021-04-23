import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSpecificationUseCase from './CreateSpecificationUseCase';

export default class CreateSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;
    try {
      const createSpecificationUseCase = container.resolve(
        CreateSpecificationUseCase,
      );
      await createSpecificationUseCase.execute({ name, description });
    } catch ({ message }) {
      return response.status(400).json({ error: message });
    }
    return response.status(201).send();
  }
}
