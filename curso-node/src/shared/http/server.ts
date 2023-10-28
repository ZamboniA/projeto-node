import express, { NextFunction, Request, Response, response } from 'express';
import "express-async-errors";
import routes from './routes';
import cors from 'cors';
import AppError from '@shared/errors/AppError';
import '@shared/typeorm';
import "reflect-metadata";
import { errors } from 'celebrate';

const app = express();


app.use(express.json())
app.use(cors())

app.use(routes);;

app.use(errors());


app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if(error  instanceof AppError){
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message
    })
  }

  return response.status(500).json({
    status: 'error',
    message: 'internal server error'
  })
})


app.listen(3000, () => {
  console.log("Server started on port 3000")
});