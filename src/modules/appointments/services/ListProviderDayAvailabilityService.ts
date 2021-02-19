import IAppointmentsRepository from "../repositories/IAppointmentsRepository";
import { getDaysInMonth, getDate, getHours, isAfter } from 'date-fns';

interface IRequest {
    provider_id: string;
    day: number
    month: number;
    year: number;
}

type IResponse = Array<{
    hour: number;
    available: boolean;
}>

export default class ListProviderMonthAvailabilityService {
    constructor(private appointmentsRepository: IAppointmentsRepository) {
    }

    public async execute({ provider_id, day, month, year }: IRequest): Promise<IResponse> {
        const appointments = await this.appointmentsRepository.findInAllDayAppointments(
            {
                provider_id,
                day,
                month,
                year
            })

            const startHour = 8;

            const eachHourArray = Array.from(
                {length: 10},
                (_, index) => index + startHour
                )
            
                const availability = eachHourArray.map(hour => {
                    const hasAppointment = appointments.find(appointment => getHours(appointment.date) == hour);

                    const currentDate = new Date(Date.now());
                    const compareDate = new Date(year, month - 1, day, hour);
                    

                
                    return({
                    hour, 
                    available: !hasAppointment && !isAfter(compareDate, currentDate)});
                });
            

        return availability;
    }
}