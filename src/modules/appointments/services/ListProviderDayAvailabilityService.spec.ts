import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmnetsRepository';
import {uuid} from 'uuidv4';
import ListProviderDayAvabilityServices from './ListProviderDayAvailabilityService';

describe('List Provider Month Availability', () => {
    it('should be able to list the month availability from provider', async () => {
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();

        const listProviderDayAvailabilityServices = new ListProviderDayAvabilityServices(fakeAppointmentsRepository);
        await fakeAppointmentsRepository.createAndSave({
            provider_id: 'user',
            user_id: uuid(),
            date: new Date(2020, 3, 20, 8, 0, 0)
        });
        await fakeAppointmentsRepository.createAndSave({
            provider_id: 'user',
            user_id: uuid(),
            date: new Date(2020, 3, 20, 9, 0, 0)
        });
        await fakeAppointmentsRepository.createAndSave({
            provider_id: 'user',user_id: uuid(),
            date: new Date(2020, 3, 20, 10, 0, 0)
        });
        await fakeAppointmentsRepository.createAndSave({
            provider_id: 'user',user_id: uuid(),
            date: new Date(2020, 3, 20, 11, 0, 0)
        });
        await fakeAppointmentsRepository.createAndSave({
            provider_id: 'user',user_id: uuid(),
            date: new Date(2020, 3, 20, 12, 0, 0)
        });
        await fakeAppointmentsRepository.createAndSave({
            provider_id: 'user',user_id: uuid(),
            date: new Date(2020, 3, 20, 14, 0, 0)
        });

        await fakeAppointmentsRepository.createAndSave({
            provider_id: 'user',user_id: uuid(),
            date: new Date(2020, 3, 20, 15, 0, 0)
        });

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 19).getTime();
        }

        );

        await fakeAppointmentsRepository.createAndSave({
            provider_id: 'user',user_id: uuid(),
            date: new Date(2020, 3, 21, 15, 0, 0)
        });

        const availability = await listProviderDayAvailabilityServices.execute({
            provider_id: 'user',
            day: 20,
            month: 4,
            year: 2020,
        });

        expect(availability).toEqual(expect.arrayContaining([
            { hour: 8, available: false },
            { hour: 9, available: false },
            { hour: 10, available: false },
            { hour: 11, available: false },
            { hour: 12, available: false },
            { hour: 13, available: true },
            { hour: 14, available: false },
            { hour: 15, available: false },
            { hour: 16, available: true },
        ]));


    });
});