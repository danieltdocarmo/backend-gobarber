import {Request, response, Response} from 'express';

import UserRepository from '../../infra/typeorm/repositories/UserRepository';
import CryptHashProvider from '../../providers/hashProvider/implementations/CryptHashProvider';
import CreateUserService from '../../services/CreateUserService';

export default class CreateUserServiceController{

    public async create(request: Request, response:Response){
    
        const {name, email, password} = request.body;
        const usersRepository = new UserRepository();
        const bCryptHashProvider = new CryptHashProvider();
        const createUserService = new CreateUserService(usersRepository, bCryptHashProvider);
    
        const user = await createUserService.execute({name, email, password});
        
        return response.status(200).json(user)
    }

}