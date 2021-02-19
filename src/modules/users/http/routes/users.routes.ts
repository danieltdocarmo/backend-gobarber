import {Router} from 'express';
import multer from 'multer';

import configMulter from '../../../../config/upload';

import unsureAuthentication from '../middleweres/unsureAuthentication';
import CreateUserServiceController from '../controllers/CreateUserServiceController';
import UpdateUserAvatarServiceController from '../controllers/UpdateUserAvatarServiceController';

import { Segments, Joi,celebrate} from  'celebrate';

const usersRouter = Router();
const upload = multer(configMulter.multer);
const createUserServiceController = new CreateUserServiceController();
const updateUserAvatarServiceController = new UpdateUserAvatarServiceController();

usersRouter.post('/', celebrate(
{
    [Segments.BODY] : {
        name: Joi.string().required(),
        email : Joi.string().email().required(),
        password: Joi.string().required()
    }
}),createUserServiceController.create);

usersRouter.patch('/avatar', unsureAuthentication, upload.single('avatar'), updateUserAvatarServiceController.update)



export default usersRouter; 