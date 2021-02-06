import {Router} from 'express';
import multer from 'multer';

import configMulter from '../../../../config/upload';
import CreateUserService from '../../services/CreateUserService';
import unsureAuthentication from '../middleweres/unsureAuthentication';
import UpdateUserAvatarService from '../../services/UpdateUserAvatar';
import UserRepository from '../../infra/typeorm/repositories/UserRepository';
import BCryptHashProvideer from '../../../users/providers/hashProvider/implementations/BCryptHashProvider';
import DiskStorageProvider from '../../../../shared/container/providers/StorageProvider/implementations/DiskStorageProvider';

const usersRouter = Router();
const upload = multer(configMulter);

usersRouter.post('/', async (request, response) => {

    try{
    const {name, email, password} = request.body;
    const usersRepository = new UserRepository();
    const bCryptHashProvider = new BCryptHashProvideer();
    const createUserService = new CreateUserService(usersRepository, bCryptHashProvider);

    const user = await createUserService.execute({name, email, password});

    return response.status(200).json(user);
    } catch(err){
        return response.status(400).json({ error: err.message});
    }
});

usersRouter.patch('/avatar', unsureAuthentication, upload.single('avatar'), async (request, response) => {
        const usersRepository = new UserRepository();
        const diskStorageProvider = new DiskStorageProvider();
        const updateUserAvatarService = new UpdateUserAvatarService(usersRepository, diskStorageProvider);

        const user = await updateUserAvatarService.execute({user_id: request.user.id, avatarFileName: request.file.filename})
        response.status(200).json(user);
   
    
});

export default usersRouter; 