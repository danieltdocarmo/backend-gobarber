
import {startOfHour} from 'date-fns';


import Appointment from '../infra/typeorm/entities/Appointments';

import AppErro from '../../../shared/erros/AppErro';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';


interface IRequest{
    provider_id: string;
    date: Date;
}

export default class CreateAppointmentService{
    
    constructor(private appointmentRepository: IAppointmentsRepository){

    }

    public async execute({provider_id, date}: IRequest):Promise<Appointment>{
        
        const parsedDate = startOfHour(date);
        


        const findAppointmentInSameDate = await this.appointmentRepository.findByDate(parsedDate);


        if(!!findAppointmentInSameDate){
            throw new AppErro("Já existe nesse horário um agendamento!") ;
        }



         const appointment = await this.appointmentRepository.createAndSave({provider_id , date:parsedDate});
        
         
         return appointment;

        }

}