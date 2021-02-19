
import {getRepository, Repository, Raw} from 'typeorm';



import Appointments from '../entities/Appointments';
import ICreateData from '../dtos/ICreateData';
import IAppointmentsRepository from '../../../repositories/IAppointmentsRepository';
import IFindAllAppointmentsInMonthFromProvider from '../dtos/IFindAllAppointmentsInMonthFromProvider';
import IFindInAllDayAppointments from '../dtos/iFindInAllDayAppointments';


export default class AppointmentsRepository implements IAppointmentsRepository{
   private ormRepository: Repository<Appointments>;
   
    constructor(){
        this.ormRepository = getRepository(Appointments);
    }
 
    public async findByDate(date:Date):Promise<Appointments | undefined >{
        
       const findAppointment = await this.ormRepository.findOne({
           where: {date: date}
       })
        
       return findAppointment || undefined
    }

    public async createAndSave({provider_id, user_id, date}:ICreateData):Promise<Appointments>{
        const createAppointment = await this.ormRepository.create({provider_id,user_id, date});

        await this.ormRepository.save(createAppointment);

        return createAppointment
    }

    public async findAllAppointmentsInMonthFromProvider({provider_id, month, year}: IFindAllAppointmentsInMonthFromProvider): Promise<Appointments[]>{
        const parsedMonth = String(month).padStart(2, '0');

        const appointments = this.ormRepository.find({
            where: {
                id: provider_id,
                date: Raw(dateFildName => 
                    `to_char(${dateFildName}, 'MM-YYYY) = ${parsedMonth}-${year}`
                )
            }
        })
        return appointments;
    }

    public async findInAllDayAppointments({provider_id, day, month, year}: IFindInAllDayAppointments):Promise<Appointments[]>{
        const parsedMonth = String(month).padStart(2, '0');
        const parsedDay = String(day).padStart(2, '0');

        const appointments = this.ormRepository.find({
            where: {
                id: provider_id,
                date: Raw(dateFildName => 
                    `to_char(${dateFildName}, 'DD-MM-YYYY) = ${parsedDay}-${parsedMonth}-${year}`
                )
            }
        })
        return appointments;
    }
}