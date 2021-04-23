import Category from '../entities/Category';

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

export default interface ICategoriesRepository {
  findByName(name: string): Promise<Category>;
  list(): Promise<Category[]>;
  create(data: ICreateCategoryDTO): Promise<void>;
}

export { ICreateCategoryDTO };
