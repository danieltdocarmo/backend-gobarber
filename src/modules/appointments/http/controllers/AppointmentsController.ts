import { Request, Response } from 'express';
import CreateAppointmentService from '../../services/CreateAppointmentServices';
import AppointmentRepository from '../../infra/typeorm/repositories/AppointmentsRepository';
import { parseISO } from 'date-fns';

export default class AppointmentsController {

    public async create(request: Request, response: Response) {
        const user_id = request.user.id;

        const { provider_id, date } = request.body;

        const parsedDate = parseISO(date);

        const appointmentRepository = new AppointmentRepository();
        const createAppointmentService = new CreateAppointmentService(appointmentRepository);

        const appointment = await createAppointmentService.execute(
            {
                provider_id,
                user_id,
                date: parsedDate
            });

        return response.json(appointment);

    }
}