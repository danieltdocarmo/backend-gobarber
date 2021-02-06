import { Router } from 'express';
import UserRepositore from '../../infra/typeorm/repositories/UserRepository';
import BCryptHashProvider from '../../../users/providers/hashProvider/implementations/BCryptHashProvider';
import AuthenticationService from '../../services/AuthenticationService';


const sessionRouter = Router();

sessionRouter.post('/', async (request, response)=>{

    const { email, password } = request.body;
    
    const usersRepository = new UserRepositore();
    const bCryptHashProvider = new BCryptHashProvider();
    const authenticationService = new AuthenticationService(usersRepository, bCryptHashProvider);

    const user = await authenticationService.execute({email, password});

    response.json(user);
   
});

export default sessionRouter;