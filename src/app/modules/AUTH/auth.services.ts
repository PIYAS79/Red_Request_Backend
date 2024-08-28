import httpStatus, { FAILED_DEPENDENCY } from "http-status";
import Final_App_Error from "../../class/FinalApp_Error";
import { User_Model } from "../USER/user.model"
import { decodeDataByBcrypt, encodeDatabyBcrypt } from "../../utils/bcrypt";
import config from "../../config";
import { Create_JWT_Token } from "../../utils/jwt";
import { JwtPayload, decode } from "jsonwebtoken";
import { User_Type } from "../USER/user.interface";
import { SendEmail } from "../../utils/nodeMailer";
import jwt from 'jsonwebtoken';

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
        secret: config.token_secret as string,
        exp: config.refresh_token_exp as string
    })
    const Access_Token = Create_JWT_Token({
        data: {
            email: isUserExistByEmail.email,
            role: isUserExistByEmail.role
        },
        secret: config.token_secret as string,
        exp: config.access_token_exp as string
    })

    return { Refresh_Token, Access_Token, me:isUserExistByEmail }
}

// change password service 
const Change_Pass_Service = async (data: { newPass: string, oldPass: string }, user: JwtPayload) => {

    const tokenUser = await User_Model.isUserExist(user.email);
    if (!tokenUser) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, "User Not Found *");
    }
    // check the user password
    if (! await decodeDataByBcrypt(tokenUser.password, data.oldPass)) {
        throw new Final_App_Error(httpStatus.UNAUTHORIZED, "Unauthorized Access Found *");
    }
    // is all ok 
    const newHashedPass = await encodeDatabyBcrypt(data.newPass);
    const result = await User_Model.findOneAndUpdate(
        { email: user.email },
        {
            password: newHashedPass,
            passwordChangeAt: new Date(),
        },
        { new: true }
    );

    return result;
}

// forget password service 
const Forget_Pass_Service = async (email: { email: string }) => {
    // check is the user is exist or not 
    const isUserExist = await User_Model.isUserExist(email.email) as User_Type;
    if (!isUserExist) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, "User Not Found *");
    }
    // check is the user is blocked or not 
    if (isUserExist.status === 'Block') {
        throw new Final_App_Error(httpStatus.FORBIDDEN, "This user is blocked *");
    }
    // if all ok then send the forget link to the email
    try {

        // check a short period token for reset password 
        const resetToken = Create_JWT_Token({
            data: {
                email: isUserExist.email,
                role: isUserExist.role
            },
            secret: config.token_secret as string,
            exp: '5m'
        })

        const html = `<h1>Test HTML</h1><br/><p>click here : ${config.frontend_url}/auth/forget?token=${resetToken}</p>`;
        const subject = "Forget Password";
        // send email 
        SendEmail(isUserExist.email, html, subject);
    } catch (err) {
        throw new Final_App_Error(httpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error - Nodemailer");
    }

    return "Check Your Email !"
}

// reset password service 
const Reset_Password_Service = async (data: { email: string, newPassword: string }, user: JwtPayload) => {

    const FoundUser = await User_Model.isUserExist(user.email) as User_Type;
    // check both email are same or not 
    if (user.email !== FoundUser.email) {
        throw new Final_App_Error(httpStatus.FORBIDDEN, "Token-Email is not valid *")
    }
    // check is the user is found or not
    if (!FoundUser) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, "User not found *");
    }
    // hash password 
    const hashedPass = await encodeDatabyBcrypt(data.newPassword)
    // is all ok then update user data
    const result = await User_Model.findOneAndUpdate({ email: user.email }, {
        password: hashedPass,
        passwordChangeAt: new Date()
    }, { new: true })

    return result;
}

// get refreshtoken service
const Get_Acc_Token_By_Refresh_Token_Service = async (refToken: string) => {

    const decodeTokenData = jwt.decode(refToken) as JwtPayload;

    // check if the user is exist or not 
    const user = await User_Model.isUserExist(decodeTokenData.email);
    if (!user) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, "User not found *");
    }
    // check is the user is blocked or not
    if (user.status === 'Block') {
        throw new Final_App_Error(httpStatus.FORBIDDEN, "This user is blocked *");
    }
    // check if the refresh token is valid or not 
    if (user.passwordChangeAt && User_Model.is_JWT_Token_Exp_Check(user.passwordChangeAt, decodeTokenData.iat as number)) {
        throw new Final_App_Error(httpStatus.UNAUTHORIZED, "You are not authorized *");
    }

    const accessToken = Create_JWT_Token({
        data: {
            email: user.email,
            role: user.role
        },
        secret: config.token_secret as string,
        exp: config.access_token_exp as string
    })

    return accessToken;
}


export const Auth_Services = {
    LoginUser_Service,
    Change_Pass_Service,
    Forget_Pass_Service,
    Reset_Password_Service,
    Get_Acc_Token_By_Refresh_Token_Service
}
