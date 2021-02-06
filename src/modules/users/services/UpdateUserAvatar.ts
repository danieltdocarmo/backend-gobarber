import User from '../infra/typeorm/entities/User';
import uploadConfig from '../../../config/upload';
import path from 'path';
import fs from 'fs';
import UserMap from '../mappers/UserMap';

import AppErro from '../../../shared/erros/AppErro';
import IUserRepository from '../repositories/IUserRepository';
import IStorageProvider from '../../../shared/container/providers/StorageProvider/models/IStorageProvider';

interface Request {
    user_id: string;
    avatarFileName: string;
}

export default class UpdateUserAvatar {
    constructor(private userRepository: IUserRepository, 
                private storageProvider: IStorageProvider){
    }
    public async execute({ user_id, avatarFileName }: Request): Promise<Omit<User, 'password'>> {


        const user = await this.userRepository.findById(user_id);

        if (!user) {
            throw new AppErro('Only authenticated users can modify avatar')
        }
        console.log(user.avatar);
        if (user.avatar) {
          await this.storageProvider.deleteFile(user.avatar)

        }

        const uploadedAvatarFileName = await this.storageProvider.saveFile(avatarFileName);

        user.avatar = uploadedAvatarFileName;

        await this.userRepository.save(user);

        const userWithoutPassword = UserMap.toDTO(user);
        
        return userWithoutPassword;

    }

}

