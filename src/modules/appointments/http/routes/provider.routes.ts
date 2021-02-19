import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthentication from '../../../users/http/middleweres/unsureAuthentication';
import ListAllUsersController from '../controllers/ListAllUsersController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';

const listAllUsersController = new ListAllUsersController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();

const listAllUsers = Router();

listAllUsers.use(ensureAuthentication);

listAllUsers.get('/', listAllUsersController.index);
listAllUsers.get('/providers/:provider_id/day-availability', celebrate({
    [Segments.PARAMS]: {
        provider_id: Joi.string().uuid().required()
    }
}), providerDayAvailabilityController.create);
listAllUsers.get('/providers/:provider_id/month-availability', celebrate({
    [Segments.PARAMS]: {
        provider_id: Joi.string().uuid().required()
    }
}), providerMonthAvailabilityController.create);

export default listAllUsers;