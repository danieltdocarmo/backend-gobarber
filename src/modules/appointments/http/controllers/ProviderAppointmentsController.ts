import { Request, Response } from 'express';
import ListProviderAppointmentsServices from '../../services/ListProvidersAppointmentsServices';
import AppointmentRepository from '../../infra/typeorm/repositories/AppointmentsRepository';
import { parseISO } from 'date-fns';

export default class AppointmentsController {

    public async index(request: Request, response: Response) {
        const user_id = request.user.id;

        const {day, month, year} = request.body;

        const appointmentRepository = new AppointmentRepository();
        const listProviderAppointmentsServices = new ListProviderAppointmentsServices(appointmentRepository);

        const appointments = await listProviderAppointmentsServices.execute(
            {
                provider_id: user_id,
                day,
                month,
                year
            });

        return response.json(appointments);

    }
}