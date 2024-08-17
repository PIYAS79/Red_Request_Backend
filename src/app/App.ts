import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors'
import Global_Error_Handler from './errors/globalErrorHandler';

const app = express();

// middlewares 
app.use(express.json());
app.use(cors())



// initial route
app.get('/',(req:Request,res:Response)=>{
    res.json({
        success:true,
        message:"Server Run Successfully !!"
    })
})

// route not found error 
app.use('*',(req:Request,res:Response)=>{
    res.json({
        success:false,
        message:"Route Not Found *"
    })
})

// global error route
app.use(Global_Error_Handler)




export default app;