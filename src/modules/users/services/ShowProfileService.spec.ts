import ShowProfileService from "./ShowProfileService";
import FakeUserRepository from '../repositories/fake/FakeUserRepository';
import AppError from '../../../shared/erros/AppErro';

describe('Show user', ()=>{
    it('should be able to show user', async ()=>{
        const fakeUserRepository = new FakeUserRepository();
        const showProfileService = new ShowProfileService(fakeUserRepository);

        const user = await fakeUserRepository.createAndSave({
            name: 'John Doe',
            email: 'johedoe@example.com',
            password: '123456'
        });

        const profile = await showProfileService.execute(
            {user_id: user.id});
            
            expect(profile.name).toBe('John Doe');
    });

    it('should not be able to show a non existing user', async ()=>{
        const fakeUserRepository = new FakeUserRepository();
        const showProfileService = new ShowProfileService(fakeUserRepository);

     await expect(showProfileService.execute({
         user_id: 'non_existing_user_id'
     })).rejects.toBeInstanceOf(AppError);
    });

});