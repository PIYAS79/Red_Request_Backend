import { NextFunction, Request, Response } from "express"


const Global_Error_Handler=(err:any,req:Request,res:Response,next:NextFunction)=>{
    res.json({
        success:false,
        message:"There is a server side error *",
        error:err
    })
}

export default Global_Error_Handler;