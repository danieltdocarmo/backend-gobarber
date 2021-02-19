import {Request, Response } from 'express';

import UpdateUserProfileService from '../../services/UpdateUserProfileService';
import UserRepository from '../../infra/typeorm/repositories/UserRepository';
import CryptHashProvider from '../../providers/hashProvider/implementations/CryptHashProvider';
import UserMap from '../../mappers/UserMap';
import ShowProfileService from '../../services/ShowProfileService';

export default class ProfileController{
    public async show(request: Request, response: Response){

        
        const user_id = request.user.id;

        const userRepository = new UserRepository();
        const showProfileService = new ShowProfileService(userRepository);
        
        const user = await showProfileService.execute({user_id});
        
        return response.json(user);
    }
    
    public async update(request: Request, response: Response):Promise<UserMap>{
        const { name, email, oldPassword, password} = request.body;
        console.log(request.body);
        console.log(name, email, oldPassword, password);
        const user_id = request.user.id;
        
        const userRepository = new UserRepository();
        const hashProvider = new CryptHashProvider();
        const updateUserProfileService = new UpdateUserProfileService(userRepository, hashProvider);
                
        const updatedUser = await updateUserProfileService.execute({
            user_id,
            name,
            email,
            oldPassword,
            password
        })


        const userWithoutPassword = UserMap.toDTO(updatedUser);
        
        console.log('updated user ', userWithoutPassword);
        
        return response.json(userWithoutPassword);
    }
}