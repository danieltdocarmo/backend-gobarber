import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

import IMailProvider from "../models/IMailProvider";

interface IMessage {
    to: string;
    body: string;
}

export default class EtherealMailProvider implements IMailProvider {
    private client: Mail


    public async generateProvider(): Promise<void> {
        const account = await nodemailer.createTestAccount();
        const transporter = await nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass
            }
        });
        
        this.client = transporter;

    }

    public async sendEmail(to: string, body: string): Promise<void> {
           const message = await this.client.sendMail({
                from: 'Equipe GoBarber <equipe@gobarber.com.br>',
                to,
                subject: 'Recuperacao de senha',
                text: body
            });

            console.log('Message sent: %s', message.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));

    }

}