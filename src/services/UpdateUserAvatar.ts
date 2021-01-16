import User from '../models/User';
import { getRepository } from 'typeorm';
import uploadConfig from '../config/upload';
import path from 'path';
import fs from 'fs';
import UserMap from '../mappers/UserMap';

import AppErro from '../erros/AppErro';

interface Request {
    user_id: string;
    avatarFileName: string;
}

export default class UpdateUserAvatar {
    public async execute({ user_id, avatarFileName }: Request): Promise<Omit<User, 'password'>> {
        const userRepository = getRepository(User);

        const user = await userRepository.findOne(user_id);

        if (!user) {
            throw new AppErro('Only authenticated users can modify avatar')
        }

        if (user.avatar) {
            
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
            const useAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

            if (useAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }

        }
        user.avatar = avatarFileName;

        userRepository.save(user);

        const userWithoutPassword = UserMap.toDTO(user);
        return userWithoutPassword;

    }

}

