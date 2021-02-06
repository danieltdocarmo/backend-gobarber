import { Router } from 'express';

import appointmetsRouter from '../../../../modules/appointments/http/routes/appointments.routes';
import sessionRouter from '../../../../modules/users/http/routes/session.routes';
import userRouter from '../../../../modules/users/http/routes/users.routes';
import passwordRouter from '../../../../modules/users/http/routes/password.routes';

const routes = Router();

routes.use('/appointments', appointmetsRouter);
routes.use('/users', userRouter);
routes.use('/sessions', sessionRouter);
routes.use('/password', passwordRouter);

export default routes;