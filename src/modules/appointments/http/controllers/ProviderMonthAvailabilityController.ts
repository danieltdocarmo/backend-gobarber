import { Request, Response } from 'express';
import AppointmentsRepository from '../../infra/typeorm/repositories/AppointmentsRepository';

import ListProviderMonthAvailabilityService from '../../services/ListProviderMonthAvailabilityService';



export default class ProviderMonthAvailabilityController {

    public async create(request: Request, response: Response) {
        const { provider_id } = request.params;

        const { month, year } = request.body;


        const appointmentRepository = new AppointmentsRepository();
        const listProviderMonthAvailabilityServices = new ListProviderMonthAvailabilityService(appointmentRepository);

        const avaibility = await listProviderMonthAvailabilityServices.execute(
            { provider_id, 
                month, 
                year });

        return response.json(avaibility);

    }
}