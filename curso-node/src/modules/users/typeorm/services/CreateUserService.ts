import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import User from '../entities/User';
import UsersRepository from '../repositories/UsersRepository';
import { hash } from 'bcryptjs';


interface IRequest{
  name: string;
  email: string;
  password: string;
}


class CreateUserService{
  public async execute({ name, email, password }: IRequest ): Promise<User> {
    const userRepository =  getCustomRepository(UsersRepository);
    const emailExists = await userRepository.findByEmail(email);

    if(emailExists){
      throw new AppError('Email adress already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword
    });

    await userRepository.save(user);

    return user;
  }
}


export default CreateUserService;