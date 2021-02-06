import { Router } from 'express';
import { parseISO } from 'date-fns';

import CreateAppointmentService from '../../services/CreateAppointmentService';
import unsureAuthentication from '../../../users/http/middleweres/unsureAuthentication';
import AppointmentsRepository from '../../infra/typeorm/repositories/AppointmentsRepository';


const appointmentsRouter = Router();



appointmentsRouter.use(unsureAuthentication);

// appointmentsRouter.get('/', async (request, response) => {
//     console.log(request.user);

//     return response.json( await appointmentRepository.find());
// });

appointmentsRouter.post('/', async (request, response) => {

    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);
    const appointmentRepository = new AppointmentsRepository();
    const createAppointmentService = new CreateAppointmentService(appointmentRepository);
    
    const appointment = await createAppointmentService.execute({provider_id, date:parsedDate});
    

    response.json(appointment);


});

export default appointmentsRouter;