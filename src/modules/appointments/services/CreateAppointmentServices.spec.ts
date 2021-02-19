

import { uuid } from "uuidv4";
import AppError from '../../../shared/erros/AppErro';
import FakeNotificationsRepository from "../../notifications/infra/repositories/fakes/FakeNotificationsRepository";
import FakeAppointmentsRepository from "../repositories/fakes/FakeAppointmnetsRepository";
import CreateAppointmentService from "./CreateAppointmentServices";

describe('Create Appointments', () => {
    it('should be able to create a new appointment', async () => {
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const fakeNotificationRepository = new FakeNotificationsRepository();
        const createAppointmentService = new CreateAppointmentService(fakeAppointmentsRepository, fakeNotificationRepository);

        const appointment = await createAppointmentService.execute({ provider_id: uuid(), user_id: uuid(), date: new Date() });

        

        expect(appointment).toHaveProperty('id');
    });

})

describe('Create Appointments', () => {
    it('not should be able to create a new appointment with the same date', async () => {
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const fakeNotificationRepository = new FakeNotificationsRepository();
        const createAppointmentService = new CreateAppointmentService(fakeAppointmentsRepository, fakeNotificationRepository);

        const appointmentDate = new Date(2021, 4, 10 , 11);

        const appointment = await createAppointmentService.execute({ provider_id: uuid(), user_id: uuid(),date: appointmentDate });

        expect(createAppointmentService.execute({ provider_id: uuid(), user_id: uuid(), date: appointmentDate })).rejects.toBeInstanceOf(AppError)
    });
});



