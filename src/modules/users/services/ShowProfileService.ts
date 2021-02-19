import User from "../infra/typeorm/entities/User";
import IUserRepository from "../repositories/IUserRepository";
import AppError from '../../../shared/erros/AppErro';

interface IRequest{
    user_id: string;
}
export default class ShowProfileService{
    constructor(private userRepository: IUserRepository){
    }

    public async execute({user_id}: IRequest): Promise<User>{
        const user = await this.userRepository.findById(user_id);
        console.log('and here');
        console.log(user_id)
        if(!user){
            throw new AppError('User does not exists')
        }
        console.log(user);
        return user;
    }
}