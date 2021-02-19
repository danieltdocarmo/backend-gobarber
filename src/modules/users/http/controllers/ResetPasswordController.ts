import {Request, Response} from 'express';
import UserRepository from '../../infra/typeorm/repositories/UserRepository';
import UserTokenRepository from '../../infra/typeorm/repositories/UserTokenRepository';
import ResetPasswordService from '../../services/ResetPasswordService';
import CryptHashProvider from '../../providers/hashProvider/implementations/CryptHashProvider';

export default class ResetPasswordController{

    public async create(request: Request, response:Response){
    
        const {password, token} = request.body;

        const userRepository = new UserRepository();
        const userTokenRepository = new UserTokenRepository();
        const cryptHashProvider = new CryptHashProvider();
        
        const resetPasswordService = new ResetPasswordService(userRepository, userTokenRepository, cryptHashProvider);

        await resetPasswordService.execute({password, token});
    
        return response.status(204).json();
    }

}