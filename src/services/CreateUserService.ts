import { hash } from 'bcryptjs';
import { getRepository} from 'typeorm';

import User from '../models/User';
import UserMap from '../mappers/UserMap';
import AppErro from '../erros/AppErro';

interface Request{
    name: string;
    email: string;
    password: string;
}
export default class CreateUserService{
    public async execute({name, email, password}: Request): Promise<Omit<User, 'password'>>{
        const usersRepository = getRepository(User);

        const findSameEmail = await usersRepository.findOne({
            where: {email},
        });

        if(findSameEmail){
            throw new AppErro('Email já cadastrado!');
        }

        const hashedPassword = await hash(password, 8);

        const user = usersRepository.create({name, email, password: hashedPassword});

        await usersRepository.save(user);

        const userWithoutPassword = UserMap.toDTO(user);

        return userWithoutPassword;
        
    }
}