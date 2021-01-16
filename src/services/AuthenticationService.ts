import { getRepository } from 'typeorm';
import User from '../models/User';
import { compare } from 'bcryptjs';
import UserMap from '../mappers/UserMap';
import { sign } from 'jsonwebtoken';

import jwt from '../config/auth';
import AppErro from '../erros/AppErro';


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
    public async execute({ email, password }: Request): Promise<{ user: UserDTO, token: string }> {

        const userRepository =  getRepository(User);

        const user = await userRepository.findOne({where: {email}});

        if (!user) {
            throw new AppErro('Email or password are wrong!');
        }

        if (!compare(user.password, password)) {
            throw new AppErro('Email or password are wrong!');
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


