import {Router, Request, Response} from 'express';

import { celebrate, Segments, Joi} from 'celebrate';
import unsureAuthentication from '../middleweres/unsureAuthentication';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();

const profileController = new ProfileController();

profileRouter.use(unsureAuthentication); 

profileRouter.get('/',  profileController.show);
profileRouter.put('/',  celebrate({
    [Segments.BODY] : {
        name: Joi.string().required(),
	email: Joi.string().required(), 
	old_password: Joi.string(),
	password : Joi.string(),
	password_confirmation: Joi.string().valid(Joi.ref('password')),
    }
}), profileController.update);

export default profileRouter; 