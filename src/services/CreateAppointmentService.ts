import {getCustomRepository} from 'typeorm';
import {startOfHour} from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import Appointment from '../models/Appointments';

import AppErro from '../erros/AppErro';

interface Request{
    provider_id: string;
    date: Date;
}

export default class CreateAppointmentService{

    public async execute({provider_id, date}:Request):Promise<Appointment>{

        
        const appointmentRepository = getCustomRepository(AppointmentsRepository);
        const parsedDate = startOfHour(date);
        
        const findAppointmentInSameDate = await appointmentRepository.findByDate(parsedDate);


        if(findAppointmentInSameDate){
            throw new AppErro("Já existe nesse horário um agendamento!") ;
        }


         const appointment = appointmentRepository.create({provider_id , date:parsedDate});
        


         await appointmentRepository.save(appointment);
         
         return appointment;

        }

}