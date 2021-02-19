import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import { parseISO } from 'date-fns';

import CreateAppointmentService from '../../services/CreateAppointmentServices';
import unsureAuthentication from '../../../users/http/middleweres/unsureAuthentication';
import AppointmentsRepository from '../../infra/typeorm/repositories/AppointmentsRepository';
import NotificationRepository from '../../../notifications/infra/typeorm/repositories/NotificationRepository';

import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';


const appointmentsRouter = Router();

const providerAppointmnetsControler = new ProviderAppointmentsController();


appointmentsRouter.use(unsureAuthentication);

// appointmentsRouter.get('/', async (request, response) => {
//     console.log(request.user);

//     return response.json( await appointmentRepository.find());
// });

appointmentsRouter.post('/', celebrate({
    [Segments.BODY]:{
        provider_id: Joi.string().uuid().required(),
        date: Joi.date(),
    }
}) ,async (request, response) => {
    const user_id = request.user.id;

    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);
    const appointmentRepository = new AppointmentsRepository();
    const notificationRepository = new NotificationRepository();
    const createAppointmentService = new CreateAppointmentService(appointmentRepository, notificationRepository);
    
    const appointment = await createAppointmentService.execute({provider_id, user_id, date:parsedDate});
    

    response.json(appointment);

});
appointmentsRouter.get('/me', providerAppointmnetsControler.index)

export default appointmentsRouter;