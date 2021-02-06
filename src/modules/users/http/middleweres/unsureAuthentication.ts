
import {Request, Response, NextFunction} from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../../../../config/auth';
import AppErro from '../../../../shared/erros/AppErro';

interface TokenPayload{
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthentication(request:Request, response:Response, next: NextFunction):void{
    
    const authHeader = request.headers.authorization;

    if(!authHeader){
        throw new AppErro('JWT token is missing');
    }

    const [bearer, token] = authHeader.split(' ');


    
    const decoded = verify(token, authConfig.secret);

    if(!decoded){
        throw new AppErro('Invalid Token', 400);
    }
    const { sub } = decoded as TokenPayload;

    request.user = {
        id: sub
    }

    return next();

  
}
