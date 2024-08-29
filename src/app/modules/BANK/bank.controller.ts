import { NextFunction, Request, Response } from "express"
import Async_Catch from "../../utils/try.code"
import { Bank_Services } from "./bank.services"






// create a donate controller
const Create_A_Donate_Controller = Async_Catch(async (req: Request, res: Response, next: NextFunction) => {

    const result = await Bank_Services.Create_A_Donate_Service(req.body, req.user);

    res.json({
        success: true,
        message: "Successfully Donate A Bag",
        data: result
    })
})
// get all bank data controller
const Get_All_Bank_Data_Controller = Async_Catch(async (req: Request, res: Response, next: NextFunction) => {

    const result = await Bank_Services.Get_All_Bank_Data_Service(req.query);

    res.json({
        success: true,
        message: "Successfully Get All Bank Information",
        data: result
    })
})
// get all bank data controller
const Get_A_Bank_Data_Controller = Async_Catch(async (req: Request, res: Response, next: NextFunction) => {

    const donateId = req.params.did;
    const result = await Bank_Services.Get_A_Bank_Data_Service(donateId);

    res.json({
        success: true,
        message: "Successfully Get A Donate Information",
        data: result
    })
})



export const Bank_Controller = {
    Create_A_Donate_Controller,
    Get_All_Bank_Data_Controller,
    Get_A_Bank_Data_Controller
}