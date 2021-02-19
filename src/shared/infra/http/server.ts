import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';

import cors from 'cors';

import 'express-async-errors';

import index from './routes/index'; 
import connection from  '../database';
import globalExceptionHandler from './middleweres/globalExceptionHandler';
import { errors} from 'celebrate';

const app = express();

app.use(cors());

app.use(express.json());

app.use(index);
app.use(errors());
app.use(globalExceptionHandler);

app.listen(3333, () =>{
    connection();
    console.log('Launched on port 3333 and fast!');
});
