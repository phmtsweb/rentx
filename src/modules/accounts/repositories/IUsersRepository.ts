import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import User from '../entities/User';

export default interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(userId: string): Promise<User>;
}
