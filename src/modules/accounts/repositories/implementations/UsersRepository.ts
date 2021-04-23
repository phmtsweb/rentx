import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import User from '../../entities/User';
import IUsersRepository from '../IUsersRepository';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;
  constructor() {
    this.repository = getRepository(User);
  }
  async findById(userId: string): Promise<User> {
    const user = await this.repository.findOne(userId);
    return user;
  }
  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({
      email,
    });
    return user;
  }

  async create({
    name,
    email,
    password,
    driveLicense,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      password,
      driveLicense,
    });
    await this.repository.save(user);
  }
}

export default UsersRepository;
