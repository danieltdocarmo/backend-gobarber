import { Router } from 'express';


import AuthenticationServiceController from '../controllers/AuthenticationServiceController';

import { celebrate, Segments, Joi} from 'celebrate';

const sessionRouter = Router();
const authenticationServiceController = new AuthenticationServiceController();

sessionRouter.post('/', celebrate({
    [Segments.BODY] : {
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }
}), authenticationServiceController.create)

    
   


export default sessionRouter;