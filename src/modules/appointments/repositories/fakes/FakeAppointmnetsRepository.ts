import IAppointmentsRepository from '../IAppointmentsRepository';
import ICreateData from '../../infra/typeorm/dtos/ICreateData';
import Appointment from '../../infra/typeorm/entities/Appointments';
import { uuid } from 'uuidv4';
import { getDate, getMonth, getYear, isEqual } from 'date-fns';
import IFindAllAppointmentsInMonthFromProvider from '../../infra/typeorm/dtos/IFindAllAppointmentsInMonthFromProvider';
import IFindInAllDayAppointments from '../../infra/typeorm/dtos/iFindInAllDayAppointments';


export default class FakeAppointmentsRepository implements IAppointmentsRepository{
    private appointments: Appointment[] = [];
    constructor(){
    }

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointment = this.appointments.find(appointment => isEqual(appointment.date, date));



        return findAppointment;
    }

    public async createAndSave({provider_id, user_id, date}: ICreateData): Promise<Appointment>{
        const appointment = new Appointment();

        Object.assign(appointment, {id: uuid(), date, user_id, provider_id});

        this.appointments.push(appointment);

        return appointment;
    }

    public async findAllAppointmentsInMonthFromProvider({provider_id, month, year}: IFindAllAppointmentsInMonthFromProvider):Promise<Appointment[]>{
        const appointments = this.appointments.filter(appointment => {
            return(
                appointment.provider_id == provider_id &&
                getMonth(appointment.date) + 1 == month &&
                getYear(appointment.date) == year
            );
        });

        return appointments
    }

    public async findInAllDayAppointments({provider_id, day, month, year}: IFindInAllDayAppointments):Promise<Appointment[]>{
        const appointments = this.appointments.filter(appointment => {
            return(
                appointment.provider_id == provider_id &&
                getDate(appointment.date) == day &&
                getMonth(appointment.date) + 1 == month &&
                getYear(appointment.date) == year
            );
        });

        return appointments
    }
}