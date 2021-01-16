
import {EntityRepository, Repository} from 'typeorm';

import Appointments from '../models/Appointments';

@EntityRepository(Appointments)
export default class AppointmentsRepository extends Repository<Appointments>{
    
    public async findByDate(date:Date):Promise<Appointments | null >{
       const findAppointment = await this.findOne({
           where: {date: date}
       })
        
       return findAppointment || null
    }


}