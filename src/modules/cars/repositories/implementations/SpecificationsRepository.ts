import { getRepository, Repository } from 'typeorm';

import Specification from '../../entities/Specification';
import ISpecificationsRepository, {
  ICreateSpecificationDTO,
} from '../ISpecificationsRepository';

export default class SpecificationsRepository
  implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({
      name,
    });
    return specification;
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);
  }
}
