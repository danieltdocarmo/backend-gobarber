import { Response, Request, NextFunction } from 'express';
import AppErro from '../../../erros/AppErro'

export default function globalExceptionHandler(error: Error, request: Request, response: Response, nextFunction: NextFunction) {
    if (error instanceof AppErro) {
        return response.status(error.statusCode).json({
            status: 'error',
            message: error.message
        });
    } else {
        console.error(error);

        return response.status(500).json({
            status: 'error',
            message: 'internal server error'
        })
    }
}