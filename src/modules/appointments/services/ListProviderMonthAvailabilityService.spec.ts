import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmnetsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';
import {uuid} from 'uuidv4';
describe('List Provider Month Availability', ()=>{
    it('should be able to list the month availability from provider', async ()=>{
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService(fakeAppointmentsRepository);
        

        await fakeAppointmentsRepository.createAndSave({
            provider_id: 'user',
            user_id: uuid(),
            date: new Date(2020, 3, 21, 8, 0, 0)
        });

        await fakeAppointmentsRepository.createAndSave({
            provider_id: 'user',
            user_id: uuid(),
            date: new Date(2020, 3, 21, 9, 0, 0)
        });
        
        await fakeAppointmentsRepository.createAndSave({
            provider_id: 'user',
            user_id: uuid(),
            date: new Date(2020, 3, 21, 10, 0, 0)
        });

        await fakeAppointmentsRepository.createAndSave({
            provider_id: 'user',
            user_id: uuid(),
            date: new Date(2020, 3, 21, 11, 0, 0)
        });

        await fakeAppointmentsRepository.createAndSave({
            provider_id: 'user',
            user_id: uuid(),
            date: new Date(2020, 3, 21, 12, 0, 0)
        });

        await fakeAppointmentsRepository.createAndSave({
            provider_id: 'user',
            user_id: uuid(),
            date: new Date(2020, 3, 21, 13, 0, 0)
        });

        await fakeAppointmentsRepository.createAndSave({
            provider_id: 'user',
            user_id: uuid(),
            date: new Date(2020, 3, 21, 14, 0, 0)
        });

        await fakeAppointmentsRepository.createAndSave({
            provider_id: 'user',
            user_id: uuid(),
            date: new Date(2020, 3, 21, 15, 0, 0)
        });
        await fakeAppointmentsRepository.createAndSave({
            provider_id: 'user',
            user_id: uuid(),
            date: new Date(2020, 3, 21, 16, 0, 0)
        });

        await fakeAppointmentsRepository.createAndSave({
            provider_id: 'user',
            user_id: uuid(),
            date: new Date(2020, 3, 21, 17, 0, 0)
        });

        const availability = await listProviderMonthAvailabilityService.execute({
            provider_id: 'user',
            year: 2020,
            month: 4
        });

        expect(availability).toEqual(expect.arrayContaining([
            {day: 19, available: true},
            {day: 20, available: true},
            {day: 21, available: false},
            {day: 22, available: true}
        ]));

        
    });
});