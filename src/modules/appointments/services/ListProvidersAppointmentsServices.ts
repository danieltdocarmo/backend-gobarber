import appointmentsRouter from "../http/routes/appointments.routes";
import Appointment from "../infra/typeorm/entities/Appointments";
import IAppointmentsRepository from "../repositories/IAppointmentsRepository";


interface IRequest{
    provider_id: string;
    day: number;
    month: number;
    year: number;
}


export default class ListProviderMonthAvailabilityService{
    constructor(private appointmentsRepository: IAppointmentsRepository){
    }

    public async execute({provider_id,day, month, year}: IRequest): Promise<Appointment[]>{
       const appointments = await this.appointmentsRepository.findInAllDayAppointments({
        provider_id,
        day,
        month,
        year
       });
   
       return appointments;
    }

}