import User from "../../users/infra/typeorm/entities/User";
import IUserRepository from "../../users/repositories/IUserRepository";
import AppError from '../../../shared/erros/AppErro';

interface IRequest{
    user_id: string;
}

export default class ListAllUserServices{
    constructor(private userRepository: IUserRepository){
    }

    public async execute({user_id}: IRequest): Promise<User[]>{
        const users = await this.userRepository.listAllUsers(user_id);


        if(!users){
            throw new AppError('User does not exists')

        }

        return users;
    }
}