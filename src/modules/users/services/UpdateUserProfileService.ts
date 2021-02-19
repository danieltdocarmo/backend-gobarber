import User from '../infra/typeorm/entities/User';


import AppErro from '../../../shared/erros/AppErro';
import IUserRepository from '../repositories/IUserRepository';

import IHashProvider from '../providers/hashProvider/models/IHashProvider';

interface Request {
    user_id: string;
    name: string;
    email: string;
    oldPassword?: string;
    password?: string;
}

export default class UpdateUserProfileService {
    constructor(private userRepository: IUserRepository,
        private hashProvider: IHashProvider) {
    }
    
    public async execute({user_id, name, email, oldPassword, password}: Request):Promise<User> {

        const emailAlreadyExists = await this.userRepository.findByEmail(email);

        if(emailAlreadyExists && emailAlreadyExists.id != user_id){
            throw new AppErro('Email already exists')
        }
        
        const user = await this.userRepository.findById(user_id);

        if(!user){
            throw new AppErro('Usuario não encontrado')!
        }

        if(password && !oldPassword){
            throw new AppErro('You need to inform the old password to set a new password');
        }

        if(oldPassword){
            const checkOldPassword = await this.hashProvider.compareHash(user.password, oldPassword);


            if(checkOldPassword == false){    
                 throw new AppErro('wrong old password');
            }
        }

        if(password){
            user.password = await this.hashProvider.generateHash(password);
        }

        user.name = name;
        user.email = email;
        
        console.log('user save')
       await this.userRepository.save(user);
        console.log('returned user')
        return user;
    }

}

