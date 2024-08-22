import httpStatus from "http-status";
import Final_App_Error from "../../class/FinalApp_Error";
import { User_Model } from "../USER/user.model"
import { decodeDataByBcrypt } from "../../utils/bcrypt";
import config from "../../config";
import { Create_JWT_Token } from "../../utils/jwt";

// login user service !
const LoginUser_Service = async (data: { email: string, password: string }) => {

    const isUserExistByEmail = await User_Model.isUserExist(data.email);
    if (!isUserExistByEmail) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, "Email Not Found into the DB *");
    }

    // if the user is blocked or not !
    if (isUserExistByEmail.status === 'Block') {
        throw new Final_App_Error(httpStatus.UNAUTHORIZED, "User is Blocked *");
    }

    // check is the password is match or not !
    const isPasswordMatch = await decodeDataByBcrypt(isUserExistByEmail.password, data.password);
    if (!isPasswordMatch) {
        throw new Final_App_Error(httpStatus.FORBIDDEN, "Password did not match *");
    }




    const Refresh_Token = Create_JWT_Token({
        data: {
            email: isUserExistByEmail.email,
            role: isUserExistByEmail.role
        },
        secret: config.ref_token_secret as string,
        exp: config.refresh_token_exp as string
    })
    const Access_Token = Create_JWT_Token({
        data: {
            email: isUserExistByEmail.email,
            role: isUserExistByEmail.role
        },
        secret: config.acc_token_secret as string,
        exp: config.access_token_exp as string
    })

    return { Refresh_Token, Access_Token }
}

export const Auth_Services = {
    LoginUser_Service
}