import { injectable, inject } from 'tsyringe';

import AppError from '../../../../errors/AppError';
import ICategoriesRepository from '../../repositories/ICategoriesRepository';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export default class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name,
    );
    if (categoryAlreadyExists) {
      throw new AppError('Category already exists!');
    }
    this.categoriesRepository.create({ name, description });
  }
}
