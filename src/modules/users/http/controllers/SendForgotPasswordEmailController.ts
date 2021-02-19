import {Request, Response} from 'express';
import UserRepository from '../../infra/typeorm/repositories/UserRepository';
import UserTokenRepository from '../../infra/typeorm/repositories/UserTokenRepository';
import MailProvider from '../../../../shared/container/providers/MailProvider/implementations/EtherealMailProvider';
import SendForgotPasswordEmailService from '../../services/SendForgotPasswordEmailService';


export default class ForgotPasswordController{

    public async create(request: Request, response:Response){


        const {email} = request.body;
        console.log(email);



        const userRepository = new UserRepository();
        const mailProvider = new MailProvider();
        const userTokenRepository = new UserTokenRepository();
        const sendForgotPasswordEmailService = new SendForgotPasswordEmailService(userRepository, mailProvider, userTokenRepository);
    
        await sendForgotPasswordEmailService.execute({email});
        
       return response.status(204).json();
    }

}