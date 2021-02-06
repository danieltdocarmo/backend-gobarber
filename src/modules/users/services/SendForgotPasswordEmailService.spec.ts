import SendForgotEmailService from "./SendForgotPasswordEmailService";
import FakeMailProvider from '../../../shared/container/providers/MailProvider/fake/FakeMailProvider';
import FakeUserRepository from "../repositories/fake/FakeUserRepository";
import AppError from '../../../shared/erros/AppErro';
import FakeUserTokenRepository from "../repositories/fake/FakeUserTokenRepository";

describe('SendForgotPasswordEmail', () => {
    it('should be able to recover the password using the email', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const fakeMailProvider = new FakeMailProvider();
        const fakeUserTokenRepository = new FakeUserTokenRepository();
       
        const sendedEmail = spyOn(fakeMailProvider, 'sendEmail');

        const sendForgotEmailService = new SendForgotEmailService(fakeUserRepository, fakeMailProvider, fakeUserTokenRepository);

        await fakeUserRepository.createAndSave({ name: 'John Doe', email: 'johndoe@example.com', password: '123456' });

        await sendForgotEmailService.execute({ email: 'johndoe@example.com' });

        expect(sendedEmail).toBeCalled();

    })

    it('should not be able to recover a non-existing user password', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const fakeMailProvider = new FakeMailProvider();
        const fakeUserTokenRepository = new FakeUserTokenRepository();
        const sendForgotEmailService = new SendForgotEmailService(fakeUserRepository, fakeMailProvider, fakeUserTokenRepository);

        await expect(sendForgotEmailService.execute({ email: 'johndoe@example.com' })).rejects.toBeInstanceOf(AppError);
    })

    it('should be able to create token ', async ()=>{
      
        const fakeUserRepository = new FakeUserRepository();
        const fakeMailProvider = new FakeMailProvider();
        const fakeUserTokenRepository = new FakeUserTokenRepository();
        
        const functionGenerate = spyOn(fakeUserTokenRepository, 'generate');

        const sendForgotEmailService = new SendForgotEmailService(fakeUserRepository, fakeMailProvider, fakeUserTokenRepository);

        await fakeUserRepository.createAndSave({ name: 'John Doe', email: 'johndoe@example.com', password: '123456' });

        await sendForgotEmailService.execute({email: 'johndoe@example.com'});

        expect(functionGenerate).toBeCalled();

    });

});
