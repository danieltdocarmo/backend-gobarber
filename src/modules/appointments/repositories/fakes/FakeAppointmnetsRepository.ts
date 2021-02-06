import IAppointmentsRepository from '../IAppointmentsRepository';
import ICreateData from '../../infra/typeorm/dtos/ICreateData';
import Appointment from '../../infra/typeorm/entities/Appointments';
import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';


export default class FakeAppointmentsRepository implements IAppointmentsRepository{
    private appointments: Appointment[] = [];
    constructor(){
    }

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointment = this.appointments.find(appointment => isEqual(appointment.date, date));



        return findAppointment;
    }

    public async createAndSave({provider_id, date}: ICreateData): Promise<Appointment>{
        const appointment = new Appointment();

        Object.assign(appointment, {id: uuid(), date, provider_id});

        this.appointments.push(appointment);

        return appointment;
    }
}