import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors'
import Global_Error_Handler from './errors/globalErrorHandler';
import Route_Not_Found from './errors/routeNotFound';
import router from './router';

const app = express();

// middlewares 
app.use(express.json());
app.use(cors())



// initial route
app.get('/', (req: Request, res: Response) => {
    res.json({
        success: true,
        message: "Server Run Successfully !!"
    })
})

// project routes
app.use('/api/v1', router)

// route not found error 
app.use('*', Route_Not_Found)

// global error route
app.use(Global_Error_Handler)




export default app;