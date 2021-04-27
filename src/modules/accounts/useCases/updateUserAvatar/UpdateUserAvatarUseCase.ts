// Adicionar coluna avatar na tabela de users
// Refatir usuário com a coluna avatar
// Configuração upload do multer
// Criar regra de negócio do upload
// Criar o nosso controller

import { inject, injectable } from 'tsyringe';

import IUsersRepository from '../../repositories/IUsersRepository';

interface IRequest {
  userId: string;
  avatarFile: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  async execute({ userId, avatarFile }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(userId);
  }
}

export default UpdateUserAvatarUseCase;
