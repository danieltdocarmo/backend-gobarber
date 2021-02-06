
import { compare } from 'bcryptjs';
import UserMap from '../mappers/UserMap';
import { sign } from 'jsonwebtoken';

import jwt from '../../../config/auth';
import AppErro from '../../../shared/erros/AppErro';
import IUserRepository from '../repositories/IUserRepository';
import IHashProvider from '../providers/hashProvider/models/IHashProvider';


interface Request {
    email: string;
    password: string;
}

interface UserDTO {
    id: string,
    name: string;
    email: string;
}

export default class AuthenticationService {
    constructor(private userRepository: IUserRepository,
        private bCryptHashProvider: IHashProvider,
        ){
    }

    public async execute({ email, password }: Request): Promise<{ user: UserDTO, token: string }> {
        
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new AppErro('Email are wrong!');
        }

        const matchPassword = await this.bCryptHashProvider.compareHash(password, user.password);

        if (!matchPassword) {
            throw new AppErro('password are wrong!');
        }

        const userWithoutPassword = UserMap.toDTO(user);

        const { secret, expiresIn } = jwt;

        const token = sign({
        }, secret, {
            subject: user.id,
            expiresIn
        });

        return {
            user: userWithoutPassword, 
            token
        }


    }

}


