import IUserRepository from "../repositories/IUserRepository";
import IUserTokenRepository from "../repositories/IUserTokenRepository";
import AppError from '../../../shared/erros/AppErro';
import IHashProvider from "../providers/hashProvider/models/IHashProvider";
import {isAfter, addHours, isFirstDayOfMonth} from 'date-fns';

interface IRequest {
    password: string;
    token: string;
}

export default class ResetPasswordService {
    constructor(private userRepository: IUserRepository, private userTokenRepository: IUserTokenRepository, private hashProvider: IHashProvider) {

    }

    public async execute({ password, token }: IRequest): Promise<void> {
        const userToken = await this.userTokenRepository.findByToken(token);

        if (!userToken) {
            throw new AppError('Token does not exists');
        }

        const user = await this.userRepository.findById(userToken.user_id);

        if (!user) {
            throw new AppError('User does not exists');
        }

        const dateToken = userToken.created_at;
        const compareDate = addHours(dateToken, 2);

        if(isAfter(Date.now(), compareDate)){
            throw new AppError('Token expired')
        }
        const passwordHashded = await this.hashProvider.generateHash(password);

        user.password = passwordHashded;

        this.userRepository.save(user);


    }
}