import { NextFunction, Request, Response } from "express"
import Async_Catch from "../../utils/try.code"
import { User_Services } from "./user.services"



const Create_User_Controller = Async_Catch(async (req: Request, res: Response, next: NextFunction) => {

    const result = await User_Services.Create_User_Service(req.body);

    res.json({
        success: true,
        message: "Successfully Create A User",
        data: result
    })

})
const Get_All_User_Controller = Async_Catch(async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const result = await User_Services.Get_All_User_Service(query);
    res.json({
        success: true,
        message: "Successfully Get All User",
        data: result
    })
})






export const User_Controller = {
    Create_User_Controller,
    Get_All_User_Controller
}