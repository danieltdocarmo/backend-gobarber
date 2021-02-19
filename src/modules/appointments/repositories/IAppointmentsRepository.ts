import ICreateData from "../infra/typeorm/dtos/ICreateData";
import Appointments from "../infra/typeorm/entities/Appointments";
import IFindAllAppointmentsInMonthFromProvider from '../infra/typeorm/dtos/IFindAllAppointmentsInMonthFromProvider';
import IFindInAllDayAppointments from '../infra/typeorm/dtos/iFindInAllDayAppointments';

export default interface IAppointmentsRepository{

    findByDate(date: Date):Promise<Appointments | undefined>;
    createAndSave(date:ICreateData):Promise<Appointments>;
    findAllAppointmentsInMonthFromProvider(data: IFindAllAppointmentsInMonthFromProvider):Promise<Appointments[]>
    findInAllDayAppointments(date: IFindInAllDayAppointments):Promise<Appointments[]>
}