
import IUserRepository from '../repositories/IUserRepository'
import IMailProvider from '../../../shared/container/providers/MailProvider/models/IMailProvider'
import AppError from '../../../shared/erros/AppErro';
import IUserTokenRepository from '../repositories/IUserTokenRepository';

interface IRequest{
    email: string;
}

export default class SendForgotEmailService{
   
    constructor(private userRepository: IUserRepository, private mailProvider: IMailProvider, private userTokenRepository: IUserTokenRepository ){
    }

    public async execute({ email }: IRequest): Promise<void>{

        const checkUserExists = await this.userRepository.findByEmail(email);

            
        if(!checkUserExists){
            throw new AppError('User does not exists');
        }
 

        const {token} = await this.userTokenRepository.generate(checkUserExists.id);

        await this.mailProvider.generateProvider();

        await this.mailProvider.sendEmail(email, `${process.env.APP_API_URL}/reset_password?token=${token}`);
    }
}