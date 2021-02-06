
import FakeUserRepository from '../repositories/fake/FakeUserRepository';
import FakeHashProvider from '../providers/hashProvider/fakes/FeakHashProvider';
import CreateUserService from './CreateUserService';
import AppError from '../../../shared/erros/AppErro';


const fakeUserRepository = new FakeUserRepository();
const fakeHashProvider = new FakeHashProvider();
describe('Create User', () => {
    
    const createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider);
    it('should be able to create a new user', async () => {

        const user = await createUserService.execute({ name: 'John Doe', email: 'johndoe@gmail.com', password: '123456' });

        expect(user).toHaveProperty('id');

    })

    it('not should be able to create a new user with same email', async () => {

        expect(createUserService.execute(
            { name: 'John Doe', email: 'johndoe@gmail.com', password: '123456' }
            )).rejects.toBeInstanceOf(AppError)
    })
});