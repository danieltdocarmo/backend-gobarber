import FakeUserRepository from "../repositories/fake/FakeUserRepository";
import FakeHashProvider from "../providers/hashProvider/fakes/FeakHashProvider";
import UpdateUserProfileService from './UpdateUserProfileService';
import AppError from '../../../shared/erros/AppErro';

describe('Update Profile', ()=>{
    it('should be able to update profile', async ()=>{
        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();

        const user = await fakeUserRepository.createAndSave({name: 'John Doe', email: 'johndoe@example.com', password: '123456'});

        const updateUserProfileService = new UpdateUserProfileService(fakeUserRepository, fakeHashProvider);
        
        const updatedUser = await updateUserProfileService.execute({
            user_id: user.id,
            name: 'John Tree',
            email: 'johntree@example.com'
        })

        expect(updatedUser.name).toBe('John Tree');
        expect(updatedUser.email).toBe('johntree@example.com');
    });

    it('should not be able to change the email already exist', async ()=>{
        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();

        const user = await fakeUserRepository.createAndSave({name: 'John Doe', email: 'johndoe@example.com', password: '123456'});
        const userTwo = await fakeUserRepository.createAndSave({name: 'John Tree', email: 'johntree@example.com', password: '123456'});

        const updateUserProfileService = new UpdateUserProfileService(fakeUserRepository, fakeHashProvider);
        
        await expect(updateUserProfileService.execute({
            user_id: userTwo.id,
            name: 'John Doe Tree',
            email: 'johndoe@example.com',
        })).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to update password', async ()=>{
        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();

        const user = await fakeUserRepository.createAndSave({name: 'John Doe', email: 'johndoe@example.com', password: '123456'});

        const updateUserProfileService = new UpdateUserProfileService(fakeUserRepository, fakeHashProvider);
        
        const updatedUser = await updateUserProfileService.execute({
            user_id: user.id,
            name: 'John Doe',
            email: 'johndoe@example.com',
            oldPassword: '123456',
            password: '123123'
        });

        expect(updatedUser.password).toBe('123123');

      
    });

    it('should not be able to update password without old password', async ()=>{
        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();

        const user = await fakeUserRepository.createAndSave({name: 'John Doe', email: 'johndoe@example.com', password: '123456'});

        const updateUserProfileService = new UpdateUserProfileService(fakeUserRepository, fakeHashProvider);
        
        await expect(updateUserProfileService.execute({
            user_id: user.id,
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123123'
        })).rejects.toBeInstanceOf(AppError);

    });

    it('should not be update the profile from a non existing user', async ()=>{
        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();
        const updateUserProfileService = new UpdateUserProfileService(fakeUserRepository, fakeHashProvider);


     await expect(updateUserProfileService.execute({
        user_id: 'non-existing-id',
        name: 'John Doe',
        email: 'johndoe@example.com'
     })).rejects.toBeInstanceOf(AppError);
    });

        it('should not be able to update password with wrong old password', async ()=>{
            const fakeUserRepository = new FakeUserRepository();
            const fakeHashProvider = new FakeHashProvider();
    
            const user = await fakeUserRepository.createAndSave({name: 'John Doe', email: 'johndoe@example.com', password: '123456'});
    
            const updateUserProfileService = new UpdateUserProfileService(fakeUserRepository, fakeHashProvider);
            
            await expect(updateUserProfileService.execute({
                user_id: user.id,
                name: 'John Doe',
                email: 'johndoe@example.com',
                oldPassword: '123123',
                password: '123123'
            })).rejects.toBeInstanceOf(AppError);


      
    });
});