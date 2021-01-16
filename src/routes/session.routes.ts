import { Router } from 'express';
import AuthenticationService from '../services/AuthenticationService';

const sessionRouter = Router();

sessionRouter.post('/', async (request, response)=>{

    const { email, password } = request.body;

    const authenticationService = new AuthenticationService();

    const user = await authenticationService.execute({email, password});

    response.json(user);
   
});

export default sessionRouter;