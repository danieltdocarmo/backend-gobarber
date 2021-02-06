import FakeUserRepository from '../repositories/fake/FakeUserRepository';
import CreateUserService from './CreateUserService';
import AppError from '../../../shared/erros/AppErro';
import AuthenticationService from './AuthenticationService';
import FakeHashProvider from '../providers/hashProvider/fakes/FeakHashProvider';


describe('AuthnticaeeteUsere', () => {
    
    it('should be able to login in application', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider);

        const authenticationUserService = new AuthenticationService(fakeUserRepository, fakeHashProvider);

        await createUserService.execute({ name: 'John Doe', email: 'johndoe@gmail.com', password: '123456' });

        const authenticatedUser = await authenticationUserService.execute({ email: 'johndoe@gmail.com', password: '123456' })

        expect(authenticatedUser).toHaveProperty('token');
    })
        
    it('not should be able to login with non existing email', ()=>{
        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();

        const authenticationUserService = new AuthenticationService(fakeUserRepository, fakeHashProvider);

        expect(authenticationUserService.execute({ email: 'johndoe@gmail.com', password: '123456' })).rejects.toBeInstanceOf(AppError);
    })

    it('not should be able to login with wrong password', async ()=>{
        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider);
        const authenticationUserService = new AuthenticationService(fakeUserRepository, fakeHashProvider);

        await createUserService.execute({ name: 'John Doe', email: 'johndoe@gmail.com', password: '123456' });

        expect(authenticationUserService.execute({ email: 'johndoe@gmail.com', password: '12345' })).rejects.toBeInstanceOf(AppError);
    })


});