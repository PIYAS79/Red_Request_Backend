import { NextFunction, Request, Response } from "express";
import Async_Catch from "../../utils/try.code";
import { Auth_Services } from "./auth.services";
import { Jwt, JwtPayload } from "jsonwebtoken";


// login controller 
const LoginUser_Controller = Async_Catch(async (req: Request, res: Response, next: NextFunction) => {

    const { Refresh_Token, Access_Token,me } = await Auth_Services.LoginUser_Service(req.body)

    res.cookie('refreshToken', Refresh_Token, {
        httpOnly: true,
        secure: true
    }).json({
        success: true,
        message: "Successfully Login User",
        data: { me,Access_Token }
    })
})

// change password controller
const ChangePass_Controller = Async_Catch(async (req: Request, res: Response, next: NextFunction) => {

    const result = await Auth_Services.Change_Pass_Service(req.body, req.user as JwtPayload);

    res.json({
        success: true,
        message: "Successfully Change Password !",
        data: result
    })
})

// forget password controller
const Forget_Pass_Controller = Async_Catch(async (req: Request, res: Response, next: NextFunction) => {

    const result = await Auth_Services.Forget_Pass_Service(req.body);

    res.json({
        success: true,
        message: "Successfully Forget Password !",
        data: result
    })
})

// reset password controller 
const Reset_Pass_Controller = Async_Catch(async (req: Request, res: Response, next: NextFunction) => {

    const result = await Auth_Services.Reset_Password_Service(req.body, req.user);

    res.json({
        success: true,
        message: "Successfully Reset Password !",
        data: result
    })
})

// get refresh token controller 
const Get_Acc_Token_By_Refresh_Token_Controller = Async_Catch(async (req: Request, res: Response, next: NextFunction) => {


    const result = await Auth_Services.Get_Acc_Token_By_Refresh_Token_Service(req.cookies.refreshToken)

    res.json({
        success: true,
        message: "Successfully Get Refresh Token !",
        data: result
    })
})


export const authController = {
    LoginUser_Controller,
    ChangePass_Controller,
    Forget_Pass_Controller,
    Reset_Pass_Controller,
    Get_Acc_Token_By_Refresh_Token_Controller
}