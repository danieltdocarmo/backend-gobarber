import {Request, Response} from 'express';
import UserRepository from '../../../users/infra/typeorm/repositories/UserRepository';
import ListAllUserServices from '../../services/ListAllUsersServices'

export default class ListAllUsersController{
    
    public async index(request: Request, response: Response){
        const user_id = request.user.id;

        const userRepository = new UserRepository();
        const listAllUsersService = new ListAllUserServices(userRepository);

        const users = await listAllUsersService.execute({user_id});

        return response.json(users);
    }
}