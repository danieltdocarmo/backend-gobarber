import {Request, Response} from 'express';
import DiskStorageProvider from '../../../../shared/container/providers/StorageProvider/implementations/DiskStorageProvider';
import UserRepository from '../../infra/typeorm/repositories/UserRepository';
import UpdateUserAvatarService from '../../services/UpdateUserAvatarService';



export default class UpdateUserAvatarServiceController{

    public async update(request: Request, response: Response){

        const usersRepository = new UserRepository();
        const diskStorageProvider = new DiskStorageProvider();
        const updateUserAvatarService = new UpdateUserAvatarService(usersRepository, diskStorageProvider);

        const user = await updateUserAvatarService.execute({user_id: request.user.id, avatarFileName: request.file.filename})
        
        response.status(200).json(user);
    }
}