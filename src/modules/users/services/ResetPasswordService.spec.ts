import FakeUserRepository from "../repositories/fake/FakeUserRepository";
import CreateUserService from "./CreateUserService";
import FakeHashProvider from '../providers/hashProvider/fakes/FeakHashProvider';
import ResetPasswordService from './ResetPasswordService';
import FakeUserTokenRepository from "../repositories/fake/FakeUserTokenRepository";
import BCryptHashProvider from "../providers/hashProvider/implementations/CryptHashProvider";
import AppError from '../../../shared/erros/AppErro';
import { getHours } from "date-fns";

describe('Change Password', ()=>{

   

    it('should be able to reset password with token', async ()=>{

        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();
        const fakeUserTokenRepository = new FakeUserTokenRepository();

        
        const hashFunction = jest.spyOn(fakeHashProvider, 'generateHash');

        const createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider);
        
        const {id} = await createUserService.execute({name: 'John Doe', email: 'johndoe@example.com', password:'123456'})
       
        const resetPasswordService = new ResetPasswordService(fakeUserRepository, fakeUserTokenRepository, fakeHashProvider);
 
        const { token, user_id } =  await fakeUserTokenRepository.generate(id);

        await resetPasswordService.execute({password: '123123', token})

        const updatedUser = await fakeUserRepository.findById(user_id);
        
        expect(hashFunction).toBeCalled();
        expect(updatedUser?.password).toBe('123123');

    
    
    
    
    }); 

    it('should not should be able to reset password with non existing token',async () =>{
        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();
        const fakeUserTokenRepository = new FakeUserTokenRepository();
        
        const resetPasswordService = new ResetPasswordService(fakeUserRepository, fakeUserTokenRepository, fakeHashProvider)
        
        await expect(resetPasswordService.execute(
            {token: 'non-existing-token', password:'123456'})).rejects.toBeInstanceOf(AppError);
    })

    it('should not should be able to reset password with non existing token',async () =>{
        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();
        const fakeUserTokenRepository = new FakeUserTokenRepository();
        

        const resetPasswordService = new ResetPasswordService(fakeUserRepository, fakeUserTokenRepository, fakeHashProvider)
         
        const { token } = await fakeUserTokenRepository.generate('non-existing-user');

        await expect(resetPasswordService.execute(
            {token, password:'123456'})).rejects.toBeInstanceOf(AppError);
    })

    it('should not should be able to reset password with past more then two hours',async () =>{
        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();
        const fakeUserTokenRepository = new FakeUserTokenRepository();
        
        const createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider)
        const resetPasswordService = new ResetPasswordService(fakeUserRepository, fakeUserTokenRepository, fakeHashProvider)
        
        const user = await fakeUserRepository.createAndSave({name: 'John', email:'johndoe@example.com', password:'123456' })
       
        

        
        const  {token}  = await fakeUserTokenRepository.generate(user.id);

        jest.spyOn(Date, 'now').mockImplementationOnce(()=>{
            const customDate = new Date();
            return customDate.setHours(customDate.getHours() + 3);
        });

        await expect(resetPasswordService.execute(
            {token, password:'123456'})).rejects.toBeInstanceOf(AppError);
    })
});