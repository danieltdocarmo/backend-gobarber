import { Router } from 'express';

import appointmetsRouter from './appointments.routes';
import sessionRouter from './session.routes';
import userRouter from './users.routes';

const routes = Router();

routes.use('/appointments', appointmetsRouter);
routes.use('/users', userRouter);
routes.use('/sessions', sessionRouter);

export default routes;