import { NextFunction, Request, Response } from "express"
import Async_Catch from "../utils/try.code"
import Final_App_Error from "../class/FinalApp_Error"
import httpStatus from "http-status"
import jwt, { JwtPayload, decode } from 'jsonwebtoken';
import config from "../config";
import { User_Model } from "../modules/USER/user.model";
import { User_Type } from "../modules/USER/user.interface";

type TUserRole = "Donor" | "Requester" | "Admin";


const validate_Token = (...roles: TUserRole[]) => {
    return Async_Catch(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;
        // is token is not exist 
        if (!token) {
            throw new Final_App_Error(httpStatus.UNAUTHORIZED, "You are not authorized *");
        }

        // check if the given token is valid or not 
        let decodedTokenData;
        try {
            decodedTokenData = jwt.verify(token, config.token_secret as string) as JwtPayload
        } catch (err) {
            throw new Final_App_Error(httpStatus.UNAUTHORIZED, "Unauthrized Access Found *")
        }
        const { role, iat, email, exp } = decodedTokenData;

        const isUserExist: User_Type = await User_Model.isUserExist(email);

        // if user is not found 
        if (!isUserExist) {
            throw new Final_App_Error(httpStatus.NOT_FOUND, "User Not Found *");
        }

        // check if the user is block or not 
        if (isUserExist.status === 'Block') {
            throw new Final_App_Error(httpStatus.FORBIDDEN, "This user is blocked *");
        }

        // cheick the token expired or not 
        if (isUserExist.passwordChangeAt && User_Model.is_JWT_Token_Exp_Check(isUserExist.passwordChangeAt, iat as number)) {
            throw new Final_App_Error(httpStatus.UNAUTHORIZED, "You are not authorized *");
        }

        if (roles && !roles.includes(role)) {
            throw new Final_App_Error(httpStatus.UNAUTHORIZED, "You are not authorized *");
        }



        req.user = decodedTokenData as JwtPayload;


        next()
    })
}


export default validate_Token;