
import {startOfHour, format} from 'date-fns';


import Appointment from '../infra/typeorm/entities/Appointments';

import AppErro from '../../../shared/erros/AppErro';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import INotificationsRepository from '../../notifications/infra/repositories/INotificationRepository';


interface IRequest{
    provider_id: string;
    user_id: string;
    date: Date;
}

export default class CreateAppointmentService{
    
    constructor(private appointmentRepository: IAppointmentsRepository, private notificationRepository: INotificationsRepository){
    }

    public async execute({provider_id, user_id, date}: IRequest):Promise<Appointment>{
        
        const parsedDate = startOfHour(date);
        
        const findAppointmentInSameDate = await this.appointmentRepository.findByDate(parsedDate);


        if(!!findAppointmentInSameDate){
            throw new AppErro("Já existe nesse horário um agendamento!") ;
        }

         const appointment = await this.appointmentRepository.createAndSave({provider_id , user_id, date:parsedDate});
        
         const formatedData = format(date, "dd/MM/ yyyy 'às' HH:mmh");

         const notification= await this.notificationRepository.create({
             recipient_id: provider_id,
              content: `Novo agendamento para o dia ${formatedData}`
         })
         
         return appointment;

        }

}