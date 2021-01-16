import { Router } from 'express';

import { parseISO } from 'date-fns';
import {getCustomRepository} from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import unsureAuthentication from '../middleweres/unsureAuthentication';


const appointmentsRouter = Router();

appointmentsRouter.use(unsureAuthentication);

appointmentsRouter.get('/', async (request, response) => {
    console.log(request.user);
    const appointmentRepository = getCustomRepository(AppointmentsRepository);

    return response.json( await appointmentRepository.find());
});

appointmentsRouter.post('/', async (request, response) => {

    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointmentService = new CreateAppointmentService();
    

    const appointment = await createAppointmentService.execute({provider_id, date:parsedDate});
    

    response.json(appointment);


});

export default appointmentsRouter;