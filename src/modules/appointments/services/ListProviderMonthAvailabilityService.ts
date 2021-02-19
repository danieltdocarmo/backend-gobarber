import IAppointmentsRepository from "../repositories/IAppointmentsRepository";
import {getDaysInMonth, getDate} from 'date-fns';
interface IRequest{
    provider_id: string;
    month: number;
    year: number;
}

type IResponse = Array<{
    day: number;
    available: boolean;
}>

export default class ListProviderMonthAvailabilityService{
    constructor(private appointmentsRepository: IAppointmentsRepository){
    }

    public async execute({provider_id, month, year}: IRequest): Promise<IResponse>{
        const appointments = await this.appointmentsRepository.findAllAppointmentsInMonthFromProvider({
            provider_id,
            month,
            year
        })

        const daysInMonth = getDaysInMonth(new Date(year, month -1));

        const eachDaysArray = Array.from({
            length: daysInMonth
        },
        (_, index) => index + 1
        )

        const avaibility = eachDaysArray.map(
            day => {
                const appointmentsInDay = appointments.filter( appointment => (
                    getDate(appointment.date) == day
                ))
            return {
                day,
                available: appointmentsInDay.length < 10
            }
            }
        )
        
        console.log(eachDaysArray);

        return avaibility;
    }
}