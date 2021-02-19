import { Request, Response } from 'express';
import AppointmentsRepository from '../../infra/typeorm/repositories/AppointmentsRepository';

import ListProviderDayAvailabilityService from '../../services/ListProviderDayAvailabilityService';



export default class ProviderDayAvailabilityController {

    public async create(request: Request, response: Response) {
        const {provider_id} = request.params;

        const { day, month, year } = request.body;


        const appointmentRepository = new AppointmentsRepository();
        const listProviderDayAvailabilityServices = new ListProviderDayAvailabilityService(appointmentRepository);

        const avaibility = await listProviderDayAvailabilityServices.execute(
            { provider_id,
                day, 
                month, 
                year });

        return response.json(avaibility);

    }
}