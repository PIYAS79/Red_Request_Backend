import { NextFunction, Request, Response } from "express";
import Async_Catch from "../../utils/try.code";
import { Auth_Services } from "./auth.services";



const LoginUser_Controller = Async_Catch(async (req: Request, res: Response, next: NextFunction) => {

    const { Refresh_Token, Access_Token } = await Auth_Services.LoginUser_Service(req.body)

    res.cookie('refreshToken', Refresh_Token, {
        httpOnly: true,
        secure: true
    }).json({
        success: true,
        message: "Successfully Login User",
        data: { Access_Token }
    })
})

export const authController = {
    LoginUser_Controller,
}