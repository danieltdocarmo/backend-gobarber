import nodemailer,{Transport, Transporter} from 'nodemailer';

import IMailProvider from "../models/IMailProvider";

interface IMessage {
    to: string;
    body: string;
}

export default class EtherealMailProvider implements IMailProvider {
private client: Transport;

    constructor() {      
    const client: Transporter = {} as Transporter; 
        async function  test(): Promise<void> {
            const account = await nodemailer.createTestAccount();
            const transporter = nodemailer.createTransport(
                {
                    host: account.smtp.host,
                    port: account.smtp.port,
                     secure: account.smtp.secure,
                     auth: {
                         user: account.user,
                         pass: account.pass
                     }
                }
            )
                
        }


        // nodemailer.createTestAccount().then(account => {
        //     const transporter = nodemailer.createTransport(
        //         {
        //             host: account.smtp.host,
        //             port: account.smtp.port,
        //             secure: account.smtp.secure,
        //             auth: {
        //                 user: account.user,
        //                 pass: account.pass
        //             }
        //         });
                
        //         this.client = transporter;
        //         console.log(this.client.sendMail);
        //     });

    }


    public async sendEmail(to: string, body: string): Promise<void> {
    //    const message = await this.client.sendMail({
    //         from: 'Equipe GoBarber <equipe@gobarber.com>',
    //         to,
    //         subject: 'Recuperacao de senha',
    //         text: body
    //     });
    
    //     console.log('Message sent: %s', message.messageId);
    //     console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));

        console.log('Enviando Email de recuperacao')
    }

}