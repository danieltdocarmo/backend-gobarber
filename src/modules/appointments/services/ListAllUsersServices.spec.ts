import FakeUserRepository from "../../users/repositories/fake/FakeUserRepository";
import ListAllUserServices from "./ListAllUsersServices";

describe('List all users', ()=>{
    it('should be able to list all users', async ()=>{
        const fakeUserRepository = new FakeUserRepository();
        const listAllUserServices = new ListAllUserServices(fakeUserRepository);

        const userOne = await fakeUserRepository.createAndSave({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123123'
        });
        
        const userTwo = await fakeUserRepository.createAndSave({
            name: 'John Tre',
            email: 'johntre@example.com',
            password: '123123'
        });
    
        const userLogged = await fakeUserRepository.createAndSave({
            name: 'John Que',
            email: 'johnque@example.com',
            password: '123123'
        });
    
        const users = await listAllUserServices.execute({user_id:userLogged.id});

        expect(users).toEqual([userOne, userTwo]);
    });
});