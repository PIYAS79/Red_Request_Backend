import { NextFunction, Request, Response } from "express";
import Async_Catch from "../../utils/try.code";
import { Auth_Services } from "./auth.services";



const LoginUser_Controller = Async_Catch(async(req:Request,res:Response,next:NextFunction)=>{
    
    const result = await Auth_Services.LoginUser_Service(req.body)

    res.json({
        success: true,
        message: "Successfully Get All User",
        data: result
    })
})

export const authController = {
    LoginUser_Controller,
}