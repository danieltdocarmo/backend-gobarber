import {Request, Response} from 'express';

import UserRepository from '../../infra/typeorm/repositories/UserRepository';
import CryptHashProvider from '../../providers/hashProvider/implementations/CryptHashProvider';
import AuthenticationService from '../../services/AuthenticationService';

export default class CreateUserServiceController{

    public async create(request: Request, response:Response){
    
        const { email, password } = request.body;
    
        const usersRepository = new UserRepository();
        const cryptHashProvider = new CryptHashProvider();
        const authenticationService = new AuthenticationService(usersRepository, cryptHashProvider);
    
        const user = await authenticationService.execute({email, password});
    
        response.json(user);
    }

}