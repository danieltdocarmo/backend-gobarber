import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmnetsRepository';
import ListProvidersAppointmentsServices from '../services/ListProvidersAppointmentsServices';

import {uuid} from 'uuidv4';

describe('List Provider Appointments', ()=>{
    it('should be able to list the appointments on a specific day', async ()=>{
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const listProvidersAppointmentsServices = new ListProvidersAppointmentsServices(fakeAppointmentsRepository);
        

        const appointmentOne = await fakeAppointmentsRepository.createAndSave({
            provider_id: 'provider',
            user_id: uuid(),
            date: new Date(2020, 3, 21, 14, 0, 0)
        });

        const appointmentTwo = await fakeAppointmentsRepository.createAndSave({
            provider_id: 'provider',
            user_id: uuid(),
            date: new Date(2020, 3, 21, 15, 0, 0)
        });
        
       
        const appointments = await listProvidersAppointmentsServices.execute({
            provider_id: 'provider',
            day: 21,
            year: 2020,
            month: 4
        });

       expect(appointments).toEqual([appointmentOne, appointmentTwo]);
        
    });
});