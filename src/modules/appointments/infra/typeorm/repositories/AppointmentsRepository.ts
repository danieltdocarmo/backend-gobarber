
import {getRepository, Repository} from 'typeorm';



import Appointments from '../entities/Appointments';
import ICreateData from '../dtos/ICreateData';
import IAppointmentsRepository from '../../../repositories/IAppointmentsRepository';


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

    public async createAndSave({provider_id, date}:ICreateData):Promise<Appointments>{
        const createAppointment = await this.ormRepository.create({provider_id, date});

        await this.ormRepository.save(createAppointment);

        return createAppointment
    }


}