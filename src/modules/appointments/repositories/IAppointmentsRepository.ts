import ICreateData from "../infra/typeorm/dtos/ICreateData";
import Appointments from "../infra/typeorm/entities/Appointments";

export default interface IAppointmentsRepository{

    findByDate(date: Date):Promise<Appointments | undefined>;
    createAndSave(date:ICreateData):Promise<Appointments>;
}