import {Router, Request, Response} from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ForgotPasswordController from '../controllers/SendForgotPasswordEmailController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordRoutes = Router();

const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRoutes.post('/forgot', celebrate({
    [Segments.BODY] : {
        email: Joi.string().required()
    }
}), forgotPasswordController.create);

passwordRoutes.post('/reset', celebrate({
    [Segments.BODY] : {
        password: Joi.string().required(),
        password_confirmation: Joi.string().required().valid(Joi.ref('password')),
        token: Joi.string().uuid().required()
    }
}), resetPasswordController.create);

export default passwordRoutes;